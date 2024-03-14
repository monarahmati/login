import { create } from "zustand";

interface UserState {
  id: number | null;
  nowDate: string | null;
  userName: string;
  firstName: string;
  lastName: string;
  bio: string;
  permissions: string | null;
  fetched: boolean;
  chnageUserData: (data: any) => void;
  removeUserData: () => void;
}

const userStore = create<UserState>((set) => ({
  id: null,
  userName: "",
  firstName: "",
  lastName: "",
  nowDate: null,
  bio: "",
  permissions: "",
  fetched: false,
  chnageUserData: (data: any) => set({ ...data, fetched: true }),
  removeUserData: () =>
    set({
      id: null,
      userName: "",
      firstName: "",
      lastName: "",
      bio: "",
      permissions: "",
      nowDate: null,
      fetched: false,
    }),
}));

export default userStore;
