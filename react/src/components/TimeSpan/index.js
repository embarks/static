import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const Span = styled.span`
  display: inline-block;
  padding: 0 0.5rem;
  margin: 0;
  border-radius: 4px;
  line-height: 2;
  background-color: ${({ theme }) => theme.secondary.bg};
  color: ${({ theme }) => theme.secondary.text};
`

export const TimeSpan = (props) => {
  const { days, years, weeks, seconds, hours, showUnit = true } = props
  const unitEntries = Object.entries({
    years,
    days,
    weeks,
    hours,
    seconds,
  }).filter(([, datetimeValue]) => Boolean(datetimeValue))

  const [unitEntry] = unitEntries
  const [unitKey, dateStr] = unitEntry

  const inputDate = new Date(dateStr)
  const today = new Date()
  const isFuture = inputDate > today

  const endDate = isFuture ? inputDate : today

  const startDate = isFuture ? today : inputDate

  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())

  let diff = Math.floor(diffTime)
  const denominator = {
    seconds: 1000,
    hours: 1000 * 60 * 60,
    days: 1000 * 60 * 60 * 24,
    years: 1000 * 3600 * 24 * 365.25,
  }[unitKey]
  diff = Math.floor(diff / denominator)

  const prefix = props.prefix !== undefined && `${props.prefix} `
  const postfix = props.postfix !== undefined && ` ${props.postfix}`
  const infix =
    showUnit &&
    ` ${diff === 1 ? unitKey.slice(0, unitKey.length - 1) : unitKey}`

  return (
    <Span>
      {prefix}
      {diff}
      {infix}
      {postfix}
    </Span>
  )
}

TimeSpan.propTypes = {
  days: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  years: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  weeks: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  seconds: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  hours: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  prefix: PropTypes.string,
  postfix: PropTypes.string,
  showUnit: PropTypes.bool,
}
export default TimeSpan
