import styled from "styled-components";
import { PlayerData, Card } from "../../../models/game";

interface PlayerDataTableProps {
    player: PlayerData;
    cards: Card[];
  }

const TableCell = styled.th`
  outline: 1px solid black;
`;

const Table = styled.table`
  width: 400px;
`;

export function PlayersTable({player, cards}: PlayerDataTableProps){

    return (
        <>
            <Table>
                <thead>
                  <tr>
                    <TableCell>Карта</TableCell>
                    <TableCell>Действие</TableCell>
                    <TableCell>Противодействие</TableCell>
                    <TableCell>Открыта?</TableCell>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <TableCell>{cards[0].name}         </TableCell>
                    <TableCell>{cards[0].effect}       </TableCell>
                    <TableCell>{cards[0].counterEffect}</TableCell>
                    <TableCell>{cards[0].isOpened ? "Да" : "Нет"}</TableCell>
                  </tr>
                  <tr>
                    <TableCell>{cards[1].name}         </TableCell>
                    <TableCell>{cards[1].effect}       </TableCell>
                    <TableCell>{cards[1].counterEffect}</TableCell>
                    <TableCell>{cards[1].isOpened ?"Да" : "Нет"}</TableCell>
                  </tr>
                </tbody>
            </Table>
        </>
    )
}