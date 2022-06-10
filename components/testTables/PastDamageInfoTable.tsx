import { useState } from 'react';

import { styled } from '@mui/material/styles';
import Link from '@mui/material/Link';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import PastDamageInfo from '../../public/json/past_fire_1984.json';
import PastFire from '../common/maps/layers/PastFire';

const Container = styled(TableContainer)(() => ({
  maxHeight: '300px'
}));

export default function PastDamageInfoTable({ map, feature, onElement }): JSX.Element {
  const [selected, setSelected] = useState();

  /**
   * 과거 피해정보 테이블 주소 클릭 이벤트
   * @param coordinates 
   */
  const onClick = (row) => {
    setSelected(row);  // table row data
  };

  return (
    <>
      {/* table */}
      <Container>
        <MuiTable sx={{ minWidth: 760 }}>
        
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Human casualties</TableCell>
           
            </TableRow>
          </TableHead>

          <TableBody>

            {PastDamageInfo.features.map((row, index) => (
              
              <TableRow key={index}>

                <TableCell>{row.properties.운영기간}</TableCell>

                <TableCell>
                  <Link
                    component='button'
                    variant='body2'
                    onClick={() => onClick(row)}
                  >
                    {row.properties.주소}
                  </Link>
                </TableCell>

                <TableCell>
                  <span>Human casualties</span>{row.properties.인명피해_}<br />
                  <span>Dead</span>{row.properties.인명피해1}<br />
                  <span>Slander</span>{row.properties.인명피해_1}<br />
                  <span>Missing</span>{row.properties.인명피해_2}<br />
                </TableCell>

                

              </TableRow>

            ))}

          </TableBody>

        </MuiTable>
      </Container>

      {/* layer */}
      <PastFire
        map={map}
        selected={selected}
        feat={feature}
        onElement={e => onElement(e)}
        data={PastDamageInfo}
      />

      
    </>
  );
}
