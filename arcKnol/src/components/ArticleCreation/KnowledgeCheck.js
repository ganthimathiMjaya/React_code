import React from 'react';
import { Container, Typography, TextField, CssBaseline, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'proxima_nova_regular, arial',
    fontSize: 14,
    color: '#000',
    fontWeight: 'normal',
  },
});

const KnowledgeCheckForm = () => {
  return (
    <Box
      bgcolor='white'
      margin={2}
    >
      <Container maxWidth="md" >
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Do you need to create a Knowledge Check?</FormLabel>
                <RadioGroup row>
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
              <TextField
                label="How many Question required?"
                type="number"
                fullWidth
                variant="outlined"
                margin="normal"
              />
              <Typography variant="h6" gutterBottom>
                Question 1
              </Typography>
              <Typography variant="body1" gutterBottom>
                You can safely enter credit card or other personal information on a website where browser show a:
              </Typography>
              <RadioGroup>
                <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                <FormControlLabel value="option4" control={<Radio />} label="Option 4" />
              </RadioGroup>
            </Box>
          </Container>
        </ThemeProvider>
      </Container>
    </Box>
  );
};

export default KnowledgeCheckForm;
