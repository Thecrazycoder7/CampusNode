import { create } from "zustand";
import {toast} from "react-toastify";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/auth/check`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) throw new Error("Not authenticated");

      const data = await res.json();
      set({ authUser: data });
      get().connectSocket();
    } catch (error) {
      console.log("Error in checkAuth:", error.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await fetch(`${BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message);
      }

      const result = await res.json();
      set({ authUser: result });
      toast.success("Account created successfully");
      get().connectSocket();
      return {success: true};
    } catch (error) {
      toast.error(error.message || "Signup failed");
      return { success: false };
    } finally {
      set({ isSigningUp: false });

    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message);
      }

      const result = await res.json();
      localStorage.setItem("token", result.token);
      set({ authUser: result.user });
      toast.success("Logged in successfully");
      get().connectSocket();
      return { success: true };
    } catch (error) {
      toast.error(error.message || "Login failed");
      return { success: false };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message);
      }

      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await fetch(`${BASE_URL}/auth/update-profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message);
      }

      const result = await res.json();
      set({ authUser: result });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.message || "Update failed");
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  setAuthUser: (user) => set({ authUser: user }),

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: { userId: authUser._id },
    });

    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
