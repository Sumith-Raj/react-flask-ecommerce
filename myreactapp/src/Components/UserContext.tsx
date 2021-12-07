import { createContext } from "react";

export const UserContext = createContext<{ user: undefined; setuser: any } | any>(undefined);