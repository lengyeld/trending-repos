import Providers from "@/providers/Providers";
import { PropsWithChildren } from "react";

export default function MockedProviders({ children }: PropsWithChildren) {
  return <Providers queryConfig={{ defaultOptions: { queries: { retry: false } } }}>{children}</Providers>;
}
