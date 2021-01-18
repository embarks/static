import React, { useState } from "react"
import Button from "../components/Button"
import defaultTheme, { useTheme, THEME_NAMES } from "../theme"
// import { useMutationObserver } from "../components/useMutationObserver"

// const ADDON_THEME_CLASSLIST_PREFIX = "theme-"

export default {
  id: "button",
  title: "Components/Button",
  component: Button,
  argTypes: {
    onClick: {
      action: "onClick engaged!",
    },
    children: {
      control: "text",
    },
    theme: {
      control: null,
    },
    variant: {
      control: {
        type: "select",
        options: defaultTheme.variants.keys,
      },
    },
  },
}

/* eslint-disable-next-line react/prop-types */
const Template = ({ children, ...args }) => {
  // const bodyRef = React.useRef(document.body)
  // const [theme, setTheme] = useState("spacedust")

  // const setAddonTheme = () => {
  //   let found
  //   const mutatedTheme = document.body.classList.value
  //     .split(" ")
  //     .find((key) => {
  //       found = key.startsWith(ADDON_THEME_CLASSLIST_PREFIX)
  //       if (found) return true
  //     })
  //     .slice(ADDON_THEME_CLASSLIST_PREFIX.length, found.length)

  //   if (mutatedTheme !== theme) {
  //     setTheme(mutatedTheme)
  //   }
  // }

  // useMutationObserver(bodyRef, setAddonTheme)

  return (
    <Button onClick={function () {}} {...args}>
      {children}
    </Button>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  variant: "primary",
  children: "Make it so",
}

const ThemeTester = () => {
  const [themeId, setThemeId] = useState(7)
  useTheme(THEME_NAMES[themeId])

  const onClick = (direction) => () => {
    let nextState = direction === "right" ? themeId + 1 : themeId - 1
    if (nextState > THEME_NAMES.length - 1) {
      nextState = 0
    } else if (nextState <= 0) {
      nextState = THEME_NAMES.length
    }
    setThemeId(nextState)
  }

  return (
    <>
      <Button onClick={onClick("left")}>👈</Button>
      <div>
        {defaultTheme.variants.keys.map((variant) => {
          return (
            <span key={variant}>
              <Button variant={variant}>
                {THEME_NAMES[themeId]} - {variant}
              </Button>
            </span>
          )
        })}
      </div>
      <Button onClick={onClick("right")}>👉</Button>
    </>
  )
}

export const Test = ThemeTester.bind({})
