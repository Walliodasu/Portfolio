/** Subset of the GitHub REST repository payload consumed by the application. */
export interface GithubRepoResponse {
  readonly id: number;
  readonly name: string;
  readonly full_name: string;
  readonly html_url: string;
  readonly description: string | null;
  readonly language: string | null;
  readonly topics: readonly string[];
  readonly stargazers_count: number;
  readonly forks_count: number;
  readonly fork: boolean;
  readonly archived: boolean;
  readonly pushed_at: string;
  readonly homepage: string | null;
}

export interface GithubRepo {
  readonly id: number;
  readonly name: string;
  readonly url: string;
  readonly description: string | null;
  readonly language: string | null;
  readonly topics: readonly string[];
  readonly stars: number;
  readonly forks: number;
  readonly updatedAt: Date;
  readonly homepage: string | null;
}
