import { RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { cn } from "@core/utils";
import { SteamIcon } from "@ui/atoms/Icons/SteamIcon";

export const SyncButton = ({
  onSync,
  isLoading,
  status = 'idle'
}: {
  onSync: () => void;
  isLoading: boolean;
  status?: 'idle' | 'loading' | 'success' | 'error';
}) => {
  // Déterminer les styles en fonction du statut
  const buttonStyles = cn(
    "w-full h-12",
    "border rounded",
    "text-gray-200 font-medium",
    "flex items-center justify-center gap-2",
    "transition-all duration-300",
    "group",
    {
      // État par défaut
      "bg-gradient-to-r from-[#1b2838] to-[#2a475e] hover:from-[#2a475e] hover:to-[#1b2838] border-[#2a475e]": 
        status === 'idle',
      
      // État de chargement
      "bg-gradient-to-r from-[#1b2838] to-[#2a475e] border-[#66c0f4] border-opacity-60 animate-pulse": 
        status === 'loading',
      
      // État de succès
      "bg-gradient-to-r from-green-800 to-green-700 border-green-600": 
        status === 'success',
      
      // État d'erreur
      "bg-gradient-to-r from-red-800 to-red-700 border-red-600": 
        status === 'error',
    }
  );

  return (
    <button
      onClick={onSync}
      disabled={isLoading || status === 'loading' || status === 'success'}
      className={buttonStyles}
    >
      <div className="relative flex items-center justify-center w-6 h-6">
        {status === 'idle' && (
          <>
            <SteamIcon className="w-6 h-6 group-hover:opacity-0 transition-opacity" />
            <RefreshCw className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity absolute inset-0" />
          </>
        )}
        
        {status === 'loading' && (
          <RefreshCw className="w-6 h-6 animate-spin" />
        )}
        
        {status === 'success' && (
          <CheckCircle className="w-6 h-6 text-green-300" />
        )}
        
        {status === 'error' && (
          <AlertCircle className="w-6 h-6 text-red-300" />
        )}
      </div>
      
      <span>
        {status === 'idle' && "Synchroniser le compte Steam"}
        {status === 'loading' && "Synchronisation en cours..."}
        {status === 'success' && "Synchronisation réussie!"}
        {status === 'error' && "Échec de la synchronisation"}
      </span>
      
      {status === 'loading' && (
        <div className="absolute bottom-0 left-0 h-1 bg-[#66c0f4] animate-progress" style={{
          width: '100%',
          transformOrigin: 'left',
          animation: 'progressAnimation 2s ease-in-out infinite'
        }} />
      )}
    </button>
  );
};