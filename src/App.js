import React from 'react';
import CustomAppBar from './components/Appbar';
import Sidebar from './components/Sidebar';
import UserTable from './components/UserList';
import { CssBaseline, Box } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <CustomAppBar />
      <Box display="flex">
        <Sidebar />
        <Box flexGrow={1} p={3}>
          <UserTable />
        </Box>
      </Box>
    </>
  );
}

export default App;
