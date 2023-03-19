import styled from "styled-components";
import { useGameStoreState, useOpponentsData } from "../../../store/game/hooks";
import { myTurn, otherTurn, cards } from ".."; 
import assassin from '../../../utils/Pictures/Assassin.png';
import captain from '../../../utils/Pictures/Captain.png';
import contessa from '../../../utils/Pictures/Contessa.png';
import duke from '../../../utils/Pictures/Duke.png';

const TableCell = styled.th`
  outline: 1px solid black;
  height: 150px;
  width: 120px;
`;

const TableHeaderRow = styled.th`
outline: 1px solid black;
    height: 90px;
`;

const Table = styled.table`
    // height: 300px;
`;

const Img = styled.img`
    width: 100px;
`;

const CurrentTableRow = styled.tr`
    outline: 2px solid red;
    background-color: #ffb6b6;
`;

export function OpponentsTable(){

    const gameStoreState = useGameStoreState();
    const opponents = useOpponentsData();

    if(opponents === null ) return null;
    if(gameStoreState === null) return null;

    const {player} = gameStoreState;
    
    return(
        <>
            <Table>
                <thead>
                    <tr>
                        {/* <TableCell>id</TableCell> */}
                        <TableHeaderRow>Игрок</TableHeaderRow>
                        <TableHeaderRow>Монеты</TableHeaderRow>
                        <TableHeaderRow>Карта 1</TableHeaderRow>
                        <TableHeaderRow>Карта 2</TableHeaderRow>
                        {/* <TableCell>Последнее действие</TableCell> */}
                        {/* <TableHeaderRow>Порядок хода</TableHeaderRow> */}
                        <TableHeaderRow>Действие</TableHeaderRow>
                        <TableHeaderRow>Цель</TableHeaderRow>
                    </tr>
                </thead>
                <tbody>
                    {
                        opponents.map((opponent, i) => (
                            opponent.is_current_turn ?
                            <CurrentTableRow key={`${opponent}-${i}`}>
                                {/* <TableCell>{opponent.id}</TableCell> */}
                                <TableCell>{opponent.nickname}</TableCell>
                                <TableCell>{opponent.money}</TableCell>
                                <TableCell>
                                    {opponent.opened_1
                                        ? 
                                            cards.find((card) => (card.num === opponent.card_1))?.name === "Губернатор" ? <Img src={duke} /> :
                                            cards.find((card) => (card.num === opponent.card_1))?.name === "Убийца" ? <Img src={assassin} /> :
                                            cards.find((card) => (card.num === opponent.card_1))?.name === "Городовой" ? <Img src={captain} /> :
                                            cards.find((card) => (card.num === opponent.card_1))?.name === "Графиня" ? <Img src={contessa} /> : ""
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {opponent.opened_2
                                        ? 
                                            cards.find((card) => (card.num === opponent.card_2))?.name === "Губернатор" ? <Img src={duke} /> :
                                            cards.find((card) => (card.num === opponent.card_2))?.name === "Убийца" ? <Img src={assassin} /> :
                                            cards.find((card) => (card.num === opponent.card_2))?.name === "Городовой" ? <Img src={captain} /> :
                                            cards.find((card) => (card.num === opponent.card_2))?.name === "Графиня" ? <Img src={contessa} /> : ""
                                        : ''}    
                                </TableCell>
                                {/* <TableCell>{opponent.}</TableCell> */} 
                                {/* <TableCell>{opponent.move_order}</TableCell> */}
                                <TableCell>{
                                    myTurn.findIndex(effect => effect.num === opponent.last_action) !== -1 ? 
                                        myTurn.find(effect => effect.num === opponent.last_action)?.name :
                                        otherTurn.find(effect => effect.num === opponent.last_action)?.name
                                        }
                                </TableCell>
                                <TableCell>
                                    {
                                        opponent.target === player.id ? 
                                            player.nickname :
                                            opponents.find(el => el.id === opponent.target)?.nickname
                                    }
                                </TableCell>
                            </CurrentTableRow> : 
                            <tr key={`${opponent}-${i}`}>
                                {/* <TableCell>{opponent.id}</TableCell> */}
                                <TableCell>{opponent.nickname}</TableCell>
                                <TableCell>{opponent.money}</TableCell>
                                <TableCell>
                                    {opponent.opened_1
                                        ? 
                                            cards.find((card) => (card.num === opponent.card_1))?.name === "Губернатор" ? <Img src={duke} /> :
                                            cards.find((card) => (card.num === opponent.card_1))?.name === "Убийца" ? <Img src={assassin} /> :
                                            cards.find((card) => (card.num === opponent.card_1))?.name === "Городовой" ? <Img src={captain} /> :
                                            cards.find((card) => (card.num === opponent.card_1))?.name === "Графиня" ? <Img src={contessa} /> : ""
                                        : ''}
                                </TableCell>
                                <TableCell>
                                    {opponent.opened_2
                                        ? 
                                            cards.find((card) => (card.num === opponent.card_2))?.name === "Губернатор" ? <Img src={duke} /> :
                                            cards.find((card) => (card.num === opponent.card_2))?.name === "Убийца" ? <Img src={assassin} /> :
                                            cards.find((card) => (card.num === opponent.card_2))?.name === "Городовой" ? <Img src={captain} /> :
                                            cards.find((card) => (card.num === opponent.card_2))?.name === "Графиня" ? <Img src={contessa} /> : ""
                                        : ''}    
                                </TableCell>
                                {/* <TableCell>{opponent.}</TableCell> */} 
                                {/* <TableCell>{opponent.move_order}</TableCell> */}
                                <TableCell>{
                                    myTurn.findIndex(effect => effect.num === opponent.last_action) !== -1 ? 
                                        myTurn.find(effect => effect.num === opponent.last_action)?.name :
                                        otherTurn.find(effect => effect.num === opponent.last_action)?.name
                                        }
                                </TableCell>
                                <TableCell>
                                    {
                                        opponent.target === player.id ? 
                                            player.nickname :
                                            opponents.find(el => el.id === opponent.target)?.nickname
                                    }
                                </TableCell>
                            </tr>
                        ) )
                    }
                </tbody>
            </Table>
        </>
    );
}