import React from "react"
import Button from "../components/Button"

import defaultTheme, { THEME_NAMES, ThemeProvider } from "../theme"

export default {
  id: "button",
  title: "components/cutie button",
  component: Button,
  argTypes: {
    onClick: {
      action: "onClick engaged!",
    },
    children: {
      control: "text",
    },
    themeId: {
      control: {
        type: "select",
        options: THEME_NAMES,
      },
    },
    variant: {
      control: {
        type: "select",
        options: defaultTheme.variantKeys,
      },
    },
  },
}

/* eslint-disable-next-line react/prop-types */
const Template = ({ children, themeId, ...args }) => {
  return (
    <ThemeProvider theme={themeId}>
      <Button onClick={() => {}} {...args}>
        {children}
      </Button>
    </ThemeProvider>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  variant: "primary",
  children: "Make it so",
}
