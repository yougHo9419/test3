import { Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';

interface Prop {
  map: Map;
  center?: Array<number>;
  zoom?: number;
}

const HomeBtn = styled(Button)(() => ({
  position: 'absolute',
  top: '74px',
  right: '450px',
  minWidth: '30px',
  minHeight: '30px',
  background: '#fff',
  color: 'rgba(0, 0, 0, 0.54)',
  border: '1px solid #b7b7b7',
  boxShadow: '0 2px 2px 0px rgb(66 66 66 / 28%)',
  '&:hover': {
    background: '#005ebb',
    color: '#fff',
    transition: 'all 250ms'
  }
}));

const HomePos = (props: Prop): JSX.Element => {
  /**
   * CenterPosition 클릭 이벤트
   */
  const handleHomePosition = () => {
    const center = props.center ? fromLonLat(props.center) : fromLonLat([126, 38]);
    const zoom = props.zoom || 7;
    props.map.getView().animate({zoom, center});
  };

  return (
    <Tooltip title='Back to home'>
      <HomeBtn onClick={handleHomePosition} size='small'>
        <HomeIcon />
      </HomeBtn>
    </Tooltip>
  );
};

export default HomePos;