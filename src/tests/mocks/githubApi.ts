import { SearchRepositoriesResponse } from "@/lib/github";
import { rest } from "msw";
import { setupServer } from "msw/node";

// This configures a request mocking server with the given request handlers.
export const mockedGitHubApi = setupServer(
  rest.get("https://api.github.com/search/repositories", (_, res, ctx) => {
    const resp: SearchRepositoriesResponse = {
      total_count: 1,
      items: [
        {
          id: 1,
          name: "Mocked repo",
          description: "A fancy repo that was mocked",
          html_url: "https://google.com",
          owner: {
            avatar_url: "",
          },
          stargazers_count: 10,
        },
      ],
    };

    return res(ctx.json(resp));
  }),
);
