import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * 샘플 구조/수송 props
 */
interface Rescue {
  institution: string;
  dispatchedPeople: number;
  equipment: string;
  hospital: string;
  transportPeople: number;
  remainEmergencyRoom: number;
}

// 샘플 구조/수송 데이터
const sampleRescueTransportoData: Rescue[] = [
  {
    institution: '제천소방서',
    dispatchedPeople: 10,
    equipment: '소방차 3대, 앰뷸런스 2대',
    hospital: '제천서울병원',
    transportPeople: 13,
    remainEmergencyRoom: 0
  }
];

export default function RescueTable(): JSX.Element {
  return (
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>기관</TableCell>
            <TableCell>출동인원</TableCell>
            <TableCell>장비</TableCell>
            <TableCell>병원명</TableCell>
            <TableCell>수송인원</TableCell>
            <TableCell>잔여응급실</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleRescueTransportoData.map((row, index) => (
            <TableRow key={'rescue' + index}>
              <TableCell>{row.institution}</TableCell>
              <TableCell>{row.dispatchedPeople}명</TableCell>
              <TableCell>{row.equipment}</TableCell>
              <TableCell>{row.hospital}</TableCell>
              <TableCell>{row.transportPeople}명</TableCell>
              <TableCell>{row.equipment}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
