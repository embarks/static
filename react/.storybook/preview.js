import React from "react"
import { DocsContainer } from "@storybook/addon-docs/blocks"
import { ThemeProvider } from "../src/theme"
import { FontOverrides } from "../src/theme/typography"

import { theme as sbTheme } from "./manager"
import { createGlobalStyle } from "styled-components"

const StorybookDocsGlobals = createGlobalStyle`
  div.sbdocs.sbdocs-preview {
    border-style: ridge;
  }
`

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
      <StorybookDocsGlobals />
      <FontOverrides />
      <Story />
    </ThemeProvider>
  ),
]
