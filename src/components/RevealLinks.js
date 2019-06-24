import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../scss/links.module.scss'
import { Waypoint } from 'react-waypoint'
import cx from 'classnames'
import PreventEffect from './PreventEffect'

const links = [
  { link: '/about', title: 'about', id: 'about', complete: true },
  { link: '/log', title: 'posts', id: 'posts', complete: false },
  { href: 'https://github.com/embarks', title: 'source', id: 'github' },
  { href: 'https://trello.com/b/pPZZjjfC/dev', title: 'projects', id: 'trello' },
  { href: 'https://www.linkedin.com/in/thebartman/', title: 'Résumé', id: 'linkedin' }
]

const RevealLinks = (props) => {
  const [highlighted, setHighlighted] = useState([links[0]['id']])

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
        <Waypoint bottomOffset="25%" topOffset="35%" onPositionChange={_handleWaypoint({ id: link.id, index })}>
          {
            link.hasOwnProperty('href')
              ? <a target="_blank" href={link.href}
                rel="noopener noreferrer"
                className={cx(styles.link, { [styles.highlighted]: highlighted.includes(link.id) })}
              >
                <label>
                  {link.title}
                  <div className={styles.tag} />
                </label>
              </a>
              : <span className={cx(styles.link, { [styles.highlighted]: highlighted.includes(link.id) })}>
                {
                  !link.complete
                    ? <PreventEffect render={(onClick) => {
                      return (
                        <button className={styles['temporary-link']}
                          onTouchStart={onClick('touch')}
                        >
                          <label>
                            {link.title}
                            <div className={styles.tag} />
                          </label>
                        </button>
                      )
                    }}></PreventEffect>
                    : <Link to={link.link}>
                      <label>
                        {link.title}
                        <div className={styles.tag} />
                      </label>
                    </Link>
                }
              </span>
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
