export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  is_favorite: boolean;
  language?: string;
  owner: {
    avatar_url: string;
  };
}
