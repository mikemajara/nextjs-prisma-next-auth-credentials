import { extendTheme } from "@chakra-ui/react";
import { colors } from "./colors";
import { components } from "./components";

const theme = extendTheme({
  colors,
  components,
});

export default theme;
