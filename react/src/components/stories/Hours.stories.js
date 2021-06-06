import React from "react"
import HowMany from "../HowMany"

export default {
  title: "time/hours",
  component: HowMany,
  argTypes: {
    showUnit: {
      control: "boolean",
      defaultValue: true,
    },
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

function getHoursSince9AM(d) {
  var e = new Date(d)
  return e.setHours(9, 0, 0, 0)
}

export const Hours = Template.bind({})
Hours.args = {
  prefix: "I've been working for",
  hours: getHoursSince9AM(new Date()),
  postfix: "today",
}
