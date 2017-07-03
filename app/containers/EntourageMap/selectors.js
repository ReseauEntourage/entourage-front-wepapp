import { createSelector } from 'reselect';

/**
 * Direct selector to the entourageMap state domain
 */
const selectEntourageMapDomain = () => (state) => state.get('entourageMap');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EntourageMap
 */
const makeSelectEntourageMap = () => createSelector(
  selectEntourageMapDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEntourageMap;
export {
  selectEntourageMapDomain,
};
