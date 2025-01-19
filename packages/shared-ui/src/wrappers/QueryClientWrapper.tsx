import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type QueryClientWrapperProps = {
    children: React.ReactNode;
    queryClient: QueryClient;
};

export const QueryClientWrapper: React.FC<QueryClientWrapperProps> = ({ children, queryClient }) => {
    return (
        <QueryClientProvider client={queryClient}>
            { children }
        </QueryClientProvider>
    )
};