import '../local/database/app_database.dart';
import '../remote/sync_api.dart';
import 'event_repository.dart';
import '../../domain/services/sync_service.dart';

class SyncRepository {
  final EventRepository eventRepository;
  final SyncApi syncApi;

  SyncRepository({
    required this.eventRepository,
    required this.syncApi,
  });

  Future<int> syncPendingEvents({
    required String merchantId,
    required String deviceId,
  }) async {
    final allEvents = await eventRepository.getAllEvents();
    final pendingEvents = SyncService.getPendingEvents(allEvents);

    if (pendingEvents.isEmpty) return 0;

    try {
      final response = await syncApi.uploadSyncBatch(
        merchantId: merchantId,
        deviceId: deviceId,
        events: pendingEvents,
      );

      final now = DateTime.now();
      final updatedEvents = SyncService.markEventsSynced(
        pendingEvents,
        response.acceptedEventIds,
        now,
      );

      for (final e in updatedEvents) {
        if (e.syncStatus == 'SYNCED') {
          await eventRepository.saveEvent(e);
        }
      }

      return response.acceptedEventIds.length;
    } catch (_) {
      // Offline or network error - retain PENDING status
      return 0;
    }
  }
}
