import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/provider";

import theme from "../theme";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default App;
