import React, { useState } from "react"
import Button from "../components/Button"
import defaultTheme, { useTheme, THEME_NAMES } from "../theme"
import styled from "styled-components"

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

const Container = styled.div`
  border-radius: 2px;
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  background: ${({ theme }) => theme.colors.main};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Row = styled.div`
  max-width: 24rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

const WrapButton = styled.div`
  margin: 0.5rem;
`
const Gallery = () => {
  // use array index to loop through different themes
  const [themeId, setThemeId] = useState(7)

  // My buttons use ThemeContext
  // This hook can change the theme
  useTheme(THEME_NAMES[themeId])

  // Curry the function with the direction
  // so to reuse the setThemeId functionality
  const onClick = (direction) => () => {
    setThemeId((themeId) => {
      let nextState =
        direction === "right" ? (themeId + 1) % THEME_NAMES.length : themeId - 1
      if (nextState < 0) {
        nextState = THEME_NAMES.length - 1
      }
      return nextState
    })
  }

  return (
    <Container>
      <h3>{THEME_NAMES[themeId] || "default theme"}</h3>
      <Row>
        {defaultTheme.variants.keys.map((variant) => {
          return (
            <WrapButton key={variant}>
              <Button variant={variant}>{variant}</Button>
            </WrapButton>
          )
        })}
      </Row>
      <Row
        css={`
          margin: 0.5rem;
          & > button {
            margin: 0.5rem;
          }
        `}
      >
        <Button onClick={onClick("left")}>👈</Button>
        <Button onClick={onClick("right")}>👉</Button>
      </Row>
    </Container>
  )
}

export const ThemedGallery = Gallery.bind({})
