import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isTokenActive } from '../../api/account/api';
import { PrimaryButton } from '../../components/common/Button';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { colors } from '../../constants/theme';
import { useAppDispatch } from '../../hooks/redux';
import { clearAccountData } from '../../store/account/actions';
import { useToken } from '../../store/account/hooks';
import { loginPath, registerPath, roomsDashboardPath } from '../../utils/paths';

const HomePageContainer = styled.div`
  // width: 1920px;
  height: calc(1080px - 4rem);
  margin: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: '';
    display: block;

    z-index: -2;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: white;
  }

  &:after {
    content: '';
    display: block;

    z-index: -1;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-image: url('${process.env.PUBLIC_URL}/cards/background.jpg');
    background-size: cover;
    opacity: 0.3;
  }
`;

export const HomePageHeadingWrapper = styled.div`
display: flex;
flex-direction: row;
align-items: flex-start;
// padding: 20px;
gap: 10px;
margin-bottom: 50px;

width: 490px;
height: 94px;


background: #FFFFFF;
border-radius: 20px;
`;

const HomePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: ${colors.bg1};
  border-radius: 1rem;
  padding: 2rem 3rem; 
`;

export const HomePageHeading = styled.h1`

  margin: 0;
  font-style: normal;
font-weight: 400;
font-size: 64px;
line-height: 30px;

color: #000000;

margin: auto; 
margin-bottom: 25px;
`;

const HomePageButton = styled(PrimaryButton)`
  font-size: 30px;
  padding: 0;
  width: 400px;
  height: 70px;
  margin-bottom: 13px;
  // background-color: #D41515;

  font-family: 'BOWLER';
font-style: normal;
font-weight: 400;
font-size: 36px;
line-height: 40px;
`;

function HomePage() {
  const navigate = useNavigate();
  const token = useToken();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    (async function () {
      const isActive = await isTokenActive(token);

      if (!isActive) dispatch(clearAccountData());

      setIsLoading(false);
    })();
  }, [token]);

  return (
    <HomePageContainer>
      <HomePageWrapper>
        <HomePageHeadingWrapper>
          <HomePageHeading>ПЕРЕВОРОТ</HomePageHeading>
        </HomePageHeadingWrapper>
       

        {isLoading ? (
          <LoadingSpinner />
        ) : token ? (
          <>
            <HomePageButton onClick={() => navigate(roomsDashboardPath)}>
              Show rooms
            </HomePageButton>
            <HomePageButton onClick={() => dispatch(clearAccountData())}>
              Exit
            </HomePageButton>
          </>
          
        ) : (
          <>
            <HomePageButton onClick={() => navigate(loginPath)}>
              Login
            </HomePageButton>
            <HomePageButton onClick={() => navigate(registerPath)}>
              Register
            </HomePageButton>
          </>
        )}
      </HomePageWrapper>
    </HomePageContainer>
  );
}

export default HomePage;
