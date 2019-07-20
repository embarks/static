import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Waypoint } from 'react-waypoint'
import cx from 'classnames'
import Fire from './Fire'
import styles from '../scss/footer.module.scss'

const DOMAIN = process.env.DOMAIN
const EMAIL = process.env.MAIL_SUPPORT
const TME = process.env.CHAT_SUPPORT

const Footer = ({ mobile }) => {
  const [showFooter, setShowFooter] = useState(false)

  function _setShowFooter (show) { return () => setShowFooter(show) }

  return (
    <footer className={cx({ [styles.mobile]: mobile, [styles.show]: showFooter })}>
      <div className={cx(styles.bg, { [styles['show-bg']]: showFooter })} />
      <div className={cx(styles.bglt, { [styles['show-bglt']]: showFooter })} />
      <div className={cx(styles.bgltr, { [styles['show-bgltr']]: showFooter })} />
      <section className={styles['fire-container']}>
        <Fire />
      </section>
      <section className={styles['info-container']}>
        <address>
          <p>
            <label className={styles.demph}>[Author]</label><u /><span className={styles.name}>Emily Bartman</span>{', Pushing pixels around '}<em>{'since 2014. '}</em>
            {'Thank you for visiting my website. ✨'}
            <Waypoint onEnter={_setShowFooter(true)} onLeave={_setShowFooter(false)} />

            <span className={styles.url}><a href={`http://www.${DOMAIN}`}>//{' '}{DOMAIN}</a></span>
          </p>
          <label className={styles.demph}>[Feedback?]</label>
          <span className={styles.mailto}>
            <small>
              <a target="_blank" rel="noopener noreferrer" href={`mailto:${EMAIL}`}>
                {'Send mail ✉️'}
              </a>{' '}
              <a target="_blank" rel="noopener noreferrer" href={`https://t.me/${TME}`}>
                {'Telegram 💬'}
              </a>
            </small>
          </span>
        </address>
      </section>
    </footer>
  )
}

Footer.propTypes = {
  mobile: PropTypes.bool
}

export default Footer
