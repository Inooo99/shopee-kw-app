// src/context/AuthContext.tsx - VERSI FINAL DAN MENYELURUH

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { User, Address } from "../types";
import { mockUsers } from "../data/mockUsers";

type UserProfileUpdate = Partial<Pick<User, "name" | "phone" | "avatarUrl">>;
type AddressData = Omit<Address, "id" | "isDefault">;
type AddressUpdateData = Partial<AddressData>;

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, pass: string) => Promise<void>;
  updateUserProfile: (updatedData: UserProfileUpdate) => Promise<void>;
  addAddress: (addressData: AddressData) => Promise<void>;
  updateAddress: (
    addressId: string,
    addressData: AddressUpdateData
  ) => Promise<void>;
  deleteAddress: (addressId: string) => Promise<void>;
  setDefaultAddress: (addressId: string) => Promise<void>; // <-- FUNGSI BARU
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USERS_STORAGE_KEY = "app_users";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const usersInStorage = localStorage.getItem(USERS_STORAGE_KEY);
    if (!usersInStorage) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(mockUsers));
    }
  }, []);

  const register = async (name: string, email: string, pass: string) => {
    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_STORAGE_KEY) || "[]"
    );
    const existingUser = users.find((u) => u.email === email);
    if (existingUser) {
      throw new Error("Email already registered.");
    }
    const newUser: User = {
      id: new Date().getTime().toString(),
      name,
      email,
      password: pass,
      addresses: [],
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  const login = async (email: string, pass: string) => {
    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_STORAGE_KEY) || "[]"
    );
    const userToLogin = users.find(
      (u) => u.email === email && u.password === pass
    );
    if (userToLogin) {
      const { password, ...userWithoutPassword } = userToLogin;
      setCurrentUser(userWithoutPassword);
    } else {
      throw new Error("Invalid email or password.");
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserProfile = async (updatedData: UserProfileUpdate) => {
    if (!currentUser) throw new Error("No user logged in.");
    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_STORAGE_KEY) || "[]"
    );
    let userToUpdate: User | undefined;
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        userToUpdate = { ...user, ...updatedData };
        return userToUpdate;
      }
      return user;
    });
    if (userToUpdate) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      const { password, ...userWithoutPassword } = userToUpdate;
      setCurrentUser(userWithoutPassword);
    }
  };

  const addAddress = async (addressData: AddressData) => {
    if (!currentUser) throw new Error("No user logged in.");
    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_STORAGE_KEY) || "[]"
    );
    let userToUpdate: User | undefined;
    const newAddress: Address = {
      id: new Date().getTime().toString(),
      ...addressData,
      isDefault: false,
    };
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        const userAddresses = user.addresses || [];
        if (userAddresses.length === 0) newAddress.isDefault = true;
        userToUpdate = { ...user, addresses: [...userAddresses, newAddress] };
        return userToUpdate;
      }
      return user;
    });
    if (userToUpdate) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      const { password, ...userWithoutPassword } = userToUpdate;
      setCurrentUser(userWithoutPassword);
    }
  };

  const updateAddress = async (
    addressId: string,
    addressData: AddressUpdateData
  ) => {
    if (!currentUser) throw new Error("No user logged in.");
    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_STORAGE_KEY) || "[]"
    );
    let userToUpdate: User | undefined;
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        const updatedAddresses = (user.addresses || []).map((addr) =>
          addr.id === addressId ? { ...addr, ...addressData } : addr
        );
        userToUpdate = { ...user, addresses: updatedAddresses };
        return userToUpdate;
      }
      return user;
    });
    if (userToUpdate) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      const { password, ...userWithoutPassword } = userToUpdate;
      setCurrentUser(userWithoutPassword);
    }
  };

  const deleteAddress = async (addressId: string) => {
    if (!currentUser) throw new Error("No user logged in.");
    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_STORAGE_KEY) || "[]"
    );
    let userToUpdate: User | undefined;
    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        const filteredAddresses = (user.addresses || []).filter(
          (addr) => addr.id !== addressId
        );
        userToUpdate = { ...user, addresses: filteredAddresses };
        return userToUpdate;
      }
      return user;
    });
    if (userToUpdate) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      const { password, ...userWithoutPassword } = userToUpdate;
      setCurrentUser(userWithoutPassword);
    }
  };

  const setDefaultAddress = async (addressId: string) => {
    if (!currentUser) throw new Error("No user logged in.");
    const users: User[] = JSON.parse(
      localStorage.getItem(USERS_STORAGE_KEY) || "[]"
    );
    let userToUpdate: User | undefined;

    const updatedUsers = users.map((user) => {
      if (user.id === currentUser.id) {
        const updatedAddresses = (user.addresses || []).map((addr) => ({
          ...addr,
          isDefault: addr.id === addressId, // Jadikan true jika ID cocok, false jika tidak
        }));
        userToUpdate = { ...user, addresses: updatedAddresses };
        return userToUpdate;
      }
      return user;
    });

    if (userToUpdate) {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
      const { password, ...userWithoutPassword } = userToUpdate;
      setCurrentUser(userWithoutPassword);
    }
  };

  const value = {
    currentUser,
    login,
    logout,
    register,
    updateUserProfile,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
