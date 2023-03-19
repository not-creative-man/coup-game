import styled from 'styled-components';
import { colors } from '../../../constants/theme';
import { Room } from '../../../models/room';
import { RoomItem } from './RoomRow';

const StyledRoomsTable = styled.table`
  border-collapse: collapse;

  min-width: 700px;

  border: 0;
`;

const RoomsTableHeading = styled.thead`
  font-size: 32px;
`;
const RoomsTableHeadingColumn = styled.td`
  padding: 0.5rem 1rem;

  background-color: ${colors.bg1};
  border: 2px solid ${colors.text};

  margin-bottom: 10px;
`;
const PasswordHeadingColumn = styled(RoomsTableHeadingColumn)`
  text-align: center;
`;

type RoomTableProps = {
  rooms: Room[];
};

export function RoomsTable({ rooms }: RoomTableProps) {
  return (
    <StyledRoomsTable>
      <RoomsTableHeading>
        <tr>
          <PasswordHeadingColumn>Code</PasswordHeadingColumn>
          <PasswordHeadingColumn>Admin</PasswordHeadingColumn>
          <PasswordHeadingColumn>Join</PasswordHeadingColumn>
          <td></td>
        </tr>
      </RoomsTableHeading>
      <tbody>
        {rooms.map((room) => (
          <RoomItem
            key={room.code}
            room={room}
          />
        ))}
      </tbody>
    </StyledRoomsTable>
  );
}
