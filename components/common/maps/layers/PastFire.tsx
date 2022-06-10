import { useEffect, useState, useRef } from 'react';
import { Vector as VectorSource, Cluster } from 'ol/source';
import { Style, Icon } from 'ol/style';
import { transform } from 'ol/proj';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import { styled } from '@mui/system'; 
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CommonFn from '../CommonFn';

const Popup = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  zIndex: 1,
  transform: 'translate(-50%, -102%)',
  '& > .MuiPaper-root': {
    boxShadow: '0px 0px 20px -1px rgb(0 0 0 / 20%)'
  },
  '& .popArrow': {
    display: 'block',
    width: '10px',
    height: '12px',
    margin: '0 auto',
    borderTop: '12px solid #fff',
    borderRight: '10px solid transparent',
    borderLeft: '10px solid transparent',
  }
}));
const PopupHead = styled(CardHeader)(() => ({
  '& .MuiCardHeader-title': {
    fontSize: '1.1rem',
    fontFamily: 'NanumSquare',
    fontWeight: 600
  }
}));
const PopupCont = styled(CardContent)(() => ({
  padding: '0 !important',
  '& > ul': {
    padding: '0 16px',
    listStyle: 'none',
    fontSize: '0.9rem',
  }
}));

let styleCache = {};

const PastFire = ({ map, selected, feat, onElement, data }) => {
  const popRef = useRef(null);
  const [feature, setFeature] = useState(feat);

  /**
   * past fire stylefunction
   */
  const pastStyle = () => {
    const styleName = 'past';
    let styles = styleCache[styleName];
    if (!styles) {
      styles = new Style({
        image: new Icon({
          src: '/img/fire.png',
          offset: [.1, .1],
          scale: .3
        })
      });
      styleCache[styleName] = styles;
    } 
    return styles; 
  };
  const layer = new VectorLayer({
    source: new Cluster({
      distance: 20,
      source: new VectorSource({
        url: '/json/past_fire_1984.json',
        format: new GeoJSON()
      }),
    }),
    visible: true,
    zIndex: 5,
    style: pastStyle
  });






  

  /**
   * component init
   */
  useEffect(() => {
    layer.setProperties({
      'name': 'past',
      'viewKey': 'vecPast',
      'renderMode': 'image',
      'type': 'overlay'
    });

    const isLayer = CommonFn.findLayer(map, 'name', 'past');
    if (!isLayer) {
      map.addLayer(layer);
    }
    return () => {
      const isLayer = CommonFn.findLayer(map, 'name', 'past');
      if (isLayer) {
        map.removeLayer(isLayer);
      }
    }
  }, []);

  /**
   * 지도에서 feature 선택 시 팝업 활성화
   */
  useEffect(() => {
    
    
    if (feat && feat.get('featType') === 'past') {
      //console.log(feat)
      setFeature(feat);
    } else {
      setFeature(null);
    }
  }, [feat]);

  /**
   * past feature featType 부여
   */
  useEffect(() => {
    map.on('singleclick', (evt) => {
      if (evt.dragging) {
        return;
      }
      const feats = map.getFeaturesAtPixel(evt.pixel, {
        layerFilter: (layer) => layer.get('viewKey') === 'vecPast'
      });
      if (feats.length) {
        const feat = feats[0].get('features')[0];
        feat.set('featType', 'past');
      }

      //console.log(feats )
      
    });
  }, [map]);

  /**
   * overlay past info
   */
   useEffect(() => {
    onElement({type: 'past', ref: popRef.current});
  }, [popRef.current]);

  /**
   * data 데이터 도시
   */
  useEffect(() => {
    if (data.features.length) {
      let features = [];
      data.features.forEach(d => {
        const feature = new Feature({
          geometry: new Point(d.geometry['coordinates']),
          name: d.properties['재난명'],
          featType: 'past',
          ...d.properties
        });
        feature.setId(d.properties['번호']);
        feature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        features.push(feature);
      });
      if (features.length) {
        const isLayer = CommonFn.findLayer(map, 'name', 'past');
        if (isLayer) {
          isLayer.getSource().getSource().clear();
          isLayer.getSource().getSource().addFeatures(features);
        } else {
          layer.getSource().getSource().addFeatures(features);
          map.addLayer(layer);
        }
      }
    }
  }, [data]);

  /**
   * 과거피해정보 테이블 row click에 의한 실행
   */
  useEffect(() => {
    if (selected) {
      // overlay
      let overlay = map.getOverlayById('vecOverlay');
      if (!overlay) {
        const ovrly = CommonFn.addOverlay(popRef.current);
        map.addOverlay(ovrly);
        overlay = ovrly;
      } else {
        overlay.setElement(popRef.current);
      }
      // move map
      const isLayer = CommonFn.findLayer(map, 'name', 'past');
      if (isLayer) {
        const getFeature = isLayer.getSource().getSource().getFeatureById(selected.properties['번호']);
        if (getFeature) {
          setFeature(getFeature);
          map.getView().animate({
            center: transform(selected.geometry.coordinates, 'EPSG:4326','EPSG:3857'), // 좌표변환
            zoom: 12.5,
            duration: 1000
          });
          overlay.setPosition(getFeature.getGeometry().getCoordinates());
        }
      }
    }
  }, [selected]);

  /**
   * 팝업 닫기 클릭 이벤트
   */
  const popupClose = () => {
    let overlay = map.getOverlayById('vecOverlay');
    overlay.setElement();
  };

  return (
    <div ref={popRef}>
      {feature &&
        <Popup>
          <Card sx={{ minWidth: 315 }}>
            <PopupHead
              title={feature.get('재난명')}
              subheader={feature.get('재난유형')}
              action={
                <IconButton onClick={popupClose}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <Divider />
            <PopupCont>
              <ul>
                <li><span>Date: </span>{feature.get('운영기간')}</li>
                <li><span>Address: </span>{feature.get('주소')}</li>
                <li>
                  <span>Amount of damage: </span>
                  {feature.get('피해_규모').length ? feature.get('피해_규모') : '-'}
                </li>
              </ul>
            </PopupCont>
          </Card>
          <div className='popArrow'></div>
        </Popup>
      }
    </div>
  );
};

export default PastFire;