import React, { useState } from 'react';
import { 
  Paper, 
  InputBase, 
  IconButton, 
  Box 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch('');
  };

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Paper 
        component="form" 
        onSubmit={handleSearchSubmit}
        sx={{ 
          p: '2px 4px', 
          display: 'flex', 
          alignItems: 'center',
          width: '100%',
          boxShadow: 2,
          borderRadius: 2
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search events by name, location, or description..."
          inputProps={{ 'aria-label': 'search events' }}
          value={searchValue}
          onChange={handleSearchChange}
        />
        {searchValue && (
          <IconButton 
            sx={{ p: '10px' }} 
            aria-label="clear" 
            onClick={handleClearSearch}
          >
            <ClearIcon />
          </IconButton>
        )}
        <IconButton 
          type="submit" 
          sx={{ p: '10px' }} 
          aria-label="search"
          color="primary"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
