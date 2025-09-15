import { createContext, useEffect, useState } from "react";
import { getUserDataApi } from "../Services/authServices";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") != null
  );
   const [isDark, setIsDark] = useState(
     () => localStorage.getItem("theme") === "dark"
   );

   async function getUserData() {
     const response = await getUserDataApi();
     if (response.message == "success") {
       setUserData(response.user);
     }
   }

   console.log(userData);

   useEffect(() => {
     isLoggedIn ? getUserData() : setUserData(null);
     if (isDark) {
       document.documentElement.classList.add("dark");
       localStorage.setItem("theme", "dark");
     } else {
       document.documentElement.classList.remove("dark");
       localStorage.setItem("theme", "light");
     }
   }, [isLoggedIn, isDark]);

   return (
     <authContext.Provider
       value={{
         isLoggedIn,
         setIsLoggedIn,
         userData,
         setUserData,
         isDark,
         setIsDark,
       }}>
       {children}
     </authContext.Provider>
   );
}
