import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MobileFormContextType {
  isMobileFormOpen: boolean;
  setIsMobileFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileFormContext = createContext<MobileFormContextType | undefined>(undefined);

export const MobileFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobileFormOpen, setIsMobileFormOpen] = useState(false);

  return (
    <MobileFormContext.Provider value={{ isMobileFormOpen, setIsMobileFormOpen }}>
      {children}
    </MobileFormContext.Provider>
  );
};

export const useMobileForm = () => {
  const context = useContext(MobileFormContext);
  if (context === undefined) {
    throw new Error('useMobileForm must be used within a MobileFormProvider');
  }
  return context;
};