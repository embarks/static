import React from "react"
import Button from "../Button"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import theme from "../theme"
import { variantKeys } from "../theme"

export default {
  title: "Title/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const SBBG = createGlobalStyle`
  body {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.black};
  }
`

const Template = (args) => (
  <ThemeProvider theme={theme}>
    <SBBG />
    <Button {...args} />
  </ThemeProvider>
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: "Button",
  variant: "primary",
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: "Button",
  variant: "secondary",
}
