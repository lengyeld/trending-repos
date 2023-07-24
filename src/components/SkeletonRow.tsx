import { Skeleton } from "./ui/skeleton";

export default function SkeletonRow() {
  return (
    <li className="flex items-center space-x-4 py-4 px-8 border-b border-gray-100 last:border-none">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </li>
  );
}
