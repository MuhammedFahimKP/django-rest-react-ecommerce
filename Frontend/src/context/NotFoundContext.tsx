import React, { type ReactNode, useState, createContext } from "react";

const NotFoundContext = createContext<{
  notFoundItem: boolean;
  emitError: () => void;
  removeError: () => void;
} | null>(null);

interface ProviderProps {
  children: ReactNode;
}

const NotFoundProvider: React.FC<ProviderProps> = ({
  children,
}: ProviderProps) => {
  const [error, setError] = useState(false);

  const raiseErorr = () => error === false && setError(true);
  const removeError = () => error === true && setError(true);

  return (
    <NotFoundContext.Provider
      value={{ notFoundItem: error, emitError: raiseErorr, removeError }}
    >
      {children}
    </NotFoundContext.Provider>
  );
};

export default NotFoundProvider;
export { NotFoundContext };
