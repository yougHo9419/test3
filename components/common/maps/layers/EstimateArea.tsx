import { useState, useEffect, useRef } from 'react';
import { Vector as VectorSource } from 'ol/source';
import { Style, Stroke, Fill } from 'ol/style';
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

const EstimateArea = ({ map, feat, onElement }) => {
  const popRef = useRef(null);
  const [feature, setFeature] = useState(feat);

  /**
   * damagedBuild feature featType 부여
   */
  useEffect(() => {
    map.on('singleclick', (evt) => {
      if (evt.dragging) {
        return;
      }
      const feats = map.getFeaturesAtPixel(evt.pixel, {
        layerFilter: (layer) => layer.get('viewKey') === 'vecDamage'
      });
      if (feats.length) {
        const feat = feats[0];
        feat.set('featType', 'damagedBuild');
      }
    });
  }, [map]);

  /**
   *  blk build stylefunction
   */
  const blkBuildStyle = new Style({
    fill: new Fill({
      color: 'rgba(40, 180, 40, 0.3)',
    }),
    stroke: new Stroke({
      color: '#3cb331',
      width: 1,
    }),
  });
  /**
   *  block stylefunction
   */
  const blockStyle = new Style({
    fill: new Fill({
      color: 'rgba(255, 185, 0, 0.2)',
    }),
    stroke: new Stroke({
      color: '#ffb800',
      width: 1,
    }),
  });
  /**
   *  buf build stylefunction
   */
  const bufBuildStyle = new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.5)',
    }),
    stroke: new Stroke({
      color: '#319FD3',
      width: 1,
    }),
  });
  /**
   *  buffer stylefunction
   */
  const bufferStyle = new Style({
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.05)',
    }),
    stroke: new Stroke({
      color: '#8f0000',
      width: 1,
    }),
  });
  /**
   *  damaged build stylefunction
   */
  const damagedBuildStyle = new Style({
    fill: new Fill({
      color: 'rgba(255, 0, 0, 0.5)',
    }),
    stroke: new Stroke({
      color: '#ff0000',
      width: 1,
    }),
  });

  /**
   * blk build vector
   * 화재 확산 위험 건물 레이어
   */
  const blkBuildLayer = new VectorLayer({
    source: new VectorSource({
      url: '/json/blk_build.json',
      format: new GeoJSON(),
    }),
    zIndex: 4,
    style: blkBuildStyle
  });
  /**
   * block vector
   * 화재 확산 위험 건물 블록 레이어
   */
  const blockLayer = new VectorLayer({
    source: new VectorSource({
      url: '/json/block.json',
      format: new GeoJSON(),
    }),
    zIndex: 3,
    style: blockStyle
  });
  /**
   * buf build vector
   * 주변 건물 레이어
   */
  const bufBuildLayer = new VectorLayer({
    source: new VectorSource({
      url: '/json/buf_build.json',
      format: new GeoJSON(),
    }),
    zIndex: 2,
    style: bufBuildStyle
  });
  /**
   * buffer vector
   * 예상 피해범위 바운더리 레이어
   */
  const bufferLayer = new VectorLayer({
    source: new VectorSource({
      url: '/json/buffer.json',
      format: new GeoJSON(),
    }),
    zIndex: 1,
    style: bufferStyle
  });
  /**
   * damaged build vector
   * 화재 발생 건물 레이어
   */
  const damagedBuildLayer = new VectorLayer({
    source: new VectorSource({
      url: '/json/damaged_build.json',
      format: new GeoJSON(),
    }),
    zIndex: 3,
    style: damagedBuildStyle
  });

  /**
   * component init
   */
  useEffect(() => {
    // layer name setting
    blkBuildLayer.setProperties({
      'name': 'blkBuild',
      'viewKey': 'vecBlkBuilding'
    });
    blockLayer.setProperties({
      'name': 'block',
      'viewKey': 'vecBlock'
    });
    bufBuildLayer.setProperties({
      'name': 'bufBuild',
      'viewKey': 'vecBufBuilding'
    });
    bufferLayer.setProperties({
      'name': 'buffer',
      'viewKey': 'vecBuffer'
    });
    damagedBuildLayer.setProperties({
      'name': 'damagedBuild',
      'viewKey': 'vecDamage',
      'type': 'overlay'
    });

    // layer control
    const blkBuild = CommonFn.findLayer(map, 'name', 'blkBuild');
    const block = CommonFn.findLayer(map, 'name', 'block');
    const bufBuild = CommonFn.findLayer(map, 'name', 'bufBuild');
    const buffer = CommonFn.findLayer(map, 'name', 'buffer');
    const damagedBuild = CommonFn.findLayer(map, 'name', 'damagedBuild');
    if (!blkBuild) {
      map.addLayer(blkBuildLayer);
    }
    if (!block) {
      map.addLayer(blockLayer);
    }
    if (!bufBuild) {
      map.addLayer(bufBuildLayer);
    }
    if (!buffer) {
      map.addLayer(bufferLayer);
    }
    if (!damagedBuild) {
      map.addLayer(damagedBuildLayer);
    }  
  }, []);

  /**
   * 지도에서 feature 선택 시 팝업 활성화
   */
  useEffect(() => {
    if (feat && feat.get('featType') === 'damagedBuild') {
      setFeature(feat);
    } else {
      setFeature(null);
    }
  }, [feat]);

  /**
   * overlay past info
   */
  useEffect(() => {
    onElement({type: 'damagedBuild', ref: popRef.current});
  }, [popRef.current]);

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
          <Card sx={{ minWidth: 295 }}>
            <PopupHead
              title='두손스포리움 (운동시설)'
              subheader='충청북도 제천시 하소동'
              action={
                <IconButton onClick={popupClose}>
                  <CloseIcon />
                </IconButton>
              }
            />
            <Divider />
            <PopupCont>
              <ul>
                <li><span>건물내추정인구: </span>{feature.get('POP')}명</li>
                <li><span>예상인명피해: </span>40명</li>
                <li><span>추정재산피해: </span>207,000,000원</li>
                <li><span>데이터기준일자: </span>{feature.get('A22')}</li>

                {/* 인코딩 깨짐 */}
                {/* <li><span>주소: </span>{feature.get('A4')}</li> */}
                {/* <li><span>건물용도: </span>{feature.get('A9')}</li> */}
              </ul>
            </PopupCont>
          </Card>
          <div className='popArrow'></div>
        </Popup>
      }
    </div>
  );
};

export default EstimateArea;