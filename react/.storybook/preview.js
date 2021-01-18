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
        <ThemeProvider themeName="spacedust">
          <DocsContainer context={context}>{children}</DocsContainer>
        </ThemeProvider>
      )
    },
  },
  // themes: [
  //   {
  //     name: "spacedust",
  //     class: "theme-spacedust",
  //     color: "#00aced",
  //     default: true,
  //   },
  //   { name: "manpage", class: "theme-manpage", color: "#3b5998" },
  // ],
}

export const decorators = [
  (Story) => {
    return (
      <ThemeProvider themeName="spacedust">
        <Story />
      </ThemeProvider>
    )
  },
]
