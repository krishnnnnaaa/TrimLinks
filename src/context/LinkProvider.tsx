'use client'
import React, { createContext, useContext, useState } from 'react';

interface LinksContextType {
  deletionAlarm: boolean;
  setDeletionAlarm: React.Dispatch<React.SetStateAction<boolean>>;
  linkId: string;
  setLinkId: React.Dispatch<React.SetStateAction<string>>;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);



export const LinksProvider = ({ children }: {children:React.ReactNode}) => {
  const [deletionAlarm, setDeletionAlarm] = useState(false);
  const [linkId, setLinkId] = useState('');
  return (
    <LinksContext.Provider value={{ deletionAlarm, setDeletionAlarm, linkId, setLinkId }}>
      {children}
    </LinksContext.Provider>
  );
}
export const useLinks = () => {
  const context = useContext(LinksContext);
  
  if (!context) {
    throw new Error("useLinks must be used within a LinksProvider");

  }
  return context
}