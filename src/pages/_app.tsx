import { AppProps } from "next/app";
import "firebase/auth";
import "../mvp.css";
import { useState, createContext, Dispatch, SetStateAction } from "react";

export const AuthContext = createContext<{
  uid: string | null;
  setUid: Dispatch<SetStateAction<string>>;
}>(null);

const App = ({ Component, pageProps }: AppProps) => {
  const [uid, setUid] = useState<string | null>(null);
  return (
    <AuthContext.Provider value={{ uid, setUid }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
};

export default App;
