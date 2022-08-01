import { createContext, Dispatch, SetStateAction, useState } from "react";

type User = {
  email: string;
  password: string;
};

interface UserContextData {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext({} as UserContextData);

interface UserContextProps {
  children: React.ReactNode;
}

export function UserContextProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
