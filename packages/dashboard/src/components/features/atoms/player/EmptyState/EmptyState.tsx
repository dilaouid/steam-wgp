import { GamepadIcon } from "lucide-react";
import { IEmptyStateProps } from "./EmptyState.props";

export const EmptyState = ({ hasError = false }: IEmptyStateProps) => (
  <div className="aspect-[600/900] bg-gray-900 rounded-lg flex flex-col items-center justify-center gap-2">
    <GamepadIcon
      className={
        hasError ? "h-12 w-12 text-red-700" : "h-12 w-12 text-gray-500"
      }
    />
    <p
      className={`text-sm px-4 text-center ${hasError ? "text-red-400 font-medium" : "text-gray-400"}`}
    >
      {hasError ? "Couverture non disponible" : "Entrez un ID de jeu Steam"}
    </p>
  </div>
);
