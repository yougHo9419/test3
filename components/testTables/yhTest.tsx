import { useState } from 'react';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import MuiTable from '@mui/material/Table';


import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

import PastDamageInfo from '../../public/json/yhTest.json';
import YHPastFire from '../common/maps/layers/YHPastFire';
import PastFire from '../common/maps/layers/PastFire';

const Container = styled(TableContainer)(() => ({
    maxHeight: '300px'
  }));
  
export default function YhTest({ map, feature, onElement }): JSX.Element {
    const [selected, setSelected] = useState();


    const onClick = (row) => {
        setSelected(row);  // table row data
      };
  
    return (
        <>
            <Container>
            <MuiTable sx={{ minWidth: 760 }}>
                        
                <TableHead>
                    <TableRow>
                        <TableCell>장소</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>

                    {PastDamageInfo.features.map((row, index) => (

                    <TableRow key={index}>

                        <TableCell>
                        <Link
                            component='button'
                            variant='body2'
                            onClick={() => onClick(row)}
                        >
                            {row.properties.주소}
                        </Link>
                        </TableCell>

                    </TableRow>

                    ))}

                </TableBody>

            </MuiTable>
            </Container>

            <YHPastFire
                map={map}
                selected={selected}
                yhfeat={feature}
                //feat={feature}
                onElement={e => onElement(e)}
                data={PastDamageInfo}
            />


        
        </>

    )
  };






  /* features 의 json 형식
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [
            127.0502189,
            37.545607
          ]
        },
        "properties": {
          "번호": 1,
          "운영기간": "2005.12.29",

          "재난명": "대구 서문시장 2지구 화재사고",
          "주소": ""대구 서문시장 2지",
          "X좌표": 127.0502189,
          "Y좌표": 37.545607,
          "재난안전대": "",
          "재난안전_1": "",
          "재난안전_2": "대구광역시",
          "재난안전_3": "중구",
          "인명피해_": 4,
          "인명피해1": 0,
          "인명피해_1": 4,
          "인명피해_2": 0,
          "피해_규모": "",
          "재산피해_": 187.0,

          "재난유형": "다중밀집시설 대형화재",
          "현재_재난": "국민안전처",
          "비고": "",
          "Field20": ""
        },

*/