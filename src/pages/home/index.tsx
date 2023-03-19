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
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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
const HomePageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: ${colors.bg1};
  border: 3px solid ${colors.bg2};
  border-radius: 1rem;
  padding: 2rem 3rem;
`;

const HomePageHeading = styled.h1`
  font-size: 75px;
  margin: 0 0 2rem;
`;

const HomePageButton = styled(PrimaryButton)`
  font-size: 30px;
  padding: 1rem 1.5rem;
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
        <HomePageHeading>Coup</HomePageHeading>

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
