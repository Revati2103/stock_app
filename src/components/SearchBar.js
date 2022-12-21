import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ handleChange, options, selectOption }) => {
  return (
    <div className={styles.searchBarWrapper}>
      <input className={styles.input} data-testid="searchbar" onChange={handleChange} />
      <div className={styles.optionsDropdown}>
        {options.map((opt) => (
          <p data-testid={opt?.id} onClick={() => selectOption(opt)} key={opt?.id}>
            {opt?.value}
          </p>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;