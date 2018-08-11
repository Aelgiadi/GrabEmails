import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function Head() {
  return (
    <div className="header">
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Get Emails
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
