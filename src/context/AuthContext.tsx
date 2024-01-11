import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { IUser } from '@/types';
import { getCurrentUser } from "@/lib/appwrite/api";


export const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
};

type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);


// Define the AuthProvider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State variables
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if the user is authenticated
  const checkAuthUser = async () => {
    setIsLoading(true);
    try {
      // Get the current user from the server
      const currentAccount = await getCurrentUser();
      // If the user is authenticated, set the user state and setIsAuthenticated to true
      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          username: currentAccount.username,
          email: currentAccount.email,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        });
        setIsAuthenticated(true);

        // Return true to indicate that the user is authenticated
        return true;
      }

      // Return false to indicate that the user is not authenticated
      return false;
    } catch (error) {
      // Log any errors
      console.log(error);
      // Return false to indicate that the user is not authenticated
      return false;
    } finally {
      // Set isLoading to false to indicate that the loading state is complete
      setIsLoading(false);
    }
  };

  // Check if the user is authenticated on component mount
  useEffect(() => {
    // Check if the cookieFallback item in localStorage is empty, null, or undefined
    if (
      localStorage.getItem("cookieFallback") === "[]" ||
      localStorage.getItem("cookieFallback") === null ||
      localStorage.getItem("cookieFallback") === undefined
    ) {
      // If it is, redirect the user to the sign-in page
      navigate("/sign-in");
    }

    checkAuthUser();
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);