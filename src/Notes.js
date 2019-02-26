import React from 'react';
import PropTypes from 'prop-types';
import { Button, Input } from '@mindshaft/cute-components';
import { wrap } from './appmachine/connect';
import { remove, changeTitle } from './appmachine/notes';
import NoteTaker from './components/NoteTaker';
import styles from './scss/notes.module.scss';

const NotesApp = ({ notes, header, changeHeader, remove }) => {
  const removeNote = (note) => () => remove(note);
  return (
    <div className={styles.notes}>
      <NoteTaker
        header={
          <Input as='input' type='text'
            subtle
            contentEditable
            tabIndex={1}
            onChange={changeHeader}
            value={`${typeof header === 'undefined' ? '// TODO' : header}`}
          />
        }
      >
        {notes && notes.map((note) => {
          const { NoteID, note: message, variant } = note;
          return (
            <Button variant={variant} onClick={removeNote(note)} key={`note-${NoteID}`}>{message}</Button>
          );
        })}
      </NoteTaker>
    </div>
  );
};

NotesApp.propTypes = {
  notes: PropTypes.array,
  header: PropTypes.string,
  remove: PropTypes.func.isRequired,
  changeHeader: PropTypes.func.isRequired
};

export default wrap(({ notes }) => ({ notes: notes.todos, header: notes.title }), { remove, changeHeader: changeTitle  })(
  NotesApp
);