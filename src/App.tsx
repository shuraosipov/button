import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button buttonLabel="Click me!" />
        
      </header>
      
      
      
    </div>
  );
}

export default App;
