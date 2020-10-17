import { GiBalloons } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { IoIosPin, IoIosRestaurant } from 'react-icons/io';
import { MdStore } from 'react-icons/md';

import { MapAdaptor } from './apis/MapAdaptor';
import { SearchDatasource } from '../components/search/Search';
import { SearchResult } from '../components/search/SearchResultItem';

export class MapSearchDataSource implements SearchDatasource {
  public initialDataset = [];

  constructor(private readonly mapAdaptor: MapAdaptor) {}

  /**
   * This is used for both autocomplete and prediction search.
   *
   * @param text Search text
   */
  public onAutocompleteSearch = async (text: string): Promise<SearchResult[]> => {
    if (!text) {
      return [];
    }

    const predictions = await this.mapAdaptor.getPrediction(text);

    return predictions.map((result) => {
      const { place_id, terms, types } = result;
      const text = terms[0].value;
      const annotation = terms
        .slice(1)
        .map(({ value }) => value)
        .join(', ');

      return {
        annotation,
        icon: this.mapTypeToIcon(types),
        key: place_id,
        text,
      };
    });
  };

  private mapTypeToIcon(types: string[]): IconType {
    const typeSet = new Set(types);
    if (
      typeSet.has('bakery') ||
      typeSet.has('cafe') ||
      typeSet.has('food') ||
      typeSet.has('night_club') ||
      typeSet.has('restaurant')
    ) {
      return IoIosRestaurant;
    } else if (
      typeSet.has('amusement_park') ||
      typeSet.has('aquarium') ||
      typeSet.has('tourist_attraction')
    ) {
      return GiBalloons;
    } else if (typeSet.has('store')) {
      return MdStore;
    }

    return IoIosPin;
  }
}
