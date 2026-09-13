import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';
import { GithubRepo, GithubRepoResponse } from '../models/github-repo.model';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);

  getPublicRepos(username: string, limit = 6): Observable<readonly GithubRepo[]> {
    return this.http
      .get<readonly GithubRepoResponse[]>(`${environment.githubApiUrl}/users/${username}/repos`, {
        params: { sort: 'pushed', per_page: 100 },
      })
      .pipe(
        map((repos) =>
          repos
            .filter((repo) => !repo.fork && !repo.archived)
            .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
            .slice(0, limit)
            .map(toGithubRepo),
        ),
      );
  }
}

function toGithubRepo(repo: GithubRepoResponse): GithubRepo {
  return {
    id: repo.id,
    name: repo.name,
    url: repo.html_url,
    description: repo.description,
    language: repo.language,
    topics: repo.topics,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: new Date(repo.pushed_at),
    homepage: repo.homepage,
  };
}
