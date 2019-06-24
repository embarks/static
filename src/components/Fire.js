import React from 'react'
import PropTypes from 'prop-types'
import styles from '../scss/fire.module.scss'

const Fire = props => {
  return (
    <section className={styles.light} >
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
    </section>
  )
}

Fire.propTypes = {
  isMobile: PropTypes.bool
}

export default Fire
