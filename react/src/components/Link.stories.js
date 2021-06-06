import React from "react"
import styled from "styled-components"
import Link from "../components/Link"
import { THEME_NAMES, ThemeProvider } from "../theme"

export default {
  id: "link",
  title: "shiny link",
  component: Link,
  argTypes: {
    children: {
      control: "text",
    },
    themeId: {
      control: {
        type: "select",
        options: THEME_NAMES
      }
    },
  },
}


const BG = styled.div`
  background: ${({ theme }) => theme.colors.main};
  padding: 20px;
`

/* eslint-disable-next-line react/prop-types */
const Template = ({ children, themeId }) => {
  return (
    <ThemeProvider theme={themeId}>
      <BG>
        <Link href="javascript:;" /*onClick={function () {}} {...args}*/>
          {children}
        </Link>
      </BG>
    </ThemeProvider>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  children: "where no man has gone before",
}
