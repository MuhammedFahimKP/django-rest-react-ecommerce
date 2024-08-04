import React, { type ReactNode, useState, createContext } from "react";

const ToastContext = createContext<{
  anotherToast: boolean;
  addAnotherToast: () => void;
  removeAnotherToast: () => void;
} | null>(null);

interface ProviderProps {
  children: ReactNode;
}

const ToastContextProvider: React.FC<ProviderProps> = ({
  children,
}: ProviderProps) => {
  const [anotherToast, setAnotherToast] = useState(false);

  const addAnotherToast = () => anotherToast === false && setAnotherToast(true);
  const removeAnotherToast = () =>
    anotherToast === true && setAnotherToast(false);

  return (
    <ToastContext.Provider
      value={{ anotherToast, addAnotherToast, removeAnotherToast }}
    >
      {children}
    </ToastContext.Provider>
  );
};

export { ToastContext, ToastContextProvider };
