import React from 'react';
import Button from '@mui/material/Button';

export default function MainText() {
    return (
        <div className="flex flex-col items-center justify-center my-20 px-10">
            <h1 className="text-center text-4xl font-extrabold text-gray-900 mb-8">
                Sick of spending lunch break alone?<br />
                Want to easily find friends to hang out with during free periods?
            </h1>
            <Button
                variant="contained"
                sx={{
                    backgroundColor: 'crimson',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#a80000', // Darker shade for hover effect
                    },
                }}
            >
                Sign Up
            </Button>
        </div>
    );
}
