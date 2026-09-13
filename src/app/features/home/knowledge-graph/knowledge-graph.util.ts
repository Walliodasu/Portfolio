import { Localized } from '../../../core/models/locale.model';
import { EXPERIENCES } from '../../experience/data/experiences.data';
import { PROJECTS } from '../../projects/data/projects.data';
import { SKILL_CATEGORIES } from '../../skills/data/skills.data';

export type GraphNodeKind = 'experience' | 'project' | 'skill';
export type LabelAnchor = 'start' | 'middle' | 'end';

export interface GraphNode {
  readonly id: string;
  readonly kind: GraphNodeKind;
  readonly label: string;
  /** Job title, shown as a second line under the company name for experience nodes only. */
  readonly roleLabel?: string;
  readonly tooltip: string;
  readonly href?: string;
  readonly degree: number;
  readonly x: number;
  readonly y: number;
  /** Label position, pushed further out along the node's own radial direction to dodge the node itself and its neighbours. */
  readonly labelX: number;
  readonly labelY: number;
  /** Y position of the second (role) line, pushed further out in the same direction as labelY. */
  readonly roleLabelY: number;
  readonly labelAnchor: LabelAnchor;
}

export interface GraphEdge {
  readonly source: string;
  readonly target: string;
}

export interface GraphData {
  readonly nodes: readonly GraphNode[];
  readonly edges: readonly GraphEdge[];
  readonly width: number;
  readonly height: number;
}

const CANVAS_WIDTH = 1040;
const CANVAS_HEIGHT = 640;
const CENTER_X = CANVAS_WIDTH / 2;
const CENTER_Y = CANVAS_HEIGHT / 2;
const PRIMARY_RADIUS_X = 165;
const PRIMARY_RADIUS_Y = 130;
const SKILL_RADIUS_X = 400;
const SKILL_RADIUS_Y = 220;
const PRIMARY_LABEL_OFFSET = 20;
const SKILL_LABEL_OFFSET = 11;
const PRIMARY_LABEL_MAX_LENGTH = 24;
const ROLE_LABEL_MAX_LENGTH = 30;
const ROLE_LINE_HEIGHT = 14;

/** Curated view caps the number of skill leaves so the compact hero graph stays legible. */
const CURATED_SKILL_LIMIT = 16;

interface PrimarySource {
  readonly id: string;
  readonly kind: 'experience' | 'project';
  readonly label: string;
  readonly roleLabel?: string;
  readonly tooltip: string;
  readonly href: string;
  readonly stack: readonly string[];
}

const FEATURED_SKILL_NAMES = new Set(
  SKILL_CATEGORIES.flatMap((category) => category.skills)
    .filter((skill) => skill.featured)
    .map((skill) => skill.name.toLowerCase()),
);

function circularMeanAngle(angles: readonly number[]): number {
  const sumX = angles.reduce((sum, angle) => sum + Math.cos(angle), 0);
  const sumY = angles.reduce((sum, angle) => sum + Math.sin(angle), 0);
  return Math.atan2(sumY, sumX);
}

function truncateLabel(label: string, maxLength: number): string {
  return label.length > maxLength ? `${label.slice(0, maxLength - 1).trimEnd()}…` : label;
}

/** Short, graph-friendly company name: prefers a parenthesised acronym (e.g. "…(CNR)" → "CNR"). */
function shortCompanyLabel(company: string): string {
  const acronym = company.match(/\(([A-Z0-9]{2,6})\)/);
  return acronym ? acronym[1] : truncateLabel(company, PRIMARY_LABEL_MAX_LENGTH);
}

/** Short, graph-friendly project title: the part before an em-dash subtitle, if any. */
function shortProjectLabel(title: string): string {
  const [main] = title.split(' — ');
  return truncateLabel(main, PRIMARY_LABEL_MAX_LENGTH);
}

function buildPrimarySources(
  curated: boolean,
  translate: <T>(value: Localized<T>) => T,
): readonly PrimarySource[] {
  // All three experiences are short enough to keep even the curated view representative.
  const experiences = EXPERIENCES;
  const projects = curated ? PROJECTS.filter((project) => project.featured) : PROJECTS;

  const experienceNodes: PrimarySource[] = experiences.map((experience) => ({
    id: `exp:${experience.id}`,
    kind: 'experience',
    label: shortCompanyLabel(experience.company),
    roleLabel: truncateLabel(translate(experience.role), ROLE_LABEL_MAX_LENGTH),
    tooltip: `${translate(experience.role)} — ${experience.company}`,
    href: '/experience',
    stack: experience.stack,
  }));

  const projectNodes: PrimarySource[] = projects.map((project) => ({
    id: `proj:${project.slug}`,
    kind: 'project',
    label: shortProjectLabel(project.title),
    tooltip: `${project.title} — ${translate(project.tagline)}`,
    href: `/projects/${project.slug}`,
    stack: project.stack,
  }));

  return [...experienceNodes, ...projectNodes];
}

function placeNode(angle: number, radiusX: number, radiusY: number, labelOffset: number) {
  const x = CENTER_X + radiusX * Math.cos(angle);
  const y = CENTER_Y + radiusY * Math.sin(angle);
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);

  const labelAnchor: LabelAnchor = ux > 0.25 ? 'start' : ux < -0.25 ? 'end' : 'middle';
  const labelY = y + uy * labelOffset + (labelAnchor === 'middle' ? (uy > 0 ? 4 : -2) : 4);
  const roleLabelY = labelY + (uy < 0 ? -ROLE_LINE_HEIGHT : ROLE_LINE_HEIGHT);

  return {
    x,
    y,
    labelX: x + ux * labelOffset,
    labelY,
    roleLabelY,
    labelAnchor,
  };
}

export function buildProfileGraph(
  curated: boolean,
  translate: <T>(value: Localized<T>) => T,
): GraphData {
  const primaries = buildPrimarySources(curated, translate);

  const skillFirstSeen = new Map<string, string>();
  const skillCount = new Map<string, number>();
  const skillEdges = new Map<string, Set<string>>();

  for (const primary of primaries) {
    for (const rawSkill of primary.stack) {
      const key = rawSkill.trim().toLowerCase();
      if (!skillFirstSeen.has(key)) {
        skillFirstSeen.set(key, rawSkill.trim());
      }
      skillCount.set(key, (skillCount.get(key) ?? 0) + 1);
      if (!skillEdges.has(key)) {
        skillEdges.set(key, new Set());
      }
      skillEdges.get(key)!.add(primary.id);
    }
  }

  let skillKeys = [...skillFirstSeen.keys()];

  if (curated) {
    skillKeys = skillKeys
      .filter((key) => (skillCount.get(key) ?? 0) >= 2 || FEATURED_SKILL_NAMES.has(key))
      .sort((a, b) => (skillCount.get(b) ?? 0) - (skillCount.get(a) ?? 0))
      .slice(0, CURATED_SKILL_LIMIT);
  }

  const includedSkillKeys = new Set(skillKeys);

  const primaryCount = primaries.length;
  const primaryAngle = new Map<string, number>();
  primaries.forEach((primary, index) => {
    const angle = -Math.PI / 2 + (index * (2 * Math.PI)) / Math.max(primaryCount, 1);
    primaryAngle.set(primary.id, angle);
  });

  const skillMeanAngle = new Map<string, number>();
  for (const key of skillKeys) {
    const connectedPrimaryIds = [...(skillEdges.get(key) ?? [])];
    const angles = connectedPrimaryIds
      .map((id) => primaryAngle.get(id))
      .filter((angle): angle is number => angle !== undefined);
    skillMeanAngle.set(key, angles.length ? circularMeanAngle(angles) : 0);
  }

  const sortedSkillKeys = [...skillKeys].sort(
    (a, b) => (skillMeanAngle.get(a) ?? 0) - (skillMeanAngle.get(b) ?? 0),
  );

  const nodes: GraphNode[] = [];

  primaries.forEach((primary) => {
    const angle = primaryAngle.get(primary.id) ?? 0;
    const degree = primary.stack.filter((skill) =>
      includedSkillKeys.has(skill.trim().toLowerCase()),
    ).length;
    const placed = placeNode(angle, PRIMARY_RADIUS_X, PRIMARY_RADIUS_Y, PRIMARY_LABEL_OFFSET);

    nodes.push({
      id: primary.id,
      kind: primary.kind,
      label: primary.label,
      roleLabel: primary.roleLabel,
      tooltip: primary.tooltip,
      href: primary.href,
      degree,
      ...placed,
    });
  });

  sortedSkillKeys.forEach((key, index) => {
    const angle = -Math.PI / 2 + (index * (2 * Math.PI)) / Math.max(sortedSkillKeys.length, 1);
    const label = skillFirstSeen.get(key) ?? key;
    const placed = placeNode(angle, SKILL_RADIUS_X, SKILL_RADIUS_Y, SKILL_LABEL_OFFSET);

    nodes.push({
      id: `skill:${key}`,
      kind: 'skill',
      label,
      tooltip: label,
      degree: skillEdges.get(key)?.size ?? 0,
      ...placed,
    });
  });

  const edges: GraphEdge[] = [];
  for (const primary of primaries) {
    for (const rawSkill of primary.stack) {
      const key = rawSkill.trim().toLowerCase();
      if (includedSkillKeys.has(key)) {
        edges.push({ source: primary.id, target: `skill:${key}` });
      }
    }
  }

  return { nodes, edges, width: CANVAS_WIDTH, height: CANVAS_HEIGHT };
}
