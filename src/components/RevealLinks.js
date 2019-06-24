import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from '../scss/links.module.scss'

const links = [
  { href: 'https://github.com/embarks', title: 'Github', baseStyles: styles.head },
  { href: 'https://trello.com/b/pPZZjjfC/dev', title: 'Trello', baseStyles: styles.neck },
  { href: 'https://www.linkedin.com/in/thebartman/', title: 'LinkedIn', baseStyles: styles['body-part-0'] },
  { link: '/log', title: 'Posts', baseStyles: styles['body-part-1'] },
  { link: '/data', title: 'Infographics', baseStyles: styles['body-part-2'] },
  { link: '/sounds', title: 'Soundboard', baseStyles: styles['body-part-4'] }
]

const RevealLinks = (props) => {
  return (
    links.map((link, index) => (
      <React.Fragment key={`link-${index}`}>
        {
          link.hasOwnProperty('href')
            ? <a href={link.href} className={link.baseStyles}>
              {link.title}
            </a>
            : <Link to={link.link} className={link.baseStyles}>{link.title}
            </Link>
        }
      </React.Fragment>
    ))
  )
}

RevealLinks.propTypes = {
}

export default RevealLinks
