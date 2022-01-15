import React from "react"
import PropTypes from "prop-types"
import styled, { css } from "styled-components"
import { lighten, darken, transparentize } from "polished"

const Button = styled.button(({ theme, variant: variantKey, small }) => {
  const variant = theme[variantKey]
  return css`
    display: inline-block;
    margin-top: 0 !important;
    padding: 0;
    min-width: ${small ? "32px" : "45px"};
    border-width: 1px;
    border-radius: 4px;
    padding-bottom: ${small ? "1px" : "2px"};
    border-style: solid;
    box-shadow: none;
    cursor: pointer;
    ${theme.fonts.presets.default}
    text-align: center;
    text-decoration: none;
    user-select: none;
    vertical-align: middle;
    white-space: nowrap;
    background-color: ${variant.fg};
    border-color: ${variant.bg};
    transition: all 0.15s cubic-bezier(0.25, 1, 0.5, 1);

    &:hover,
    &:focus {
      border-color: ${lighten(0.05, variant.bg)};
    }
    &:not(:disabled):not(.disabled):active {
      margin-top: ${small ? "1px" : "2px"} !important;
      padding-bottom: 0px;
      background-color: ${variant.fg};
      border-color: ${variant.bg};
    }
    &:active,
    &.active {
      box-shadow: none;
      outline: 0;
    }
    &:focus {
      box-shadow: inset 0 1px 0 ${transparentize(0.85, variant.bg)},
        0 1px 1px ${transparentize(0.75, variant.bg)},
        0 0 0 0.2rem ${transparentize(0.65, variant.bg)};
      outline: 0;
    }
    & > span {
      display: block;
      height: 100%;
      box-sizing: inherit;
      overflow: hidden;
      width: 100%;
      margin: 0;
      padding: ${small ? "4px" : "8px"};
      background-color: ${variant.bg};
      border: 1px solid ${variant.fg};
      color: ${variant.text};
    }
    &:hover:not(:disabled):not(.disabled) > span,
    &:focus:not(:disabled):not(.disabled) > span {
      background-color: ${lighten(0.05, variant.bg)};
    }
    &:not(:disabled):not(.disabled):active > span {
      background-color: ${darken(0.05, variant.bg)};
    }
  `
})

export const CuteButton = (props) => {
  const { children, variant = "primary", ...rest } = props
  const defaultText = "Make it so"
  const myChildren = typeof children === "undefined" ? defaultText : children

  return (
    <Button variant={variant} disabled={variant === "disabled"} {...rest}>
      <span>{myChildren}</span>
    </Button>
  )
}

CuteButton.propTypes = {
  variant: PropTypes.oneOf([]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}
export default CuteButton
