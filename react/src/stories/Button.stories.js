import React from 'react'
import Button from './Button'
import { createGlobalStyle } from 'styled-components'

export default {
  title: 'Title/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
}

const SBBG = createGlobalStyle`
  body {
    width: 100%;
    height: 100%;
    background-color: black;
  }
`

const Template = (args) => (
  <>
    <SBBG />
    <Button {...args} />
  </>
)

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: 'Button',
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: 'Button',
}

export const Large = Template.bind({})
Large.args = {
  size: 'large',
  label: 'Button',
}

export const Small = Template.bind({})
Small.args = {
  size: 'small',
  label: 'Button',
}
