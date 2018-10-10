import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import Orange from '@material-ui/core/colors/orange'

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: 30,
  },
  paper: {
    height: 140,
    width: 400,
    background: Orange[300],
    padding: 15,
    color: '#434343',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  input: {
    marginBottom: 15,
  },
});

class Content extends React.Component {
  state = {
    spacing: '16',
  };

  handleChange = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { classes } = this.props;
    const { spacing } = this.state;

    return (
      <Grid container className={classes.root} spacing={32} justify="center"> 
        <Grid item xs={12} >
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            <Grid item xs={12} sm={8} >
              <Paper className={classes.input} xs={12} sm={8}>
                <TextField
                  id="outlined-full-width"
                  placeholder="Add a new note"
                  style={{ padding: 10,}}
                  fullWidth
                  margin="normal"
                  variant='standard'
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
            {["My first meet up as speaker", "Meteor - React", "Material-UI"].map(value => (
              <Grid key={value} item>
                <Paper className={classes.paper} xs={12} sm={8}>{value}</Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Content.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);