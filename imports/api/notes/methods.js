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
      updatedAt: new Date()
    });
  },

  'note.update'(note) {
    check(note.note_detail, String);

    return Notes.update(note.note_id, {
      $set: { note: note.note_detail, updatedAt: new Date() },
    });
  },

  'note.delete'(note_id) {
    Notes.remove(note_id);
  }
});
