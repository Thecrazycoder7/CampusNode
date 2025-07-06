import { create } from "zustand";
import { toast } from "react-toastify";
import { useAuthStore } from "./useAuthStore";
export const useChatStore = create((set) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  setSelectedUser: (user) => set({ selectedUser: user }),

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const authUser = useAuthStore.getState().authUser; 
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:8000/messages/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      set({ users: data });
    } catch (error) {
      toast.error(error.message || "Error fetching users");
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const authUser = useAuthStore.getState().authUser;
      const response = await fetch(`http://localhost:8000/messages/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser?.token}`, // ✅ auth for messages too
        },
      });

      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      set({ messages: data });
    } catch (error) {
      toast.error(error.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
}));
