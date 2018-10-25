import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';

import { Notes } from '/imports/api/notes/notes.js';

import Orange from '@material-ui/core/colors/orange'

const styles = theme => ({
  paper: {
    height: 200,
    width: 400,
    background: Orange[300],
    padding: 15,
    color: '#434343',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 0,
    width: 350,
    height: 110,
    display: 'none',
  },
  button: {
    margin: theme.spacing.unit,
    display: 'none',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

class Note extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      spacing: '16',
      note: '',
      isEdit: false,
      targetClick: null,
    };

    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange = key => (event) => {
    console.log(event.target.name);
    this.setState({
      [key]: event.target.value,
    });
  };

  handleSave(){
    console.log(this.state.note);
  }

  handleClick(event) {
    event.stopPropagation();
    let curTarget = event.currentTarget;
    let spanTag = curTarget.childNodes[0];
    let divTag = curTarget.childNodes[1];
    let btnTag = curTarget.childNodes[2];

    if (this.state.isEdit && this.state.targetClick === curTarget) return;
    
    let strNote = curTarget.textContent;
    this.setState({ note: '' });
    
    if( this.state.targetClick !== null){
      
      let oldTarget = this.state.targetClick;
      let oldSpanTag = oldTarget.childNodes[0];
      let oldDivTag = oldTarget.childNodes[1]; 
      let oldBtnTag = oldTarget.childNodes[2];

      oldSpanTag.style = 'display: block';
      oldDivTag.style = 'display: none';
      oldBtnTag.style = 'display: none';
    }

    this.setState({
      isEdit: true,
      targetClick: curTarget,
      note: spanTag.textContent,
    })
    
    spanTag.style = 'display: none';
    divTag.style = 'display: flex';
    btnTag.style = 'display: block';
  }

  renderNote(clss){
    return this.props.notes.map((note) => (
        <Grid key={note._id} item>
            <Paper onClick={this.handleClick.bind(this)} className={clss.paper} xs={12} sm={8}>
              <span style={{display: 'block'}}>{note.note}</span>
              <TextField  id="outlined-multiline-flexible" multiline
                          rows="5" value={this.state.note} onChange={this.handleChange('note')}
                          className={clss.textField} margin="normal" variant="outlined"
                          />
              <Button variant="contained" size="small" className={clss.button} onClick={this.handleSave.bind(this)}>
                <SaveIcon className={classNames(clss.leftIcon, clss.iconSmall)} />
              </Button>
            </Paper>
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