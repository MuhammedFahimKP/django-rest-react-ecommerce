import { ReactNode, createContext, useState } from "react";

const DataAddedContext = createContext<{
  dataAdded: boolean;

  mutate: () => void;
} | null>(null);

const DataAddedContexProvider = ({ children }: { children: ReactNode }) => {
  const [_dataAdded, setDataAdded] = useState(false);

  return (
    <DataAddedContext.Provider
      value={{
        dataAdded: _dataAdded,
        mutate: () => setDataAdded(!_dataAdded),
      }}
    >
      {children}
    </DataAddedContext.Provider>
  );
};

export { DataAddedContexProvider, DataAddedContext };
