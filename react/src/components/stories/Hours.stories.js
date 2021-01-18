import React from "react"
import HowMany from "../HowMany"

export default {
  title: "Components/HowMany/Hours",
  component: HowMany,
  argTypes: {
    hours: {
      control: "date",
    },
    seconds: { control: null },
    years: { control: null },
    days: { control: null },
    weeks: { control: null },
  },
}

/* eslint-disable-next-line react/prop-types */
const Template = ({ hours, ...args }) => (
  <HowMany hours={new Date(hours).toString()} {...args} />
)

export const HoursSince = Template.bind({})
HoursSince.args = {
  hours: new Date() - 1000 * 60 * 60 * 3.5,
  prefix: "it's been",
  postfix: "since I clocked out",
}
