import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from '@mindshaft/cute-components';
import { wrap } from './appmachine/connect';
import { remove } from './appmachine/notes';
import NoteTaker from './components/NoteTaker';

const NotesApp = ({ notes, remove }) => {
  const removeNote = (note) => () => remove(note);
  return (
    <div className="NotesApp">
      <Link to="/">Home</Link>
      <NoteTaker
        header={<h1>Relax</h1>}
      >
        {notes && notes.map((note) => { 
          const { NoteID, note: message } = note;
          return (
            <Button onClick={removeNote(note)} key={`note-${NoteID}`}>{message}</Button>
          );
        })}
      </NoteTaker>
    </div>
  );
};

NotesApp.propTypes = {
  notes: PropTypes.array,
  remove: PropTypes.func.isRequired
};

export default wrap(({ notes }) => ({ notes }), { remove })(
  NotesApp
);