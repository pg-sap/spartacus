import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../routing/store';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './product-search.selectors';
import { SearchConfig } from '../../search-config';

fdescribe('ProductSearch Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const searchResults = { products: [{ code: '123' }] };
  const suggestions = [{ code: '123' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers)
        })
      ]
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getSearchResults', () => {
    it('should return the product search results', () => {
      let result;

      store
        .select(fromSelectors.getSearchResults)
        .subscribe(value => (result = value));

      expect(result).toEqual({});

      store.dispatch(
        new fromActions.SearchProducts({
          queryText: 'test',
          searchConfig: new SearchConfig(10)
        })
      );
      store.dispatch(new fromActions.SearchProductsSuccess(searchResults));

      expect(result).toEqual(searchResults);
    });
  });

  describe('getProductSuggestions', () => {
    it('should return the product suggestions', () => {
      let result;

      store
        .select(fromSelectors.getProductSuggestions)
        .subscribe(value => (result = value));

      expect(result).toEqual([]);

      store.dispatch(new fromActions.GetProductSuggestionsSuccess(suggestions));

      expect(result).toEqual(suggestions);
    });
  });
});
