import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * 샘플 사고발생개요 props
 */
interface Accident {
  date: string;
  place: string;
  content: string;
  cause: string;
  person: string;
}

// 샘플 사고발생개요 데이터
const sampleAccidentOccurData: Accident[] = [
  { date: '2017.12.21 15:54', place: 'Yongdu-daero 15-gil, Jecheon-si, Chungcheongbuk-do ', content: 'Fire', cause: '-', person: 'Jinsu' }
];

export default function AccidentTable(): JSX.Element {
  return (
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Reporter</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleAccidentOccurData.map((row, index) => (
            <TableRow key={'accident' + index}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.place}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.cause}</TableCell>
              <TableCell>{row.person}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      </MuiTable>
    </TableContainer>
  );
}