import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainApp from "./routes/App";
import Test from "./routes/Test";

function createAppRouter() {
  return createBrowserRouter([
    {
      index: true,
      Component: MainApp,
    },
    {
      path: "/test",
      Component: Test,
    },
  ]);
}

export const AppRouter = () => {
  const router = createAppRouter();

  return <RouterProvider router={router} />;
};
