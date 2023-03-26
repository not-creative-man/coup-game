import styled from "styled-components";
import { useGameStoreState, useOpponentsData } from "../../../store/game/hooks";
import { myTurn, otherTurn, cards } from ".."; 
import assassin from '../../../utils/Pictures/Assassin.png';
import captain from '../../../utils/Pictures/Captain.png';
import contessa from '../../../utils/Pictures/Contessa.png';
import duke from '../../../utils/Pictures/Duke.png';
import { useEffect, useState } from "react";
import dollar from '../../../utils/Pictures/icons/dollar.png';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 350px;
    height: 250px;
    background: #FFFFFF;
    border-radius: 20px;
    justify-content: space-evenly;
`;

const Header = styled.div`
font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 24px;
line-height: 26px;

color: #757373;

margin-top: 30px;
margin-left: 30px;
`;

const HeaderCurrent = styled(Header)`
    color: red;
`;

const CurrentContainer = styled(Container)`
    outline: 2px solid red;
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
margin-left: 30px;
margin-bottom: 26px;
margin-top: 12px;
margin-right: 5px;
`;

const LastAction = styled.div`

    &>p{
        margin-top: 15px;
        margin-left: 30px;
        font-family: 'BOWLER';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 22px;

        color: #000000;

        &>span{
            color: red;
        }
    }
`;

const MoneyIcon = styled.div`
  width: 40px;
  height: 40px;
  background-image: url(${dollar});
    margin-top: 5px;
`;

const Card = styled.div`

font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 20px;
line-height: 22px;
/* identical to box height */

margin-top: 15px;
margin-left: 30px;

color: #000000;

    &>span{
        color: red;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 50px;
    width: 800px;
`;

export function OpponentsTable(){

    const gameStoreState = useGameStoreState();
    const opponents = useOpponentsData();
    const [action, setAction] = useState<number | undefined>(-1);  
    const [currentOpponent, setCurrentOpponent] = useState<number>(-1);
    

    useEffect(() => {
        setInterval(() => {
            
            if(opponents !== null){
                opponents.map((opponent, i) => {
                    if(opponent.is_current_turn && opponent.last_action !== action){
                        // console.log(`${opponent.last_action} ${action}`);
                        // console.log(opponent);
                        // console.log(`129 in opponents index`);
                        setAction(opponent.last_action);
                    } 
                })

                // console.log(opponents);
                // console.log(`ahahahahah ${opponents.find((opponent) => (opponent.is_current_turn))}`)
                // if(opponents.find((opponent) => (opponent.is_current_turn === true))?.last_action !== action) {
                //     setAction(opponents.find((opponent) => (opponent.is_current_turn === true))?.last_action);
                //     console.log(action);
                // }
            }
        }, 5000);
        
        // console.log(action);
    }, [])

    useEffect(() => {
        if(action !== undefined && action !== -1 && action !== null){
            // alert(action);
        }
        
    }, [action])

    if(opponents === null ) return null;
    if(gameStoreState === null) return null;

    const {player} = gameStoreState;


    
    return(
        <Wrapper>
            {
                opponents.map(opponent => (
                    opponent.is_current_turn ? (
                        <CurrentContainer>
                            <HeaderCurrent>{opponent.nickname}</HeaderCurrent>
                            <Card>Карта 1:  
                                <span>
                                    {opponent.opened_1 ? cards.find((card) => (card.num === opponent.card_1))?.name: ''}
                                </span>
                            </Card>
                            <Card>Карта 2: 
                                <span>
                                    {opponent.opened_2 ? cards.find((card) => (card.num === opponent.card_2))?.name: ''}
                                </span>
                            </Card>
                            <LastAction>
                                <p>Действие:<br/><span>{
                                        myTurn.findIndex(effect => effect.num === opponent.last_action) !== -1 ? 
                                            myTurn.find(effect => effect.num === opponent.last_action)?.name :
                                            otherTurn.find(effect => effect.num === opponent.last_action)?.name
                                            }</span></p>
                            </LastAction>
                            <MoneyWrapper>
                                <MoneyNum>{opponent.money}</MoneyNum>
                                <MoneyIcon></MoneyIcon>
                            </MoneyWrapper>
                        </CurrentContainer>
                    ) : (
                        <Container>
                            <Header>{opponent.nickname}:</Header>
                            <Card>Карта 1:  
                                <span>
                                    {opponent.opened_1 ? cards.find((card) => (card.num === opponent.card_1))?.name: ''}
                                </span>
                            </Card>
                            <Card>Карта 2: 
                                <span>
                                    {opponent.opened_2 ? cards.find((card) => (card.num === opponent.card_2))?.name: ''}
                                </span>
                            </Card>
                            <LastAction>
                                <p>Действие:<br/><span>{
                                        myTurn.findIndex(effect => effect.num === opponent.last_action) !== -1 ? 
                                            myTurn.find(effect => effect.num === opponent.last_action)?.name :
                                            otherTurn.find(effect => effect.num === opponent.last_action)?.name
                                            }</span></p>
                            </LastAction>
                            <MoneyWrapper>
                                <MoneyNum>{opponent.money}</MoneyNum>
                                <MoneyIcon></MoneyIcon>
                            </MoneyWrapper>
                        </Container>
                    )
                    
                ))
            }
        </Wrapper>
    );
}