import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@mindshaft/cute-components';
import { wrap } from '../appmachine/connect';
import { add, clear } from '../appmachine/notes';

export const NoteTaker = (props) => {
  const { notes, add, clear } = props;
  const [note, setNote] = useState('');
  return (
    <>
      <Input onChange={setNote} value={note}></Input>
      <h1>Relax</h1>
      <Button onClick={
        () => { 
          setNote('');
          add(note);
        }
      }>
      </Button>

      <Button onClick={clear}>Clear</Button>
      {
        notes && notes.map(({ note }, index) => { 
          return (
            <Button key={`note-${index}`}>{note}</Button>
          );
        })
      }
    </>
  );
};

NoteTaker.defaultProps = {
  notes: []
};
NoteTaker.propTypes = {
  notes: PropTypes.array,
  add: PropTypes.func,
  clear: PropTypes.func
};

export default wrap(
  ({ notes }) => ({ notes }),
  { add, clear }
)(NoteTaker);