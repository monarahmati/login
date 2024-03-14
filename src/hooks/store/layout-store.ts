import { create } from "zustand";

interface LayoutState {
  normalize: boolean;
  toggleNormalize: () => void;
  pageTitle: null | string;
  changePageTitle: (item: string | null) => void;
  activeSidenavIndex: string[];
  openSidenav: (item: string) => void;
}

const useLayoutStore = create<LayoutState>((set) => ({
  normalize: false,
  pageTitle: null,
  changePageTitle: (data) => {
    set(() => ({ pageTitle: data }));
  },
  toggleNormalize: () => {
    set((state) => ({ normalize: !state.normalize }));
  },

  activeSidenavIndex: [],

  openSidenav: (item: string) => {
    set((state) => {
      const index = state.activeSidenavIndex.indexOf(item);
      if (index >= 0) {
        let copied = [...state.activeSidenavIndex];
        copied.splice(index, 1);

        return {
          ...state,
          activeSidenavIndex: copied,
        };
      } else {
        return {
          ...state,
          activeSidenavIndex: [...state.activeSidenavIndex, item],
        };
      }
    });
  },
}));

export default useLayoutStore;
