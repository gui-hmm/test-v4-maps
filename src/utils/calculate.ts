// utils/calculate.ts
import { EquipmentStateHistoryEntry, EquipmentModel, EquipmentState } from '../types/equipment';

// Função para calcular a produtividade
export const calculateProductivity = (stateHistory: EquipmentStateHistoryEntry[], equipmentStatesMap: Map<string, EquipmentState>): number => {
    const totalHours = 24; // Total de horas em um dia
    const operatingState = 'Operando'; // Estado que conta como produtivo

    // Filtrar o histórico de estados para encontrar o tempo em estado "Operando"
    const operatingHours = stateHistory
        .filter(entry => equipmentStatesMap.get(entry.equipmentStateId)?.name === operatingState)
        .length;

    // Calcular a produtividade como a porcentagem de horas operando em relação ao total
    const productivity = (operatingHours / totalHours) * 100;

    return productivity;
};

// Função para calcular os ganhos
export const calculateGains = (stateHistory: EquipmentStateHistoryEntry[], model: EquipmentModel, equipmentStatesMap: Map<string, EquipmentState>): number => {
    let totalGains = 0;

    // Iterar pelo histórico de estados e calcular o ganho com base no valor/hora para cada estado
    for (const entry of stateHistory) {
        const hourlyRate = model.hourlyEarnings.find(e => e.equipmentStateId === entry.equipmentStateId)?.value || 0;

        totalGains += hourlyRate; // Adicionar o valor por hora ao total de ganhos
    }

    return totalGains;
};
