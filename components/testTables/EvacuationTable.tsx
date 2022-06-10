import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import FleePath from '../common/maps/layers/FleePath';

/**
 * 샘플 대피분석 props
 */
interface Evacuation {
  building: string;
  evacuation: number;
  cantEvacuation: number;
}

// 샘플 대피분석 데이터
const sampleEvacuationAnalysisData: Evacuation[] = [
  { building: '제천 스포츠센터', evacuation: 130, cantEvacuation: 50 },
  { building: '건물 A', evacuation: 40, cantEvacuation: 20 },
];

export default function EvacuationTable({ map }): JSX.Element {
  return (
    <>
      {/* table */}
      <TableContainer>
        <MuiTable sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>건물</TableCell>
              <TableCell>대피인원</TableCell>
              <TableCell>미대피인원</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleEvacuationAnalysisData.map((row, index) => (
              <TableRow key={'evacuation' + index}>
                <TableCell>{row.building}</TableCell>
                <TableCell>{row.evacuation}명</TableCell>
                <TableCell>{row.cantEvacuation}명</TableCell>
              </TableRow>
            ))}
        </TableBody>
        </MuiTable>
      </TableContainer>
      
      {/* layer */}
      <FleePath map={map} />
    </>
  );
}
