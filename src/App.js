import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, withRouter } from 'react-router-dom'
import Dash from './components/Dash'
import detectMobile from './lib/detectMobile'
import styles from './scss/app.module.scss'
import './lib/falib'
import Footer from './components/Footer'
import { parse } from 'query-string'

const Home = props => {
  const showMobileVersion = parse(props.location.search).screen === 'mobile'
  const isMobile = detectMobile() || showMobileVersion
  return (
    <>
    <main className={styles.app}>
      <Dash mobile={isMobile}>
        <Footer mobile={isMobile}>
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
