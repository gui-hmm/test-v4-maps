// Tipo para equipamentos
export interface Equipment {
    id: string;
    equipmentModelId: string;
    name: string;
}

// Tipos para estados e histórico de estados
export interface EquipmentState {
    id: string;
    name: string;
    color: string;
}

export interface EquipmentStateHistoryEntry {
    date: string; // Data no formato ISO 8601
    equipmentStateId: string;
}

export interface EquipmentStateHistory {
    equipmentId: string;
    states: EquipmentStateHistoryEntry[];
}

// Tipos para posições e histórico de posições
export interface EquipmentPositionHistoryEntry {
    date: string; // Data no formato ISO 8601
    lat: number;
    lon: number;
}

export interface EquipmentPositionHistory {
    equipmentId: string;
    positions: EquipmentPositionHistoryEntry[];
}

// Tipo para modelos de equipamentos
export interface EquipmentModel {
    id: string;
    name: string;
    hourlyEarnings: {
        equipmentStateId: string;
        value: number;
    }[];
}


// Tipo para equipamentos com detalhes
export interface EquipmentWithDetails extends Equipment {
    model: string;
    state: string;
    stateColor: string;
    productivity: number,
    gains: number,
    history: {
        date: string;
        equipmentStateId: string;
    }[];
    positionHistory: {
        date: string;
        lat: number;
        lon: number;
    }[];
    stateHistory: {
        date: string; 
        stateName: string; 
        stateColor: string;
    }[];
}


