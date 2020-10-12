import React from "react"

import Button from "../Button"
import { variants } from "../theme"

export default {
  id: "button",
  title: "Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "clicked",
    },
    children: {
      control: "text",
    },
    variant: {
      control: {
        type: "select",
        options: variants.keys,
      },
    },
  },
}

const Template = ({ children, ...args }) => (
  <Button {...args}>{children}</Button>
)

export const Primary = Template.bind({})
Primary.args = {
  variant: "primary",
  children: "Make it so",
}
