import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"

const Link = styled.a`
  ${({ theme }) => css`
    position: relative;
    display: inline-block;
    color: ${theme.colors.cyan};
    border-radius: 2px;
    text-decoration: none;
    text-shadow: 2px blue;
    z-index: 2;

    ${theme.fonts.presets.inline}

    @media (hover: hover) and (pointer: fine) {
      :hover,
      :focus {
        color: ${theme.colors.bold};
      }
    }
  `}
`

const FunSpan = styled.span`
  position: absolute;
  display: block;
  height: 100%;
  width: 100%;
  overflow: hidden;
  height: 2px;

  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  transition-property: transform, width, padding, color, background;
  text-align: center;

  ::after {
    z-index: 1;
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 75%;
    right: 0;
    transform: translate(15%, 1px);
    background-color: ${({ theme }) => theme.colors.cyan};
    border-radius: 2px;
    transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    transition-property: width, background;
  }

  @media (hover: hover) and (pointer: fine) {
    ${Link}:hover &::after,
    ${Link}:focus &::after {
      background-color: ${({ theme }) => theme.colors.bold};
      left: auto;
      right: 0;
      width: 0;
    }
  }
`

export const CuteLink = (props) => {
  const { children, ...rest } = props
  const defaultText = "where no man has gone before"

  const myChildren = typeof children === "undefined" ? defaultText : children

  return (
    <Link {...rest}>
      {myChildren}
      <FunSpan />
    </Link>
  )
}

CuteLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default CuteLink
