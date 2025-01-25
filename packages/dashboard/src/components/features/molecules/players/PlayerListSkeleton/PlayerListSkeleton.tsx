export const PlayerListSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div
        key={i}
        className="bg-white dark:bg-gray-800 p-4 rounded-xl animate-pulse"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/4" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
