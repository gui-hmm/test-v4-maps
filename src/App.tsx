import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header';
import Map from './components/map';
import { getIntegratedEquipments } from './services/dataService';
import { EquipmentWithDetails } from './types/equipment';

const App: React.FC = () => {
  const [equipments, setEquipments] = useState<EquipmentWithDetails[]>([]);
  const [filteredEquipments, setFilteredEquipments] = useState<EquipmentWithDetails[]>([]);

  useEffect(() => {
        const loadAndIntegrateData = async () => {
          const integratedData = await getIntegratedEquipments();
          setEquipments(integratedData);
          setFilteredEquipments(integratedData);
        };
    
        loadAndIntegrateData();
      }, []);

  return (
    <div className="App">
      <Header
        equipments={equipments} 
        setFilteredEquipments={setFilteredEquipments} 
      />
      <Map equipments={filteredEquipments} />
    </div>
  );
};

export default App;

