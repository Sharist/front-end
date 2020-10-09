let autocompleteSessionToken: {
  value: google.maps.places.AutocompleteSessionToken;
  expiration: number;
} | null = null;

function getToken(): google.maps.places.AutocompleteSessionToken {
  if (!autocompleteSessionToken || Date.now() >= autocompleteSessionToken.expiration) {
    autocompleteSessionToken = {
      value: new google.maps.places.AutocompleteSessionToken(),
      // Set to expire at 2 minutes 50 seconds mark
      expiration: Date.now() + 1000 * 60 * 3 - 10000,
    };
  }

  return autocompleteSessionToken.value;
}

export class MapApi {
  private readonly placesAutocompleteService: google.maps.places.AutocompleteService;
  private readonly placesService: google.maps.places.PlacesService;

  constructor(private readonly mapInstance: google.maps.Map<HTMLDivElement>) {
    this.placesAutocompleteService = new google.maps.places.AutocompleteService();
    this.placesService = new google.maps.places.PlacesService(mapInstance);
  }

  /**
   * Queries against Google Maps API with the search text.
   *
   * @param input Search text
   */
  public async getPrediction(
    searchString: string
  ): Promise<google.maps.places.AutocompletePrediction[]> {
    const request: google.maps.places.AutocompletionRequest = {
      input: searchString,
      bounds: this.mapInstance?.getBounds() ?? undefined,
      sessionToken: getToken(),
    };

    return new Promise((resolve, reject) => {
      this.placesAutocompleteService.getPlacePredictions(request, (predictions, status) => {
        switch (status) {
          case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
            resolve([]);
            break;
          case google.maps.places.PlacesServiceStatus.OK:
            resolve(predictions);
            break;
          default:
            reject(new Error(`Error using Google Maps: ${status}; please try again later.`));
        }
      });
    });
  }

  public async getPlaceDetail(placeId: string): Promise<google.maps.places.PlaceResult> {
    // See https://developers.google.com/maps/documentation/javascript/reference/places-service#PlaceResult
    // for what each field means.
    const fields = ['formatted_address', 'geometry', 'icon', 'name', 'photo', 'types', 'vicinity'];

    const request: google.maps.places.PlaceDetailsRequest = {
      placeId,
      fields,
      sessionToken: getToken(),
    };

    return new Promise((resolve, reject) => {
      this.placesService.getDetails(request, (result, status) => {
        switch (status) {
          case google.maps.places.PlacesServiceStatus.OK:
            resolve(result);
            break;
          case google.maps.places.PlacesServiceStatus.NOT_FOUND:
            reject(new Error(`Place ID ${placeId} is not found`));
            break;
          default:
            reject(new Error(`Error using Google Maps: ${status}; please try again later.`));
        }
      });
    });
  }
}
