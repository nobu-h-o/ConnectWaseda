import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

const navItems = {
  '/about': {
    name: 'About Us',
  },
  '/FAQ': {
    name: 'FAQ',
  },
  '/Contact': {
    name: 'Contact',
  },
  '/login': {
    name: 'Login',
  },
};


export default function Header() {
  return (
    <div>
        <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        className="z-50"
        >
        <Toolbar className="flex justify-between items-center my-3">
            <Link key={'/'} href={'/'}>
                <Typography variant="h3" component="div" className="text-white">
                    Waseders Unite
                </Typography>
            </Link>
            <div className="flex items-center space-x-10">
            {Object.entries(navItems).map(([path, { name }]) => (
                <Link
                key={path}
                href={path}
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center relative py-1 px-2 text-white"
                >
                {name}
                </Link>
            ))}
            <Button variant="contained" color="primary" sx={{
                    backgroundColor: 'crimson',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#a80000', 
                    },
                }}>
                Sign Up
            </Button>
            </div>
        </Toolbar>
        </AppBar>
    </div>
  );
}
