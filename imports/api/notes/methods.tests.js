// Tests for links methods
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Notes } from './notes.js';
import './methods.js';

if (Meteor.isServer) {
  describe('notes methods', function () {
    beforeEach(function () {
      Notes.remove({});
    });

    it('can add a new link', function () {
      const addNote = Meteor.server.method_handlers['notes.insert'];

      addNote.apply({}, ['meteor.com']);

      assert.equal(Notes.find().count(), 1);
    });
  });
}
