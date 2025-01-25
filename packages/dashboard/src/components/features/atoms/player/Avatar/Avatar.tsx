import { cn } from "@core/utils";
import { IAvatarProps } from "./Avatar.props";
import { Crown } from "lucide-react";

export const Avatar = ({
  hash,
  isSiteAdmin,
  isSteamderAdmin,
  size = "md",
  className
}: IAvatarProps) => (
  <div className="relative group">
    <img
      src={`https://avatars.akamai.steamstatic.com/${hash}_full.jpg`}
      className={className + cn(
        "rounded-full object-cover transition-transform group-hover:scale-105",
        {
          "w-8 h-8": size === "sm",
          "w-12 h-12": size === "md",
          "w-16 h-16": size === "lg",
          "w-24 h-24": size === "xl",
        },
        isSiteAdmin && "ring-2 ring-red-500",
        isSteamderAdmin && "ring-2 ring-indigo-500"
      )}
    />
    {isSiteAdmin && (
      <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1">
        <Crown size={16} />
      </div>
    )}
  </div>
);
