import 'api_client.dart';
import '../../domain/models/business_event.dart';

class SyncResponse {
  final List<String> acceptedEventIds;
  final List<dynamic> rejectedEvents;
  final String serverTime;

  SyncResponse({
    required this.acceptedEventIds,
    required this.rejectedEvents,
    required this.serverTime,
  });

  factory SyncResponse.fromJson(Map<String, dynamic> json) {
    return SyncResponse(
      acceptedEventIds: List<String>.from(json['acceptedEventIds'] ?? []),
      rejectedEvents: json['rejectedEvents'] ?? [],
      serverTime: json['serverTime'] ?? DateTime.now().toIso8601String(),
    );
  }
}

class SyncApi {
  final ApiClient apiClient;

  SyncApi(this.apiClient);

  Future<SyncResponse> uploadSyncBatch({
    required String merchantId,
    required String deviceId,
    required List<BusinessEvent> events,
  }) async {
    final payload = {
      'merchantId': merchantId,
      'deviceId': deviceId,
      'events': events.map((e) => e.toJson()).toList(),
    };

    final res = await apiClient.post('/sync', body: payload);
    return SyncResponse.fromJson(res);
  }
}
