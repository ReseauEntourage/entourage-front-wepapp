
import { fromJS } from 'immutable';
import entourageMapReducer from '../reducer';

describe('entourageMapReducer', () => {
  it('returns the initial state', () => {
    expect(entourageMapReducer(undefined, {})).toEqual(fromJS({}));
  });
});
