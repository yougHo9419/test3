import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * 샘플 이재민구호 props
 */
interface Relief {
  facilityType: string;
  location: string;
  form: string;
  personnel: number;
}

// 샘플 이재민구호 데이터
const sampleReliefData: Relief[] = [
  { facilityType: '임시주거시설', location: '제천시 독순로61', form: '제천시민회관 공공시설', personnel: 20 }
];

export default function ReliefTable(): JSX.Element {
  return (
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>시설종류</TableCell>
            <TableCell>위치</TableCell>
            <TableCell>형태</TableCell>
            <TableCell>인원</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleReliefData.map((row, index) => (
            <TableRow key={'relief' + index}>
              <TableCell>{row.facilityType}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.form}</TableCell>
              <TableCell>{row.personnel}명</TableCell>
            </TableRow>
          ))}
      </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
