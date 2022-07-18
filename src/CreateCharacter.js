import { useState, useEffect } from 'react';

export default function CreateCharacter() {
  const [dclass, setDclass] = useState([]);
  const [classInput, setClassInput] = useState('');
  const [classQuery, setClassQuery] = useState('');

  async function storeClasses() {
    const data = await getClass(classQuery);

    setDclass(data);

  }
  
  useEffect(() => {
    storeClasses();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    
    const dnd = {
      name: name,
      dClass: dClass,
    };

    await CreateCharacter(dnd);
    push('/CreateCharacter');
  }


  return (
    <div>
      <form>
        <label>Name<input></input></label>
        <label>Class
          <select required onChange={e => setDclass(e.target.value)}>
            <option value='barbarian'>Barbarian</option>
            <option value='bard'>Bard</option>                    
          </select></label>
          <button>Submit Selection</button>
      </form>
    </div>
  );
}
