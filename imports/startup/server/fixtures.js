// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';
import { Notes } from '../../api/notes/notes.js';

Meteor.startup(() => {
  // if the Links collection is empty
  if (Notes.find().count() === 0) {
    const data = [
      {
        note: 'My first meet up as speaker',
        createdAt: new Date(),
      },
      {
        note: 'Meteor - React',
        createdAt: new Date(),
      },
      {
        note: 'Material-UI',
        createdAt: new Date(),
      },
      {
        note: 'This is good',
        createdAt: new Date(),
      },
    ];

    data.forEach(note => Notes.insert(note));
  }
});