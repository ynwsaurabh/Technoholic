import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ onEdit }) {
  const [open, setOpen] = React.useState(false);
  const [code, setCode] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCodeChange = (e) =>{
    setCode(e.target.value.toUpperCase());
  }

  const handleClose = () => {
    setOpen(false);
  };
  const handleEdit = () => {
    onEdit(code);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit  your Response
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle> Wanna Edit Response?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A competition code has been sent to your email. Please enter the code below to continue.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            autoCapitalize='on'
            label="Competition Code"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleCodeChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEdit}>Edit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}