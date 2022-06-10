import { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import ToggleButton from '@mui/material/ToggleButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HistoryIcon from '@mui/icons-material/History';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import { saveAs } from 'file-saver';

import AddLocationIcon from '@mui/icons-material/AddLocation';

/**
 * 헤더 타이틀 스타일
 */
const MainTitle = styled(Typography)(() => ({
  fontFamily: 'NanumSquare',
  fontWeight: 700
}));
/**
 * 검색바 스타일
 */
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
    transitionDuration: '150ms'
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));
/**
 * 검색 아이콘 스타일
 */
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
/**
 * 검색 인풋 스타일
 */
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));
const IconGroup = styled(Box)(() => ({
  '& > .MuiToggleButton-root': {
    border: 0,
    borderRadius: '50%',
    color: 'inherit'
  },
  '& > .MuiToggleButton-root.Mui-selected': {
    color: 'inherit'
  },
}));

export default function Header({ onSit, onPast, layer, open, yhonPast }): JSX.Element {
  const [sitSelected, setSitSelected] = useState(false);
  const [pastSelected, setPastSelected] = useState(false);
  const [changeLayer, setChangeLayer] = useState();
  const [count, setCount] = useState(1);

  const [yhpastSelected, yhsetPastSelected] = useState(false);

  /**
   * 실시간 상황정보 상태 업데이트
   */
  useEffect(() => {
    if (sitSelected) {
      setCount(0)
    }
  }, [sitSelected]);

  /**
   * LayerControl에 의한 layer 상태 업데이트
   */
  useEffect(() => {
    setChangeLayer(layer);
  }, [layer]);

  /**
   * SitList에 의한 open 상태 업데이트
   */
  useEffect(() => {
    setSitSelected(open);
  }, [open]);

  /**
   * 실시간 상황정보 클릭 이벤트
   */
  const handleClickSit = () => {
    setSitSelected(!sitSelected);
    onSit(!sitSelected);
  };
  /**
   * 과거 피해정보 클릭 이벤트
   */
  const handleClickPast = () => {
    setPastSelected(!pastSelected);
    onPast(!pastSelected);
  };
  /**
   * 보고서 출력 이벤트
   */
  const handlePrintDoc = () => {
    
    const url = window.location.origin;
  
    if (changeLayer) {
      if (changeLayer['vecPast']) {  // 과거피해정보 layer
        saveAs(`${url}/report/past_report.pdf`, 'past_report.pdf');
      } else if (changeLayer['vecBuffer']) { // 예상피해지역 layer
        saveAs(`${url}/report/buf_report.pdf`, 'buf_report.pdf');
      } else {  // 대피분석 layer
        saveAs(`${url}/report/route_report.pdf`, 'route_report.pdf');
      }
    }
  };


  /**
     * yhTest 클릭 이벤트
     */
  const yhhandleClickPast = () => {
    yhsetPastSelected(!yhpastSelected);
    yhonPast(!yhpastSelected);
  };

  

  return (

    <Box id='headerContainer' sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <MainTitle
            variant='h6'
            noWrap
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Emergency Control System
          </MainTitle>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search situation'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <IconGroup sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title='Live infromation'>
              <ToggleButton
                value='check'
                selected={sitSelected}
                onChange={handleClickSit}
              >
                <Badge badgeContent={count} color='error'>
                  <NotificationsIcon />
                </Badge>
              </ToggleButton>
            </Tooltip>
            <Tooltip title='Past infromation'>
              <ToggleButton
                value='check'
                selected={pastSelected}
                onChange={handleClickPast}
              >
                <HistoryIcon />
              </ToggleButton>
            </Tooltip>
            {/* <Tooltip title='보고서 출력'>
              <IconButton
                id='exportReport'
                onClick={handlePrintDoc}
                size='large'
                color='inherit'
              >
                <AssignmentIcon />
              </IconButton>
            </Tooltip> */}

            <Tooltip title='주소링크 test'>
              <ToggleButton
                value='check'
                selected={yhpastSelected}
                onChange={yhhandleClickPast}
              >
                <AddLocationIcon />
              </ToggleButton>
            </Tooltip>


          </IconGroup>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
