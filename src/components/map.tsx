import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, LoadScript } from '@react-google-maps/api';
import { EquipmentWithDetails  } from '../types/equipment';

interface MapProps {
    equipments: EquipmentWithDetails [];
}

const Map: React.FC<MapProps> = ({ equipments }) => {
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentWithDetails  | null>(null);
    const [hoveredEquipment, setHoveredEquipment] = useState<EquipmentWithDetails | null>(null);

    const [mapCenter] = useState({ lat: -19.155124, lng: -45.996785 });

    const mapContainerStyle = { width: '100%', height: '100vh' };
    const options = { disableDefaultUI: true, zoomControl: true };

    const getLastPosition = (positionHistory: { date: string; lat: number; lon: number; }[]): { lat: number; lon: number } | null => {
        if (positionHistory.length === 0) return null;
        return positionHistory[positionHistory.length - 1]; 
    };

    const getLatestState = (stateHistory: { date: string; stateName: string, stateColor: string }[]) => {
        if (stateHistory.length === 0) return { stateName: 'Desconhecido', stateColor: '#000' };
        return stateHistory[stateHistory.length - 1]; // Último estado
    };
    

    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string} >
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={5}
                center={mapCenter}
                options={options}
                data-testid="map"
            >                
                {equipments.map((equipment) => {
                    const lastPosition = getLastPosition(equipment.positionHistory);
                    const latestState = getLatestState(equipment.stateHistory);
                    
                    console.log('Equipamento:', equipment.name, 'Última posição:', lastPosition);

                    // Apenas renderiza o marcador se houver uma posição disponível
                    return (
                        lastPosition ? (
                            <Marker
                                key={equipment.id}
                                position={{ lat: lastPosition.lat, lng: lastPosition.lon }}
                                label={equipment.name}
                                icon={{
                                    path: google.maps.SymbolPath.CIRCLE,
                                    fillColor: equipment.stateColor,
                                    fillOpacity: 0.6,
                                    strokeWeight: 0,
                                    scale: 27,
                                }}
                                onMouseOver={() => setHoveredEquipment(equipment)} 
                                onMouseOut={() => setHoveredEquipment(null)}
                                onClick={() => setSelectedEquipment(equipment)}
                            />
                        ) : null
                    );
                })}

                {hoveredEquipment && (
                    <InfoWindow
                        position={{
                            lat: getLastPosition(hoveredEquipment.positionHistory)?.lat || 0,
                            lng: getLastPosition(hoveredEquipment.positionHistory)?.lon || 0,
                        }}
                        onCloseClick={() => setHoveredEquipment(null)}
                    >
                        <div>
                            <h2>{hoveredEquipment.name}</h2>
                            <p>Modelo: {hoveredEquipment.model}</p>
                            <p>Estado atual: {getLatestState(hoveredEquipment.stateHistory).stateName}</p>
                        </div>
                    </InfoWindow>
                )}

                {selectedEquipment && (
                    <InfoWindow
                        position={{
                            lat: getLastPosition(selectedEquipment.positionHistory)?.lat || 0,
                            lng: getLastPosition(selectedEquipment.positionHistory)?.lon || 0,
                        }}
                        onCloseClick={() => setSelectedEquipment(null)}
                    >
                        <div>
                            <h2>{selectedEquipment.name}</h2>
                            <p>Modelo: {selectedEquipment.model}</p>
                            <p>Estado atual: {selectedEquipment.state}</p>
                            <p>Produtividade: {selectedEquipment.productivity.toFixed(2)}%</p>
                            <p>Ganho total: R${selectedEquipment.gains.toFixed(2)}</p>
                            <h3>Histórico de Estados:</h3>
                            <ul>
                                {selectedEquipment.stateHistory.map((stateHistoryEntry, index) => (
                                    <li key={index}>
                                        {/* Exibe a data, nome do estado e cor */}
                                        {new Date(stateHistoryEntry.date).toLocaleDateString()} - 
                                        {stateHistoryEntry.stateName} 
                                        <span
                                            style={{
                                                display: 'inline-block',
                                                width: '13px',
                                                height: '13px',
                                                borderRadius: '50%',
                                                backgroundColor: stateHistoryEntry.stateColor,
                                                marginLeft: '6px',
                                                marginTop: '3px'
                                            }}
                                        ></span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;



