export const PlayerDetailsSkeleton = () => (
  <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
      <div className="lg:col-span-3 space-y-6">
        {/* Profile Skeleton */}
        <div className="flex items-start gap-4 animate-pulse">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="flex-1">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>

        {/* Steamder List Skeleton */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg"
          />
        ))}
      </div>

      {/* Library Skeleton */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-[600/900] bg-gray-200 dark:bg-gray-700 rounded"
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
