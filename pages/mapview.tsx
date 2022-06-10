import { useState } from 'react';
import dynamic from 'next/dynamic';
import CssBaseline from '@mui/material/CssBaseline';
import Header from '../components/common/Header';

const Maps = dynamic(() => import('../components/mapview/Maps'), {ssr: false});

const Mapview = (): JSX.Element => {
  const [ changeSit, setChangeSit ] = useState(false);
  const [ changePast, setChangePast ] = useState(false);
  const [ layer, setLayer ] = useState(null);
  const [ open, setOpen ] = useState(false);

  const [ yhchangePast, yhsetChangePast ] = useState(false);

  /**
   * get state
   */
  const onSit = (sit: boolean) => {
    setChangeSit(sit);
  };
  const onPast = (past: boolean) => {
    setChangePast(past);
  };
  const onLayer = (layer: object) => {   
    setLayer(layer);
  };
  const onOpen = (open: boolean) => {
    setOpen(open);
  };

  const yhonPast = (yhpast: boolean) => {
    yhsetChangePast(yhpast);
  };

  

  return (
    <>
      <CssBaseline />
      <Header
        onSit={(sit: boolean) => onSit(sit)}
        onPast={(past: boolean) => onPast(past)}
        layer={layer}
        open={open}
        yhonPast={(yhpast:boolean) => yhonPast(yhpast)}

      />
      <Maps
        changeSit={changeSit}
        changePast={changePast}
        onLayer={(layer: object) => onLayer(layer)}
        onOpen={(open: boolean) => onOpen(open)}
        yhchangePast ={yhchangePast}
      />
    </>
  );
};

export default Mapview;