import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../scss/links.module.scss'
import { Waypoint } from 'react-waypoint'
import cx from 'classnames'

const links = [
  { href: 'https://github.com/embarks', title: 'Github', id: 'github' },
  { href: 'https://trello.com/b/pPZZjjfC/dev', title: 'Trello', id: 'trello' },
  { href: 'https://www.linkedin.com/in/thebartman/', title: 'LinkedIn', id: 'linkedin' },
  { link: '/log', title: 'Posts', id: 'posts' },
  { link: '/data', title: 'Infographics', id: 'info' },
  { link: '/sounds', title: 'Soundboard', id: 'sounds' }
]

const RevealLinks = (props) => {
  const [highlighted, setHighlighted] = useState(['github'])

  useEffect(() => {
    function _listener (scroll) {
      var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
      var scrolledToBottom = (scrollTop + window.innerHeight) >= scrollHeight
      if (scrolledToBottom) {
        console.log('you\'re at the bottom of the page')
      }
    }
    window.addEventListener('scroll', _listener)
  })

  function _handleWaypoint (link) {
    return (waypoint) => {
      if (waypoint.currentPosition === 'inside') {
        setHighlighted(highlighted.filter(id => id !== link.id).concat(link.id))
      } else if (props.scrolled) {
        setHighlighted(highlighted.filter(id => id !== link.id))
      }
    }
  }

  return (
    links.map((link, index) => (
      <React.Fragment key={`link-${index}`}>
        <Waypoint bottomOffset="10%" topOffset="75%" onPositionChange={_handleWaypoint({ id: link.id, index })}>
          {
            link.hasOwnProperty('href')
              ? <a href={link.href} className={cx(styles.link, { [styles.highlighted]: highlighted.includes(link.id) })}>
                {link.title}
              </a>
              : <Link to={link.link} className={cx(styles.link, { [styles.highlighted]: highlighted.includes(link.id) })}>{link.title}
              </Link>
          }
        </Waypoint>
      </React.Fragment>
    ))
  )
}

RevealLinks.propTypes = {
  scrolled: PropTypes.bool
}

export default RevealLinks
