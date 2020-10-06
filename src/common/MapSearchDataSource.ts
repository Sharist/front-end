import { GiBalloons } from 'react-icons/gi';
import { IconType } from 'react-icons';
import { IoIosPin, IoIosRestaurant } from 'react-icons/io';
import { MdStore } from 'react-icons/md';

import { MapApi } from './apis/MapApi';
import { SearchDatasource } from '../components/search/Search';
import { SearchResult } from '../components/search/SearchResultItem';

export class MapSearchDataSource implements SearchDatasource {
  public initialDataset = [];

  constructor(private readonly mapApi: MapApi) {}

  public onSearch = async (text: string): Promise<SearchResult[]> => {
    if (!text) {
      return [];
    }

    const result = await this.mapApi.getPrediction(text);

    return result.map(({ place_id, terms, types }) => {
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
