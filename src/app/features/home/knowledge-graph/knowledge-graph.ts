import { DOCUMENT, NgTemplateOutlet, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostListener,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import { I18nService } from '../../../core/services/i18n.service';
import { Icon } from '../../../shared/components/icon/icon';
import { GraphNode, buildProfileGraph } from './knowledge-graph.util';

@Component({
  selector: 'pf-knowledge-graph',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Icon, NgTemplateOutlet],
  templateUrl: './knowledge-graph.html',
})
export class KnowledgeGraph {
  protected readonly i18n = inject(I18nService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly expanded = signal(false);
  protected readonly hoveredId = signal<string | null>(null);

  private readonly translate = <T>(value: { fr: T; en: T }) => this.i18n.translate(value);

  protected readonly curatedGraph = computed(() => buildProfileGraph(true, this.translate));
  protected readonly fullGraph = computed(() => buildProfileGraph(false, this.translate));

  protected readonly activeGraph = computed(() =>
    this.expanded() ? this.fullGraph() : this.curatedGraph(),
  );

  protected readonly nodeIndex = computed(
    () => new Map(this.activeGraph().nodes.map((node) => [node.id, node])),
  );

  /** Ids of the hovered node plus every node directly connected to it; `null` means "show everything at full opacity". */
  protected readonly activeIds = computed<ReadonlySet<string> | null>(() => {
    const hovered = this.hoveredId();
    if (!hovered) {
      return null;
    }

    const graph = this.activeGraph();
    const ids = new Set<string>([hovered]);

    for (const edge of graph.edges) {
      if (edge.source === hovered) {
        ids.add(edge.target);
      } else if (edge.target === hovered) {
        ids.add(edge.source);
      }
    }

    return ids;
  });

  protected open(): void {
    this.expanded.set(true);
    this.hoveredId.set(null);

    if (this.isBrowser) {
      this.document.body.style.overflow = 'hidden';
    }
  }

  protected close(): void {
    this.expanded.set(false);
    this.hoveredId.set(null);

    if (this.isBrowser) {
      this.document.body.style.removeProperty('overflow');
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.expanded()) {
      this.close();
    }
  }

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.isBrowser) {
        this.document.body.style.removeProperty('overflow');
      }
    });
  }

  protected isActive(id: string): boolean {
    const active = this.activeIds();
    return active === null || active.has(id);
  }

  protected onNodeActivate(node: GraphNode): void {
    if (!node.href) {
      return;
    }

    this.close();
    void this.router.navigateByUrl(node.href);
  }
}
