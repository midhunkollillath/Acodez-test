
import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Typography,
  Button,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserListToolBar from "./UserListToolBar";
import UserForm from "./UserForm";
import UserMenu from "./UserMenu";

function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleAddUser = (newUser) => {
    newUser.createdAt = Date.now();
    setUsers([newUser, ...users]);
    setShowForm(false);
  };

  const handleEditUser = (updatedUser) => {
    setUsers(users.map(user =>
      user.createdAt === updatedUser.createdAt ? updatedUser : user
    ));
    setShowForm(false);
  };

  const handleDeleteUser = (user) => {
    setUsers(users.filter((row) => row.createdAt !== user.createdAt));
    setShowForm(false);
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleDeleteSelectedUsers = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.createdAt)));
    setSelectedUsers([]);
  };

  const handleCheckboxChange = (event, user) => {
    if (event.target.checked) {
      setSelectedUsers([...selectedUsers, user.createdAt]);
    } else {
      setSelectedUsers(selectedUsers.filter(id => id !== user.createdAt));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const usersToShow = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Management
      </Typography>

      {!showForm && (
        <UserListToolBar
          searchTerm={searchTerm}
          handleSearchChange={handleSearchChange}
          onClickNew={() => setShowForm(true)}
        />
      )}

      {showForm && <UserForm onSubmit={selectedUser ? handleEditUser : handleAddUser} 
      onCancel={() => {setShowForm(false);setSelectedUser(null)}}
       user={selectedUser} />}

      {!showForm && (
        <>
          {selectedUsers.length > 0 && (
            <Button
              variant="contained"
              color="error"
              onClick={handleDeleteSelectedUsers}
              sx={{ marginBottom: 2 }}
            >
              Delete Selected Users
            </Button>
          )}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={ usersToShow.length > 0 && selectedUsers.length === usersToShow.length}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setSelectedUsers(usersToShow.map(user => user.createdAt));
                        } else {
                          setSelectedUsers([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Leagues Played</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Height</TableCell>
                  <TableCell>Position</TableCell>
                  <TableCell padding="checkbox">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersToShow.map((user) => {
                  const birthDate = new Date(user.dob);
                  const currentDate = new Date();

                  const ageInYears = currentDate.getFullYear() - birthDate.getFullYear();
                  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

                  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
                    ageInYears--;
                  }

                  return (
                    <TableRow key={user.createdAt}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedUsers.includes(user.createdAt)}
                          onChange={(event) => handleCheckboxChange(event, user)}
                        />
                      </TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{ageInYears}</TableCell>
                      <TableCell>
                        {user.leaguesPlayed.map((league, i) => (
                          <Chip key={i} label={league} sx={{ marginRight: 1 }} />
                        ))}
                      </TableCell>
                      <TableCell>
                        <Chip label={user.status} color={user.status === "Active" ? "success" : "warning"} />
                      </TableCell>
                      <TableCell>{user.height}</TableCell>
                      <TableCell>{user.position}</TableCell>
                      <TableCell padding="checkbox">
                        <IconButton onClick={(event) => handleMenuOpen(event, user)}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <UserMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        handleMenuOpen={handleMenuOpen}
        onEdit={() => { setShowForm(true);  setAnchorEl(null); }}
        onDelete={() => handleDeleteUser(selectedUser)}
      />
    </Box>
  );
}

export default UserTable;
