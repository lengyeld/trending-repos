import { PropsWithChildren, createContext, useCallback, useState } from "react";
import { Repository } from "../lib/app";

const localStorageKey = "favorites";

function readInitialData(): Record<number, Repository> {
  try {
    const raw = localStorage.getItem(localStorageKey) || "{}";
    return JSON.parse(raw);
  } catch (err) {
    console.error(err);
    return {};
  }
}

interface FavoritesContext {
  favorites: Record<number, Repository>;
  toggleFavorite: (repoId: Repository) => void;
}

export const FavoritesContext = createContext<FavoritesContext>({
  favorites: {},
  toggleFavorite: () => {},
});

export function FavoritesProvider({ children }: PropsWithChildren) {
  const [favorites, setFavorites] = useState(readInitialData());

  const toggleFavorite = useCallback(
    (repo: Repository) => {
      const newFavorites = { ...favorites };
      const isFavorite = favorites[repo.id];

      if (isFavorite) {
        delete newFavorites[repo.id];
      } else {
        newFavorites[repo.id] = { ...repo, is_favorite: true };
      }

      setFavorites(newFavorites);
      localStorage.setItem(localStorageKey, JSON.stringify(newFavorites));
    },
    [favorites, setFavorites],
  );

  return <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>{children}</FavoritesContext.Provider>;
}
