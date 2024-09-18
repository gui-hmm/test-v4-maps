import { render } from '@testing-library/react';
import Map from '../components/map';
import '@testing-library/jest-dom';

test('renderiza o mapa com os marcadores', () => {
    const equipments = [
        {
            id: '1',
            equipmentModelId: 'model1', // Adicionado para atender à interface
            model: 'ModeloX',
            state: 'Operando',
            stateColor: '#2ecc71',
            productivity: 75,
            gains: 920,
            history: [
                { date: '2024-01-01T00:00:00Z', equipmentStateId: '0808344c-454b-4c36-89e8-d7687e692d57' }
            ],
            positionHistory: [
                { date: '2024-01-01T00:00:00Z', lat: -19.155124, lon: -45.996785 }
            ],
            stateHistory: [
                { date: '2023-09-18T10:00:00', stateName: 'Operando', stateColor: '#00FF00' },
            ],
            position: { lat: -19.155124, lon: -45.996785 },
            name: 'Equip 1'
        },
    ];

    const { getByTestId } = render(<Map equipments={equipments} />);
    expect(getByTestId('map')).toBeInTheDocument();
});
