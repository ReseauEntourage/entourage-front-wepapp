import { createSelector } from 'reselect';

/**
 * Direct selector to the entourageMap state domain
 */
export const selectEntourageMapDomain = (state) => state.get('entourageMap');
const selectDataPoints = (state) => state.get('entourageMap').dataPoints;

const isOveredPointId = (state, props) => state.get('entourageMap').overedPointId === props.id;
const isClickedPointId = (state, props) => state.get('entourageMap').clickedPointId === props.id;
const isMarkerInCurrentMapBound = (state, props) => !getBounds(state) || getBounds(state).contains(props.position);

export const getOveredPointId = (state) => state.get('entourageMap').overedPointId;
export const getMapCenter = (state) => state.get('entourageMap').mapCenter;
const getMarkers = (state) => state.get('entourageMap').dataPoints;
const getBounds = (state) => state.get('entourageMap').mapBounds;

/**
 * Other specific selectors
 */


/**
 * Default selector used by EntourageMap
 */
const makeSelectEntourageMap = () => createSelector(
  selectEntourageMapDomain,
  (substate) => substate
);
export const makeSelectDataPoints = () => createSelector(
  selectDataPoints,
  (substate) => Object.values(substate)
);
export const makeSelectIsOvered = () => createSelector(
  isOveredPointId,
  (substate) => substate
);
export const makeSelectIsClicked = () => createSelector(
  isClickedPointId,
  (substate) => substate
);
export const makeSelectMarkerIsInBound = () => createSelector(
  isMarkerInCurrentMapBound,
  (substate) => substate
);
export const makeSelectMarkers = createSelector(
  getMarkers,
  (substate) => Object.values(substate)
);

export const getInBoundsMarkers = createSelector(
  [makeSelectMarkers, getBounds],
  (markers, bounds) => markers.filter((item) => !bounds || bounds.contains(item.position))
);

export const getInBoundsMarkersWithSelectedState = createSelector(
  [getInBoundsMarkers, getOveredPointId],
  (markers, overedPointId) => markers.map((item) => ({ ...item, selected: item.id === overedPointId }))
);

export default makeSelectEntourageMap;
