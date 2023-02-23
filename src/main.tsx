import React from "react";
import ReactDOM from "react-dom/client";
import Button from "@mui/joy/Button";
import { CssVarsProvider } from "@mui/joy/styles";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <CssVarsProvider>
      <Button variant="solid">Hello World</Button>
      <Button>Button</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </CssVarsProvider>
  </React.StrictMode>
);
