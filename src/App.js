import React from 'react';

// Components
import Header from './components/Header';
import Wall from './components/Wall';
import Form from './components/Form';

export default function App() {
  return (
    <>
      <Header />
      <div className='main test'>
        <Wall />
        <Form />
      </div>
    </>
  );
}
