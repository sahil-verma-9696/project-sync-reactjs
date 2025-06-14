import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Error from "./components/utility/Error.jsx";
import Overview from "./pages/overview/Page.jsx";
import Completed from "./pages/Completed.jsx";
import Setting from "./pages/Setting.jsx";
import { LocalStorageProvider } from "./context/LocalStorage.jsx";
import { ToasterProvider } from "./context/Toaster.jsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App   />,
      children: [
        {
          index: true,
          element: <Overview />,
        },
        {
          path: "overview",
          element: <Overview />,
        },
        {
          path: "tasks",
          lazy: async function lazyLoadMyTasks() {
            const [{ default: Component }, { default: loader }] =
              await Promise.all([
                import("./pages/mytasks/Page.jsx"),
                import("./loader/MyTasksLoader.jsx"),
              ]);
            return { Component, loader };
          },
        },
        {
          path: "completed",
          element: <Completed />,
        },
        {
          path: "settings",
          element: <Setting />,
        },
      ],
      errorElement: <Error />,
    },
  ],
  {
    // 👇 This is crucial for hydration support with lazy routes
    hydrateFallbackElement: (
      <div className="text-center mt-10 text-gray-500">Loading...</div>
    ),
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalStorageProvider>
      <ToasterProvider>
        <Suspense
          fallback={<div className="text-center mt-10">Loading app...</div>}
        >
          <RouterProvider router={router} />
        </Suspense>
      </ToasterProvider>
    </LocalStorageProvider>
  </StrictMode>
);
