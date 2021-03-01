import "../styles.css";
import { GeistProvider, CssBaseline } from "@geist-ui/react";

const App = ({ Component, pageProps }) => {
  return (
    <GeistProvider themeType="dark">
      <CssBaseline />
      <Component {...pageProps} />
    </GeistProvider>
  );
};

export default App;
