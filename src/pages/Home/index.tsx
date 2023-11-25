import React, { FC } from 'react';
import Button from '../../components/Button';

const Home: FC = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Button variant="primary" onClick={handleClick}>
        Click me!
      </Button>
    </div>
  );
};

export default Home;