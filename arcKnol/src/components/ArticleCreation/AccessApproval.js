import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import { DataGrid } from '@mui/x-data-grid';
import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import {
    TextField,
    Button,
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Divider, CssBaseline, Container, createTheme
} from '@mui/material';

const services = [
    'Operations - Patient Collections',
    'Operations - Clinical Denial Non Voice',
    'Operations - Scheduling Services',
    'Operations - Clinical Denial Non Voice',
];

const MUI_X_PRODUCTS = [
    {
        id: 'grid',
        label: 'Data Grid',
        children: [
            { id: 'grid-community', label: '@mui/x-data-grid' },
            { id: 'grid-pro', label: '@mui/x-data-grid-pro' },
            { id: 'grid-premium', label: '@mui/x-data-grid-premium' },
        ],
    },
    {
        id: 'pickers',
        label: 'Date and Time Pickers',
        children: [
            { id: 'pickers-community', label: '@mui/x-date-pickers' },
            { id: 'pickers-pro', label: '@mui/x-date-pickers-pro' },
        ],
    },
    {
        id: 'charts',
        label: 'Charts',
        children: [{ id: 'charts-community', label: '@mui/x-charts' }],
    },
    {
        id: 'tree-view',
        label: 'Tree View',
        children: [{ id: 'tree-view-community', label: '@mui/x-tree-view' }],
    },
];

const AccessApproval = () => {
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
    const { control, handleSubmit, setValue, getValues, watch } = useForm({
        defaultValues: {
            globalArticle: 'no',
            client: 'Ensemble',
            accessType: 'service',
            selectedServices: [],
            articlePath: 'Ensemble > Pre Authorization',
            approvalType: 'external',
            internalApprovalUser: '',
            externalApprovalBy: '',
            emailId: '',
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    const addService = () => {
        const selectedService = watch('availableService');
        const selectedServices = getValues('selectedServices');
        if (selectedService && !selectedServices.includes(selectedService)) {
            setValue('selectedServices', [...selectedServices, selectedService]);
        }
    };

    const rows = [
        { id: 1, clientName: 'Ensemble', services: 'Denial +3', approvalType: 'External', internalApprovalUser: '', externalApprovalBy: '', emailId: '' },
    ];

    const columns = [
        { field: 'clientName', headerName: 'Client Name', width: 150 },
        { field: 'services', headerName: 'Services', width: 150 },
        { field: 'approvalType', headerName: 'Approval Type', width: 150 },
        { field: 'internalApprovalUser', headerName: 'Internal Approval User', width: 150, editable: true },
        { field: 'externalApprovalBy', headerName: 'External Approval by', width: 150, editable: true },
        { field: 'emailId', headerName: 'Email ID', width: 200, editable: true },
    ];

    return (
        <Box
            bgcolor='white'
            margin={3}
        >
            <Container maxWidth="md" >
                <CssBaseline />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Typography>Do you want to create a Global Article?</Typography>
                            <Controller
                                name="globalArticle"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup {...field} row>
                                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio />} label="No" />
                                    </RadioGroup>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="client-label">Client</InputLabel>
                                <Controller
                                    name="client"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} labelId="client-label" label="Client" size="small"
                                        >
                                            <MenuItem value="Ensemble">Ensemble</MenuItem>
                                            {/* Add other client options here */}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Do you want to Provide access by Service or Functionality?</Typography>
                            <Controller
                                name="accessType"
                                control={control}
                                render={({ field }) => (
                                    <RadioGroup {...field} row>
                                        <FormControlLabel value="functionality" control={<Radio />} label="Functionality" />
                                        <FormControlLabel value="service" control={<Radio />} label="Service" />
                                    </RadioGroup>
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel id="services-label">Services</InputLabel>
                                <Controller
                                    name="availableService"
                                    control={control}
                                    render={({ field }) => (
                                        <Select {...field} labelId="services-label" label="Services" size="small"
                                        >
                                            {services.map((service, index) => (
                                                <MenuItem key={index} value={service}>
                                                    {service}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" color="primary" onClick={addService} fullWidth>
                                Add
                            </Button>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <Typography>Selected Services</Typography>
                            <List>
                                {watch('selectedServices').map((service, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={service} />
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Article Path</Typography>
                            <RichTreeView items={MUI_X_PRODUCTS} />
                        </Grid>

                        <Grid item xs={12}>
                            <Divider />
                        </Grid>
                        <Grid item xs={12} style={{ height: 400 }}>
                            <DataGrid rows={rows} columns={columns} />
                        </Grid>
                        <Grid item xs={12} sm={6} />
                    </Grid>
                </form>
            </Container>
        </Box>
    );
};


export default AccessApproval;