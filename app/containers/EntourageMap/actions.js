/*
 *
 * EntourageMap actions
 *
 */

import {
  SET_DATA,
  SET_OVERED_POINT_ID,
  SET_CLICKED_POINT_ID,
  SET_MAP_BOUNDS,
  SET_MAP_CENTER,
  SET_FILTER,
  INCREMENT_MAP_ZOOM,
  SET_MAP_ZOOM,
} from './constants';

export const setDataAction = (data) => ({
  type: SET_DATA,
  payload: data,
});
export const setOveredPointId = (pointId) => ({
  type: SET_OVERED_POINT_ID,
  payload: pointId,
});
export const setClickedPointId = (pointId) => ({
  type: SET_CLICKED_POINT_ID,
  payload: pointId,
});
export const setMapBounds = (mapBounds) => ({
  type: SET_MAP_BOUNDS,
  payload: mapBounds,
});
export const setMapCenter = (position) => ({
  type: SET_MAP_CENTER,
  payload: position,
});
export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
export const incrementMapZoom = (increment) => ({
  type: INCREMENT_MAP_ZOOM,
  payload: increment,
});
export const setMapZoom = (zoom) => ({
  type: SET_MAP_ZOOM,
  payload: zoom,
});
