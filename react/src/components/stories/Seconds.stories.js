import React from "react"
import useInterval from "../../hooks/useInterval"
import { THEME_NAMES, ThemeProvider } from "../../theme"
import TimeSpan from "../TimeSpan"

export default {
  title: "components/time span/seconds",
  component: TimeSpan,
  argTypes: {
    themeId: {
      control: {
        type: "select",
        options: THEME_NAMES,
      },
    },
    showUnit: {
      defaultValue: true,
      control: "boolean",
    },
    seconds: {
      control: "date",
    },
    hours: { control: null },
    years: { control: null },
    days: { control: null },
    weeks: { control: null },
  },
}

function getMsSinceMidnight(d) {
  var e = new Date(d)
  return e.setHours(0, 0, 0, 0)
}

/* eslint-disable-next-line react/prop-types */
const Template = (args) => {
  let [seconds, setSeconds] = React.useState(new Date(args.seconds))

  useInterval(() => {
    setSeconds(new Date(seconds))
  }, 1000)

  return (
    <ThemeProvider theme={args.themeId}>
      <TimeSpan {...args} seconds={seconds.toString()} />
    </ThemeProvider>
  )
}

export const _default = Template.bind({})
_default.args = {
  seconds: new Date(),
  showUnit: true,
}

export const SecondsSinceMidnight = Template.bind({})
SecondsSinceMidnight.args = {
  seconds: getMsSinceMidnight(new Date()),
  postfix: "have passed today",
}

export const SecondsSinceBirth = Template.bind({})
SecondsSinceBirth.args = {
  seconds: new Date("1992-08-04T10:19:00Z"),
  prefix: "I've lived",
}
