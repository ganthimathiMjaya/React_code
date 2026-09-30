import * as React from 'react';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import { Box, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import SearchIcon from '@mui/icons-material/Search';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import './ArticleTable.css';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
  },
}));

const MUI_X_PRODUCTS = [
  {
    id: 'grid',
    label: 'Data Grid',
    children: [
      {
        id: 'grid-community',
        label: 'All',
        children: [
          { id: 'grid-community-v1', label: 'General' },
          { id: 'grid-community-v2', label: ' EnterPrise' },
        ],
      },
      {
        id: 'grid-pro',
        label: 'General',
        children: [
          { id: 'grid-pro-v1', label: 'Ensample' },
          { id: 'grid-pro-v2', label: 'Devoted Health' },
        ],
      },
      {
        id: 'grid-premium',
        label: 'AHS',
        children: [
          { id: 'grid-premium-v1', label: 'v1.0' },
          { id: 'grid-premium-v2', label: 'v2.0' },
        ],
      },
    ],
  },
  {
    id: 'pickers',
    label: 'Pacific',
    children: [
      {
        id: 'pickers-community',
        label: '',
        children: [
          { id: 'pickers-community-v1', label: 'v1.0' },
          { id: 'pickers-community-v2', label: 'v2.0' },
        ],
      },
      {
        id: 'pickers-pro',
        label: '@mui/x-date-pickers-pro',
        children: [
          { id: 'pickers-pro-v1', label: 'v1.0' },
          { id: 'pickers-pro-v2', label: 'v2.0' },
        ],
      },
    ],
  },
  {
    id: 'charts',
    label: 'Charts',
    children: [
      {
        id: 'charts-community',
        label: '@mui/x-charts',
        children: [
          { id: 'charts-community-v1', label: 'v1.0' },
          { id: 'charts-community-v2', label: 'v2.0' },
        ],
      },
    ],
  },
  {
    id: 'tree-view',
    label: 'Tree View',
    children: [
      {
        id: 'tree-view-community',
        label: '@mui/x-tree-view',
        children: [
          { id: 'tree-view-community-v1', label: 'v1.0' },
          { id: 'tree-view-community-v2', label: 'v2.0' },
        ],
      },
    ],
  },
];

export default function IconMenu() {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };


  return (
    <Paper sx={{
      maxWidth: '100%', background: '#fff',
      borderRadius: '10px',
      padding: 2,
      height: '95%'
    }} >
      <FormGroup sx={{marginBottom: "20px"}}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>Active</Typography>
          <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
          {/* <Typography>In Active</Typography> */}
        </Stack>
      </FormGroup>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        InputProps={{
          startAdornment: <SearchIcon />,
        }}

      />
      <Box pt={1} className='header'>
        <RichTreeView items={MUI_X_PRODUCTS} />
      </Box>
    </Paper>
  );
}
