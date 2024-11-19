import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonCard = () => {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 space-y-3">
      <div className="flex items-start gap-3">
        <Skeleton className="h-8 w-8 rounded-full bg-neutral-800" />
        <Skeleton className="h-4 w-[120px] ml-auto bg-neutral-800" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-[200px] bg-neutral-800" />
        <Skeleton className="h-4 w-[150px] bg-neutral-800" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-[80px] rounded-lg bg-neutral-800" />
        <Skeleton className="h-6 w-[80px] rounded-lg bg-neutral-800" />
      </div>
    </div>
  );
};
