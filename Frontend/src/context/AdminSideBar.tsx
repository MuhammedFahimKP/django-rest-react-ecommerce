import { ReactNode, createContext, useState } from "react";

const AdminSideBarContext = createContext<{
  isMobileOpen: boolean;
  handleOpen: () => void;
} | null>(null);

const AdminSideBarContexProvider = ({ children }: { children: ReactNode }) => {
  const [showSide, setShowSideBar] = useState(false);

  return (
    <AdminSideBarContext.Provider
      value={{
        isMobileOpen: showSide,
        handleOpen: () => setShowSideBar(!showSide),
      }}
    >
      {children}
    </AdminSideBarContext.Provider>
  );
};

export { AdminSideBarContexProvider, AdminSideBarContext };
