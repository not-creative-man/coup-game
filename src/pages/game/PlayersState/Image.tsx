import styled from "styled-components";
import { Card } from "../../../models/game";
import assassin from '../../../utils/Pictures/Assassin.png';
import captain from '../../../utils/Pictures/Captain.png';
import contessa from '../../../utils/Pictures/Contessa.png';
import duke from '../../../utils/Pictures/Duke.png';

const OpenedImage = styled.div`
    width: 150px;
    height: 213px;
    opacity: 40%;
    // background-color: red;
`;

const ImageWrapper = styled.div`
    display: flex;
    width: 400px;
    margin-top: 15px;
    margin-bottom: 15px;
    justify-content: space-around;
`;

const Img = styled.img`
    width: 150px;
    height: 213px;
`;

interface PlayerDataImageProps {
    cards: Card[];
  }

export function Image({cards}: PlayerDataImageProps){

    const imgType = [
        {name: "Губернатор", src: duke},
        {name: "Убийца", src: assassin},
        {name: "Городовой", src: captain},
        {name: "Графиня", src: contessa},
    ];

    return (
        <ImageWrapper>
            {
                cards.map((card, i) => (
                    card.isOpened ? 
                        imgType.map((img, j) => (
                            card.name === img.name ? <OpenedImage><Img src={img.src} /></OpenedImage> : <></>
                        )) 
                    : imgType.map((img, j) => (
                            card.name === img.name ? <Img src={img.src} /> : ''
                    )) 
                ))
            }
        </ImageWrapper>
        
    );
}