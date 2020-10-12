import React from "react"
import { themes } from "@storybook/theming"
import { addParameters } from "@storybook/react"
import { DocsPage, DocsContainer } from "@storybook/addon-docs/blocks"
import { ThemeProvider } from "styled-components"

import theme from "../src/theme"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: "centered",
  docs: {
    theme: themes.dark,
  },
}

addParameters({
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
})

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <Story />
    </ThemeProvider>
  ),
]
