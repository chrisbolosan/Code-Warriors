import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
  },
  formControl: {
    minWidth: 120,
  },
}));

export default function TimeFilter(props) {
  const { handleChange, time } = props;
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="controlled-open-select-label">
          Time
        </InputLabel>
        <Select
          labelId="controlled-open-select-label"
          id="controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={time}
          onChange={handleChange}
        >
          <MenuItem value={"5"}>5 Minutes</MenuItem>
          <MenuItem value={"10"}>10 Minutes</MenuItem>
          <MenuItem value={"15"}>15 Minutes</MenuItem>
          <MenuItem value={"20"}>20 Minutes</MenuItem>
          <MenuItem value={"25"}>25 Minutes</MenuItem>
          <MenuItem value={"30"}>30 Minutes</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
