import {  useEffect, useState } from "react";
import styled from "styled-components";
import { action, getAnswer, handleAction, next as Next, markDbError, setAnswer} from "../../../api/game/api";
import { useToken } from "../../../store/account/hooks";
import { useGameStoreState, useOpponentsData, usePlayerData } from "../../../store/game/hooks";
import { useRoomCode } from "../../../store/room/hooks";
import { getErrorMessage } from "../../../utils/error";
import { myTurn, otherTurn } from "..";
import { useGameAPI } from "../../../api/game/hooks";
import { PrimaryButton } from "../../../components/common/Button";

const ButtonsList = styled.div`
display: flex;
margin-top: 20px;
visibility: visible;
`;

const Button = styled(PrimaryButton)`
    margin-right: 10px; 
`;

const ModalTarget = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    opacity: 0;
    visibility: hidden;
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
    width: 660px;
    height: 760px;
    color: #000000;
`;

const ModalTable = styled.table`

`;

const ModalHeadRow = styled.th`
    background-color: rgb(255 127 127);
    width: 150px;
    height: 30px;
    outline: 1px solid black;
    padding: 10px;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
`;

const ModalRow = styled.tr`
    display: flex;
`;

const Span = styled.span`
// visibility: hidden;
`;

const ModalHeader = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row-reverse;
`;

const ModalClose = styled.span`
    margin: 10px 10px 0 0;
`;

const ModalOpponentsButton = styled.th`
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

    &:hover{
        background-color: pink;
    }

    &:active{
        background-color: #ff8d8d;
    }
`;

export function BottomButtonsList(){

    const gameApi = useGameAPI();
    const token = useToken();
    const [error, setError] = useState<string|null>();
    const roomCode = useRoomCode();
    const gameStoreState = useGameStoreState();
    const player = usePlayerData();
    const modal = document.getElementById('modalTarget');
    const bList = document.getElementById('list');
    const opponents = useOpponentsData();
    const [effectHandler, setEffectHandler] = useState<number>(0);
    const [target, setTarget] = useState<number>(-1);
    const [last, setLast] = useState<number>(0);
    
    useEffect(() => {
        if(effectHandler !== 0){
            setError('');
            if(!token || roomCode === null || modal === null || bList === null) return;
            bList.style.visibility = 'hidden';
            // Get modal with target opened
            if(effectHandler === 3 || effectHandler === 6 || effectHandler === 8){
                modal.style.opacity = "1";
                modal.style.visibility = 'visible';
            } else {
                (async function () {
                    try {
                        // console.log(`effectHandler ${effectHandler}`);
                        await action(token, roomCode, effectHandler, 0);
                        setError(null);
                    } catch (e) {
                        console.error(e);
                        setError(getErrorMessage(e));
                        handleCurrentClick(effectHandler);
                    }
                })();
                // console.log("start");
                if( effectHandler !== 1 ) {
                    sleep(15000)
                        .then(() => getAnswers());
                } else {
                    sleep(2000)
                        .then(() => getAnswers());
                    // console.log(player);
                }    
            } 
        }
            
    }, [effectHandler]);

    useEffect(() => {

        if(target !== -1){

            if (!token || roomCode === null || modal === null || bList === null) return;
            setError('');
            modal.style.opacity = "0";
            modal.style.visibility = 'hidden';
            console.log(`handle person effectHandler: ${effectHandler}; target: ${target}`);
            
            
            (async function () {
                try {
                  await action(token, roomCode, effectHandler, target);
                  setError(null);
                } catch (e) {
                  console.error(e);
                  setError(getErrorMessage(e));
                }
            })();
            console.log("start");
            if(effectHandler !== 3){
                sleep(15000)
                    .then(() => getAnswers())
            } else{
                sleep(3000)
                        .then(() => getAnswers())
                console.log(player);
            } 
        }
    }, [target]);

    useEffect(() => {

    }, [last])

    if(opponents === null || gameApi === null || roomCode === null || gameStoreState === null || player === null){
        console.log("opponents is null");
        return null;
    }

    function sleep(ms: number): Promise<void>{
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // TODO: Реализовать блокирование кнопок 
    // Если ход мой, то кнопки исчезают сразу после нажатия
    // Если ход не мой, то кнопки 

   

    function handleCurrentClick(effect: number){
        if(player === null) return null;
        if((effect === 3 && player.money < 7) || (effect === 6 && player.money < 3)) alert("Недостаточно денег для переворота");
        else{
            setEffectHandler(prevEffect => effect);
        }
    };

    function handleAnswerClick(effect: number){
        if (!token || roomCode === null || modal === null || bList === null) return;
        // bList.style.visibility = 'hidden';
        setError('');
        closeModal();
        
        (async function () {
            try {
                console.log(`Answer is sended: ${effect}`);
              await setAnswer(token, roomCode, effect);
              setError(null);
            } catch (e) {
              console.error(e);
              setError(getErrorMessage(e));
            }
        })();
    }

    //получает пришедший с серва статус: 0, 1 или 2
    function getAnswers(){

        if(token === null || roomCode === null || bList === null) return null;
        (async function () {
            try {
                await getAnswer(token, roomCode);
            } catch (e) {
                console.error(e);
                setError(getErrorMessage(e));
                alert(e);
                getAnswers();
            }
        })();
        setTarget(-1);
        setEffectHandler(0);
        bList.style.visibility = 'visible';
    }

    function closeModal(){
        if(modal === null || bList === null) return;
        modal.style.opacity = "0";
        modal.style.visibility = 'hidden';
        bList.style.visibility = 'visible';
        setTarget(-1);
        setEffectHandler(0);
    }

    return(
        <>
            <></>
            <ButtonsList id="list">
                {
                    player.is_current_turn ? ( player.money >=10 ? 
                        <Button 
                            onClick={() => handleCurrentClick(myTurn[2].num)}
                            title={myTurn[2].desc}>
                                {myTurn[2].name}
                        </Button> : 
                        myTurn.map((effect, i) => (
                            <Button key={`${effect}-${i}`} onClick={() => handleCurrentClick(effect.num)} title={effect.desc}>{effect.name}</Button>
                        )) ) : opponents.find((opponent)=>(opponent.is_current_turn))?.target !== player.id 
                                ?
                                    opponents.find((opponent) => (opponent.is_current_turn))?.last_action === 2 
                                    ?
                                        <Button key={`${otherTurn[0].name}-${1}`} onClick={() => handleAnswerClick(otherTurn[0].num)} title={otherTurn[0].desc}>{otherTurn[0].name}</Button> 
                                    : 
                                        opponents.find((opponent) => (opponent.is_current_turn))?.last_action === null 
                                        ?
                                            "" 
                                        :
                                            otherTurn.map((effect, i) => (
                                                [10, 11].includes(effect.num) 
                                                ? 
                                                    <Button key={`${effect}-${i}`} onClick={() => handleAnswerClick(effect.num)} title={effect.desc}>{effect.name}</Button> 
                                                : 
                                                    ""))
                                :
                                    opponents.find((opponent) => (opponent.is_current_turn))?.last_action === 6
                                        ?
                                            otherTurn.map((effect, i) => (
                                                [9, 10, 11].includes(effect.num) 
                                                ? 
                                                    <Button key={`${effect}-${i}`} onClick={() => handleAnswerClick(effect.num)} title={effect.desc}>{effect.name}</Button> 
                                                : 
                                                    "")) 
                                        :
                                            opponents.find((opponent) => (opponent.is_current_turn))?.last_action === 8
                                                ?
                                                    otherTurn.map((effect, i) => (
                                                        [7, 10, 11].includes(effect.num) 
                                                        ? 
                                                            <Button key={`${effect}-${i}`} onClick={() => handleAnswerClick(effect.num)} title={effect.desc}>{effect.name}</Button> 
                                                        : 
                                                            "")) 
                                                : 
                                                    ""
                }
                {/* <Span>{effectHandler}</Span> */}
            </ButtonsList> 
            <ModalTarget id="modalTarget">
                <ModalWrapper>
                    <ModalHeader>
                        <ModalClose onClick={() => closeModal()}>x</ModalClose>
                    </ModalHeader>
                    <h1>Выберите цель:</h1>
                    <ModalTable>
                        <thead>
                            <ModalRow>
                                <ModalHeadRow>Player</ModalHeadRow>
                            </ModalRow>
                        </thead>
                        <tbody>
                            {
                                opponents.map((opponent, i) =>(
                                    <ModalRow>
                                        {
                                            !opponent.opened_1 || !opponent.opened_2 ? 
                                                <ModalOpponentsButton onClick={() => setTarget(prevTarget => opponent.id)}>{opponent.nickname}</ModalOpponentsButton> :
                                                ""
                                        }
                                    </ModalRow>
                                ))
                            }
                        </tbody>
                    </ModalTable>
                    
                </ModalWrapper>
            </ModalTarget> 
        </>
    )
}

