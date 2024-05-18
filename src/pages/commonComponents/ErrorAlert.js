import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const ErrorAlert = ({description, isError, errorChange}) => {
    const [open, setOpen] = React.useState(isError);
    const handleClose = () => {
        // setOpen(false);
        errorChange(false)
    };
    // React.useEffect(() => {
    //     setOpen(isError);
    // }, [isError]);
    return (
        <React.Fragment>
            <Dialog
            open={isError}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" style={{color: "red"}}>
                {"Error"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={handleClose}>Disagree</Button> */}
                <Button onClick={handleClose} autoFocus>
                Agree
                </Button>
            </DialogActions>
            </Dialog>
      </React.Fragment>
    )
}

export default ErrorAlert;