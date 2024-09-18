import React from "react";
import { EquipmentWithDetails } from "../types/equipment";

interface FilterProps {
    equipments: EquipmentWithDetails[]; 
    setFilteredEquipments: (equipments: EquipmentWithDetails[]) => void; 
}

const Filter: React.FC<FilterProps> = ({ equipments, setFilteredEquipments }) => {
    const [selectedModel, setSelectedModel] = React.useState<string>("");

    const filterByModel = (model: string) => {
        setSelectedModel(model);

        if (model === "") {
            setFilteredEquipments(equipments); 
        } else {
            const filtered = equipments.filter((equipment) => equipment.model === model);
            setFilteredEquipments(filtered);
        }
    };

    return (
        <div>
            <select onChange={(e) => filterByModel(e.target.value)} value={selectedModel}>
                <option value="">Todos os Modelos</option>
                <option value="Caminhão de carga">Caminhão de carga</option>
                <option value="Harvester">Harvester</option>
                <option value="Garra traçadora">Garra traçadora</option>
            </select>
        </div>
    );
};

export default Filter;
