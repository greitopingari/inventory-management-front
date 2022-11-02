import React, { useContext, useState} from "react";

const DataContext = React.createContext();

export function useData() {
  return useContext(DataContext);
}

export function DataProvider({children}){
    const [loadingStatus, setLoadingStatus] = useState(false);

    const value = {
        loadingStatus,
        setLoadingStatus
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}