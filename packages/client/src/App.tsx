import React, { MouseEventHandler } from 'react';
import './App.css';


interface ButtonProps {
  title: string;
  callback: MouseEventHandler<HTMLDivElement>;
};

const TVInput1Enable = (event: React.MouseEvent<HTMLDivElement>) => {
  
}

const Button = ({title, callback}: ButtonProps) => {
  return (
    <div onClick={callback}>
      <p>{title}</p>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <section id="switch">
        <Button title="Input 1" callback={TVInput1Enable} />
      </section>
      <section id="tv">

      </section>
    </div>
  );
}

export default App;
