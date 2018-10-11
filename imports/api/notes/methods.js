// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Notes } from './notes.js';

Meteor.methods({
  'notes.insert'(note) {
    check(note, String);

    return Notes.insert({
      note,
      createdAt: new Date(),
    });
  },
});
