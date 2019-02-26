import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@mindshaft/cute-components';
import { wrap } from '../appmachine/connect';
import { add, clear } from '../appmachine/notes';
import styles from '../scss/note-taker.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const variants = [
  'primary',
  'secondary',
  'info',
  'bright',
  'success',
  'danger'
];
export const NoteTaker = (props) => {
  const { add, clear } = props;
  const [note, setNote] = useState('');
  const addNote = () => {
    const variant = variants[Math.floor(Math.random() * variants.length)];
    setNote('');
    add({ note, variant });
  };
  return (
    <div className={styles['note-taker']}>
      {props.header}
      <Input as='textarea' tabIndex={0} onChange={setNote} value={note}></Input>
      <div className={styles['notes-main-control']}>
        <>
          <Button variant="primary" onClick={addNote}/>
          <Button variant="danger" onClick={clear}><FontAwesomeIcon icon={'snowplow'} /></Button>
        </>
      </div>
      <div className={styles['notes-body']}>
        {props.children}
      </div>
    </div>
  );
};

NoteTaker.propTypes = {
  add: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([ PropTypes.arrayOf(PropTypes.element), PropTypes.element ]),
  header: PropTypes.element
};

export default wrap(null, { add, clear })(NoteTaker);