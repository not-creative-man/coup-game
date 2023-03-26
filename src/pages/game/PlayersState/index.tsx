import {
    useCard,
    useGameStoreState, 
  } from "../../../store/game/hooks";
import styled from 'styled-components';
import { Image as I } from "./Image";
import { WrapperBackground } from "../../../components/common/PageStyling";
import defence from '../../../utils/Pictures/icons/defence.png';
import dollar from '../../../utils/Pictures/icons/dollar.png';
import target from '../../../utils/Pictures/icons/target.png';

const PlayersDataWrapper = styled(WrapperBackground)`

  outline: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  width: 570px;
  height: 700px;
  // max-width: 500px;
`;

const Header = styled.div`
  margin-bottom: 30px;
  width: 100%;
  display: flex;
`;

const HeaderH3 = styled.h3`
font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 40px;
margin: 36px auto 0 42px;

color: #D51515;
`;

const MoneyWrapper = styled.div`
  display: flex; 
`;

const MoneyNum = styled.span`
  font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 26px;

color: #D51515;
margin-top: 42px;
margin-right: 5px;
`;


const MoneyIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${dollar});
  margin: 30px 30px 0 0; 
`;

const TargetIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${target});
  margin: 0 10px 0 0; 
`;

const DefenceIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${defence});
  margin: 0px 10px 0 0; 
`;

const Name = styled.span`
font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 26px;

margin-bottom: 50px;

color: red;
`;

const Desc = styled.span`
font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 22px;

width: 205px;

color: #000000;
`;

const Container = styled.div`
//   outline: 1px dotted black;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const DataWrapper = styled.div`
  
`;

const Text = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
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
              <Header>
                <HeaderH3>МОИ КАРТЫ</HeaderH3>
                <MoneyWrapper>
                  <MoneyNum>{player.money}</MoneyNum>
                  <MoneyIcon></MoneyIcon>
                </MoneyWrapper>
              </Header>
              {
                playerCards.map(card => (
                  <Container>
                    <I card={card} />
                    <DataWrapper>
                      <Name>{card.name}</Name>
                      <Text>
                        <TargetIcon />
                        <Desc>{card.effect}</Desc>
                      </Text>
                      <Text>
                        <DefenceIcon />
                        <Desc>{card.counterEffect === null ? "-" : card.counterEffect}</Desc>
                      </Text>
                    </DataWrapper>
                  </Container>
                ))
              }
              <Container>

              </Container>
            </PlayersDataWrapper>
        </>
    );
}