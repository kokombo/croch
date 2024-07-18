import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { LoginForm, SignupForm } from "@/components";
import { Provider } from "react-redux";
import configureStore, { type MockStoreEnhanced } from "redux-mock-store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("Login form", () => {
  const mockStore = configureStore();
  const store = mockStore();

  it("renders a heading", () => {
    render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    const subheading = screen.getByRole("heading", { level: 6 });

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });
});

let queryClient: QueryClient;
let store: MockStoreEnhanced<unknown>;

describe("Signup form", () => {
  beforeEach(() => {
    queryClient = new QueryClient();
  });

  const mockStore = configureStore();
  store = mockStore();

  it("renders a heading", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <SignupForm step={1} setStep={jest.fn()} />
        </QueryClientProvider>
      </Provider>
    );

    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
  });
});
