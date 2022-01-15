import React from "react"
import TimeSpan from "../TimeSpan"

export default {
  title: "components/time span/days",
  component: TimeSpan,
  argTypes: {
    showUnit: {
      defaultValue: true,
      control: "boolean",
    },
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
  <TimeSpan {...args} days={new Date(args.days).toString()} />
)

export const Days = Template.bind({})
Days.args = {
  days: new Date("2016-05-01"),
  prefix: "Only",
  postfix: "since I graduated",
}
