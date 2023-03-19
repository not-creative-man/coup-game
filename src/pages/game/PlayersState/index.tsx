import {
    useCard,
    useGameStoreState, 
  } from "../../../store/game/hooks";
import styled from 'styled-components';
import { PlayersTable } from "./PlayersTable";
import { Image as I } from "./Image";

const PlayersDataWrapper = styled.div`

  outline: 1px solid black;
  background-color: pink;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  width: 450px;
  max-width: 500px;
`;

const Header = styled.h3`
  margin-bottom: 5px;
  
`;

const Container = styled.div`
//   outline: 1px dotted black;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MoneyWrapper = styled.span`
  font-size: 20px;
  font-weight: 700;

`;

export function PlayersData(){
    const gameStoreState = useGameStoreState();
    const playerCards = useCard();

    if (!gameStoreState) return null;
    if (!playerCards) return null;

    const {player} = gameStoreState;

    return(
        <>
            <PlayersDataWrapper>
                <Container>
                    <Header>Мои деньги</Header>
                    <MoneyWrapper>{player.money}</MoneyWrapper>
                </Container>
                <Container>
                    <Header>Мои карты</Header>
                    {player && playerCards && <PlayersTable player={player} cards={playerCards} />}
                </Container>
                <Container>
                    {playerCards && <I cards={playerCards} />}
                </Container>
            </PlayersDataWrapper>
        </>
    );
}