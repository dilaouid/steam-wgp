import { RefreshCw } from "lucide-react";
import { cn } from "@core/utils";
import { SteamIcon } from "@ui/atoms/Icons/SteamIcon";

export const SyncButton = ({
  onSync,
  isLoading,
}: {
  onSync: () => void;
  isLoading: boolean;
}) => (
  <button
    onClick={onSync}
    disabled={isLoading}
    className={cn(
      "w-full h-12",
      "bg-gradient-to-r from-[#1b2838] to-[#2a475e]",
      "hover:from-[#2a475e] hover:to-[#1b2838]",
      "border border-[#2a475e]",
      "text-gray-200 font-medium",
      "rounded",
      "flex items-center justify-center gap-2",
      "transition-all duration-300",
      "group"
    )}
  >
    <div className="relative">
      <SteamIcon className="w-6 h-6 group-hover:opacity-0 transition-opacity" />
      {isLoading ? (
        <RefreshCw className="w-6 h-6 animate-spin absolute inset-0" />
      ) : (
        <RefreshCw className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0" />
      )}
    </div>
    <span>Synchroniser le compte Steam</span>
  </button>
);
