import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"


const Link = styled.a`${({ theme }) => `
  position: relative;
  display: inline-block;
  color: ${theme.colors.cyan};
  padding: 0 1px;
  border-radius: 2px;
  overflow: hidden;
  vertical-align: bottom;
  transition: all 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  transition-property: transform, width, padding, color, background;
  text-decoration: none;
  text-align: center;

  font-family: "AnonymousPro";
  line-height: 1.5;


  ::after {
    content: "";
    position: absolute;
    
    left: 0;
    width: 75%;
    right: 0;
    transform: translateX(15%);

    bottom: 0px;
    background-color: ${theme.colors.cyan};
    height: 1px;
    border-radius: 2px;
    transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    transition-property: width, background;
  }


  @media (hover: hover) and (pointer: fine) {
    :hover {
      color: ${theme.colors.bold};
    }
    :hover::after {
      background-color: ${theme.colors.bold};
      left: auto;
      right: 0;
      width: 0;
    }
  }
`}
`

export const CuteLink = (props) => {
  const { children, ...rest } = props;
  const defaultText = "where no man has gone before"

  const myChildren = typeof children === "undefined" ? defaultText : children

  return (
    <Link {...rest}>
      {myChildren}
    </Link>
  )
}

CuteLink.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
}

export default CuteLink