import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { lighten, darken, transparentize } from "polished"
import { variantColorKeys } from "../theme"

const { contrast, background, text /*focus*/ } = variantColorKeys

const __ = (colorKey, mod) => {
  let variant, theme
  return (props) => {
    ;({ variant, theme } = props)
    if (!theme.variants.includes(variant)) {
      console.warn("Unknown variant provided to Button")
      variant = "primary"
    }
    const color = theme.variants(variant)[colorKey]
    if (typeof mod === "function") {
      return mod(color)
    }
    return color
  }
}

const Button = styled.button`
  display: inline-block;
  margin-top: 0 !important;
  padding: 0;
  min-width: 45px;
  border-width: 1px;
  border-radius: 4px;
  padding-bottom: 2px;
  border-style: solid;
  box-shadow: none;
  cursor: pointer;
  font-size: 16px;
  font-family: "Courier New", Courier, monospace;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  background-color: ${__(contrast)};
  border-color: ${__(background)};
  &:hover {
    border-color: ${__(background, (tColor) => lighten(0.05, tColor))};
  }
  &:not(:disabled):not(.disabled):active {
    margin-top: 2px !important;
    padding-bottom: 0px;
    background-color: ${__(contrast)};
    border-color: ${__(background)};
  }
  &:active {
    box-shadow: none;
    outline: 0;
  }
  &:focus {
    box-shadow: inset 0 1px 0
        ${__(/*focus*/ background, (tColor) => transparentize(0.85, tColor))},
      0 1px 1px
        ${__(/*focus*/ background, (tColor) => transparentize(0.975, tColor))},
      0 0 0 0.2rem
        ${__(/*focus*/ background, (tColor) => transparentize(0.65, tColor))};
    outline: 0;
  }
  & > span {
    display: block;
    height: 100%;
    box-sizing: inherit;
    overflow: hidden;
    width: 100%;
    margin: 0;
    padding: 8px;
    background-color: ${__(background)};
    border: 1px solid ${__(contrast)};
    color: ${__(text)};
  }
  &:hover > span {
    background-color: ${__(background, (tColor) => lighten(0.05, tColor))};
  }
  &:not(:disabled):not(.disabled):active > span {
    background-color: ${__(background, (tColor) => darken(0.05, tColor))};
  }
`

export const CuteButton = (props) => {
  const { children, variant, ...rest } = props
  const defaultText = "Make it so"
  const myChildren = typeof children === "undefined" ? defaultText : children

  return (
    <Button variant={variant} disabled={variant === "disabled"} {...rest}>
      <span>{myChildren}</span>
    </Button>
  )
}

CuteButton.defaultProps = {
  variant: "primary",
}

CuteButton.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node.isRequired,
}
export default CuteButton
