import React, { useContext } from "react";
import { Button } from "@heroui/react";
import { authContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProfileSettings({ onChangePhoto, onChangePassword }) {
  const { setIsLoggedIn } = useContext(authContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <div className="card-cute w-60 p-4 space-y-4 animate-float">
      <h2 className="text-lg font-semibold mb-4">⚙️ Settings</h2>

      <Button
        className="w-full"
        color="secondary"
        variant="flat"
        onPress={onChangePhoto}>
        Change Photo
      </Button>

      <Button
        className="w-full"
        color="primary"
        variant="flat"
        onPress={onChangePassword}>
        Change Password
      </Button>

      <Button className="w-full" color="danger" variant="flat" onPress={logout}>
        Log Out
      </Button>
    </div>
  );
}
