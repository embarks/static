import React from 'react'
import PropTypes from 'prop-types'
import styles from '../scss/fire.module.scss'

const Fire = props => {
  return (
    <div className={styles.light} >
      <ul className={styles['fire-container']}>
        <li className={styles.fire} />
        <li className={styles.fire} />
        <li className={styles.fire} />
        <li className={styles.fire} />
      </ul>
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
      <span className={styles.spark} />
    </div>
  )
}

Fire.propTypes = {
  isMobile: PropTypes.bool
}

export default Fire
