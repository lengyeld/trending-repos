import { expect, afterEach } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";
import { mockedGitHubApi } from "./mocks/githubApi";

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// Establish API mocking before all tests.
beforeAll(() => mockedGitHubApi.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => mockedGitHubApi.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => mockedGitHubApi.close());
