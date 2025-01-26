import { useState } from "react";
import { User } from "lucide-react";

export const AvatarPreview = ({ hash }: { hash: string }) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="w-32 h-32 rounded-full bg-gray-800 flex items-center justify-center">
        <User className="w-12 h-12 text-gray-600" />
      </div>
    );
  }

  return (
    <img
      src={`https://avatars.akamai.steamstatic.com/${hash}_full.jpg`}
      className="w-32 h-32 rounded-full"
      onError={() => setError(true)}
    />
  );
};
