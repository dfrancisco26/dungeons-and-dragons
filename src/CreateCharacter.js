import { useState, useEffect } from 'react';
import { getClass } from './services/fetch-utils';
import { getRace } from './services/fetch-utils';
export default function CreateCharacter() {
  const [dClass, setDclass] = useState([]);
  const [dRace, setDrace] = useState([]);
  const [classInput, setClassInput] = useState('');
  const [classQuery, setClassQuery] = useState('');
  const [raceInput, setRaceInput] = useState('');
  const [raceQuery, setRaceQuery] = useState('');

  async function storeRaces() {
    const data = await getRace(raceQuery);

    setDrace(data.results);
  }

  async function storeClasses() {
    const data = await getClass(classQuery);
   
    setDclass(data.results);
  }
  

  useEffect(() => {
    storeClasses();
    storeRaces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // might need separate useEffect for races

  async function handleSubmit(e) {

    e.preventDefault();
    
    setClassQuery(classInput);
    setRaceQuery(raceInput);
    const data = await getClass(classInput);
    const rdata = await getRace(raceInput);
    setDrace(rdata.data.results);
    setDclass(data.data.results); //this could be an issue
    setClassInput('');
    setRaceInput('');
    console.log(rdata);
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
