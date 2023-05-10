import styled from 'styled-components';
import logo from '../../../assets/image/logo/logo.png';
import { FcGoogle } from 'react-icons/fc';
import { SigninForm } from '../../organisms/SigninForm';

export const SigninTemplate = () => {
  const oauthSnsHref = (str: string) => {
    return (
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      'scope=email%20profile&' +
      'include_granted_scopes=true&' +
      'response_type=token&' +
      'state=http//localhost:3000/signup&' +
      'redirect_uri=http://localhost:3000/signup&' +
      'client_id=517980981924-bu6d675ldhdtoacof01e7rg4nifu8oaj.apps.googleusercontent.com'
    );
  };

  return (
    <Container>
      <InputContainer>
        <img src={logo} alt="logo image" />
        <p className="large">함께하는 스터디, 더 공</p>
        <p className="small">
          학업, 자격증, 수능 공부까지
          <br /> 자기계발의 모든 것
        </p>
        <AuthButton href={oauthSnsHref('')}>
          <FcGoogle size={20} />
          Continue With Google
        </AuthButton>
        <Divider />
        <SigninForm />
      </InputContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;

  h1 {
    font-size: 25px;
    font-weight: 500;
    text-align: center;
    padding-bottom: 15px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 20px;
  width: 350px;
  height: 100%;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  img {
    width: 100px;

    @media (max-width: 600px) {
      width: 50px;
    }
  }

  .large {
    padding-top: 20px;
    font-size: 25px;
    font-weight: 700;
  }

  .small {
    margin-bottom: 40px;
    text-align: center;
    line-height: 25px;
    font-size: 15px;
    font-weight: 400;
    color: gray;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0;
  position: relative;
  border-top: 1px solid #bfc7d6;

  &:before {
    content: 'or';
    width: auto;
    height: auto;
    position: absolute;
    line-height: 10px;
    top: -5px;
    left: 50%;
    transform: translate(-50%, 0);
    background-color: white;
    padding: 0 10px;
    color: #bfc7d6;
  }
`;

const AuthButton = styled.a`
  gap: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  border: 1px solid #d3d3d3;
  border-radius: 10px;
  font-weight: 500;
  color: #8c98ba;
  user-select: none;
`;
