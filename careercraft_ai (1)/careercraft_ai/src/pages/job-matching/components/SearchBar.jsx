import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange, onSearch }) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSearch(localQuery);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setLocalQuery(value);
    onSearchChange(value);
  };

  const handleClear = () => {
    setLocalQuery('');
    onSearchChange('');
    onSearch('');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <Icon name="Search" size={16} className="text-muted-foreground" />
          </div>
          <Input
            type="text"
            placeholder="Search jobs by title, company, or keywords..."
            value={localQuery}
            onChange={handleInputChange}
            className="pl-10 pr-10"
          />
          {localQuery && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
        
        <Button
          type="submit"
          variant="default"
          iconName="Search"
          iconPosition="left"
        >
          Search
        </Button>
      </form>
      {/* Quick Search Suggestions */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="text-xs text-muted-foreground">Popular searches:</span>
        {[
          'Frontend Developer',
          'Product Manager',
          'Data Scientist',
          'UX Designer',
          'DevOps Engineer'
        ]?.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setLocalQuery(suggestion);
              onSearchChange(suggestion);
              onSearch(suggestion);
            }}
            className="px-2 py-1 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground text-xs rounded-md transition-colors"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;