import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Dash from './components/Dash'
import detectMobile from './lib/detectMobile'
import styles from './scss/app.module.scss'
import cx from 'classnames'
import './lib/falib'

const Home = props => {
  const isMobile = detectMobile()
  return (
    <main className={cx(styles.app)}>
      <Dash mobile={isMobile}/>
    </main>
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
