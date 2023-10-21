import { useState, Fragment } from "react";
import Fab from "@mui/material/Fab";
import ChatIcon from "@mui/icons-material/Chat";
import { green } from "@mui/material/colors";
import { Dialog } from "@mui/material";
import { useTheme } from '@material-ui/core/styles';
import Zoom from '@mui/material/Zoom';

import "./App.css";
import ChatCanvas from "./components/Chat/ChatCanvas";

const fabStyle = {
  position: 'fixed',
  top: 'auto',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

function ChatDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Fragment>
    
    <Dialog onClose={handleClose} open={open}>
      <ChatCanvas />
    </Dialog>
    </Fragment>
  );
}

function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  
  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fab = {
    color: "inherit",
    sx: { ...fabStyle, ...fabGreenStyle },
    icon: <ChatIcon />,
    label: "Expand",
  };

  return (
    <div className="App">
      <Zoom
        key={fab.color}
        in={true}
        timeout={transitionDuration}
        style={{
          transitionDelay: `${transitionDuration.exit}ms`,
        }}
        unmountOnExit
      >
        <Fab
          sx={fab.sx}
          aria-label={fab.label}
          color={fab.color}
          onClick={handleDialogOpen}
        >
          {fab.icon}
        </Fab>
      </Zoom>
      <ChatDialog open={open} onClose={handleDialogClose} />
    </div>
  );
}

export default App;