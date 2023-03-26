import styled from "styled-components";
import { Card } from "../../../models/game";
import assassin from '../../../utils/Pictures/Assassin.png';
import captain from '../../../utils/Pictures/Captain.png';
import contessa from '../../../utils/Pictures/Contessa.png';
import duke from '../../../utils/Pictures/Duke.png';
import x from '../../../utils/Pictures/icons/x.png';


const OpenedImage = styled.div`
width: 170px;
    opacity: 30%;
    background-image: url(${x});
    background-size: 150px 213px;
`;

const ImageWrapper = styled.div`
    display: flex;
    margin-top: 15px;
    margin-bottom: 15px;
    margin-right: 40px;
    justify-content: space-around;
`;

const Img = styled.img`
    width: 170px;
`;

interface PlayerDataImageProps {
    card: Card;
  }

export function Image({card}: PlayerDataImageProps){

    const imgType = [
        {name: "Губернатор", src: duke},
        {name: "Убийца", src: assassin},
        {name: "Городовой", src: captain},
        {name: "Графиня", src: contessa},
    ];

    return (
        <ImageWrapper>
            {
                    card.isOpened ? 
                        imgType.map((img, j) => (
                            card.name === img.name ? <OpenedImage><Img src={img.src} /></OpenedImage> : <></>
                        )) 
                    : imgType.map((img, j) => (
                            card.name === img.name ? <Img src={img.src} /> : ''
                    ))
            }
        </ImageWrapper>
        
    );
}