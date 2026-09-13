import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });

    service = TestBed.inject(ProjectsService);
  });

  it('sorts projects from the most recent year', () => {
    const years = service.projects().map((project) => project.year);

    expect(years).toEqual([...years].sort((a, b) => b - a));
  });

  it('exposes only featured projects through the featured signal', () => {
    expect(service.featured().every((project) => project.featured)).toBeTrue();
  });

  it('lists each category once', () => {
    const categories = service.categories();

    expect(categories.length).toBe(new Set(categories).size);
  });

  it('finds a project by slug and returns undefined for an unknown one', () => {
    const first = service.projects()[0];

    expect(service.findBySlug(first.slug)).toEqual(first);
    expect(service.findBySlug('does-not-exist')).toBeUndefined();
  });
});
