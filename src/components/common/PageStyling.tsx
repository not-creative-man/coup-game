import styled from "styled-components";
import { colors } from "../../constants/theme";

// Главный бэк
export const DashboardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  // margin-top: 1rem;
  gap: 2rem;

  position: relative;

  background-color: ${colors.bg1};

//   min-width: 1080px;
`;

// Хединг для страницы с лого
export const DashboardHeading = styled.div`
    margin: 0;
    margin-top: 100px;
    width: 1240px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
`;

// Бэк для лого
export const DashboardLogo = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    // padding: 20px;
    gap: 10px;
    margin-bottom: 50px;

    width: 490px;
    height: 94px;


    background: #FFFFFF;
    border-radius: 20px;
`;

// Лого
export const DashboardH1 = styled.h1`

margin: 0;
width: 450px;
height: 54px;

font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 64px;
line-height: 70px;

color: #000000;

`;

// Белый бэк враппера
export const WrapperBackground = styled.div`
  width: 1240px;

  background: #FFFFFF;
  border-radius: 20px;

  margin-bottom: 80px;
`;