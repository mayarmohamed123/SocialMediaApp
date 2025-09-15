import React, { useContext } from "react";
import { authContext } from "../Contexts/AuthContext";
import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Switch,
} from "@heroui/react";
import { Settings, LogOut, KeyRound, Image, Moon, Sun } from "lucide-react";
import { useNavigate } from "react-router-dom";
import UserPosts from "../Components/UserPosts";

export default function ProfilePage() {
  const { userData, setIsLoggedIn, isDark, setIsDark } =
    useContext(authContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  function handleChangePassword() {
    navigate("/change-password");
  }

  function handleChangePhoto() {
    navigate("/change-photo");
  }

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[hsl(var(--muted-foreground))]">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10 space-y-10">
      {/* User Profile Card */}
      <div className="card-cute max-w-2xl mx-auto relative text-center space-y-6 animate-float p-6">
        {/* Settings Dropdown */}
        <div className="absolute top-4 right-4">
          <Dropdown>
            <DropdownTrigger className="focus:outline-none">
              <Settings
                size={20}
                className="text-[hsl(var(--muted-foreground))] cursor-pointer"
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Settings Menu"
              className="w-60 card-cute border-border/50">
              <DropdownItem
                key="user-info"
                isReadOnly
                className="cursor-default flex flex-col items-start px-3 py-2">
                <p className="font-medium text-[hsl(var(--foreground))]">
                  @{userData.name}
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {userData.email}
                </p>
              </DropdownItem>

              {/* Change Password */}
              <DropdownItem
                key="change-password"
                onClick={handleChangePassword}
                className="flex items-center space-x-2">
                <KeyRound size={16} />
                <span>Change Password</span>
              </DropdownItem>

              {/* Change Profile Photo */}
              <DropdownItem
                key="change-photo"
                onClick={handleChangePhoto}
                className="flex items-center space-x-2">
                <Image size={16} />
                <span>Change Profile Photo</span>
              </DropdownItem>

              {/* 🌙 Dark Mode Toggle */}
              <DropdownItem
                key="dark-mode"
                className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-2">
                  {isDark ? <Moon size={16} /> : <Sun size={16} />}
                  <span>Dark Mode</span>
                </div>
                <Switch
                  size="sm"
                  checked={isDark}
                  onChange={() => setIsDark(!isDark)}
                  className="ml-2"
                />
              </DropdownItem>

              {/* Logout */}
              <DropdownItem
                onClick={logout}
                key="logout"
                className="text-[hsl(var(--destructive))] focus:text-[hsl(var(--destructive))] flex items-center space-x-2">
                <LogOut size={16} />
                <span>Logout</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>

        {/* Profile Avatar */}
        <div className="flex justify-center">
          <Avatar
            src={userData.photo}
            alt={userData.name}
            className="h-24 w-24 ring-4 ring-primary/30 shadow-glow">
            {!userData.photo && (
              <span className="bg-gradient-soft text-[hsl(var(--primary-foreground))] text-xl font-bold">
                {userData.name?.slice(0, 2).toUpperCase()}
              </span>
            )}
          </Avatar>
        </div>

        {/* User Info */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold bg-[hsl(var(--gradient-primary))] bg-clip-text text-transparent">
            {userData.name}
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            @{userData.email}
          </p>
        </div>

        {/* Details */}
        <div className="text-left space-y-3">
          <p>
            <span className="font-semibold">Gender:</span> {userData.gender}
          </p>
          <p>
            <span className="font-semibold">Date of Birth:</span>{" "}
            {new Date(userData.dateOfBirth).toLocaleDateString()}
          </p>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">
            Member since {new Date(userData.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* User Posts Section */}
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-[hsl(var(--foreground))]">
          {userData.name}'s Posts
        </h2>
        <UserPosts /> {/* 🟢 هنا هنجيب البوستات */}
      </div>
    </div>
  );
}
