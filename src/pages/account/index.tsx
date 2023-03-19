import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '../../constants/theme';
import { loginPath } from '../../utils/paths';
import { LoginPage } from './LoginPage';
import { RegisterPage } from './RegisterPage';

const AccountPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const ContentWrapper = styled.div`
  min-width: 700px;
  min-height: 500px;
  margin: 0 auto;

  background-color: ${colors.bg1};

  border: 3px solid ${colors.bg2};
  border-radius: 20px;
`;

function AccountPage() {
  return (
    <AccountPageWrapper>
      <ContentWrapper>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<Navigate to={loginPath} />} />
        </Routes>
      </ContentWrapper>
    </AccountPageWrapper>
  );
}

export default AccountPage;
