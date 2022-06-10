import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import CommonFn from '../common/maps/CommonFn';

// 샘플 테이블
import WeaterTable from '../testTables/WeaterTable';
import AccidentTable from '../testTables/AccidentTable';
import DamageSitTable from '../testTables/DamageSitTable';
import CctvTable from '../testTables/CctvTable';
import PastDamageInfoTable from '../testTables/PastDamageInfoTable';
import EstDamageAreaTable from '../testTables/EstDamageAreaTable';
import EstDangerZoneTable from '../testTables/EstDangerZoneTable';
import EvacuationTable from '../testTables/EvacuationTable';
import RescueTable from '../testTables/RescueTable';
import WasteTable from '../testTables/WasteTable';
import ReliefTable from '../testTables/ReliefTable';

import YhTest from '../testTables/yhTest';


interface colDataType {
  col: string;
  info: JSX.Element;
  able?: string;
}

const RightWrap = styled('div')(() => ({
  position: 'absolute',
  top: '64px',
  right: '0',
  width: '440px',
  height: 'calc(100% - 64px)',  // header 높이 제외
  overflowY: 'scroll',
  background: '#fff',
  borderLeft: '1px solid #cacdd0'
}));
const InfoWrap = styled('div')(() => ({}));
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: '1px solid #cacdd0',
  borderLeft: 0,
  borderRight: 0,
  transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.04)'
  }
}));


const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .035)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));


const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  padding: 0,
  borderTop: '1px solid #d3d3d3',
  '& .MuiTableHead-root': {
    position: 'sticky',
    top: 0,
    zIndex: 1,
    '& > tr > th': {
      borderBottom: '1px solid #d3d3d3',
      borderRight: '1px solid #d3d3d3',
      background: '#e9e9e9'
    },
  },
  '& .MuiTableBody-root > tr > td': {
    borderBottom: '1px solid #d3d3d3',
    borderRight: '1px solid #d3d3d3',
  }
}));


const ColInfo = ({ map, feature, onElement, index, changePast, yhchangePast, yhfeature }): JSX.Element => {
  const [disabled, setDisabled] = useState(true);

  /**
   * 아코디언 메뉴 활성화
   */
  useEffect(() => {    
    if (index !== undefined) {
      setDisabled(false);
    }
  }, [index, disabled]);

  /**
   * get past click event
   */
  useEffect(() => {
    const isLayer = CommonFn.findLayer(map, 'name', 'past');
    if (changePast) {
      isLayer.setVisible(true);
    } else {
      isLayer.setVisible(false);
    }
  }, [changePast]);




    /**
   * get yhpast click event
   */
     useEffect(() => {
      const isLayer = CommonFn.findLayer(map, 'yhname', 'yhpast');
      if (yhchangePast) {
        isLayer.setVisible(true);
      } else {
        isLayer.setVisible(false);
      }
    }, [yhchangePast]);




  /**
   * 수집정보 test data
   */
  const ColData: colDataType[] = [
    { col: 'Weather', info: <WeaterTable /> },
    { col: 'Event Overview', info: <AccidentTable /> },
    // { col: '피해상황', info: <DamageSitTable /> },
    // { col: 'CCTV', info: <CctvTable /> },

    { col: 'Past information', 
      info: <PastDamageInfoTable
                  map={map}
                  feature={feature}
                  onElement={onElement}/>, 
      able: 'view' },

    { col: 'Expected area', info: <EstDamageAreaTable
      map={map}
      feature={feature}
      onElement={onElement}
    /> },
    // { col: '예상위험지역', info: <EstDangerZoneTable /> },
    // { col: '대피분석', info: <EvacuationTable map={map} /> },
    // { col: '구조/수송', info: <RescueTable /> },
    { col: 'Waste Collection', info: <WasteTable /> },
    // { col: '이재민구호 및 수용인원 현황', info: <ReliefTable /> },


    { col: 'Link test', 
      info: <YhTest 
                map={map}
                feature={yhfeature}
                onElement={onElement} />, 
      able: 'view' },

  ];



  return (


    <RightWrap>
      <InfoWrap>

        {ColData.map((c, index) => {

          // 부분 리스트 가시화
          if (c.able) {
            return (
              <Accordion
                key={'col' + index}
                disabled={false}
              >
                <AccordionSummary>
                  <Typography>{c.col}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {c.info}
                </AccordionDetails>
              </Accordion>
            )
          } else {
            return (
              <Accordion key={'col' + index} disabled={disabled}>
                <AccordionSummary>
                  <Typography>{c.col}</Typography>
                </AccordionSummary>
                {!disabled &&
                  <AccordionDetails>
                    {c.info}
                  </AccordionDetails>
                }
              </Accordion>
            )
          }

        })}
      </InfoWrap>
    </RightWrap>
  );
};

export default ColInfo;