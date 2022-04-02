import React from 'react';
import ChartContainer from './components/ChartContainer';
import styles from './App.module.css';

const App = () => {
  return (
    <div class={styles.mainApp}>
      <ChartContainer />
    </div>
  );
};

export default App;
