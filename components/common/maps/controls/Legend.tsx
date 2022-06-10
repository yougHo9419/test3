import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const LgdCard = styled(Card)(() => ({
  position: 'absolute',
  bottom: '10px',
  left: '370px',
  border: '1px solid #b7b7b7',
  borderRadius: '4px',
  filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.2))',
  '& > .MuiCardContent-root': {
    paddingBottom: '0 !important',
    padding: '0 8px',
    '& > img': {
      width: '150px'
    }
  }
}));

const Legend = ({ index, toggle, changeSit }): JSX.Element => {
  const [view, setView] = useState(false);

  /**
   * 레이어 컨트롤러 가시화 제어
   */
  useEffect(() => {
    if (index !== undefined) {
      setView(true);
    }
  }, [index]);

  return (
    <>
      {view &&
        <LgdCard 
          variant='outlined'
          style={{ left: (toggle || changeSit) ? '370px' : '10px' }}
        >
          {/* <CardContent>
            <img src='/img/legend.png' alt='범례' />
          </CardContent> */}
        </LgdCard>
      }
    </>
  );
};

export default Legend;