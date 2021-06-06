import React from "react"
import Button from "../components/Button"
import defaultTheme, { THEME_NAMES, ThemeProvider } from "../theme"
import styled from "styled-components"

export default {
  id: "themes",
  title: "themes",
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

const Wrapper = styled.div`
  margin: 0.5rem;
`
/* eslint-disable-next-line react/prop-types */
const Gallery = ({ theme: themeId }) => {
  return (
    <ThemeProvider theme={themeId}>
      <Container>
        <h3>{themeId || "default theme"}</h3>
        <Row>
          {defaultTheme.variants.keys.map((variant) => {
            return (
              <Wrapper key={variant}>
                <Button variant={variant}>{variant}</Button>
              </Wrapper>
            )
          })}
        </Row>
      </Container>
    </ThemeProvider>
  )
}

export const ThemedGallery = Gallery.bind({})
