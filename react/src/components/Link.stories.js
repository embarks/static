import React from "react"
import styled from "styled-components"
import Link from "../components/Link"
import { THEME_NAMES, ThemeProvider } from "../theme"

export default {
  id: "link",
  title: "components/shiny link",
  component: Link,
  argTypes: {
    children: {
      control: "text",
    },
    href: {
      control: "text",
    },
    themeId: {
      control: {
        type: "select",
        options: THEME_NAMES,
      },
    },
  },
}

const BG = styled.div`
  ${({ theme }) => theme.fonts.presets.default}
  background: ${({ theme }) => theme.colors.main};
  color: ${({ theme }) => theme.colors.text};
  padding: 20px;
`

/* eslint-disable react/prop-types */
const Template = ({ children, href, themeId = "manpage" }) => {
  return (
    <ThemeProvider theme={themeId}>
      <BG>
        {`You can click here to go `}
        <Link
          target="_blank"
          href={href} /*onClick={function () {}} {...args}*/
        >
          {children}
        </Link>
      </BG>
    </ThemeProvider>
  )
}

export const Primary = Template.bind({})
Primary.args = {
  children: "where no man has gone before",
  href: "https://google.com?q=how+to+go+to+space",
}
