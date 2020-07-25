import { AppProps } from "next/app";
import "../mvp.css";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default App;
