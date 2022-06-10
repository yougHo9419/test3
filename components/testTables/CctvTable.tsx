import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * 샘플 CCTV props
 */
interface CCTV {
  name: string;
  area: string;
  address: string;
}

// 샘플 CCTV 데이터
const sampleCctvData: CCTV[] = [
  { name: '범서 천상교', area:'범서읍', address: '범서읍 천상리 1042-7' },
  { name: '두동 봉계방범초소', area:'두동면', address: '두동면 봉계리 477-2' },
  { name: '상북 농공단지입구', area:'상북면', address: '삼남면 교동리 1557-9' },
  { name: '온산 천금사', area:'온산읍', address: '삼남면 교동리 1557-9' },
];

export default function CctvTable(): JSX.Element {
  return (
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>CCTV 명</TableCell>
            <TableCell>관리지역</TableCell>
            <TableCell>설치주소</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleCctvData.map((row, index) => (
            <TableRow key={'cctv' + index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.area}</TableCell>
              <TableCell>{row.address}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
