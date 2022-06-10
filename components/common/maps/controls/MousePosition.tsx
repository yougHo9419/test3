import { useEffect } from 'react';
import { Map } from 'ol';
import { format, toStringHDMS } from 'ol/coordinate';
import MousePosition from 'ol/control/MousePosition';
import { styled } from '@mui/material/styles';

interface Prop {
  map: Map;
}

const MouseBtn = styled('div')(() => ({
  position: 'absolute',
  left: 'auto',
  right: '614px',
  bottom: '11px',
  padding: '.25em',
  height: '21px',
  background: 'rgb(255 255 255 / 60%)',
  borderRadius: '3px',
  fontSize: '.75em',
  color: '#000',
  textAlign: 'center',
  pointerEvents: 'none',
  opacity: .8,
  '& > .mouse-position-outline': {
    padding: '0 .5em',
    border: 'none',
  },
  '& .custom-mouse-position': {
    display: 'inline-block',
  }
}));

const MousePos = (props: Prop): JSX.Element => {
  useEffect(() => {
    const mousePosition = new MousePosition({
      coordinateFormat: (coord) => {
        return format(coord, `Geographic (WGS84) : ${toStringHDMS(coord, 2)}`)
      },
      projection: 'EPSG:4326',
      className: 'custom-mouse-position',
      target: 'mouse-position',
      undefinedHTML: 'Geographic (WGS84) : lon,&nbsp;lat'
    });
    let isMousePosition: any;
    props.map.getControls().forEach( c => {
      if (c instanceof MousePosition) {
        isMousePosition = c;
      }
    });
    if (!isMousePosition) {
      props.map.addControl(mousePosition);
    }
    return () => {
      let isMousePosition;
      props.map.getControls().forEach( c => {
        if (c instanceof MousePosition) {
          isMousePosition = c;
        }
      });
      if (isMousePosition) {
        props.map.removeControl(isMousePosition);
      }
    }
  }, []);

  return (
    <MouseBtn>
      <div className={'mouse-position-outline'}>
        <span id='mouse-position'></span>
      </div>
    </MouseBtn>
  );
};

export default MousePos;