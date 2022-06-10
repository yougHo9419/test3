import { Map, Overlay } from 'ol';

export default class CommonFn {
  /**
   * map에 존재하는 레이어 찾기
   * @param map openlayers map
   * @param key find key
   * @param val find value
   * @returns 
   */
  static findLayer = (map: Map, key: string, val:string) => {
    // console.log(map.getLayers().getArray().find( l => l ) )

    return map.getLayers().getArray().find( l => l.get(key) === val );
  }

  /**
   * overlayer 생성
   * @param element element
   * @param id vecter overlay
   * @returns 
   */
  static addOverlay = (element?: HTMLElement, id='vecOverlay') => {
    return new Overlay({
      element,
      positioning: 'bottom-center',
      autoPan: true,
      autoPanAnimation: {
        duration: 250,
      },
      autoPanMargin: 100,
      id
    });
  }
}