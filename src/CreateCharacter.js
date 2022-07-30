import { useState, useEffect } from 'react';
import { checkError } from './services/client';
import { getClass } from './services/fetch-utils';
import { getRace } from './services/fetch-utils';
import { createCharacter, getCamp } from './services/fetch-utils';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DieRoll from './DieRoll';

export default function CreateCharacter() {
  // this naming seems a little easier for me to follow. Mysterious names like dRace and dClass would make this codebase a challenge for future coders to maintain.
  const [allClasses, setAllClasses] = useState([]);
  const [allRaces, setAllRaces] = useState([]);
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

    setAllRaces(data.results);
  }

  async function storeClasses() {
    const data = await getClass(classQuery);
   
    setAllClasses(data.results);
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
    setAllRaces(rdata.results);
    setAllClasses(data.results); //this could be an issue
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
      <DieRoll />
      <form className='createchar-form' onSubmit={handleSubmit}>
        <label>
            Name:  <input id='name-input' value={name} onChange = {e => setName(e.target.value)}/ >      
        </label>
        <br></br>
        <label>
            Class:  
          <select id='class-select' required onChange={e => setClassInput(e.target.value)}>
            <option value={null}></option> 
            {
              allClasses.map((Dclass) => <option value={Dclass.data} className='class-selection' key = {Dclass.slug} > 
                {
                  Dclass.name
                }
              </option>)
            }
          </select>
        </label>
        <br></br>
        <label>
            Race:   
          <select id='race-select' onChange={e => setRaceInput(e.target.value)}>
            <option value={null}></option>
            {
              allRaces.map((race) =>
                <option 
                  value={race.data} 
                  className='race-selection' 
                  key={race.slug}>
                  {race.name}
                </option>)
            }
          </select>
        
        </label>
        {/* these labels are not doing anything if they do not wrap the input tag as well, like so. This way, you can now click on the word Strength to draw focus to the input. */}
        <label>
          Strength
          <input id='str' value={strength} onChange={e => setStrength (e.target.value)} />
        </label>
        <label>Dexterity</label>
        <input id='dex' value={dexterity} onChange={e => setDexterity (e.target.value)} />
        <label>Constitution</label>
        <input id='con' value={constitution} onChange={e => setConstitution (e.target.value)} />
        <label>Intelligence</label>
        <input id='int' value={intelligence} onChange={e => setIntelligence (e.target.value)} />
        <label>Wisdom</label>
        <input id='wis' value={wisdom} onChange={e => setWisdom (e.target.value)} />
        <label>Charisma</label>
        <input id='cha' value={charisma} onChange={e => setCharisma (e.target.value)} />
        <label>Campaign
          <select id='camp-select' onChange={e => setCurrentCampaign(e.target.value)}>
            <option value={null}></option> 
            {
              // be careful about capitalization--capitalized words have a specific meaning in javascript that you are not pointing to here
              campaign.map((camp) => <option value={camp.id} className='camp-selection' key={camp.id + camp.campaign} > 
                {
                  camp.campaign
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
