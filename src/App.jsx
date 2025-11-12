import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Sidebar from './component/sidebar.jsx';
import Pagination from './component/Pagination.jsx';
import Button from './component/Button.jsx';

const theme = createTheme();

function App(){
  return (
    <ThemeProvider theme={theme}>
      {/* <Sidebar /> */}
      {/* <Button /> */}
      <Pagination />
    </ThemeProvider>
  )
}
export default App