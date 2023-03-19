import styled from 'styled-components';

const Spinner = styled.div<{ size: string; thickness: string }>`
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: ${({ thickness }) => thickness} solid #f3f3f3; /* Light grey */
  border-top: ${({ thickness }) => thickness} solid #383636; /* Black */
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
`;

type LoadingSpinnerProps = {
  size?: string;
  thickness?: string;
};

export default function LoadingSpinner({
  size = '20px',
  thickness = '5px',
}: LoadingSpinnerProps) {
  return (
    <div className='spinner-container'>
      <Spinner size={size} thickness={thickness}></Spinner>
    </div>
  );
}
