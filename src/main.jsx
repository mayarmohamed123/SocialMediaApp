// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { HeroUIProvider } from "@heroui/react";
import AuthContextProvider from "./Contexts/AuthContext.jsx";
import { ToastProvider } from "@heroui/toast";

createRoot(document.getElementById("root")).render(
  <HeroUIProvider>
    <ToastProvider />
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </HeroUIProvider>
);
