import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/domain/models/business_event.dart';
import 'package:mobile/domain/services/sync_service.dart';

void main() {
  group('Sync Integration Tests', () {
    final now = DateTime.now();

    test('offline sale creates pending event and marks synced on batch upload acceptance', () {
      final offlineSaleEvent = BusinessEvent(
        id: 'offline-evt-1',
        merchantId: 'm1',
        type: 'SALE',
        amount: 36.0,
        syncStatus: 'PENDING',
        occurredAt: now,
        createdAt: now,
        deviceId: 'd1',
      );

      final eventsList = [offlineSaleEvent];
      final pendingBefore = SyncService.getPendingEvents(eventsList);
      expect(pendingBefore, hasLength(1));

      // Simulate backend sync response with accepted ID
      final acceptedIds = ['offline-evt-1'];
      final syncedEvents = SyncService.markEventsSynced(eventsList, acceptedIds, now);

      expect(syncedEvents.first.syncStatus, equals('SYNCED'));
      expect(syncedEvents.first.syncedAt, equals(now));

      final pendingAfter = SyncService.getPendingEvents(syncedEvents);
      expect(pendingAfter, isEmpty);
    });
  });
}
