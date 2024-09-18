import React from 'react';
import styled from 'styled-components';
import Filter from './Filter';
import { EquipmentWithDetails } from '../types/equipment';
import logo from '../assets/aiko.png';

// Estilização do cabeçalho usando styled-components
const HeaderContainer = styled.header`
    position: fixed;
    z-index: 1;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #31c6be;
    color: white;
    padding-bottom: 1rem;
`;

const Logo = styled.img`
    height: 70px; 
    width: auto;
    margin-left : 30px;
`;

const TitleFilter = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 1.8rem;
    font-weight: bold;
`;

const FilterContainer = styled.div`
  margin-top: 0.5rem; /* Espaçamento acima do filtro */
`;

const Ajuste = styled.div`
    width: 250px;
`;

interface HeaderProps {
    equipments: EquipmentWithDetails[];
    setFilteredEquipments: React.Dispatch<React.SetStateAction<EquipmentWithDetails[]>>;
}

const Header: React.FC<HeaderProps> = ({ equipments, setFilteredEquipments }) => {    
    return (
        <HeaderContainer>
            <Logo src={logo} alt="Logo" />
            <TitleFilter>
                <Title>Mapa de Operações Florestais</Title>
                <FilterContainer>
                    <Filter 
                    equipments={equipments}
                    setFilteredEquipments={setFilteredEquipments}
                    />
                </FilterContainer>
            </TitleFilter>
            <Ajuste/>
        </HeaderContainer>
    );
};

export default Header;
