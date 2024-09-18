import equipmentData from '../data/equipment.json';
import equipmentStateData from '../data/equipmentState.json';
import equipmentModelData from '../data/equipmentModel.json';
import equipmentStateHistoryData from '../data/equipmentStateHistory.json';
import equipmentPositionHistoryData from '../data/equipmentPositionHistory.json';
import { 
        EquipmentWithDetails, 
        EquipmentState, 
        EquipmentModel, 
        EquipmentStateHistoryEntry,
        EquipmentPositionHistoryEntry
    } from '../types/equipment';
    import { calculateProductivity, calculateGains } from '../utils/calculate';

export const getIntegratedEquipments = (): EquipmentWithDetails[] => {
    const equipmentStatesMap = new Map<string, EquipmentState>(
        equipmentStateData.map(state => [state.id, state])
    );

    const equipmentModelsMap = new Map<string, EquipmentModel>(
        equipmentModelData.map(model => [model.id, model])
    );

    const equipmentStateHistoriesMap = new Map<string, EquipmentStateHistoryEntry[]>(
        equipmentStateHistoryData.map(history => [history.equipmentId, history.states])
    );
    
    // Mapear o histórico de posições por ID de equipamento
    const equipmentPositionHistoriesMap = new Map<string, EquipmentPositionHistoryEntry[]>(
        equipmentPositionHistoryData.map(history => [history.equipmentId, history.positions])
    );

  // Integração dos dados
    return equipmentData.map(equipment => {
        const model = equipmentModelsMap.get(equipment.equipmentModelId);
        const stateHistory = equipmentStateHistoriesMap.get(equipment.id) || [];
        const positionHistory = equipmentPositionHistoriesMap.get(equipment.id) || [];
        
        const productivity = calculateProductivity(stateHistory, equipmentStatesMap);
        const gains = model ? calculateGains(stateHistory, model, equipmentStatesMap) : 0;

        const latestState = stateHistory[stateHistory.length - 1];
        const latestStateName = latestState ? equipmentStatesMap.get(latestState.equipmentStateId)?.name || 'Desconhecido' : 'Desconhecido';
        const latestStateColor = latestState ? equipmentStatesMap.get(latestState.equipmentStateId)?.color || '#ffffff' : '#ffffff';

        const detailedStateHistory = stateHistory.map(entry => ({
            date: entry.date,
            stateName: equipmentStatesMap.get(entry.equipmentStateId)?.name || 'Desconhecido',
            stateColor: equipmentStatesMap.get(entry.equipmentStateId)?.color || '#ffffff',
        }));

        return {
            ...equipment,
            model: model ? model.name : 'Desconhecido',
            state: latestStateName,
            stateColor: latestStateColor,
            productivity,
            gains,
            history: stateHistory,
            positionHistory: positionHistory,
            stateHistory: detailedStateHistory,
        };
    });
};
