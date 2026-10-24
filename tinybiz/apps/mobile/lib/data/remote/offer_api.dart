import 'api_client.dart';

class OfferApi {
  final ApiClient apiClient;

  OfferApi(this.apiClient);

  Future<void> acceptOffer(String offerId) async {
    await apiClient.post('/offers/$offerId/accept');
  }
}
