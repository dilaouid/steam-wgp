import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@core/queryClient";

export const QueryClientWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    )
};