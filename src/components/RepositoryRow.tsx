import { Repository } from "@/lib/app";
import { Avatar, AvatarImage } from "./ui/avatar";
import { FileCode2, HeartIcon, StarIcon } from "lucide-react";

interface Props {
  repo: Repository;
  isFavorite: boolean;
  onSetFavorite: (repo: Repository) => void;
}

export default function RepositoryRow({ repo, isFavorite, onSetFavorite }: Props) {
  return (
    <li className="py-4 px-8 flex justify-between items-center gap-4 border-b border-gray-100 last:border-none">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={repo.owner.avatar_url} />
        </Avatar>
        <div>
          <div className="flex items-center gap-4 mb-1">
            <a className="font-bold hover:underline" href={repo.html_url}>
              {repo.name}
            </a>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <StarIcon size={14} />
              {repo.stargazers_count}
            </span>
            {repo.language && (
              <span className="text-gray-500 text-sm flex items-center gap-1">
                <FileCode2 size={14} />
                {repo.language}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">{repo.description}</div>
        </div>
      </div>
      <button
        aria-label={isFavorite ? "Remove from favorites" : "Save as favorite"}
        className="p-2 rounded-md hover:bg-gray-100"
        onClick={() => onSetFavorite(repo)}
      >
        <HeartIcon size={16} className={isFavorite ? "fill-black" : ""} />
      </button>
    </li>
  );
}
