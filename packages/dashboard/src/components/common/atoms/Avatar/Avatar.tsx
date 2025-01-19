import { cn } from "@core/utils";
import { IAvatarProps } from "./Avatar.props";

export const Avatar = ({ hash, size = "md" }: IAvatarProps) => (
  <img 
    src={`https://avatars.akamai.steamstatic.com/${hash}_full.jpg`}
    className={cn(
      "rounded-full border-2 border-gray-200 dark:border-gray-700",
      {
        "w-8 h-8": size === "sm",
        "w-10 h-10": size === "md",
        "w-12 h-12": size === "lg"
      }
    )}
    alt="Profile"
  />
);