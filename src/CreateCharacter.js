import { useState, useEffect } from 'react';
import { checkError } from './services/client';
import { getClass } from './services/fetch-utils';
import { getRace } from './services/fetch-utils';
import { createCharacter, getCamp } from './services/fetch-utils';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function CreateCharacter() {
  const [dClass, setDclass] = useState([]);
  const [dRace, setDrace] = useState([]);
  const [classInput, setClassInput] = useState('barbarian');
  const [classQuery, setClassQuery] = useState('');
  const [raceInput, setRaceInput] = useState('dwarf');
  const [raceQuery, setRaceQuery] = useState('');
  const [name, setName] = useState('');
  const [strength, setStrength] = useState(1);
  const [dexterity, setDexterity] = useState(1);
  const [constitution, setConstitution] = useState(1);
  const [intelligence, setIntelligence] = useState(1);
  const [wisdom, setWisdom] = useState(1);
  const [charisma, setCharisma] = useState(1);
  const [open, setOpen] = useState(false);
  const [campaign, setCampaign] = useState([]);
  const [campQuery, setCampQuery] = useState('');
  const [currentCampaign, setCurrentCampaign] = useState(1);
  const { push } = useHistory();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };




  const sheet = {
    name: name,
    class: classInput,
    race: raceInput,
    strength: strength,
    dexterity: dexterity,
    constitution: constitution,
    intelligence: intelligence,
    wisdom: wisdom,
    charisma: charisma,
    campaign: currentCampaign
  
  };

  async function storeCamp() {
    const data = await getCamp(campQuery);
    setCampaign(data);
  }
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
    storeCamp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function handleSubmit(e) {

    e.preventDefault();
    
    setClassQuery(classInput);
    setRaceQuery(raceInput);
    const data = await getClass(classInput);
    const rdata = await getRace(raceInput);
    setDrace(rdata.results);
    setDclass(data.results);
    setOpen(true);
    setClassInput('');
    setRaceInput('');
    setName('');
    setStrength(1);
    setDexterity(1);
    setIntelligence(1);
    setConstitution(1);
    setWisdom(1);
    setCharisma(1);
    setCurrentCampaign(1);
    setCampQuery();

    

    const response = await createCharacter(sheet);
    push('/profile');
    return checkError(response);
  }


  return (
    <div>
      <form className='createchar-form' onSubmit={handleSubmit}>
        <label>Name:  <input id='name-input' value={name} onChange = {e => setName(e.target.value)}></input></label>
        <br></br>
        <label>Class:  
          <select id='class-select' required onChange={e => setClassInput(e.target.value)}>
            <option value={null}></option> 
            {
              dClass.map((Dclass) => <option value={Dclass.data} className='class-selection' key = {Dclass.slug} > 
                {
                  Dclass.name
                }
              </option>)
            }
          </select></label>
        <br></br>
        <label>Race:   
          <select id='race-select' onChange={e => setRaceInput(e.target.value)}>
            <option value={null}></option>
            {
              dRace.map((Drace) => <option value={Drace.data} className='race-selection' key = {Drace.slug} >
                {
                  Drace.name
                }
              </option>)
            }
          </select>
        </label>
        <label>Strength</label>
        <input id='str' value={strength} onChange={e => setStrength (e.target.value)}></input>
        <label>Dexterity</label>
        <input id='dex' value={dexterity} onChange={e => setDexterity (e.target.value)}></input>
        <label>Constitution</label>
        <input id='con' value={constitution} onChange={e => setConstitution (e.target.value)}></input>
        <label>Intelligence</label>
        <input id='int' value={intelligence} onChange={e => setIntelligence (e.target.value)}></input>
        <label>Wisdom</label>
        <input id='wis' value={wisdom} onChange={e => setWisdom (e.target.value)}></input>
        <label>Charisma</label>
        <input id='cha' value={charisma} onChange={e => setCharisma (e.target.value)}></input>
        <label>Campaign
          <select id='camp-select' onChange={e => setCurrentCampaign(e.target.value)}>
            <option value={null}></option> 
            {
              campaign.map((Camp) => <option value={Camp.id} className='camp-selection' key={Camp.id + Camp.campaign} > 
                {
                  Camp.campaign
                }
              </option>)
            }
          </select>
        </label>
        <br></br>
        
        <Button variant="contained" sx={{ backgroundColor: 'DarkSlateGray', color: 'antiquewhite' }} onClick={handleSubmit}>
        Submit
        </Button>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          You successfully created a character!
          </Alert>
        </Snackbar>
      </form>
    </div>

  );
}
