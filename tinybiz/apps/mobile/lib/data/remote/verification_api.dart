import 'api_client.dart';

class VerificationApi {
  final ApiClient apiClient;

  VerificationApi(this.apiClient);

  Future<void> verifyCustomerQr(String eventId) async {
    await apiClient.post('/events/$eventId/verify/customer-qr');
  }

  Future<void> verifyFnbPayment(String eventId) async {
    await apiClient.post('/events/$eventId/verify/fnb-payment');
  }
}
