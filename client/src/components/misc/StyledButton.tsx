import React from 'react';
import Button from '@mui/material/Button';

interface StyledButtonProps {
  label: string;
  upperCase?: boolean;
  styles?: object;
  disabled?: boolean;
  onClick: () => void;
}

const StyledButton = ({
  label,
  upperCase,
  styles,
  disabled,
  onClick,
}: StyledButtonProps) => {
  return (
    <Button
      variant='text'
      disabled={disabled}
      onClick={onClick}
      sx={{
        textTransform: upperCase ? 'uppercase' : 'none',
        backgroundColor: 'primary.dark',
        color: 'secondary.light',
        '&:hover': {
          backgroundColor: 'primary.light',
        },
        ...styles,
      }}
    >
      {label}
    </Button>
  );
};

export default StyledButton;
