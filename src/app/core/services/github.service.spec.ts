import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { GithubRepoResponse } from '../models/github-repo.model';
import { GithubService } from './github.service';

function buildRepo(overrides: Partial<GithubRepoResponse> = {}): GithubRepoResponse {
  return {
    id: 1,
    name: 'repo',
    full_name: 'user/repo',
    html_url: 'https://github.com/user/repo',
    description: null,
    language: 'TypeScript',
    topics: [],
    stargazers_count: 0,
    forks_count: 0,
    fork: false,
    archived: false,
    pushed_at: '2026-01-01T00:00:00Z',
    homepage: null,
    ...overrides,
  };
}

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('excludes forks and archived repositories', () => {
    let result: readonly { name: string }[] = [];

    service.getPublicRepos('user').subscribe((repos) => (result = repos));

    httpMock
      .expectOne((request) => request.url.endsWith('/users/user/repos'))
      .flush([
        buildRepo({ id: 1, name: 'kept' }),
        buildRepo({ id: 2, name: 'forked', fork: true }),
        buildRepo({ id: 3, name: 'archived', archived: true }),
      ]);

    expect(result.map((repo) => repo.name)).toEqual(['kept']);
  });

  it('sorts repositories by most recent push and applies the limit', () => {
    let result: readonly { name: string }[] = [];

    service.getPublicRepos('user', 2).subscribe((repos) => (result = repos));

    httpMock
      .expectOne((request) => request.url.endsWith('/users/user/repos'))
      .flush([
        buildRepo({ id: 1, name: 'old', pushed_at: '2024-01-01T00:00:00Z' }),
        buildRepo({ id: 2, name: 'newest', pushed_at: '2026-06-01T00:00:00Z' }),
        buildRepo({ id: 3, name: 'middle', pushed_at: '2025-06-01T00:00:00Z' }),
      ]);

    expect(result.map((repo) => repo.name)).toEqual(['newest', 'middle']);
  });

  it('maps the API payload to the application model', () => {
    let result: readonly { url: string; stars: number; updatedAt: Date }[] = [];

    service.getPublicRepos('user').subscribe((repos) => (result = repos));

    httpMock
      .expectOne((request) => request.url.endsWith('/users/user/repos'))
      .flush([buildRepo({ stargazers_count: 42, pushed_at: '2026-02-03T10:00:00Z' })]);

    expect(result[0].url).toBe('https://github.com/user/repo');
    expect(result[0].stars).toBe(42);
    expect(result[0].updatedAt.getUTCFullYear()).toBe(2026);
  });
});
