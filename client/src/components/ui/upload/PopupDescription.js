import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class PopupDescription extends React.Component {
  constructor(props) {
    super(props);
    const { description } = this.props;
    this.state = {
      value: description,
    }
  }
  setOpen = (value) => {
    const { handleChangeProps } = this.props;
    handleChangeProps('open', value);
  }

  handleClose = () => {
    this.setOpen(false);
  }

  handleSave = () => {
    const { handleChangeProps } = this.props;
    const { value } = this.state;
    handleChangeProps('description', value);
    this.setOpen(false);
  }

  onChange = (event) => {
    this.setState({ value: event.target.value });
  }

  render() {
    const { open } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" />
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit your image description</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="text"
              value={this.state.value}
              onChange={this.onChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
            <Button onClick={this.handleSave} color="primary">
              Save
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default PopupDescription;