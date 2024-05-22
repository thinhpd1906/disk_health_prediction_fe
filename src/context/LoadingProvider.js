import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

const LoadingIndicator = () => {
    const { isLoading } = useLoading();
  
    if (!isLoading) {
      return null;
    }
  
    return (
        <div style= {{position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999}}>
            <span style= {{color: "#fff"}}>Loading...</span>;
        </div>
    )
};

export const LoadingProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
  
    return (
      <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
        <LoadingIndicator />
       {children}
      </LoadingContext.Provider>
    );
};

export const useLoading = () => {
    return useContext(LoadingContext);
};