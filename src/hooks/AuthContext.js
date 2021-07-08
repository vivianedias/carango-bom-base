import * as React from "react";
import { getUserFromToken } from "../utils/auth";

const AuthContext = React.createContext();

function authReducer(state, action) {
  switch (action.type) {
    case "auth": {
      return action.payload;
    }
    case "logout": {
      return null;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function AuthProvider({ children }) {
  const [state, dispatch] = React.useReducer(authReducer, getUserFromToken());

  const value = { state, dispatch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };