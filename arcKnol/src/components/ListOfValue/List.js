import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Search as SearchIcon } from '@mui/icons-material';
import { Checkbox, ListItemText, Dialog, DialogTitle, Toolbar, DialogContent, DialogActions, TextField, Container, Button, RadioGroup, FormControlLabel, Radio, Select, MenuItem, IconButton, Typography, Box, Grid, FormControl, InputLabel, Chip } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import '../ArticleCreation/ArticleTable.css';


const styles = {
    fontFamily: 'proxima_nova_regular, arial',
    fontSize: '14px',
    color: '#000',
    fontWeight: 'normal',
    textTransform: 'none'
};

const commonStyles = {
    fontSize: '14px',
    color: '#000',
    fontWeight: 'normal',
    fontFamily: 'proxima_nova_regular, Arial, sans-serif',
};


const columns = [
    { field: 'id', headerName: 'Lov ID', width: 180, headerClassName: 'header-style' },
    { field: 'valueType', headerName: 'Value Type', width: 180, headerClassName: 'header-style' },
    { field: 'keyValue', headerName: 'Key Value', width: 180, headerClassName: 'header-style' },
    { field: 'createdBy', headerName: 'Created By', width: 180, headerClassName: 'header-style' },
    { field: 'createdOn', headerName: 'Created On', width: 180, headerClassName: 'header-style' },
    {
        field: 'action',
        headerName: 'Action',
        width: 260,
        headerClassName: 'header-style',
        renderCell: (params) => (
            <Box display="flex" justifyContent="space-between" width="70%">
                <Button variant="contained" sx={{
                    border: 'none',
                    padding: '4px 18px',
                    background: '#1fbd72',
                    color: '#fff',
                    textTransform: 'none',
                    borderRadius: '3px'
                }} size="small">Edit</Button>
                <Button variant="contained" sx={{
                    border: 'none',
                    padding: '4px 18px',
                    background: '#dd2a26',
                    color: '#fff',
                    textTransform: 'none',
                    borderRadius: '3px'
                }} size="small">Delete</Button>
            </Box>
        ),
    },
];

const rows = [
    { id: 1, valueType: 'General', keyValue: 5, createdBy: 'Ganthi', createdOn: '25-3-2024' },
    { id: 2, valueType: 'General', keyValue: 5, createdBy: 'Gowsi', createdOn: '26-3-2024' },
    { id: 3, valueType: 'General', keyValue: 5, createdBy: 'Gaya', createdOn: '27-3-2024' },
    { id: 4, valueType: 'General', keyValue: 5, createdBy: 'Kathir', createdOn: '28-3-2024' },
];
const CreateMasterModal = ({ open, handleClose }) => {

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogContent dividers>
                <Container>
                    <Box sx={{ p: 4 }}>
                        <Typography style={styles} >
                            Select the Value Type
                        </Typography>
                        <Box style={{
                            fontFamily: 'proxima_nova_regular, arial',
                            fontSize: '14px',
                            color: '#000',
                            fontWeight: 'normal',
                            textTransform: 'none'
                        }}>
                            <FormControl component="fieldset" style={{ marginBottom: '10px' }}>
                                <RadioGroup row >
                                    <FormControlLabel
                                        value="general"
                                        control={<Radio className="custom-radio" />}
                                        label={<Typography sx={commonStyles}>General</Typography>}
                                    />
                                    <FormControlLabel value="client" control={<Radio className="custom-radio" />} label={<Typography sx={commonStyles}>Client</Typography>} sx={commonStyles} />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <InputLabel style={styles}>Select Client</InputLabel>
                        <FormControl fullWidth style={{ marginBottom: '15px' }}>
                            <Select
                                defaultValue="Ensemble"
                                style={styles}
                            >
                                <MenuItem value="Ensemble">Ensemble</MenuItem>
                            </Select>
                        </FormControl>
                      
                        <InputLabel style={styles}>Default Value</InputLabel>
                        <FormControl fullWidth style={{ marginTop: '10px', marginBottom: '20px' }}>
                            <Select
                                defaultValue="1"
                                style={styles}
                            >
                                <MenuItem value="1">1</MenuItem>
                            </Select>
                        </FormControl>

                        <FormControl component="fieldset" style={{ marginBottom: '20px' }}>
                            <Typography style={styles}>Mandatory field</Typography>
                            <RadioGroup row>
                                <FormControlLabel
                                    value="yes"
                                    control={<Radio className="custom-radio" />}
                                    label={<Typography sx={commonStyles}>Yes</Typography>}
                                />
                                <FormControlLabel value="no" control={<Radio className="custom-radio" />} label={<Typography sx={commonStyles}>No</Typography>} sx={commonStyles} />
                            </RadioGroup>
                        </FormControl>

                        <Box display="flex" justifyContent="flex-start">
                            <Button variant="contained" color="primary" style={{ ...styles, marginRight: '10px', color: 'white' }}>
                                Submit
                            </Button>
                            <Button variant="outlined" style={styles}>
                                Refresh
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </DialogContent>

        </Dialog>
    );
};
const ListTable = () => {
    const [open, setOpen] = useState(false);
    const isMobile = useMediaQuery('(max-width:600px)');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Container sx={{
            background: 'white',
            borderRadius: '8px',
            maxWidth: '80% !important'
        }}>
            <Box sx={{ my: 4 }}>
                <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, '@media (min-width:600px)': { flexDirection: 'row', alignItems: 'center' } }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{
                        fontFamily: 'proxima_nova_regular, arial',
                        fontSize: '20px',
                        color: '#000',
                        fontWeight: 'normal',
                    }}>
                        List of Value Setup      </Typography>
                    <TextField
                        variant="outlined"
                        size="small"
                        placeholder="Search"
                        InputProps={{
                            startAdornment: <SearchIcon />,
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={handleOpen} sx={{
                        textTransform: 'none'
                    }}>
                        Create Master      </Button>
                </Toolbar>
                {/* <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} flexDirection={isMobile ? 'column' : 'row'}>
                    <Typography  style={{
                        fontFamily: 'proxima_nova_regular, arial',
                        fontSize: '20px',
                        color: '#000',
                        fontWeight: 'normal'
                    }}>List of Value Setup</Typography>
                    <Box display="flex" alignItems="center" gap={1} justifyContent={isMobile ? 'center' : 'end'}
                        mt={isMobile ? 2 : 0}
                        flexDirection={isMobile ? 'column' : 'row'}>
                        <TextField placeholder="Search" variant="outlined" size="small" InputProps={{ endAdornment: <SearchIcon /> }} />
                        <Button variant="contained" color="primary" fontSize='14px' onClick={handleOpen}>Create Master</Button>
                    </Box>
                </Box> */}
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        disableSelectionOnClick
                        sx={{
                            '& .header-style': {
                                backgroundColor: '#113e70',
                                color: '#fff',
                                fontSize: '14px',
                                fontWeight: 'bold',
                            },
                            '& .MuiDataGrid-cell': {
                                fontSize: '14px',
                                color: '#000',
                                fontWeight: 'normal',
                            },
                        }}
                    />
                </div>
            </Box>
            <CreateMasterModal open={open} handleClose={handleClose} />
        </Container>
    );
};

export default ListTable;
