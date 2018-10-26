// Tests for the behavior of the links collection
//
// https://guide.meteor.com/testing.html

import { Meteor } from 'meteor/meteor';
import { assert } from 'chai';
import { Notes } from './notes.js';

if (Meteor.isServer) {
  describe('notes collection', function () {
    it('insert correctly', function () {
      const noteId = Notes.insert({
        note: 'meteor homepage',
      });
      const added = Notes.find({ _id: noteId });
      const collectionName = added._getCollectionName();
      const count = added.count();

      assert.equal(collectionName, 'notes');
      assert.equal(count, 1);
    });
  });
}
