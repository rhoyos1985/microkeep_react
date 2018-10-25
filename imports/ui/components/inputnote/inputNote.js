import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  input: {
    marginBottom: 15,
  },
});

class InputNote extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      spacing: '16',
      note: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

  handleChange = key => (event) => {
    this.setState({
      [key]: event.target.value,
    });
  };

  handleSubmit(event){
    event.preventDefault();

    const note = this.state.note;

    if(note.length == 0){
      alert('The field is empty');
      return;
    }

    Meteor.call('notes.insert', note, (error) => {
      if (error) {
        alert(error.error);
      } else {
        this.setState({
          note: '',
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
        <Grid item xs={12} sm={8} >
          <Paper className={classes.input} xs={12} sm={8}>
            <form className="new-note" onSubmit={this.handleSubmit.bind(this)} >
              <TextField
                id="outlined-full-width"
                placeholder="Add a new note"
                style={{ padding: 10,}}
                fullWidth
                value={this.state.note}
                onChange={this.handleChange('note')}
                margin="normal"
                variant='standard'
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

InputNote.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InputNote);