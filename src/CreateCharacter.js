import { useState, useEffect } from 'react';
import { getClass } from './services/fetch-utils';

export default function CreateCharacter({ classes }) {
  const [dClass, setDclass] = useState([]);
  const [classInput, setClassInput] = useState('');
  const [classQuery, setClassQuery] = useState('');

  async function storeClasses() {
    const data = await getClass(classQuery);
    console.log(data);
    console.log(data.results);
    setDclass(data.results);
  }
  

  useEffect(() => {
    storeClasses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {

    e.preventDefault();
    
    setClassQuery(classInput);
    
    const data = await getClass(classInput);
  
    setDclass(data.data.results);
    setClassInput('');
  
  }
 
  // async function handleSubmit(e) {
  //   e.preventDefault();

    
  //   const dnd = {
  //     name: name,
  //     dClass: dClass,
  //   };

  //   await CreateCharacter(dnd);
  //   push('/CreateCharacter');
  // }


  return (
    <><div>
      <form onSubmit={handleSubmit}>
        <label>Name<input></input></label>
        <label>Class
          <select required onChange={e => setDclass(e.target.value)}>
            {
              dClass.map((Dclass, i) => <option value={Dclass.data} className='selections' key = {Dclass.slug} > 
                {
                  Dclass.name
                }
                
              </option>)
            }
            <option value='barbarian'>Barbarian</option>
            <option value='bard'>Bard</option>
          </select></label>
        <button>Submit Selection</button>
      </form>
    </div>
    <div>

    </div></>

  );
}
