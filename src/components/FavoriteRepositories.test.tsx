import { render, screen } from "../tests/utils";
import { mockedLocalStorage } from "../tests/mocks/localStorage";
import FavoriteRepositories from "./FavoriteRepositories";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: mockedLocalStorage,
  });
});

it("should display repos saved in local storage", async () => {
  const mockedRepos = {
    1: {
      id: 1,
      name: "test 1",
      description: "",
      html_url: "",
      owner: { avatar_url: "" },
      stargazers_count: 1,
      is_favorite: true,
    },
    2: {
      id: 2,
      name: "test 2",
      description: "",
      html_url: "",
      owner: { avatar_url: "" },
      stargazers_count: 1,
      is_favorite: true,
    },
  };

  localStorage.setItem("favorites", JSON.stringify(mockedRepos));

  render(<FavoriteRepositories />);

  expect(await screen.findByText(mockedRepos[1].name)).toBeInTheDocument();
  expect(await screen.findByText(mockedRepos[2].name)).toBeInTheDocument();
});

it("should remove item from list when remove favorite clicked", async () => {
  const mockedRepo = {
    id: 1,
    name: "test 1",
    description: "",
    html_url: "",
    owner: { avatar_url: "" },
    stargazers_count: 1,
    is_favorite: true,
  };

  localStorage.setItem("favorites", JSON.stringify({ "1": mockedRepo }));

  render(<FavoriteRepositories />);

  expect(screen.getAllByRole("listitem")).toHaveLength(1);

  const removeFavoriteButton = await screen.findByRole("button", { name: "Remove from favorites" });
  await userEvent.click(removeFavoriteButton);
  expect(screen.queryByText(mockedRepo.name)).not.toBeInTheDocument();
});
