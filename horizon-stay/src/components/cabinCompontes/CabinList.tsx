'use client';
import React from 'react';
import { cabins } from '../../data/cabins';
import CabinCard from './CabinCard';

const CabinList: React.FC = () => {
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {cabins.map((cabin) => (
        <CabinCard key={cabin.id} cabin={cabin}/>
      ))}
    </div>
  );
};

export default CabinList;
