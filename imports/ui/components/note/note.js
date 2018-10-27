import React from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withTracker } from 'meteor/react-meteor-data';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Clear from '@material-ui/icons/Clear';
import className from 'classnames';

import { Notes } from '/imports/api/notes/notes.js';

import Orange from '@material-ui/core/colors/orange'

const styles = theme => ({
  paper: {
    minHeight: 200,
    width: 400,
    background: Orange[300],
    padding: 15,
    position: 'relative',
    color: '#434343',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: 15,
    width: 350,
    height: 140,
    display: 'none',
  },
  textNote: {
    display: 'block', 
    whiteSpace: 'pre',
  },
  button: {
    position: 'absolute',
    margin: 8,
    padding: 5,
    right: 5,
    marginTop: -12
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 14,
  },
  listItems: {
    display: 'none',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    position: 'absolute',
    right: 20,
    bottom: 0,
  },
  items: {
    float: 'right',
    margin: 0,
    padding: 5,
  },
  btnItems: {
    padding: 5,
  }
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
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }
  
  handleChange = key => (event) => {
    event.stopPropagation();
    this.setState({
      [key]: event.target.value,
    });
  };

  handleSave = note_id => (event) => {
    event.preventDefault();
    
    let id = note_id;
    let note = this.state.note;

    Meteor.call('note.update', {note_id: id, note_detail: note}, (error) => {
      if (error) {
        alert(error.message);
      } else {
        this.clearPaper();
      }
    });
    
  }

  clearPaper(){
    let curTarget = this.state.targetClick;
    let spanTag = curTarget.childNodes[1];
    let divTag = curTarget.childNodes[2];
    let btnTag = curTarget.childNodes[3];

    spanTag.style = 'display: block';
    divTag.style = 'display: none';
    btnTag.style = 'display: none';
    
    this.setState({
      note: '',
      isEdit: false,
      targetClick: null,
    });
  }

  handleClear(event){
    event.stopPropagation();
    this.clearPaper();
  }

  handleDelete = note_id => (event) => {
    event.stopPropagation();
    
    Meteor.call('note.delete', note_id, (error) => {
      if (error) {
        alert(error.message);
      }
    });
  }

  handleClick(event) {
    event.stopPropagation();
    let curTarget = event.currentTarget;
    
    if(curTarget.childNodes === null) return;
    
    let spanTag = curTarget.childNodes[1];
    let divTag = curTarget.childNodes[2];
    let btnTag = curTarget.childNodes[3];

    if (this.state.isEdit && this.state.targetClick === curTarget) return;
    
    this.setState({ note: '' });
    
    if( this.state.targetClick !== null){
      
      let oldTarget = this.state.targetClick;
      let oldSpanTag = oldTarget.childNodes[1];
      let oldDivTag = oldTarget.childNodes[2]; 
      let oldBtnTag = oldTarget.childNodes[3];

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
            <Paper onClick={this.handleClick} className={clss.paper} xs={12} sm={8}>
              <IconButton onClick={this.handleDelete(note._id)} className={clss.button} aria-label="Delete notes">
                <DeleteIcon />
              </IconButton>
              <p className={clss.textNote}>{note.note.toString()}</p>
              <TextField  id="outlined-multiline-flexible" multiline
                          rows="5" value={this.state.note} onChange={this.handleChange('note')}
                          className={clss.textField} margin="normal" variant="outlined"
                          />
              <ul className={clss.listItems}>
                <li className={clss.items}>
                  <IconButton className={clss.btnItems} onClick={this.handleSave(note._id)}  aria-label="Update notes">
                    <SaveIcon />
                  </IconButton>
                </li>
                <li className={clss.items}>
                  <IconButton className={clss.btnItems} onClick={this.handleClear} aria-label="Clear notes">
                    <Clear />
                  </IconButton>
                </li>
              </ul>
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