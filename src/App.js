import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dash from './components/Dash'
import detectMobile from './lib/detectMobile'
import styles from './scss/app.module.scss'
import cx from 'classnames'
import './lib/falib'

const Home = props => {
  const [scrolledToBottom, setScrolledToBottom] = useState(false)

  useEffect(() => {
    function _listener () {
      var scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
      var scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight
      var hitBottom = (scrollTop + window.innerHeight) >= scrollHeight
      setScrolledToBottom(hitBottom)
      if (hitBottom) {
        console.log('you\'re at the bottom of the page')
      }
    }
    window.addEventListener('scroll', _listener)
    return () => {
      window.removeEventListener('scroll', _listener)
    }
  })

  const isMobile = detectMobile()
  return (
    <>
    <main className={styles.app}>
      <Dash mobile={isMobile}/>
    </main>
    <footer className={cx({ [styles.mobile]: isMobile, [styles['show-footer']]: scrolledToBottom })}>

    </footer>
    </>

  )
}

Home.propTypes = {
  children: PropTypes.oneOf([PropTypes.node, PropTypes.arrayOf(PropTypes.node)])
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
      <Route path="/" exact component={Home} />
    </Router>
  )
}

export default App
