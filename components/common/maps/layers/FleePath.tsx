import { useEffect } from 'react';
import { Vector as VectorSource } from 'ol/source';
import { Style, Stroke, Fill } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import CommonFn from '../CommonFn';

const FleePath = ({ map }) => {
  /**
   * building stylefunction
   */
  const buildingStyle = new Style({
    fill: new Fill({
      color: 'rgba(60, 90, 255, 0.2)',
    }),
    stroke: new Stroke({
      color: '#395eff',
      width: 1,
    })
  });
  /**
   * building group stylefunction
   */
  const buildingGroupStyle = new Style({
    fill: new Fill({
      color: 'rgba(100, 0, 20, 0.1)',
    }),
    stroke: new Stroke({
      color: '#6900ff',
      width: 1,
    })
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
   * building vector
   */
  const buildingLayer = new VectorLayer({
    source: new VectorSource({
      url: '/json/building.json',
      format: new GeoJSON(),
    }),
    zIndex: 3,
    style: buildingStyle
  });
  /**
   * building group vector
   */
  const buildingGroupLayer = new VectorLayer({
    source: new VectorSource({
      url: '/json/building_group.json',
      format: new GeoJSON(),
    }),
    zIndex: 2,
    style: buildingGroupStyle
  });
  /**
   * route vector
   */
  const routeLayer = new VectorLayer({
    source: new VectorSource({
      url: '/json/route.json',
      format: new GeoJSON(),
    }),
    zIndex: 4,
    style: routeStyle
  });

  /**
   * component init
   */
  useEffect(() => {
    // layer name setting
    buildingLayer.setProperties({
      'name': 'building',
      'viewKey': 'vecbuilding'
    });
    buildingGroupLayer.setProperties({
      'name': 'buildingGroup',
      'viewKey': 'vecbuildinggroup'
    });
    routeLayer.setProperties({
      'name': 'route',
      'viewKey': 'vecRoute'
    });

    // layer control
    const building = CommonFn.findLayer(map, 'name', 'building');
    const buildingGroup = CommonFn.findLayer(map, 'name', 'buildingGroup');
    const route = CommonFn.findLayer(map, 'name', 'route');
    if (!building) {     
      map.addLayer(buildingLayer);
    }
    if (!buildingGroup) {     
      map.addLayer(buildingGroupLayer);
    }
    if (!route) {     
      map.addLayer(routeLayer);
    }
  }, []);

  return (
    <div >
    </div>
  );
};

export default FleePath;