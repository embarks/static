import React from "react"
import HowMany from "../HowMany"

export default {
  title: "Time/Days",
  component: HowMany,
  argTypes: {
    days: {
      control: "date",
    },
    years: { control: null },
    seconds: { control: null },
    weeks: { control: null },
    hours: { control: null },
  },
}

/* eslint-disable-next-line react/prop-types */
const Template = (args) => (
  <HowMany {...args} days={new Date(args.days).toString()} />
)

export const DaysSince = Template.bind({})
DaysSince.args = {
  days: new Date("2016-05-01"),
  prefix: "Only",
  postfix: "since I graduated",
}
