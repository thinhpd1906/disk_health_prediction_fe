import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const SuccessAlert = ({description, isSuccess, successChange}) => {
    const [open, setOpen] = React.useState(isSuccess);
    const handleClose = () => {
        // setOpen(false);
        successChange(false)
    };
    // React.useEffect(() => {
    //     setOpen(isError);
    // }, [isError]);
    return (
        <React.Fragment>
            <Dialog
            open={isSuccess}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title" style={{color: "blue"}}>
                {"Success"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {/* <Button onClick={handleClose}>Disagree</Button> */}
                <Button onClick={handleClose} autoFocus>
                OK
                </Button>
            </DialogActions>
            </Dialog>
      </React.Fragment>
    )
}

export default SuccessAlert;