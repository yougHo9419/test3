import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

/**
 * 샘플 폐기물처리수집 props
 */
interface Waste {
  company: string;
  location: string;
  phoneNumber: string;
}

// 샘플 폐기물처리수집 데이터
const sampleWasteDisposalCollectionData: Waste[] = [
  { company: 'Sumi Environmental Industry Co., Ltd.', location: '302 Yeonbak-ri, Bongyang-eup', phoneNumber: '043-647-4100' },
  { company: 'Buhung Co., Ltd.', location: '728 Jecheonbuk-ro (Mosan-dong)', phoneNumber: '043-646-7751' }

];

export default function WasteTable(): JSX.Element {
  return (
    <TableContainer>
      <MuiTable sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Company name</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Call</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleWasteDisposalCollectionData.map((row, index) => (
            <TableRow key={('waste' + index)}>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.location}</TableCell>
              <TableCell>{row.phoneNumber}</TableCell>
            </TableRow>
          ))}
      </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
