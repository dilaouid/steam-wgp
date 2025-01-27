export const PlayerDetailsSkeleton = () => (
  <div className="container mx-auto p-6">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column */}
      <div className="lg:col-span-1 space-y-8">
        {/* Profile Skeleton */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-8">
          <div className="flex items-start gap-4 animate-pulse">
            <div className="w-24 h-24 bg-gray-800 rounded-full" />
            <div className="flex-1 space-y-4">
              <div className="h-8 w-48 bg-gray-800 rounded" />
              <div className="h-8 w-32 bg-gray-800 rounded" />
            </div>
          </div>
        </div>

        {/* Steamders Skeleton */}
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="h-8 w-32 bg-gray-800 rounded animate-pulse" />
            <div className="h-8 w-32 bg-gray-800 rounded animate-pulse" />
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 bg-gray-800 rounded-lg animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Library Skeleton */}
      <div className="lg:col-span-2">
        <div className="bg-gradient-to-br from-gray-900/90 to-black/90 rounded-xl p-8 space-y-4">
          <div className="flex items-center gap-2 animate-pulse">
            <div className="h-8 w-48 bg-gray-800 rounded" />
            <div className="h-6 w-16 bg-gray-800 rounded" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {[...Array(18)].map((_, i) => (
              <div
                key={i}
                className="aspect-[600/900] bg-gray-800 rounded animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
