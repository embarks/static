import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, withRouter, Link } from 'react-router-dom'
import { Dash, Footer } from '@mindshaft/cute-components'
import detectMobile, { MIN_WIDTH } from './lib/detectMobile'
import styles from './scss/app.module.scss'
import './lib/falib'
import { version } from '../package.json'
import { parse } from 'query-string'
import throttle from 'lodash/throttle'

const MOBILE_DETECTED = detectMobile()
const DOMAIN = process.env.DOMAIN
const EMAIL = process.env.MAIL_SUPPORT
const TME = process.env.CHAT_SUPPORT

const links = [
  { link: '/about', title: 'about', id: 'about', complete: false },
  { link: '/log', title: 'posts', id: 'posts', complete: false },
  { href: 'https://codepen.io/embarks/#', title: 'pens', id: 'codepen' },
  { href: 'https://github.com/embarks', title: 'source', id: 'github' },
  { href: 'https://trello.com/b/pPZZjjfC/dev', title: 'projects', id: 'trello' },
  { href: 'https://www.linkedin.com/in/thebartman/', title: 'Résumé', id: 'linkedin' }
]

const Home = props => {
  const [isMobile, showMobile] = useState(MOBILE_DETECTED)
  const windowresize = throttle(event => {
    const w = window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    if (w < MIN_WIDTH) {
      showMobile(true)
    } else if (w >= MIN_WIDTH) {
      showMobile(false)
    }
  }, 300)
  useEffect(() => {
    windowresize()
    window.addEventListener('resize', windowresize)
    return () => {
      window.removeEventListener('resize', windowresize)
    }
  }, [])
  useEffect(() => {
    showMobile(parse(props.location.search).screen === 'mobile')
  }, [])
  return (
    <>
    <main className={styles.app}>
      <Dash mobile={isMobile} Link={Link} links={links}>
        <Footer mobile={isMobile}
          version={version}
          domain={DOMAIN}
          email={EMAIL}
          tme={TME}
        >
        </Footer>
      </Dash>
    </main>
    </>

  )
}

Home.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  location: PropTypes.shape({ search: PropTypes.string }).isRequired
}

const App = () => {
  const preloadClass = () => {
    document.body.className = document.body.className.replace('preload', '')
  }
  useEffect(() => {
    window.addEventListener('load', preloadClass)
    return () => {
      window.removeEventListener('load', preloadClass)
    }
  })
  return (
    <Router>
      <Route path="/" exact component={withRouter(Home)} />
    </Router>
  )
}

export default App
