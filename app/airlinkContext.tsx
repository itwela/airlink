'use client'

import React, { createContext, useState, useContext } from 'react';


interface AirLinkContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
//   photoUrl?: string[];
//   selectedMatch?: string;
//   clearConversation?: number
//   message: Message[];
//   setPhotoUrl?: React.Dispatch<React.SetStateAction<string[]>>;  // Updated type
//   setSelectedMatch?: (value: string) => void;
//   setClearConversation?: (value: number) => void
//   setMessage: React.Dispatch<React.SetStateAction<any>>
}

const AirLinkContext = createContext<AirLinkContextType | null>(null);

export const AirLinkProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [photoUrl, setPhotoUrl] = useState<string[]>([]);
//   const [selectedMatch, setSelectedMatch] = useState<string>('');
//   const [clearConversation, setClearConversation] = useState(0);
//   const [message, setMessage] = useState<Array<any>>([]);

  return (
    <AirLinkContext.Provider value={{
      isMenuOpen,
      setIsMenuOpen,
    }}>
      {children}
    </AirLinkContext.Provider>
  );
};

export const useAirLink = (match?: string): AirLinkContextType => {  // Added return type
  const context = useContext(AirLinkContext);
  if (!context) throw new Error('useAirLink must be used within a AirLinkProvider');
  return context;
};
