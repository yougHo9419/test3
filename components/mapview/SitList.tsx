import { useState, useEffect } from 'react';
import { transform } from 'ol/proj';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Pagination from '@mui/material/Pagination';
import ToggleButton from '@mui/material/ToggleButton';
import Typography from '@mui/material/Typography';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PlaceIcon from '@mui/icons-material/Place';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

import Progress from '../common/Progress';

interface sitDataType {
  sit: string;
  // time: Date;
  time: string;
  datail: string;
  place: string;
  latlon?: Array<number>;
}

const Loding = styled('div')(() => ({
  position: 'absolute',
  top: 0, 
  width: '100%',
  height: '100%',
  background: 'rgba(0, 0, 0, .7)',
  zIndex: 100,
  '& > .MuiBox-root': {
    position: 'absolute',
    top: '47%',
    left: '50%'
  },
  '& > span': {
    position: 'absolute',
    top: '53%',
    left: '50%',
    color: '#fff'
  }
}));
const LeftWrap = styled('div')(() => ({
  position: 'absolute',
  top: '64px',
  width: '360px',
  height: 'calc(100% - 64px)',  // header 높이 제외
  background: '#fff',
  borderRight: '1px solid #cacdd0'
}));
const LeftTitle = styled(Box)(() => ({
  width: '100%',
  height: '50px',
  backgroundColor: '#5d5d5d',
  '& > span': {
    fontSize: '1.1rem',
    lineHeight: 2.8,
    fontFamily: 'NanumSquare',
    color: '#fff',
    padding: '20px'
  }
}));
const ListWrap = styled('div')(() => ({
  height: 'calc(100% - 50px - 49px)',  // LeftTitle, Pagination 높이 제외
  overflowY: 'scroll',
  '& .MuiListItemButton-root': {
    cursor: 'auto'
  },
  '& .sitIcon > svg': {
    fontSize: '22px',
    marginRight: '2px',
    color: '#d32f2f'
  },
  '& .sitTitle': {
    marginRight: '6px',
    fontFamily: 'NanumSquare',
    fontSize: '1.2em',
    fontWeight: 700,
    verticalAlign: 'top'
  },
  '& .sitAnalysis': {
    boxShadow: 'none',
    height: '20px',
    top: '-7px',
    left: 0,
    padding: 0,
    paddingTop: '2px'
  },
  '& .sitTime': {
    lineHeight: '22px',
    float: 'right',
    color: '#005ebb',
    fontWeight: 600,
    fontSize: '0.9em',
  },
  '& .MuiListItemText-secondary': {
    background: '#e9e9e9',
    padding: '1em',
    borderRadius: '4px',
    '& > span': {
      display: 'block'
    }
  }
}));
const PaginationNavi = styled(Pagination)(() => ({
  position: 'absolute',
  bottom: 0,
  display: 'flex',
  width: '100%',
  padding: '0.5em 0',
  background: '#fff',
  borderTop: '1px solid #ddd',
  '& > ul': {
    margin: '0 auto'
  }
}));
const LeftToggleBtn = styled(ToggleButton)(() => ({
  zIndex: 1,
  position: 'absolute',
  top: '50%',
  width: '22px',
  height: '48px',
  padding: '11px 4px',
  background: '#fff !important',
  border: '1px solid #cacdd0',
  borderRadius: '0 4px 4px 0',
  '& > svg': {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: '1em'
  }
}));

const SitList = ({ map, onIndex, onToggle, changeSit }): JSX.Element => {
  const [toggle, setToggle] = useState(false);
  const [selectIndex, setSelectIndex] = useState<number>();
  const [progress, setProgress] = useState(false);

  /**
   * post index number
   */
  useEffect(() => {
    onIndex(selectIndex);
  }, [progress]);

  /**
   * get sit click event
   */
  useEffect(() => {
    if (changeSit) {
      setToggle(true);
      onToggle(true);
    } else {
      setToggle(false);
      onToggle(false);
    }
  }, [changeSit]);

  /**
   * left wrap 토클버튼 핸들러
   */
  const handleLeftWrapToggle = () => {
    setToggle(!toggle);
    onToggle(!toggle);
  };

  /**
   * list click 이벤트 핸들러
   * @param item  list item
   * @param index list index
   */
  const handleListItemClick = (item: sitDataType, index: number) => {
    map.getView().animate({
      center: transform(item.latlon, 'EPSG:4326','EPSG:3857'), // 좌표변환
      zoom: 18,
      duration: 2000
    });

    setSelectIndex(index);

    // 로딩 3초후 제거
    setProgress(true);
    setTimeout(() => {
      setProgress(false);
    }, 3000);
  };

  /**
   * 상황정보 test data
   */
  const SitData: sitDataType[] = [
    { sit: 'Rescue', time: '11.19 09:08:00' , datail: '1St fire response', place: '충청북도 제천시 하소동 71-7', latlon: [128.1993585, 37.1403084] },
    { sit: 'Situational message', time: '11.18 14:48:00' , datail: '[Rescue] Emergency dispatch order for a water accident', place: '서울특별시 성수1가2동' },
    { sit: 'Rescue', time: '11.18 14:23:00' , datail: 'Dangerous goods (others) 1st dispatch', place: '3-20, Munchang-dong, Jung-gu, Daejeon' ,latlon: [127.0502189,      37.545607]},    
  ];
  // @TODO: ex) sit가 구조면 fire 아이콘

  

  return (
    <>
      {progress &&
        <Loding>
          <Typography
            component='span'
            variant='body2'
            color='text.primary'
          >
            3 Second
          </Typography>
          <Progress />
        </Loding>
      }


    
      <LeftWrap id='LeftWrap' style={{display: toggle === false ? 'none' : 'block'}}>

        <LeftTitle>
          <Typography component='span' variant='subtitle1'>
            Live Situation
          </Typography>
        </LeftTitle>

        <ListWrap>
          {SitData.map((item, index) => (
            <div key={'sit' + index}>
              <ListItemButton>
                <ListItemText
                  primary={
                    <>
                      <span className='sitIcon'>{item.sit === 'Rescue' ? <MedicalServicesIcon /> : <VolumeUpIcon />}</span>
                      
                      <span className='sitTitle'>{item.sit}</span>

                      {item.sit === 'Rescue' &&
                        <Button
                          className='sitAnalysis'
                          onClick={() => handleListItemClick(item, index)}
                          variant='contained'
                          size='small'
                          color='error'
                        >
                          Analysis
                        </Button>
                      }

                      <span className='sitTime'>{item.time}</span>
                    </>
                  }
                  
                  secondary={
                    <>
                      <Typography
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        {item.datail}
                      </Typography>
                      <PlaceIcon style={{ verticalAlign: 'bottom' }} />
                      {item.place}
                    </>
                  }
                  primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
                />
              </ListItemButton>
              <Divider/>
            </div>
          ))}
        </ListWrap>
        
        <PaginationNavi count={10} color='primary' />
      </LeftWrap>



      <LeftToggleBtn
        value='check'
        selected={toggle}
        onClick={handleLeftWrapToggle}
        style={{left: toggle === false ? '0' : '359px'}}
      >
        {
          toggle === false
          ? <ArrowForwardIosOutlinedIcon />
          : <ArrowBackIosOutlinedIcon />
        }
      </LeftToggleBtn>
      
    </>
  );
};

export default SitList;
