import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * 샘플 기상정보 props
 */
interface Weater {
  name: string;
  temperature: number;
  wind: string;
  precipitation: number;
  humidity: number;
}

// 샘플 기상정보 데이터
const sampleWeaterInfoData: Weater[] = [
  { name: 'Jecheon', temperature: -8, wind: 'NorthEast 5', precipitation: 0, humidity: 50 }
];

export default function WeaterTable(): JSX.Element {
  return (
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Branch name</TableCell>
            <TableCell>Temperature</TableCell>
            <TableCell>Wind</TableCell>
            <TableCell>Precipitation</TableCell>
            <TableCell>Humidity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleWeaterInfoData.map((row, index) => (
            <TableRow key={'weater' + index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.temperature}℃</TableCell>
              <TableCell>{row.wind}m/s</TableCell>
              <TableCell>{row.precipitation}mm</TableCell>
              <TableCell>{row.humidity}%</TableCell>
            </TableRow>
          ))}
      </TableBody>
      </MuiTable>
    </TableContainer>
  );
}