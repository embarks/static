import React from 'react';
import machine from './appmachine';
import Root from './appmachine/connect';
import NoteTaker from './components/NoteTaker';

const NotesApp = () => {
  return (
    <Root machine={machine}>
      <NoteTaker />
    </Root>
  );
};

export default NotesApp;