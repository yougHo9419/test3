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

import {  Stroke, Fill } from 'ol/style';

const YhPopup = styled('div')(() => ({
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




const YhPastFire = ({  yhfeat, map, selected,data,onElement }) => {
  const popRef = useRef(null);
  const [yhfeature, yhsetFeature] = useState(yhfeat);
  const yhpopRef = useRef(null);
  

  /**
   * past fire stylefunction
   */
  const yHpastStyle = () => {
    const styleName = 'yhpast';
    let styles = styleCache[styleName];
    if (!styles) {
      styles = new Style({
        image: new Icon({
          src: '/img/icon.png',
          offset: [.1, .1],
          scale: 1
        })
      });
      styleCache[styleName] = styles;
    } 
    return styles;  
  };


  const yHlayer = new VectorLayer({

    source: new Cluster({
      distance: 20,
      source: new VectorSource({
        url: '/json/yhTest.json',
        format: new GeoJSON()
      }),
    }),
    visible: true,
    zIndex: 5,
    style: yHpastStyle
  });





  /**
   * route stylefunction
   */
   const routeStyle = new Style({
    stroke: new Stroke({
      color: '#ff5252',
      width: 3,
    })
  });


  /**
   * route vector
   */
   const routeLayer = new VectorLayer({
    source: new VectorSource({
      url: '/json/yhroute.json',
      format: new GeoJSON(),
    }),
    zIndex: 4,
    style: routeStyle
  });

  useEffect(() => {
    routeLayer.setProperties({
      'name': 'route',
      'viewKey': 'vecRoute'
    });

    const route = CommonFn.findLayer(map, 'name', 'route');
    if (!route) {     
      map.addLayer(routeLayer);
     }

     return () => {
      if (route) {     
        map.addLayer(routeLayer);
       }
    }

  }, []);





  /**
   * component init
   */
  useEffect(() => {
    yHlayer.setProperties({
      'yhname': 'yhpast',
      'yhviewKey': 'yhvecpast',
      'yhrenderMode': 'yhimage',
      'yhtype': 'yhoverlay',
    });

    const isLayer = CommonFn.findLayer(map, 'yhname', 'yhpast');
    if (!isLayer) {
      map.addLayer(yHlayer);
    }

    return () => {
      const isLayer = CommonFn.findLayer(map, 'yhname', 'yhpast');
      if (isLayer) {
        map.removeLayer(isLayer);
      }
    }
  }, []);











  /**
   * 지도에서 feature 선택 시 팝업 활성화 *** yHlayer에서 생성한 png와 다른파일의 layer가 꼬여서 아코디언에서 활성화됨
   */
   useEffect(() => {
   
    
    if (yhfeat && yhfeat.get('featType') === 'past') {
      console.log("존재")
      yhsetFeature(yhfeat);
    } else {
      console.log("존재안함")
      yhsetFeature(null);
    }
    

  }, [yhfeat]);



  /**
   * past feature featType 부여
   */
  useEffect(() => {

    map.on('singleclick', (evt2) => {

      if (evt2.dragging) {
        return;
      }

      const yhfeats = map.getFeaturesAtPixel(evt2.pixel, {
        layerFilter: (yHlayer) => yHlayer.get('yhviewKey') === 'yhvecpast'
      });

      if (yhfeats.length) {
        const yhfeat = yhfeats[0].get('features')[0];
        yhfeat.set('yhfeatType', 'yhpast');
        
      }
      // console.log(yhfeat) // yhTest파일에서 아코디언 박스는 생성 ,
      
    });
  }, [map]);






  
  /**
   * overlay past info
   */
   useEffect(() => {
    onElement({type: 'yhpast', ref: yhpopRef.current});
  }, [yhpopRef.current]);

  /**
   * data 데이터 도시
   */
  useEffect(() => {

    if (data.features.length) {
      let features = [];
      data.features.forEach(d => {
        const yhfeature = new Feature({
          geometry: new Point(d.geometry['coordinates']),
          name: d.properties['재난명'],
          featType: 'yhpast',
          ...d.properties
        });
        yhfeature.setId(d.properties['번호']);
        yhfeature.getGeometry().transform('EPSG:4326', 'EPSG:3857');
        features.push(yhfeature);
      });

      
      if (features.length) {
        
        const isLayer = CommonFn.findLayer(map, 'yhname', 'yhpast');
        

        if (isLayer) {
          isLayer.getSource().getSource().clear();
          isLayer.getSource().getSource().addFeatures(features);
          
        } else {
          yHlayer.getSource().getSource().addFeatures(features);
          map.addLayer(yHlayer);
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
        const ovrly = CommonFn.addOverlay(yhpopRef.current);
        map.addOverlay(ovrly);
        overlay = ovrly;
      } else {
        overlay.setElement(yhpopRef.current);
      }

      // move map
      const isLayer = CommonFn.findLayer(map, 'yhname', 'yhpast');
      
      //console.log(isLayer)
      if (isLayer) {
        const getFeature = isLayer.getSource().getSource().getFeatureById(selected.properties['번호']);
        if (getFeature) {
          yhsetFeature(getFeature);
          map.getView().animate({
            center: transform(selected.geometry.coordinates, 'EPSG:4326','EPSG:3857'), // 좌표변환
            zoom: 17.5,
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
    <div ref={yhpopRef}>


      {yhfeature &&
        <YhPopup>
          <Card sx={{ minWidth: 415 }}>

            <PopupHead
              title={yhfeature.get('재난명')}
              subheader={yhfeature.get('재난유형')}
              action={
                <IconButton onClick={popupClose}>
                  <CloseIcon />
                </IconButton>
              }
            />


            <Divider />


            <PopupCont>
              <ul>
                <li><span>일시: </span>{yhfeature.get('운영기간')}</li>
                <li><span>주소: </span>{yhfeature.get('주소')}</li>
                <li>
                  <span>피해규모: </span>
                  {yhfeature.get('피해_규모').length ? yhfeature.get('피해_규모') : '-'}
                </li>
              </ul>
            </PopupCont>


          </Card>

          <div className='popArrow'></div>
        </YhPopup>
      }
    </div>
  );
};

export default YhPastFire;