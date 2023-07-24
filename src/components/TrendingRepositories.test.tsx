import TrendingRepositories from "./TrendingRepositories";
import { render, screen } from "../tests/utils";
import { mockedLocalStorage } from "../tests/mocks/localStorage";
import { mockedGitHubApi } from "../tests/mocks/githubApi";
import { rest } from "msw";
import { SearchRepositoriesResponse } from "../lib/github";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: mockedLocalStorage,
  });
});

it("should display loading state first", async () => {
  render(<TrendingRepositories />);

  expect(screen.getAllByRole("listitem")).toHaveLength(5);
});

it("should fetch and display the repositories", async () => {
  render(<TrendingRepositories />);

  await screen.findAllByText("Mocked repo");
  expect(screen.getAllByText("Mocked repo")).toHaveLength(1);
});

it("should display error message if api call fails", async () => {
  mockedGitHubApi.use(
    rest.get("https://api.github.com/search/repositories", (_, res, ctx) => {
      return res(ctx.status(500), ctx.json({ message: "Internal server error" }));
    }),
  );

  render(<TrendingRepositories />);

  const errorMessage = await screen.findByText("Something went wrong");
  expect(errorMessage).toBeInTheDocument();
});

it("should store repo in local storage when favorite button clicked", async () => {
  const mockedRepo = {
    id: 123,
    name: "test",
    description: "",
    html_url: "",
    owner: { avatar_url: "" },
    stargazers_count: 1,
  };

  mockedGitHubApi.use(
    rest.get("https://api.github.com/search/repositories", (_, res, ctx) => {
      const resp: SearchRepositoriesResponse = {
        total_count: 1,
        items: [mockedRepo],
      };

      return res(ctx.json(resp));
    }),
  );

  render(<TrendingRepositories />);

  const favoriteButton = await screen.findByRole("button", { name: "Save as favorite" });

  userEvent.click(favoriteButton);

  const removeFavoriteButton = await screen.findByRole("button", { name: "Remove from favorites" });
  const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");

  expect(favorites[mockedRepo.id]).toStrictEqual({ ...mockedRepo, is_favorite: true });
  expect(removeFavoriteButton).toBeInTheDocument();
});

it("should show repo as favorite if it is was in local storage", async () => {
  const mockedRepo = {
    id: 123,
    name: "test",
    description: "",
    html_url: "",
    owner: { avatar_url: "" },
    stargazers_count: 1,
  };

  localStorage.setItem("favorites", JSON.stringify({ "123": { ...mockedRepo, is_favorite: true } }));

  mockedGitHubApi.use(
    rest.get("https://api.github.com/search/repositories", (_, res, ctx) => {
      const resp: SearchRepositoriesResponse = {
        total_count: 1,
        items: [mockedRepo],
      };

      return res(ctx.json(resp));
    }),
  );

  render(<TrendingRepositories />);

  const removeFavoriteButton = await screen.findByRole("button", { name: "Remove from favorites" });
  expect(removeFavoriteButton).toBeInTheDocument();
});

it("should remove repo local storage when remove from favorite is clicked", async () => {
  const mockedRepo = {
    id: 123,
    name: "test",
    description: "",
    html_url: "",
    owner: { avatar_url: "" },
    stargazers_count: 1,
  };

  localStorage.setItem("favorites", JSON.stringify({ "123": { ...mockedRepo, is_favorite: true } }));

  mockedGitHubApi.use(
    rest.get("https://api.github.com/search/repositories", (_, res, ctx) => {
      const resp: SearchRepositoriesResponse = {
        total_count: 1,
        items: [mockedRepo],
      };

      return res(ctx.json(resp));
    }),
  );

  render(<TrendingRepositories />);

  const removeFavoriteButton = await screen.findByRole("button", { name: "Remove from favorites" });
  userEvent.click(removeFavoriteButton);

  const favoriteButton = await screen.findByRole("button", { name: "Save as favorite" });

  const favorites = JSON.parse(localStorage.getItem("favorites") || "{}");

  expect(favorites[mockedRepo.id]).toBeUndefined();
  expect(favoriteButton).toBeInTheDocument();
});
