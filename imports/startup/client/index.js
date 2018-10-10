// Import client startup through a single index entry point

//import './routes.js';

import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import MicrokeepApp from '../../ui/components/microkeepApp.js';

Meteor.startup(() => {
  render(<MicrokeepApp />, document.getElementById('microkeep-app'));
});

