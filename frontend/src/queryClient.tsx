import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    
    defaultOptions: {
    
        queries: {
            refetchOnWindowFocus: false,
            keepPreviousData: true,
            retry: 1,
        },
    },
});
