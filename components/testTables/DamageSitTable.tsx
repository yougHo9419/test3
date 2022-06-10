import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * 샘플 기상정보 props
 */
interface DamageSit {
  death: number;
  heavyWound: number;
  minorInjury: number;
  other: number;
  realEstate : number;
  persEstate : number;
}

// 샘플 피해상황 데이터
const sampleDamageSitData: DamageSit[] = [
  { death: 0, heavyWound: 2, minorInjury: 3, other: 0, realEstate: 0, persEstate: 0 }
];

export default function DamageSitTable(): JSX.Element {
  return (
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Dead</TableCell>
            <TableCell>Slander</TableCell>
            <TableCell>Minor</TableCell>
            <TableCell>ETC</TableCell>
            <TableCell>Real estate</TableCell>
            <TableCell>Movable property</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleDamageSitData.map((row, index) => (
            <TableRow key={'damageSit' + index}>
              <TableCell>{row.death}</TableCell>
              <TableCell>{row.heavyWound}</TableCell>
              <TableCell>{row.minorInjury}</TableCell>
              <TableCell>{row.other}</TableCell>
              <TableCell>${row.realEstate}</TableCell>
              <TableCell>${row.persEstate}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      </MuiTable>
    </TableContainer>
  );
}