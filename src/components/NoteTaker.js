import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@mindshaft/cute-components';
import { wrap } from '../appmachine/connect';
import { add, clear } from '../appmachine/notes';
import styles from '../scss/note-taker.module.scss';

export const NoteTaker = (props) => {
  const { add, clear } = props;
  const [note, setNote] = useState('');
  const addNote = () => {
    setNote('');
    add(note);
  };
  return (
    <div className={styles['note-taker']}>
      {props.header}
      <Input onChange={setNote} value={note}></Input>
      <Button onClick={addNote}>
      </Button>
      <Button onClick={clear}>Clear</Button>
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