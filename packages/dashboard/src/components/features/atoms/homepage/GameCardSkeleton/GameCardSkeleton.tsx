import { cn } from "@core/utils";

export const GameCardSkeleton = () => (
  <div className={cn(
    "relative rounded-xl overflow-hidden",
    "bg-gradient-to-br from-gray-800 via-gray-900 to-black",
    "w-full h-[300px]",
    "animate-pulse",
    "border border-white/5",
    "shadow-[inset_0_0_100px_rgba(255,255,255,0.1)]"
  )}>
    {/* Animated gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-purple-500/10 to-transparent animate-gradient" />
    
    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/80 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-3">
          <div className="h-8 w-24 bg-gradient-to-r from-white/10 to-white/5 rounded-lg" />
          <div className="h-4 w-32 bg-gradient-to-r from-white/10 to-white/5 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
);