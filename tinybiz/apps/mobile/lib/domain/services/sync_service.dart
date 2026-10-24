import '../models/business_event.dart';

class SyncService {
  static List<BusinessEvent> getPendingEvents(List<BusinessEvent> events) {
    return events.where((e) => e.syncStatus == 'PENDING').toList();
  }

  static List<BusinessEvent> markEventsSynced(List<BusinessEvent> events, List<String> acceptedIds, DateTime syncedAt) {
    return events.map((e) {
      if (acceptedIds.contains(e.id)) {
        return e.copyWith(
          syncStatus: 'SYNCED',
          syncedAt: syncedAt,
        );
      }
      return e;
    }).toList();
  }
}
