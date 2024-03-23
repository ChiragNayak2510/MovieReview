import { create } from 'zustand';

const currentUserStore = (set) => ({
  currentUser: null,
  setCurrentUser: (user) => {
    set({ currentUser: user });
  },
  removeCurrentUser : (user)=>{
    set({currentUser : null})
  }
});

const useCurrentUserStore = create(currentUserStore);

export default useCurrentUserStore;