import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Button,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Chip,
    Box,
    FormControl,
    Typography,
    CssBaseline, Container
} from '@mui/material';
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from '@mui/system';
import { Editor } from '@tinymce/tinymce-react';
import './ArticleTable.css'; 


const useStyles = styled((theme) => ({
    textField: {
        '& .MuiInputBase-root': {
            padding: '2px 6px',
        },
    },
}));

const tags = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
];

const FormComponent = () => {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const classes = useStyles();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Box
            bgcolor='white'
            my={3}
        >
            <Container maxWidth="md" >
                <CssBaseline />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography fontSize='14px' gutterBottom>
                                Article Title
                            </Typography>
                            <Controller
                                name="articleTitle"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        className={classes.textField}
                                        error={!!errors.articleTitle}
                                        helperText={errors.articleTitle ? 'This field is required' : ''}
                                    />
                                )}
                                rules={{ required: 'Article Title is required' }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontSize='14px' gutterBottom>
                                Source of Update
                            </Typography>
                            <Controller
                                name="sourceOfUpdate"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        size="small"
                                        {...field}
                                        fullWidth
                                        className={classes.textField}
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontSize='14px' gutterBottom>
                                Article Received Date
                            </Typography>
                            <Controller
                                name="articleTitle"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        className={classes.textField}
                                        error={!!errors.articleTitle}
                                        helperText={errors.articleTitle ? 'This field is required' : ''}
                                    />
                                )}
                                rules={{ required: 'Article Title is required' }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Typography fontSize='14px' gutterBottom>
                                Article Validity
                            </Typography>
                            <Controller
                                name="sourceOfUpdate"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField type="date" size="small"
                                        InputLabelProps={{ shrink: true }} fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography fontSize='14px' gutterBottom>
                                End Date
                            </Typography>
                            <Controller
                                name="articleReceivedDate"
                                control={control}
                                defaultValue={null}
                                render={({ field }) => (
                                    <TextField type="date" size="small"
                                        InputLabelProps={{ shrink: true }} fullWidth />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography fontSize='14px' gutterBottom>
                                Attachment
                            </Typography>
                            <Controller
                                name="attachment"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="file"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography fontSize='14px' gutterBottom>
                                Article Cover Image
                            </Typography>
                            <Controller
                                name="attachment"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type="file"
                                        fullWidth
                                        size="small"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {/* <Controller
                                name="articleCoverImage"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Article Cover Image"
                                        type="file"
                                        fullWidth
                                        variant="outlined"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                            /> */}
                        </Grid>
                        <Grid item xs={12}>
                            <Typography fontSize='14px' gutterBottom>
                                Tags
                            </Typography>
                            <Controller
                                name="tags"
                                control={control}
                                defaultValue={[]}
                                render={({ field }) => (
                                    <Autocomplete
                                    fullWidth
                                    multiple
                                    size='small'
                                    id="multiple-limit-tags"
                                    options={tags}
                                    getOptionLabel={(option) => option.title}
                                    renderInput={(params) => <TextField {...params} placeholder="" />}
                                />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Box>
                                <Editor
                                    apiKey="6io2mjl5fyu6gxtrskojykr57qwotn3p2wkok2hrd1m46msu"
                                    initialValue=""
                                    init={{
                                        height: 300,
                                        menubar: false,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | bold italic backcolor | \
                    alignleft aligncenter alignright alignjustify | \
                    bullist numlist outdent indent | removeformat | help'
                                    }}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Box>
    );
};

export default FormComponent;