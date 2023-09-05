import React from "react";
import Box from "@mui/material/Box";
import {
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import AuthModal from "./AuthModal";

function Navbar() {
  const token = localStorage.getItem("token");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [handleOpen, setHandleOpen] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box
      height={60}
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      px={4}
    >
      <Box>
        <Typography fontSize={30} fontWeight="600">
          MovieBox
        </Typography>
        <AuthModal handleOpen={handleOpen} setHandleOpen={setHandleOpen} />
      </Box>
      <Box>
        {!token ? (
          <Button
            variant="outlined"
            size="medium"
            sx={{ color: "#CAEDFF" }}
            onClick={() => {
              setHandleOpen(!handleOpen);
            }}
          >
            Login
          </Button>
        ) : (
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      backgroundColor: "#17223B",
                      border: "2px solid #A8D2E8",
                    }}
                  >
                    M
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                    backgroundColor: "#CAEDFF",
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
                <Avatar sx={{ backgroundColor: "#17223B" }} /> Profile
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  localStorage.removeItem("token");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
