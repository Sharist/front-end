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
