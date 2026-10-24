import 'dart:convert';
import 'package:drift/drift.dart';
import '../local/database/app_database.dart';
import '../../domain/models/business_event.dart';

class EventRepository {
  final AppDatabase db;

  EventRepository(this.db);

  Stream<List<BusinessEvent>> watchAllEvents() {
    return (db.select(db.eventsTable)
          ..orderBy([(t) => OrderingTerm.desc(t.occurredAt)]))
        .watch()
        .map((rows) {
      return rows.map((row) => _mapToBusinessEvent(row)).toList();
    });
  }

  Future<List<BusinessEvent>> getAllEvents() async {
    final rows = await (db.select(db.eventsTable)
          ..orderBy([(t) => OrderingTerm.desc(t.occurredAt)]))
        .get();
    return rows.map((row) => _mapToBusinessEvent(row)).toList();
  }

  Future<void> saveEvent(BusinessEvent event) async {
    await db.into(db.eventsTable).insertOnConflictUpdate(
          EventsTableCompanion.insert(
            id: event.id,
            merchantId: event.merchantId,
            productId: Value(event.productId),
            type: event.type,
            quantity: Value(event.quantity),
            unitPrice: Value(event.unitPrice),
            unitCost: Value(event.unitCost),
            amount: Value(event.amount),
            verificationTier: Value(event.verificationTier),
            verificationWeight: Value(event.verificationWeight),
            occurredAt: event.occurredAt,
            createdAt: event.createdAt,
            deviceId: event.deviceId,
            syncStatus: Value(event.syncStatus),
            syncedAt: Value(event.syncedAt),
            metadataJson: Value(jsonEncode(event.metadata)),
          ),
        );
  }

  Future<void> saveAllEvents(List<BusinessEvent> events) async {
    for (final e in events) {
      await saveEvent(e);
    }
  }

  BusinessEvent _mapToBusinessEvent(EventEntry row) {
    Map<String, dynamic> metadata = {};
    try {
      metadata = jsonDecode(row.metadataJson);
    } catch (_) {}

    return BusinessEvent(
      id: row.id,
      merchantId: row.merchantId,
      productId: row.productId,
      type: row.type,
      quantity: row.quantity,
      unitPrice: row.unitPrice,
      unitCost: row.unitCost,
      amount: row.amount,
      verificationTier: row.verificationTier,
      verificationWeight: row.verificationWeight,
      occurredAt: row.occurredAt,
      createdAt: row.createdAt,
      deviceId: row.deviceId,
      syncStatus: row.syncStatus,
      syncedAt: row.syncedAt,
      metadata: metadata,
    );
  }
}
