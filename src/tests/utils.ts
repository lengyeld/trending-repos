import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import MockedProviders from "./mocks/MockedProviders";

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
  render(ui, { wrapper: MockedProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
