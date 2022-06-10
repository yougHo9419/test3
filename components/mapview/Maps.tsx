import { useEffect, useState, useRef } from 'react'
import { Map, View } from 'ol'
import { defaults as defaultControls } from 'ol/control';
import { Tile } from 'ol/layer'
import { OSM } from 'ol/source'
import { fromLonLat } from 'ol/proj'
import { styled } from '@mui/material/styles';
import { scaleLine } from '../common/maps/controls/ScaleLine';
import { zoom } from '../common/maps/controls/ZoomSlider';
import ColInfo from './ColInfo';
import CommonFn from '../common/maps/CommonFn';

import HomePos from '../common/maps/controls/HomePosition';
import VworldPos from '../common/maps/controls/Vworld';

import LayerControl from '../common/maps/controls/LayerControl';
import Legend from '../common/maps/controls/Legend';
import MousePos from '../common/maps/controls/MousePosition';
import SitList from './SitList';

import { XYZ } from 'ol/source'
import { CatchingPokemonSharp } from '@mui/icons-material';

const MapWrap = styled('div')(() => ({
  width: '100%',
  height: '100%',
  position: 'relative',
  '& .ol-scale-line': {
    position: 'fixed',
    left: 'auto',
    right: '450px',
    bottom: '10px',
    background: 'rgb(255 255 255 / 38%)',
    borderRadius: '3px',
    '& > .ol-scale-line-inner': {
      border: '1px solid #333',
      borderTop: 'none',
      color: '#333',
      fontSize: '.7em'
    }
  },
  '& .custom-zoom': {
    top: '54px',
    right: '450px',
    padding: 0,
    background: '#fff',
    border: '1px solid #b7b7b7',
    boxShadow: '0 2px 2px 0px rgb(66 66 66 / 28%)',
    '& > .custom-zoom-in': {
      margin: 0,
      minWidth: '34px',
      minHeight: '34px',
      background: '#fff',
      color: 'rgba(0, 0, 0, 0.54)',
      borderBottom: '1px solid #b7b7b7',
      borderRadius: '4px 4px 0 0',
      cursor: 'pointer',
      '&:hover': {
        background: '#005ebb',
        color: '#fff',
        transition: 'all 250ms'
      }
    },
    '& > .custom-zoom-out': {
      margin: 0,
      minWidth: '34px',
      minHeight: '34px',
      background: '#fff',
      color: 'rgba(0, 0, 0, 0.54)',
      borderRadius: '0 0 4px 4px',
      cursor: 'pointer',
      '&:hover': {
        background: '#005ebb',
        color: '#fff',
        transition: 'all 250ms'
      }
    }
  }
}));

const maps = new Map({

  controls: defaultControls({
    attribution: false,
    zoom: false
  }).extend([
    scaleLine,
    zoom
  ]),

  target: 'map',

  layers: [
    new Tile({
      source: new OSM()
    }),

    new Tile({

      visible: false,
      source: new XYZ({
          url: `http://api.vworld.kr/req/wmts/1.0.0/451867C5-4A7B-3836-9188-EEC3C3BB9542/Base/{z}/{y}/{x}.png`
          //url: `http://api.vworld.kr/req/wmts/1.0.0/451867C5-4A7B-3836-9188-EEC3C3BB9542/Satellite/{z}/{y}/{x}.jpeg`
      }),
      }),

  ],
  view: new View({
    center: fromLonLat([128, 37]),
    zoom: 7,
    constrainOnlyCenter: true
  })

});

let ele = {};

const Maps = ({ changeSit, changePast, onLayer, onOpen, yhchangePast }) => {
  const mapRef = useRef(null);
  const [ map, setMap ] = useState(maps);
  const [ feature, setFeature ] = useState<any>();
  const [ selectIndex, setSelectIndex ] = useState(undefined);
  const [ toggle, setToggle ] = useState(false);
  const [ yhfeature, yhsetFeature ] = useState<any>();

  /**
   * create openlayers map canvas
   */
  useEffect(() => {
    map.setTarget(mapRef.current);
    window['map'] = map;

    let isOvrly = map.getOverlayById('vecOverlay');
    if (!isOvrly) {
      const ovrly = CommonFn.addOverlay();
      map.addOverlay(ovrly);
      isOvrly = ovrly;
    }
  }, [mapRef.current]);

  /**
   * mapping overlay element
   * @param type layer name
   * @param ref  popup element
   */
  const onElement = ({type, ref}) => {
    ele[type] = ref;
  };

  /**
   * get sit list index
   * @param index list index
   */
  const onIndex = (index: number) => {
    setSelectIndex(index);
  };

  /**
   * get toggle state
   * @param open toggle state
   */
  const onToggle = (open: boolean) => {
    onOpen(open);
    setToggle(open);
  };





  /**
   * 지도에서 선택한 피처에 대하여 overlay 처리
   * @param pixel 선택한 피처의 픽셀값
   * @param coordinate 선택한 피처의 위치값
   */
  const mapFeature = (pixel: number[], coordinate: object) => {
    let isOvrly: any;
    isOvrly = map.getOverlayById('vecOverlay');
    
    if (!isOvrly) {
      const ovrly = CommonFn.addOverlay();
      map.addOverlay(ovrly);
      isOvrly = ovrly;
    }

    const feats = map.getFeaturesAtPixel(pixel, {
      layerFilter: (layer) => layer.get('type') === 'overlay'
    });

    
   

    if (!feats.length) {
      isOvrly.setPosition();
    } else {
      const eleRef = {...ele};
      let feat = feats[0]; // 아이콘이 배열일 경우
  
      if (feat.get('features')) { // 클러스터인 경우
        feat = feat.get('features')[0];
      }
      const type = feat.get('featType');
      if (eleRef[type]) {
        isOvrly.setElement(eleRef[type]);
        isOvrly.setPosition(coordinate);
        setFeature(feat);
      }
    }
  };

  /**
   * map 클릭 시, 픽셀과 좌표 값 전송
   */
  useEffect(() => {
    map.on('singleclick', (evt) => {;
      if (evt.dragging) {
        return;
      }
      mapFeature(evt.pixel, evt.coordinate);
    });
  }, [map]);



  //console.log(!!map )  



  return (
    <>
      <MapWrap ref={mapRef}>
        {!!map && <LayerControl
                      map={map}
                      onLayer={onLayer}
                      index={selectIndex}
                    />
        }
      </MapWrap>


      {!!map && <HomePos map={map} />}
      {!!map && <MousePos map={map} />}

      {!!map && <VworldPos map={map} />}


      {!!map && <ColInfo
        map={map}
        feature={feature}
        onElement={onElement}
        index={selectIndex}
        changePast={changePast}
        yhchangePast={yhchangePast}
        yhfeature={yhfeature}
      />}
      

      {!!map && <SitList
        map={map}
        onIndex={(e: number) => onIndex(e)}
        onToggle={(e: boolean) => onToggle(e)}
        changeSit={changeSit}
      />}
      
      {!!map && <Legend
        index={selectIndex}
        toggle={toggle}
        changeSit={changeSit}
      />}
    </>
  );
};

export default Maps;