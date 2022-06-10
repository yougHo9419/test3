import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EstimateArea from '../common/maps/layers/EstimateArea';

/**
 * 샘플 예상피해지역 props
 */
interface EstDamage {
  person: string;
  building: string;
  car: string;
}

// 샘플 예상피해지역 데이터
const sampleEstDamageAreaData: EstDamage[] = [
  { person: 'Dead 32', building: 'Burn down 2', car: 'Car 4' },
  { person: 'Dead 6', building: 'Burn down 1', car: 'Car 2' },
];

export default function EstDamageAreaTable({ map, feature, onElement }): JSX.Element {
  return (
    <>
      {/* table */}
      <TableContainer>
        <MuiTable sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Human casualties</TableCell>
              <TableCell>Building casualties</TableCell>
              <TableCell>Car casualties</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleEstDamageAreaData.map((row, index) => (
              <TableRow key={'estDamage' + index}>
                <TableCell>{row.person}</TableCell>
                <TableCell>{row.building}</TableCell>
                <TableCell>{row.car}</TableCell>
              </TableRow>
            ))}
        </TableBody>
        </MuiTable>
      </TableContainer>
    
      {/* layer */}
      <EstimateArea
        map={map}
        feat={feature}
        onElement={e => onElement(e)}
      />
    </>
  );
}
