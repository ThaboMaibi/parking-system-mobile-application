import * as React from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);

  return (
    <Searchbar
      placeholder="Search"
      onChangeText={onChangeSearch}
      value={searchQuery}
      style={{width:'96%',margin:'2%'}}
    />
  );
};

export default SearchBar;