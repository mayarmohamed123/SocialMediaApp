import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthLayout from "./Layouts/AuthLayout";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import MainLayout from "./Layouts/MainLayout";
import FeedPage from "./Pages/FeedPage";
import PostDetailsPage from "./Pages/PostDetailsPage";
import ProfilePage from "./Pages/ProfilePage";
import NotFoundPage from "./Pages/NotFoundPage";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";
import ProtectedAuthRoute from "./ProtectedRoutes/ProtectedAuthRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ForgetPasswordPage from "./Pages/ChangePasswordPage";
import CreatePage from "./Pages/CreatePage";
import ChangePasswordPage from "./Pages/ChangePasswordPage";
import ChangePhotoPage from "./Pages/ChangePhotoPage";

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <ProtectedAuthRoute>
            <LoginPage />
          </ProtectedAuthRoute>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectedAuthRoute>
            <RegisterPage />
          </ProtectedAuthRoute>
        ),
      },
    ],
  },
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoutes>
            <FeedPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "post-details/:id",
        element: (
          <ProtectedRoutes>
            <PostDetailsPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoutes>
            <ProfilePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "create-post",
        element: (
          <ProtectedRoutes>
            <CreatePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "change-password",
        element: (
          <ProtectedRoutes>
            <ChangePasswordPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "change-photo",
        element: (
          <ProtectedRoutes>
            <ChangePhotoPage />
          </ProtectedRoutes>
        ),
      },

      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

export default App;
