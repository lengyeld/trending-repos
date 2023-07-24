import { SearchXIcon } from "lucide-react";

export default function NoRepositoriesFound() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="p-4 rounded-full  bg-gray-100">
        <SearchXIcon size={24} className="text-gray-600" />
      </div>
      <p className="text-gray-500">0 repositories found :(</p>
    </div>
  );
}
