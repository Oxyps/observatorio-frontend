import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";

export default function MenuButton({
  handleExportImage,
  handleExportJSON,
  handleExportCSV
}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <Grid container direction="column" alignItems="center">
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          ref={anchorRef}
          aria-label="split button"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <span>Export</span>
          <ArrowDropDownIcon />
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "top" ? "center bottom" : "center top"
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    <MenuItem key={0} onClick={handleExportImage}>
                      <span>Imagem</span>
                    </MenuItem>
                    <MenuItem key={1} onClick={handleExportJSON}>
                      <span>JSON</span>
                    </MenuItem>
                    <MenuItem key={2} onClick={handleExportCSV}>
                      <span>CSV</span>
                    </MenuItem>
                    <MenuItem
                      key={3}
                      disabled
                      // onClick={handleExportXML}
                    >
                      <span>XML</span>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}
