import React from 'react';
import { Switch } from '@mui/material';
import { styled } from '@mui/system';

export const IOSSwitch = styled(() => (
  <Switch focusVisibleClassName=".Mui-focusVisible" />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor:
          theme.palette.mode === 'dark' ? '#2ECA45' : theme.palette.primary,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    // @ts-ignore
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

export const StyledH2 = styled('h2')`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme?.palette?.surface?.black};
`;

export const StyledH3 = styled('h3')`
  color: #000000;
  font-size: 16px;
  font-weight: 400;
  text-transform: uppercase;
`;

export const StyledP = styled('p')`
  color: ${({ theme }) => theme?.palette?.surface?.dark};
  font-size: 16px;
  line-height: 24px;
`;

export const textField = styled((theme) => ({
  textField: {
      '& .MuiInputBase-root': {
          padding: '8px 12px', 
      },
  },
}));


