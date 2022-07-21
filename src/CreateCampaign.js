import { waitFor } from '@testing-library/react';
import React from 'react';
import { getCamp } from './services/fetch-utils';

export default function CreateCampaign() {
  async function storeCamp() {
    const data = await getCamp();
  }
  return (
    
    <div>CreateCampaign</div>
  );
}

