import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { I18nService } from '../../../core/services/i18n.service';
import { KnowledgeGraph } from './knowledge-graph';

describe('KnowledgeGraph', () => {
  let fixture: ComponentFixture<KnowledgeGraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KnowledgeGraph],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    // The assertions below read French copy, so the locale must not leak in from another spec.
    TestBed.inject(I18nService).setLocale('fr');

    fixture = TestBed.createComponent(KnowledgeGraph);
    await fixture.whenStable();
  });

  function root(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  function expandButton(): HTMLButtonElement {
    const button = Array.from(root().querySelectorAll('button')).find((candidate) =>
      candidate.textContent?.includes('Voir le graphe complet'),
    );
    if (!button) {
      throw new Error('Expand button not found');
    }
    return button;
  }

  it('renders the curated graph inline with real profile nodes', () => {
    expect(root().querySelector('svg')).toBeTruthy();

    const labels = Array.from(root().querySelectorAll('text')).map((node) =>
      node.textContent?.trim(),
    );
    expect(labels).toContain('AG2R LA MONDIALE');
    expect(root().querySelectorAll('circle').length).toBeGreaterThan(1);
  });

  it('does not render the expanded overlay by default', () => {
    expect(root().querySelector('[role="dialog"]')).toBeNull();
  });

  it('opens the full-screen overlay when the expand button is clicked', async () => {
    expandButton().click();
    await fixture.whenStable();

    expect(root().querySelector('[role="dialog"]')).toBeTruthy();
  });

  it('closes the overlay via the close button', async () => {
    expandButton().click();
    await fixture.whenStable();

    const closeButton = root().querySelector('[role="dialog"] button') as HTMLButtonElement;
    closeButton.click();
    await fixture.whenStable();

    expect(root().querySelector('[role="dialog"]')).toBeNull();
  });

  it('closes the overlay when Escape is pressed', async () => {
    expandButton().click();
    await fixture.whenStable();
    expect(root().querySelector('[role="dialog"]')).toBeTruthy();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await fixture.whenStable();

    expect(root().querySelector('[role="dialog"]')).toBeNull();
  });

  it('shows more of the profile in the expanded view than in the curated one', async () => {
    const curatedNodeCount = root().querySelectorAll('circle').length;

    expandButton().click();
    await fixture.whenStable();

    const expandedNodeCount = root().querySelectorAll('[role="dialog"] circle').length;
    expect(expandedNodeCount).toBeGreaterThan(curatedNodeCount);
  });

  it('highlights a hovered node and its connections, dimming the rest', async () => {
    const nodeGroups = Array.from(root().querySelectorAll('svg circle'))
      .map((circle) => circle.parentElement)
      .filter((group): group is HTMLElement => group !== null);
    expect(nodeGroups.length).toBeGreaterThan(1);

    nodeGroups[0].dispatchEvent(new Event('pointerenter'));
    await fixture.whenStable();

    const opacities = nodeGroups.map((group) => group.getAttribute('opacity'));
    expect(opacities).toContain('1');
    expect(opacities).toContain('0.25');

    nodeGroups[0].dispatchEvent(new Event('pointerleave'));
    await fixture.whenStable();

    expect(nodeGroups.every((group) => group.getAttribute('opacity') === '1')).toBeTrue();
  });
});
