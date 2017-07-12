import { createSelector } from 'reselect';

/**
 * Direct selector to the entourageMap state domain
 */
const isOveredPointId = (state, props) => state.get('entourageMap').overedPointId === props.id;
const isClickedPointId = (state, props) => state.get('entourageMap').clickedPointId === props.id;
const isMarkerInCurrentMapBound = (state, props) => !getBounds(state) || getBounds(state).contains(props.position);
const getMarkers = (state) => state.get('entourageMap').dataPoints;
const getFilter = (state) => state.get('entourageMap').filter;
const getBounds = (state) => state.get('entourageMap').mapBounds;

export const selectEntourageMapDomain = (state) => state.get('entourageMap');
export const getOveredPointId = (state) => state.get('entourageMap').overedPointId;
export const getMapCenter = (state) => state.get('entourageMap').mapCenter;
export const getMapZoom = (state) => state.get('entourageMap').mapZoom;

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
  [getMarkers, getFilter],
  (markers, filter) => Object.values(markers)
    .filter((marker) => (
      filter.trim() === ''
      || marker.first_name.toLowerCase().includes(filter.toLowerCase())
      || marker.title.toLowerCase().includes(filter.toLowerCase())
      || marker.description.toLowerCase().includes(filter.toLowerCase())
    ))
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
