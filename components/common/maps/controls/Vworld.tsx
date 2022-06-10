import { Map } from 'ol';
import { fromLonLat } from 'ol/proj';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import Tooltip from '@mui/material/Tooltip';
import MapIcon from '@mui/icons-material/Map';
import Maps from '../../../mapview/Maps'



interface Prop {
    map: Map;
    center?: Array<number>;
    zoom?: number;
  }
  
const HomeBtn = styled(Button)(() => ({
    position: 'absolute',
    top: '74px',
    right: '490px',
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

  const VworldMapBnt = ( { map }): JSX.Element => {
    /**
     * CenterPosition 클릭 이벤트
     */
    const handleVworldMap = () => {
    //   const center = props.center ? fromLonLat(props.center) : fromLonLat([126, 38]);
    //   const zoom = props.zoom || 7;
    //   props.map.getView().animate({zoom, center});
      
      //console.log(map.values_.layergroup.values_.layers.array_)
      !map.values_.layergroup.values_.layers.array_[1].values_.visible ? 
        map.values_.layergroup.values_.layers.array_[1].setVisible(true) : 
        map.values_.layergroup.values_.layers.array_[1].setVisible(false)


    };




  
    return (
      <Tooltip title='Change Map'>
        <HomeBtn onClick={handleVworldMap} size='small'>
          <MapIcon />
        </HomeBtn>
      </Tooltip>
    );
  };
  
  export default VworldMapBnt;