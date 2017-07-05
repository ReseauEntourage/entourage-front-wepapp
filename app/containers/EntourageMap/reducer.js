/*
 *
 * EntourageMap reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SET_DATA,
  SET_OVERED_POINT_ID,
  SET_CLICKED_POINT_ID,
  SET_MAP_BOUNDS,
  SET_MAP_CENTER,
} from './constants';

const initialState = {
  dataPoints: {},
  overedPointId: null,
  clickedPointId: null,
  mapBounds: null,
  mapCenter: { lat: 48.8547942, lng: 2.3482701 }
};

function entourageMapReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        dataPoints: action.payload.reduce( (acc, item) => {
          acc[item.id] = {
            ...item,
            position: {lat: Number(item.Latitude), lng:Number(item.Longitude)}
          };
          return acc;
        }, {})
      };
    case SET_OVERED_POINT_ID:
      return { ...state, overedPointId: action.payload};
    case SET_CLICKED_POINT_ID:
      return { ...state, clickedPointId: action.payload};
    case SET_MAP_BOUNDS:
      return { ...state, mapBounds: action.payload};
    case SET_MAP_CENTER:
      return { ...state, mapCenter: action.payload};
    default:
      return state;
  }
}

export default entourageMapReducer;
