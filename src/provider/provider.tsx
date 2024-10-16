import React, { Fragment } from "react";
import { ThemeProvider } from "./theme-provider";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Fragment>
  );
}
