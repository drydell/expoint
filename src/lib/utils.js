import { replace } from 'lodash';
import { API } from './api';
import { MIN_PANEL_HEIGHT } from '../constants';

export const numberToPx = num => `${num}px`;
export const numberToPct = num => `${num}%`;
export const pxToNumber = px => Number(replace(px, 'px', ''));

export const getAppHeight = () => pxToNumber(window.getComputedStyle(document.querySelector('#root')).height);
export const getPanelHeight = panel => pxToNumber(window.getComputedStyle(panel).height);

export const onMouseMove = evt => {
  const splitterApi = API.getSplitterApi();
  splitterApi.delta = Math.min(
    Math.max(evt.clientY - splitterApi.initial.Y, -splitterApi.initial.topHeight),
    splitterApi.initial.bottomHeight
  );
  switch(true) {
    case ((splitterApi.initial.topHeight + splitterApi.delta) < MIN_PANEL_HEIGHT):
      splitterApi.top.setMinHeight();
      splitterApi.bottom.setMaxHeight();
      break;
    case ((splitterApi.initial.bottomHeight - splitterApi.delta) < MIN_PANEL_HEIGHT):
      splitterApi.top.setMaxHeight();
      splitterApi.bottom.setMinHeight();
      break;
    default:
      splitterApi.top.setHeight(splitterApi.initial.topHeight + splitterApi.delta);
      splitterApi.bottom.setHeight(splitterApi.initial.bottomHeight - splitterApi.delta);
      break;
  }
};

export const resetSymbolInput = symbol => {
  const getSymbolApi = API.getSymbolApi();
  getSymbolApi.setValue(symbol);
  getSymbolApi.onSearch(symbol);
};