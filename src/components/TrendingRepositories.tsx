import RepositoryRow from "./RepositoryRow";
import useRepositories from "../hooks/useRepositories";
import { CheckCircle2Icon } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";
import React, { useContext, useState } from "react";
import { FavoritesContext } from "../providers/FavoritesProvider";
import NoRepositoriesFound from "./NoRepositoriesFound";
import SkeletonRow from "./SkeletonRow";
import ErrorMessage from "./ErrorMessage";
import { Input } from "./ui/input";
import { LanguageFilter } from "./LanguageFilter";

export default function TrendingRepositories() {
  const [languageFilter, setLanguageFilter] = useState("");
  const [searchFilter, setSearchFilter] = useState("");

  const today = new Date();
  const oneWeekAgo = new Date(today.setDate(today.getDate() - 7));
  const { data, status, hasNextPage, fetchNextPage } = useRepositories({
    createdAfter: oneWeekAgo,
    languageFilter,
    searchFilter,
  });

  const { toggleFavorite } = useContext(FavoritesContext);

  return (
    <>
      <div className="flex gap-5 mb-5 p-1">
        <Input placeholder="Search repositories..." value={searchFilter} onChange={e => setSearchFilter(e.target.value)} />
        <LanguageFilter value={languageFilter} onSelect={setLanguageFilter} />
      </div>

      {status === "loading" ? (
        <ul>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </ul>
      ) : status === "error" ? (
        <ErrorMessage />
      ) : status === "success" && (!data.pages.length || data.pages[0].total_count === 0) ? (
        <NoRepositoriesFound />
      ) : (
        <InfiniteScroll
          dataLength={data.pages.reduce((count, page) => count + page.items.length, 0)}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          loader={<SkeletonRow />}
          endMessage={
            <div className="py-5 text-gray-400 flex justify-center items-center gap-2 text-sm">
              <CheckCircle2Icon size={14} />
              Congrats, you've seen it all!
            </div>
          }
        >
          <ul>
            {data.pages.map((page, i) => (
              <React.Fragment key={i}>
                {page.items.map(item => (
                  <RepositoryRow
                    key={item.id}
                    repo={item}
                    isFavorite={item.is_favorite}
                    onSetFavorite={toggleFavorite}
                  />
                ))}
              </React.Fragment>
            ))}
          </ul>
        </InfiniteScroll>
      )}
    </>
  );
}
