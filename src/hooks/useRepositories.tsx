import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useContext } from "react";
import { FavoritesContext } from "../providers/FavoritesProvider";
import { SearchRepositoriesResponse } from "@/lib/github";
import { Repository } from "@/lib/app";
import useDebounce from "./useDebounce";

interface Props {
  createdAfter: Date;
  searchFilter?: string;
  languageFilter?: string;
}

const itemsPerPage = 100;

function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getQueryString({
  languageFilter,
  searchFilter,
  createdAfter,
}: {
  languageFilter?: string;
  searchFilter?: string;
  createdAfter: Date;
}): string {
  return [
    searchFilter,
    languageFilter ? `language:${languageFilter}` : undefined,
    `created:>${formatDate(createdAfter)}`,
  ]
    .filter(el => Boolean(el))
    .join(" ");
}

export default function useRepositories({ createdAfter, searchFilter, languageFilter }: Props) {
  const { favorites } = useContext(FavoritesContext);

  const fetchRepositories = useCallback(
    async ({ pageParam = 1 }): Promise<SearchRepositoriesResponse> => {
      const params = new URLSearchParams();
      params.append("q", getQueryString({ languageFilter, searchFilter, createdAfter }));
      params.append("sort", "stars");
      params.append("order", "desc");
      params.append("page", String(pageParam));
      params.append("per_page", String(itemsPerPage));

      const res = await fetch(`https://api.github.com/search/repositories?${params.toString()}}`);

      if (!res.ok) throw new Error("Failed to fetch repositories");

      return res.json();
    },
    [createdAfter, searchFilter, languageFilter],
  );

  const queryKey = useDebounce(["repositories", { searchFilter, languageFilter }], 500);

  return useInfiniteQuery<SearchRepositoriesResponse, Error, { total_count: number; items: Repository[] }>({
    queryKey,
    staleTime: 1000 * 60 * 1, // 1 minute
    select: data => {
      return {
        ...data,
        pages: data.pages.map(page => ({
          ...page,
          items: page.items.map(item => ({
            ...item,
            is_favorite: Boolean(favorites[item.id]),
          })),
        })),
      };
    },
    getNextPageParam: (_, pages) =>
      pages[0].total_count <= pages.length * itemsPerPage ? undefined : pages.length + 1,
    queryFn: fetchRepositories,
  });
}
