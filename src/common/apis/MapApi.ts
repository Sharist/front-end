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

  constructor(private readonly mapInstance: google.maps.Map<HTMLDivElement>) {
    this.placesAutocompleteService = new google.maps.places.AutocompleteService();
  }

  /**
   * Queries against Google Maps API with the search text.
   *
   * @param input Search text
   */
  public async getPrediction(
    searchString: string
  ): Promise<google.maps.places.AutocompletePrediction[]> {
    const input: google.maps.places.AutocompletionRequest = {
      input: searchString,
      bounds: this.mapInstance?.getBounds() ?? undefined,
      sessionToken: getToken(),
    };

    return new Promise((resolve, reject) => {
      this.placesAutocompleteService.getPlacePredictions(input, (predictions, status) => {
        const { PlacesServiceStatus } = google.maps.places;

        switch (status) {
          case PlacesServiceStatus.ZERO_RESULTS:
            resolve([]);
            break;
          case PlacesServiceStatus.OK:
            resolve(predictions);
            break;
          default:
            reject(new Error('Error using Google Maps. Please try again later.'));
        }
      });
    });
  }
}
