import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
// import Sidebar from './component/sidebar.jsx';
// import Pagination from './component/Pagination.jsx';
import Button from './component/Button.jsx';
import Searchbar from './component/Searchbar.jsx';
import Textfill from './component/Textfill.jsx';

const theme = createTheme();

function App(){
  return (
    <ThemeProvider theme={theme}>
      {/* <Sidebar /> */}
      {/* <Button /> */}
      {/* <Pagination /> */}
      {/* <Searchbar /> */}
      <Textfill /> 
    </ThemeProvider>
  )
}
export default App