import {
    useGameStoreState,
  } from "../../../store/game/hooks";


export function GameTurn(){
    const gameStoreState = useGameStoreState();

    if (!gameStoreState) return null;

    const {player: current} = gameStoreState;
    const {opponents: players} = gameStoreState;
    
    return(
        <>
            <h2>{
                current.is_current_turn ? "Мой ход" : players.map((pl) => (
                    pl.is_current_turn ? `Ход ${pl.nickname}`:''
                ))
            }</h2>
        </>
    );
}