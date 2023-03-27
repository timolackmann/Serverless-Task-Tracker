import { useEffect, useState, useContext} from 'react';
import { FormControlLabel, Checkbox, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle }  from '@mui/material';
import { UserContext } from '../contexts/user.context';

export default function FormDialog() {
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [shared, setShared] = useState(false);
  const [open, setOpen] = useState(false);
  const [isValid, setValid] = useState(false);
  const { createToDo } = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const isValid = validate();
    setValid(isValid);
   }, [summary]);
    
  const validate = () => {
    return summary.length;
  };

  const handlesubmit = async () => {
    try {
      const result = await createToDo(summary, details, shared);
      window.location.reload(false);
    } catch (error) {
      alert(error)
    }
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        new task
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add a new task</DialogTitle>
        <DialogContent>
          <TextField
            required
            margin="dense"
            id="summary"
            label="New task title"
            type="text"
            fullWidth
            variant="standard"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <TextField
            id="details"
            label="Task description"
            type="text"
            multiline
            fullWidth
            variant="standard"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <FormControlLabel control={<Checkbox />} 
            label="Share this task"
            checked= {shared}
            onChange={(e) => setShared(e.target.checked)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlesubmit} disabled={!isValid}>Add Task</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
