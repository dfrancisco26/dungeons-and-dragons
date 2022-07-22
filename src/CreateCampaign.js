import { waitFor } from '@testing-library/react';
import React from 'react';
import { getCamp, getPlayers } from './services/fetch-utils';

export default function CreateCampaign() {
  async function storeCamp() {
    const data = await getCamp();
  }
  async function getPlayer() {
    const data = await getPlayers();
  }
  return (
    
    <><div className='campHeader'>CreateCampaign</div><div>

      <div>
        <p>{data.campaign}</p>
      </div>
    </div></>
  );
}

