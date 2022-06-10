import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * 샘플 예상위험지역 props
 */
interface EstDanger {
  facility: string;
  content: string;
  material: string;
  distance: number;
}

// 샘플 예상위험지역 데이터
const sampleEstDangerZoneData: EstDanger[] = [
  { facility: '아동센터', content: '새제천지역 아동센터', material: 'X', distance: 180 },
  { facility: '주유소', content: 'GS칼텍스 늘푸른주유소', material: 'O', distance: 170 },
];

export default function EstDangerZoneTable(): JSX.Element {
  return (
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>시설물구분</TableCell>
            <TableCell>내용</TableCell>
            <TableCell>인화물질</TableCell>
            <TableCell>거리</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleEstDangerZoneData.map((row, index) => (
            <TableRow key={'estDanger' + index}>
              <TableCell>{row.facility}</TableCell>
              <TableCell>{row.content}</TableCell>
              <TableCell>{row.material}</TableCell>
              <TableCell>{row.distance}m</TableCell>
            </TableRow>
          ))}
      </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
