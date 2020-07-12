import React from 'react';

// Components
import Header from './components/Header'
import Wall from './components/Wall'
import Form from './components/Form'

export default function App() {
  return (
    <>
    <img src="/imgs/logo-artgorithm.svg" alt="Artgorithm logo"/> 
      <div className="main-wrapper"> 
        <Wall/>
        <Form/>
      </div>
    </>
  );
}
