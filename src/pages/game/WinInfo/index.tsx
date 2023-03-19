import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { leaveRoom } from "../../../api/rooms/api";
import { useToken } from "../../../store/account/hooks";
import { useGameStoreState } from "../../../store/game/hooks";
import { useRoomCode } from "../../../store/room/hooks";
import { roomsDashboardPath } from "../../../utils/paths";

const Span = styled.span`

`;

const Header = styled.h1`
    margin: 0;
`;

const ModalTarget = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 1;
    visibility: visible;
    transition: all 0.3s ease 0s;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalWrapper = styled.div`
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    width: 520px;
    height: 500px;
    color: #000000;
    justify-content: space-evenly;
`;

const LeaveButton = styled.div`
    width: 150px;
    height: 30px;
    outline: 1px solid black;
    padding: 10px;
    font-size: 15px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    

    &:hover{
        background-color: pink;
    }

    &:active{
        background-color: #ff8d8d;
    }
`;

export function WinModal(){

    const token = useToken();
    const [error, setError] = useState<string|null>();
    const roomCode = useRoomCode();
    const navigate = useNavigate();
    const gameStoreState = useGameStoreState();
    if(gameStoreState === null) return null;

    function handleLeaveGame() {
        console.log(token);
        console.log(roomCode);
        if (!token || !roomCode) return;
    
        (async function () {
          try {
            await leaveRoom(token, roomCode);
            navigate(roomsDashboardPath);
          } finally {
            console.log("out");
          }
        })();
      }


    return(
        gameStoreState.winner !== "0" ? (<ModalTarget id="win">
                                                    <ModalWrapper>
                                                        <Header>Winner!</Header>
                                                        <Span>&#128054; {gameStoreState.winner} &#128054;</Span>
                                                        <LeaveButton onClick={() => handleLeaveGame()}>Покинуть комнату</LeaveButton>
                                                    </ModalWrapper>
                                                </ModalTarget>) : <></>
        
    )
}