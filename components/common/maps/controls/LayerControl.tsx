import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AdjustIcon from '@mui/icons-material/Adjust';
import AltRouteIcon from '@mui/icons-material/AltRoute';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AppsIcon from '@mui/icons-material/Apps';
import DomainIcon from '@mui/icons-material/Domain';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import Tooltip from '@mui/material/Tooltip';

interface WidgetType {
  key: string;
  icon: JSX.Element;
  layer: string;
  title: string;
}

const LayerControlBtn = styled(Button)(() => ({
  position: 'absolute',
  top: '134px',
  right: '450px',
  zIndex: 1,
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
const ControlPop = styled('div')(() => ({
  position: 'absolute',
  top: '134px',
  right: '495px',
  zIndex: 1,
  display: 'block',
  width: '270px',
  height: 'calc(70% - 150px)',
  padding: '10px 20px',
  overflowY: 'scroll',
  background: '#ffffff',
  border: '1px solid #c0c0c0',
  borderRadius: '4px',
  filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.2))',
  '& > section': {
    '& > strong': {
      display: 'block',
      padding: '18px 0 11px',
      borderBottom: '1px solid #cacdd0',
      fontFamily: 'NanumSquare',
      fontSize: '17px',
      lineHeight: '12px',
      color: '#005ebb'
    },
    '& > ul': {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      '& > li': {
        display: 'inline-block',
        width: '33.3%',
        marginTop: '6px',
        verticalAlign: 'top',
        textAlign: 'center',
        '& > p': {
          margin: '0 auto',
          width: '48px',
          fontSize: '12px',
          textAlign: 'center'
        }
      },
      '& > li:hover': {
        '& > button': {
          background: '#edf6ff'
        }
      },
      '& > .active': {
        '& > button': {
          color: '#005ebb',
          background: '#edf6ff'
        }
      }
    }
  }
}));

const LayerControl = ({ map, onLayer, index }): JSX.Element => {
  const [ popup, setPopup ] = useState(null);
  const [ layer, setLayer ] = useState({
    'vecPast': true,
    'vecBuffer': true,
    'vecDamage': true,
    'vecBlkBuilding': true,
    'vecBlock': true,
    'vecBufBuilding': true,
    'vecbuilding': true,
    'vecbuildinggroup': true,
    'vecRoute': true
  });
  const [view, setView] = useState(false);

  // post layer state
  useEffect(() => {
    onLayer(layer);
  }, [layer]);

  /**
   * ????????? ???????????? ????????? ??????
   */
   useEffect(() => {
    if (index !== undefined) {
      setView(true);
    }
  }, [index]);

  /**
   * ????????? ???????????? ?????? ?????? ?????????
   */
  const onPopup = () => {
    if(popup) {
      setPopup(null);
    } else {
      setPopup('Activation');
    }
  };

  /**
   * ???????????? ?????????
   */
   const widgetData = [
    { key: '100', title: '??????????????????', sub: [
      { key: '110', icon: <LocalFireDepartmentIcon />, layer: 'vecPast', title: '????????????????????????' },
    ]},
    { key: '200', title: '??????????????????', sub: [
      { key: '210', icon: <AdjustIcon />, layer: 'vecBuffer', title: '??????????????????' },
      { key: '220', icon: <FireplaceIcon />, layer: 'vecDamage', title: '??????????????????' },
      { key: '230', icon: <HomeWorkIcon />, layer: 'vecBlkBuilding', title: '????????????????????????' },
      { key: '240', icon: <DomainIcon />, layer: 'vecBlock', title: '??????????????????' },
      { key: '250', icon: <ApartmentIcon />, layer: 'vecBufBuilding', title: '????????????????????????'},
    ]},
    { key: '300', title: '????????????', sub: [
      { key: '310', icon: <EmojiTransportationIcon />, layer: 'vecbuilding', title: '????????????????????????' },
      { key: '320', icon: <DomainIcon />, layer: 'vecbuildinggroup', title: '????????????????????????' },
      { key: '330', icon: <AltRouteIcon />, layer: 'vecRoute', title: '????????????' },
    ]}
  ];

  /**
   * ?????? ?????? ??? ????????? ??????
   * @param target clicked layer name
   */
  const toggleLayer = (target: string) => {
    const ly = {...layer};
    ly[target] = !ly[target];
    setLayer(ly);
    onLayer(ly);
    let isLayer = {};
    map.getLayers().forEach(l => {
      if(l.get('viewKey') === target){
        isLayer = l;
      }
    });
    if (Object.keys(isLayer).length) {
      isLayer.setVisible(ly[target]);
    }
  };

  /**
   * ?????? ????????? ?????? ?????????
   * @param obj widget sub
   */
  const onclick = (obj: WidgetType) => {
    toggleLayer(obj['layer']);
  };

  return (
    <>
      

      {/* ???????????? ?????? */}
      {popup &&
        <ControlPop>
          {widgetData.map(widget => {
            return (
              <section key={widget.key}>
                <strong>{widget.title}</strong>

                <ul>
                  {widget.sub.map(w => {

                    return (
                      <li
                        key={w.key}
                        onClick={e => onclick(w)}
                        className={layer[w.layer] ? 'active' : ''}
                      >

                        <IconButton>
                          {w.icon}
                        </IconButton>

                        <p>{w.title}</p>
                        
                      </li>
                    );

                  })}
                </ul>
                
              </section>
            );
          })}
        </ControlPop>
      }
    </>
  );
};

export default LayerControl;



// {/* ???????????? ?????? */}
// {view &&
//   <Tooltip title='????????? ??????'>
//     <LayerControlBtn onClick={onPopup} size='small'>
//       <AppsIcon />
//     </LayerControlBtn>
//   </Tooltip>
// }