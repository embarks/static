import React from "react"
import Button from "../components/Button"
import defaultTheme, { THEME_NAMES, ThemeProvider } from "../theme"
import styled from "styled-components"
import CuteLink from "../components/Link"
import TimeSpan from "../components/TimeSpan"
import useInterval from "../hooks/useInterval"

export default {
  id: "themes",
  title: "themes/Gallery",
  component: Gallery,
  argTypes: {
    theme: {
      control: {
        type: "select",
        options: THEME_NAMES,
      },
    },
  },
}

const Container = styled.div`
  height: 100%;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.text};
  padding: 1rem;
  background: ${({ theme }) => theme.colors.main};
`

const Wrapper = styled.div`
  display: inline-block;
  margin: 0 0.5rem 0.5rem 0;
`
/* eslint-disable-next-line react/prop-types */
const Gallery = ({ theme: themeId }) => {
  let [seconds, setSeconds] = React.useState(new Date())

  useInterval(() => {
    setSeconds(new Date(seconds))
  }, 1000)
  return (
    <ThemeProvider theme={themeId}>
      <Container>
        {defaultTheme.variantKeys.map((variant) => {
          return (
            <Wrapper key={variant}>
              <Button variant={variant}>{variant}</Button>
            </Wrapper>
          )
        })}
        <br />
        <p>
          {`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation `}
          <CuteLink href="#">
            {`ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
          </CuteLink>
          {` Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.`}
        </p>
        <br />
        <TimeSpan seconds={seconds} />
      </Container>
    </ThemeProvider>
  )
}

export const ThemedGallery = Gallery.bind({})
