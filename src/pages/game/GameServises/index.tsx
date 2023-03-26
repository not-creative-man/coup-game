import styled from "styled-components";
import {
    useGameStoreState,
  } from "../../../store/game/hooks";

const H2 = styled.h2`
font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 40px;
/* identical to box height */
margin: 0;
margin-top: 20px;


color: #D51515;
`;

export function GameTurn(){
    const gameStoreState = useGameStoreState();

    if (!gameStoreState) return null;

    const {player: current} = gameStoreState;
    const {opponents: players} = gameStoreState;
    
    return(
        <>
            <H2>{
                current.is_current_turn ? "Мой ход" : players.map((pl) => (
                    pl.is_current_turn ? `Ход ${pl.nickname}`:''
                ))
            }</H2>
        </>
    );
}