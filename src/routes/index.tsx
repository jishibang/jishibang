import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Nearby from "../pages/Nearby";
import WorkerDetail from "../pages/WorkerDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/nearby",
        element: <Nearby />,
      },
      {
        path: "/worker/:id",
        element: <WorkerDetail />,
      },
    ],
  },
]);

export default router;