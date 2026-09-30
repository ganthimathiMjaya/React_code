import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ArticleTable from './ArticleTable';
import SideNavList from './SideNavList';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

 const Sidebar = () => {
  return (
    <Box sx={{ flexGrow: 1}} m={3}>
      <Grid container spacing={5}>
        <Grid item xs={12} md={2}>
          <SideNavList />
        </Grid>
        <Grid item xs={12} md={10}>
          <ArticleTable />
        </Grid>
      </Grid>
    </Box>
  );
}
export default Sidebar;