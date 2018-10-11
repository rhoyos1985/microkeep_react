import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { Notes } from '/imports/api/notes/notes.js';

import Orange from '@material-ui/core/colors/orange'

const styles = theme => ({
  paper: {
    height: 140,
    width: 400,
    background: Orange[300],
    padding: 15,
    color: '#434343',
  },
});

class Note extends React.Component {
  state = {
    spacing: '16',
  };
  
  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  renderNote(clss){
    return this.props.notes.map((note) => (
      <Grid key={note._id} item>
        <Paper className={clss.paper} xs={12} sm={8}>{note.note}</Paper>
      </Grid>
    ));
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        {this.renderNote(classes)}
      </Grid>
    );
  }
}

Note.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTracker(() => {
  Meteor.subscribe('notes.all');

  return {
    notes: Notes.find({}).fetch(),
  };
})(withStyles(styles)(Note));