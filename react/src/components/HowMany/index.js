import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Code = styled.code`
  display: inline-block;
  padding: 0 0.5rem;
  margin: 0;
  border-radius: 4px;
  line-height: 2;
  background-color: ${({ theme }) => theme.secondary.bg};
  color: ${({ theme }) => theme.secondary.text};
`

export const HowMany = (props) => {
  const { days, years, weeks, seconds, hours, showUnit = true } = props

  const keyMap = { days, years, weeks, seconds, hours }

  const unit = [days, years, weeks, seconds, hours].filter(Boolean)

  if (unit.length > 1) {
    throw new Error(
      "Only one of [days, years, weeks, seconds, hours] in <HowMany />!",
    )
  }

  const [unitKey] = Object.keys(keyMap)
    .filter((key) => Boolean(keyMap[key]))
    .map((key) => `${key}`)

  const [dateStr] = unit

  const inputDate = new Date(dateStr)
  const today = new Date()
  const isFuture = inputDate > today

  const endDate = isFuture ? inputDate : today

  const startDate = isFuture ? today : inputDate

  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())

  let diff = Math.floor(diffTime)

  if (seconds) {
    diff = Math.floor(diff / 1000)
  } else if (hours) {
    diff = Math.floor(diff / (1000 * 60 * 60))
  } else if (days) {
    diff = Math.floor(diff / (1000 * 60 * 60 * 24))
  } else if (years) {
    diff = Math.floor(diff / (1000 * 3600 * 24 * 365.25))
  }

  const prefix = props.prefix === undefined ? null : `${props.prefix} `
  const postfix = props.postfix === undefined ? null : ` ${props.postfix}`
  const infix =
    showUnit &&
    ` ${diff === 1 ? unitKey.slice(0, unitKey.length - 1) : unitKey}`

  return (
    <Code>
      {prefix}
      {diff}
      {infix}
      {postfix}
    </Code>
  )
}

HowMany.propTypes = {
  days: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  years: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  weeks: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  hours: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  prefix: PropTypes.string,
  postfix: PropTypes.string,
  showUnit: PropTypes.bool,
}
export default HowMany
