import { createContext, Dispatch, SetStateAction, useState } from "react";

type User = {
  username: string;
  password: string;
};

interface UserContextData {
  userKiwify: User | null;
  setUserKiwify: Dispatch<SetStateAction<User | null>>;
}

export const UserKiwifyContext = createContext({} as UserContextData);

interface UserContextProps {
  children: React.ReactNode;
}

export function UserKiwifyContextProvider({ children }: UserContextProps) {
  const [userKiwify, setUserKiwify] = useState<User | null>(null);

  return (
    <UserKiwifyContext.Provider value={{ userKiwify, setUserKiwify }}>
      {children}
    </UserKiwifyContext.Provider>
  );
}
