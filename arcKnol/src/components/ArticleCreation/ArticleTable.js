import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {  createTheme, ThemeProvider, TableContainer,  Paper, Button, TextField, IconButton, Typography, Toolbar, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatIcon from '@mui/icons-material/Chat';
import StarIcon from '@mui/icons-material/Star';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SearchIcon from '@mui/icons-material/Search';
import './ArticleTable.css'; 
import { useNavigate } from 'react-router-dom';

const rows = [
  { id: 1, articleName: 'Medstar Updated Guidelines', client: 'Ensemble', validity: '01/01/2024 to 01/03/2024', status: 'Save as draft', createdDate: '20-04-2023', createdBy: 'Kishore' },
  { id: 2, articleName: 'CMH-Covid19', client: 'Devoted Health', validity: '01/01/2024 to 01/03/2024', status: 'Published', createdDate: '19-04-2023', createdBy: 'Nagaraj' },
  { id: 1, articleName: 'Medstar Updated Guidelines', client: 'Ensemble', validity: '01/01/2024 to 01/03/2024', status: 'Save as draft', createdDate: '20-04-2023', createdBy: 'Kishore' },
  { id: 2, articleName: 'CMH-Covid19', client: 'Devoted Health', validity: '01/01/2024 to 01/03/2024', status: 'Published', createdDate: '19-04-2023', createdBy: 'Nagaraj' }, { id: 1, articleName: 'Medstar Updated Guidelines', client: 'Ensemble', validity: '01/01/2024 to 01/03/2024', status: 'Save as draft', createdDate: '20-04-2023', createdBy: 'Kishore' },
  { id: 2, articleName: 'CMH-Covid19', client: 'Devoted Health', validity: '01/01/2024 to 01/03/2024', status: 'Published', createdDate: '19-04-2023', createdBy: 'Nagaraj' }, { id: 1, articleName: 'Medstar Updated Guidelines', client: 'Ensemble', validity: '01/01/2024 to 01/03/2024', status: 'Save as draft', createdDate: '20-04-2023', createdBy: 'Kishore' },
  { id: 2, articleName: 'CMH-Covid19', client: 'Devoted Health', validity: '01/01/2024 to 01/03/2024', status: 'Published', createdDate: '19-04-2023', createdBy: 'Nagaraj' }, { id: 1, articleName: 'Medstar Updated Guidelines', client: 'Ensemble', validity: '01/01/2024 to 01/03/2024', status: 'Save as draft', createdDate: '20-04-2023', createdBy: 'Kishore' },
  { id: 2, articleName: 'CMH-Covid19', client: 'Devoted Health', validity: '01/01/2024 to 01/03/2024', status: 'Published', createdDate: '19-04-2023', createdBy: 'Nagaraj' }, { id: 1, articleName: 'Medstar Updated Guidelines', client: 'Ensemble', validity: '01/01/2024 to 01/03/2024', status: 'Save as draft', createdDate: '20-04-2023', createdBy: 'Kishore' },
  { id: 2, articleName: 'CMH-Covid19', client: 'Devoted Health', validity: '01/01/2024 to 01/03/2024', status: 'Published', createdDate: '19-04-2023', createdBy: 'Nagaraj' },];

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'articleName', headerName: 'Article Name', width: 200 },
  { field: 'client', headerName: 'Client', width: 150 },
  { field: 'validity', headerName: 'Validity', width: 200 },
  { field: 'status', headerName: 'Status', width: 200 },
  { field: 'createdDate', headerName: 'Created Date', width: 150 },
  { field: 'createdBy', headerName: 'Created By', width: 150 },
  {
    field: 'stats',
    headerName: 'Stats',
    width: 150,
    renderCell: () => (
      <>
        <IconButton size="small"><ThumbUpAltIcon fontSize="small" /></IconButton>
        <IconButton size="small"><ChatIcon fontSize="small" /></IconButton>
        <IconButton size="small"><StarIcon fontSize="small" /></IconButton>
        <IconButton size="small"><TrendingUpIcon fontSize="small" /></IconButton>
      </>
    ),
  },
  {
    field: 'action',
    headerName: 'Action',
    width: 150,
    renderCell: (params) => (
      <>
        <IconButton size="small"><EditIcon fontSize="small" /></IconButton>
        <IconButton size="small"><DeleteIcon fontSize="small" /></IconButton>
      </>
    ),
  },
];

const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        columnHeaders: {
          backgroundColor: 'rgb(17, 62, 112)', 
          color: '#ffffff'            
        },
        columnHeaderTitle: {
          fontWeight: 'bold'           
        }
      }
    }
  }
});

const ArticleTable = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/createNewArticle');
  };
  
  return (
    <Box style={{backgroundColor: 'rgb(255, 255, 255)', flex: '1 1 85%',  borderRadius: '10px'}} p={2}>
    <Toolbar style={{paddingLeft:0, paddingRight:0}}  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, '@media (min-width:600px)': { flexDirection: 'row', alignItems: 'center' }}}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Article Creation
      </Typography>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <Button variant="contained" color="primary" onClick={handleClick} sx={{ textTransform: 'none'}}>
        Create New Article
      </Button>
    </Toolbar>
    <TableContainer component={Paper} >
    <ThemeProvider theme={theme}>
      <div style={{ height:600, width: '100%' }}>
        <DataGrid 
          rows={rows} 
          columns={columns} 
          pageSize={5} 
          checkboxSelection 
        />
      </div>
    </ThemeProvider>
    </TableContainer>
  </Box>
    
  );
}

export default ArticleTable;