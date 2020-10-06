import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { lighten, transparentize } from 'polished'

const Button = styled.button`
  display: inline-block;
  margin-top: 0 !important;
  padding: 0;
  border-width: 1px;
  border-radius: 4px;
  background-color: black;
  border-color: ${lighten(0.07, '#0A1E24')};
  padding-bottom: 2px;
  border-style: solid;
  box-shadow: none;
  cursor: pointer;
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  line-height: 1.5;
  text-align: center;
  text-decoration: none;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
  &:hover {
    border-color: ${lighten(0.1, '#0A1E24')};
  }
  &:not(:disabled):not(.disabled):active {
    border-color: ${lighten(0.07, '#0A1E24')};
    padding-bottom: 0px;
    margin-top: 2px !important;
    background-color: black;
  }
  &:active {
    box-shadow: none !important;
    outline: 0;
  }
  &:focus {
    outline: 0;
    box-shadow: inset 0 1px 0 rgba(236, 240, 193, 0.15),
      0 1px 1px rgba(236, 240, 193, 0.075),
      0 0 0 0.2rem rgba(236, 240, 193, 0.5);
  }
`

const Span = styled.span`
  display: block;
  height: 100%;
  box-sizing: inherit;
  overflow: hidden;
  width: 100%;
  margin: 0;
  padding: 0.3rem;
  background-color: ${lighten(0.07, '#0A1E24')};
  border: 1px solid black;
  color: #ecf0c1;
  ${Button}:hover & {
    background-color: ${lighten(0.1, '#0A1E24')};
  }
  ${Button}:not(:disabled):not(.disabled):active & {
    background-color: ${lighten(0.07, '#0A1E24')};
  }
`

export const CuteButton = (props) => {
  const { children, ...rest } = props
  const defaultText = 'Make it so'
  const myChildren = typeof children === 'undefined' ? defaultText : children

  return (
    <Button {...rest}>
      <Span>{myChildren}</Span>
    </Button>
  )
}

CuteButton.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
export default CuteButton
