import React from 'react';
import './App.css';

// Components
import Header from './components/Header'
import Wall from './components/Wall'
import Form from './components/Form'

function App() {
  return (
    <div className="App">
      <Header/>
      <Wall/>
      <Form/>
    </div>
  );
}

export default App;
