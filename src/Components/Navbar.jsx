import React, { useContext, useState } from "react";
import {
  Navbar as NavbarHeroUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@heroui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Contexts/AuthContext";
import { Home, LogOutIcon, PlusCircle, UserIcon, Menu } from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(authContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  }

  return (
    <NavbarHeroUI className="sticky top-0 z-50 card-cute backdrop-blur-xl bg-card/80">
      {/* Brand */}
      <NavbarBrand>
        <NavLink to="/" className="flex items-center space-x-3 group">
          <div className="text-3xl animate-bounce-soft">🤳</div>
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
            SocialSphere
          </h1>
        </NavLink>
      </NavbarBrand>

      {/* Center Links (Hidden on small screens) */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-primary text-[hsl(var(--primary-foreground))] shadow-soft"
                  : "hover:bg-muted/50 text-[hsl(var(--muted-foreground))] hover:text-foreground"
              }`
            }>
            <Home size={20} />
            <span>Home</span>
          </NavLink>
        </NavbarItem>

        <NavbarItem>
          <NavLink
            to="/create-post"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-primary text-[hsl(var(--primary-foreground))] shadow-soft"
                  : "hover:bg-muted/50 text-[hsl(var(--muted-foreground))] hover:text-foreground"
              }`
            }>
            <PlusCircle size={20} />
            <span>Create</span>
          </NavLink>
        </NavbarItem>

        <NavbarItem>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-gradient-primary text-[hsl(var(--primary-foreground))] shadow-soft"
                  : "hover:bg-muted/50 text-[hsl(var(--muted-foreground))] hover:text-foreground"
              }`
            }>
            <UserIcon size={20} />
            <span>Profile</span>
          </NavLink>
        </NavbarItem>
      </NavbarContent>

      {/* Mobile Menu Icon */}
      <div className="flex sm:hidden items-center">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="p-2 rounded-md hover:bg-muted/50 transition">
          <Menu size={24} />
        </button>
      </div>

      {/* Right Section */}
      <NavbarContent justify="end" className="hidden sm:flex">
        {isLoggedIn ? (
          <NavbarItem>
            <Button
              onPress={logout}
              className="btn-cute flex items-center gap-2 rounded-2xl shadow-glow hover:scale-105 active:scale-95 transition-transform duration-300 ease-out animate-pulse-glow">
              <LogOutIcon size={18} className="text-white" />
              <span className="text-white font-semibold">Log Out</span>
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden lg:flex">
              <NavLink to="/login">
                <Button color="default" variant="flat">
                  Log In
                </Button>
              </NavLink>
            </NavbarItem>
            <NavbarItem>
              <NavLink to="/register">
                <Button color="primary" variant="flat">
                  Sign Up
                </Button>
              </NavLink>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="absolute bg-[hsl(var(--background))] top-full left-0 w-full bg-card/90  rounded-2xl backdrop-blur-md shadow-lg sm:hidden z-40">
          <div className="flex flex-col p-4 space-y-2">
            <NavLink
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-md">
              <Home size={20} />
              <span>Home</span>
            </NavLink>
            <NavLink
              to="/create-post"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-md">
              <PlusCircle size={20} />
              <span>Create</span>
            </NavLink>
            <NavLink
              to="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-md">
              <UserIcon size={20} />
              <span>Profile</span>
            </NavLink>
            {isLoggedIn && (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 p-2 hover:bg-muted/50 rounded-md text-left">
                <LogOutIcon size={20} />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </div>
      )}
    </NavbarHeroUI>
  );
}
