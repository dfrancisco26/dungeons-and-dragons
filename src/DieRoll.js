import React, { useState } from 'react';
import randomizer from './assets/randomizer.png';

export default function DieRoll() {
  const [result, setResult] = useState();

  // cool, nice use of state
  const handleDieClick = (() => setResult(Math.floor(Math.random() * 20) + 1));

  return (
    <div id='die-roll'>
      <img id='randomizer' onClick={handleDieClick} src={randomizer} />
      <h3 id='die-result'>{result}</h3>
    </div>
  );
}
