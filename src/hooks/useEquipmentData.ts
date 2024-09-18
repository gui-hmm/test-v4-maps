import { useEffect, useState } from 'react';
import { Equipment } from '../types/equipment';

export const useEquipmentData = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);

    useEffect(() => {
    // Simulação de leitura do arquivo JSON
        const fetchData = async () => {
            const response = await fetch('/data/equipments.json');
            const data = await response.json();
            setEquipments(data);
        };

        fetchData();
    }, []);

    return equipments;
};
