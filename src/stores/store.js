import { create } from 'zustand';
 
const useLayoutStore = create((set) => ({
    isOpen: window.innerWidth > 580,
    toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })), 
    handleResize: () => set(() => ({ isOpen: window.innerWidth > 580 })),
}));

export default useLayoutStore;