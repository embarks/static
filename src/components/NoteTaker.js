import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@mindshaft/cute-components';
import { wrap } from '../appmachine/connect';
import { add, clear } from '../appmachine/notes';
import { Link } from 'react-router-dom';

export const NoteTaker = (props) => {
  const { notes, add, clear } = props;
  const [note, setNote] = useState('');
  return (
    <div className="NotesApp">
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
      <Link to="/">Home</Link>
    </div>
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