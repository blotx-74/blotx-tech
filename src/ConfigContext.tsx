import { createContext, useContext } from 'react';
export const ConfigContext = createContext<any>(null);
export const useConfig = () => useContext(ConfigContext);
