import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { lighten, darken, transparentize } from "polished"

const activeStyles = `
  box-shadow: none;
  outline: 0;
`
const Button = styled.button`
  display: inline-block;
  margin-top: 0 !important;
  padding: 0;
  min-width: ${({ small }) => (small ? "32px" : "45px")};
  border-width: 1px;
  border-radius: 4px;
  padding-bottom: ${({ small }) => (small ? "1px" : "2px")};
  border-style: solid;
  box-shadow: none;
  cursor: pointer;
  font-size: ${({ theme, small }) =>
    small ? theme.fonts.sizes[0] : theme.fonts.sizes[1]};
  font-family: "AnonymousPro";
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  background-color: ${({ theme, variant }) => theme[variant].fg};
  border-color: ${({ theme, variant }) => theme[variant].bg};
  transition: all 0.15s cubic-bezier(0.25, 1, 0.5, 1);

  &:hover {
    border-color: ${({ theme, variant }) => lighten(0.05, theme[variant].bg)};
  }
  &:not(:disabled):not(.disabled):active {
      margin-top: ${({ small }) => (small ? "1px" : "2px")} !important;
      padding-bottom: 0px;
      background-color: ${({ theme, variant }) => theme[variant].fg};
      border-color: ${({ theme, variant }) => theme[variant].bg};
    }
  &:active,
  &.active {
    ${activeStyles}
  }
  &:focus {
    box-shadow: inset 0 1px 0
        ${({ theme, variant }) => transparentize(0.85, theme[variant].bg)},
      0 1px 1px
        ${({ theme, variant }) => transparentize(0.75, theme[variant].bg)},
      0 0 0 0.2rem
        ${({ theme, variant }) => transparentize(0.65, theme[variant].bg)};
    outline: 0;
  }
  & > span {
    display: block;
    height: 100%;
    box-sizing: inherit;
    overflow: hidden;
    width: 100%;
    margin: 0;
    padding: ${({ small }) => (small ? "4px" : "8px")};
    background-color: ${({ theme, variant }) => theme[variant].bg};
    border: 1px solid ${({ theme, variant }) => theme[variant].fg};
    color: ${({ theme, variant }) => theme[variant].text};
  }
  &:hover:not(:disabled):not(.disabled) > span {
    background-color: ${({ theme, variant }) =>
      lighten(0.05, theme[variant].bg)};
  }
  &:not(:disabled):not(.disabled):active > span {
    background-color: ${({ theme, variant }) =>
      darken(0.05, theme[variant].bg)};
  }
`

export const CuteButton = (props) => {
  const { children, variant = "primary", ...rest } = props
  const defaultText = "Make it so"
  const myChildren = typeof children === "undefined" ? defaultText : children

  return (
    <Button
      variant={variant}
      disabled={variant === "disabled"}
      {...rest}
    >
      <span>{myChildren}</span>
    </Button>
  )
}

CuteButton.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
export default CuteButton
