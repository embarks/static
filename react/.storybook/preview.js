import React from "react"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { ThemeProvider } from "../src/theme"

import { theme as sbTheme } from "./manager"

export const parameters = {
  backgrounds: {
    disable: true,
  },
  layout: "centered",
  docs: {
    theme: sbTheme,
    container: ({ children, context }) => {
      return (
        <ThemeProvider>
          <DocsContainer context={context}>{children}</DocsContainer>
        </ThemeProvider>
      )
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  ),
]
