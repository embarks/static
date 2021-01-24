import React from "react"
import HowMany from "../HowMany"

export default {
  title: "Time/Seconds",
  component: HowMany,
  argTypes: {
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
  const date = new Date(args.seconds)
  const [seconds, setSeconds] = React.useState(date)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(new Date(seconds))
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return <HowMany {...args} seconds={seconds.toString()} />
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
