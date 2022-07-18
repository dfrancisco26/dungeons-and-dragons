import { useState, useEffect } from 'react';
import { getClass } from './services/fetch-utils';

export default function CreateCharacter() {
  const [dClass, setDclass] = useState([]);
  const [classInput, setClassInput] = useState('');
  const [classQuery, setClassQuery] = useState('');

  async function storeClasses() {
    const data = await getClass(classQuery);
   
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
  
    setDclass(data.data.results); //this could be an issue
    setClassInput('');
  
  }



  return (
    <><div>
      <form onSubmit={handleSubmit}>
        <label>Name<input></input></label>
        <label>Class
          <select required onSubmit={e => setDclass(e.target.value)}>
            {
              dClass.map((Dclass) => <option value={Dclass.data} className='selections' key = {Dclass.slug} > 
                {
                  Dclass.name
                }
              </option>)
            }
          </select></label>
        <button>Submit Selection</button>
      </form>
    </div>
    <div>

    </div></>

  );
}
