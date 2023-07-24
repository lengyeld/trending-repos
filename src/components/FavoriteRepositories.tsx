import { useContext } from "react";
import RepositoryRow from "./RepositoryRow";
import { FavoritesContext } from "../providers/FavoritesProvider";
import NoRepositoriesFound from "./NoRepositoriesFound";

export default function FavoriteRepositories() {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  if (!Object.keys(favorites).length) {
    return <NoRepositoriesFound />;
  }

  return (
    <ul>
      {Object.values(favorites)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .map(item => (
          <RepositoryRow key={item.id} repo={item} isFavorite={item.is_favorite} onSetFavorite={toggleFavorite} />
        ))}
    </ul>
  );
}
