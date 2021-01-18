import React from "react"
import HowMany from "../HowMany"

export default {
  title: "Components/HowMany/Seconds",
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

export const SecondsSince = Template.bind({})
SecondsSince.args = {
  seconds: new Date() - 1000 * 10,
  prefix: "it's been",
  postfix: "since I lost the game",
}
