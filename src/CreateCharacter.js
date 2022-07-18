import { useState } from 'react';

export default function CreateCharacter() {
  const [dclass, setDclass] = useState('');

  return (
    <div>
      <form>
        <label>Name<input></input></label>
        <label>Class
          <select required onChange={e => setDclass(e.target.value)}>
            <option value='barbarian'>Barbarian</option>
            <option value='bard'>Bard</option>                    
          </select></label>
      </form>
    </div>
  );
}
