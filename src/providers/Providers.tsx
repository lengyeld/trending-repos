import { QueryClient, QueryClientConfig, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { FavoritesProvider } from "./FavoritesProvider";

interface Props extends PropsWithChildren {
  queryConfig?: QueryClientConfig
}

export default function Providers({ children, queryConfig }: Props) {
  return (
    <QueryClientProvider client={new QueryClient(queryConfig)}>
      <FavoritesProvider>{children}</FavoritesProvider>
    </QueryClientProvider>
  );
}
