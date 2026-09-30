import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Dialog, TextField, DialogTitle, Toolbar, DialogContent, DialogActions, Container, Button, Typography, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';


const columns = [
    { field: 'id', headerName: 'Article ID', width: 150, headerClassName: 'header-style' },
    { field: 'articleName', headerName: 'Article Name', width: 180, headerClassName: 'header-style' },
    { field: 'articledescription', headerName: 'Article Description', width: 180, headerClassName: 'header-style' },	
    { field: 'validity', headerName: 'Validity', width: 180, headerClassName: 'header-style' },
    { field: 'createdby', headerName: 'Created By', width: 180, headerClassName: 'header-style' },
    { field: 'createdOn', headerName: 'Created On', width: 180, headerClassName: 'header-style' },
    { field: 'status', headerName: 'Status', width: 150, headerClassName: 'header-style' },
    {
        field: 'action',
        headerName: 'Action',
        width: 300,
        headerClassName: 'header-style',
        renderCell: (params) => (
            <Box display="flex" justifyContent="space-between" width="90%">
                <Button variant="contained" sx={{
                    border: 'none',
                    padding: '4px 18px',
                    background: '#113e70',
                    color: '#fff',
                    textTransform: 'none',
                    borderRadius: '3px'
                }} size="small">View</Button>
                <Button variant="contained" sx={{
                    border: 'none',
                    padding: '4px 18px',
                    background: '#1fbd72',
                    textTransform: 'none',
                    color: '#fff',
                    borderRadius: '3px'
                }} size="small">Approval</Button>
                <Button variant="contained" sx={{
                    border: 'none',
                    padding: '4px 18px',
                    background: '#dd2a26',
                    textTransform: 'none',
                    color: '#fff',
                    borderRadius: '3px'
                }} size="small">Reject</Button>
            </Box>
        ),
    },
];

const rows = [
    { id: 1, articleName: 'Article 1', articledescription: 'Description 1', validity: '30-06-2024', createdby: 'Ganthi', createdOn: '25-3-2024', status: 'Pending' },
    { id: 2, articleName: 'Article 2', articledescription: 'Description 2', validity: '30-06-2024', createdby: 'Gowsi', createdOn: '26-3-2024', status: 'Approved' },
    { id: 3, articleName: 'Article 3', articledescription: 'Description 3', validity: '30-06-2024', createdby: 'Gaya', createdOn: '27-3-2024', status: 'Rejected' },
    { id: 4, articleName: 'Article 4', articledescription: 'Description 4', validity: '30-06-2024', createdby: 'Ganthi', createdOn: '25-3-2024', status: 'Pending' },
    { id: 5, articleName: 'Article 5', articledescription: 'Description 5', validity: '30-06-2024', createdby: 'Ganthi', createdOn: '25-3-2024', status: 'Approved' },
    { id: 6, articleName: 'Article 6', articledescription: 'Description 6', validity: '30-06-2024', createdby: 'Ganthi', createdOn: '25-3-2024', status: 'Rejected' },
    { id: 7, articleName: 'Article 7', articledescription: 'Description 7', validity: '30-06-2024', createdby: 'Kathir', createdOn: '28-3-2024', status: 'Pending' },
];

const ApprovalTable = () => {
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
            maxWidth: '95% !important'
        }}>
            <Box sx={{ my: 4 }}>
                <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, '@media (min-width:600px)': { flexDirection: 'row', alignItems: 'center' } }}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{
                        fontFamily: 'proxima_nova_regular, arial',
                        fontSize: '20px',
                        color: '#000',
                        fontWeight: 'normal'
                    }}>
                        Article Approval     </Typography>
                  
                </Toolbar>
                <div style={{ height: 400, width: '100%'}}>
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
        </Container>
    );
};

export default ApprovalTable;
