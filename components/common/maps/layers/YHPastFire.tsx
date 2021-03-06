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
   * ???????????? feature ?????? ??? ?????? ????????? *** yHlayer?????? ????????? png??? ??????????????? layer??? ????????? ?????????????????? ????????????
   */
   useEffect(() => {
   
    
    if (yhfeat && yhfeat.get('featType') === 'past') {
      console.log("??????")
      yhsetFeature(yhfeat);
    } else {
      console.log("????????????")
      yhsetFeature(null);
    }
    

  }, [yhfeat]);



  /**
   * past feature featType ??????
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
      // console.log(yhfeat) // yhTest???????????? ???????????? ????????? ?????? ,
      
    });
  }, [map]);






  
  /**
   * overlay past info
   */
   useEffect(() => {
    onElement({type: 'yhpast', ref: yhpopRef.current});
  }, [yhpopRef.current]);

  /**
   * data ????????? ??????
   */
  useEffect(() => {

    if (data.features.length) {
      let features = [];
      data.features.forEach(d => {
        const yhfeature = new Feature({
          geometry: new Point(d.geometry['coordinates']),
          name: d.properties['?????????'],
          featType: 'yhpast',
          ...d.properties
        });
        yhfeature.setId(d.properties['??????']);
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
   * ?????????????????? ????????? row click??? ?????? ??????
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
        const getFeature = isLayer.getSource().getSource().getFeatureById(selected.properties['??????']);
        if (getFeature) {
          yhsetFeature(getFeature);
          map.getView().animate({
            center: transform(selected.geometry.coordinates, 'EPSG:4326','EPSG:3857'), // ????????????
            zoom: 17.5,
            duration: 1000
          });
          overlay.setPosition(getFeature.getGeometry().getCoordinates());
        }
      }
    }
  }, [selected]);

  /**
   * ?????? ?????? ?????? ?????????
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
              title={yhfeature.get('?????????')}
              subheader={yhfeature.get('????????????')}
              action={
                <IconButton onClick={popupClose}>
                  <CloseIcon />
                </IconButton>
              }
            />


            <Divider />


            <PopupCont>
              <ul>
                <li><span>??????: </span>{yhfeature.get('????????????')}</li>
                <li><span>??????: </span>{yhfeature.get('??????')}</li>
                <li>
                  <span>????????????: </span>
                  {yhfeature.get('??????_??????').length ? yhfeature.get('??????_??????') : '-'}
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