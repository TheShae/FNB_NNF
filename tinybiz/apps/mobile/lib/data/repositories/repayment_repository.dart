import 'dart:convert';
import '../local/database/app_database.dart';
import '../../domain/models/business_event.dart';

class RepaymentRepository {
  final AppDatabase db;

  RepaymentRepository(this.db);

  Stream<List<BusinessEvent>> watchRepaymentEvents() {
    return (db.select(db.eventsTable)
          ..where((t) => t.type.equals('LOAN_REPAYMENT'))
          ..orderBy([(t) => OrderingTerm.desc(t.occurredAt)]))
        .watch()
        .map((rows) {
      return rows
          .map((row) => BusinessEvent(
                id: row.id,
                merchantId: row.merchantId,
                type: row.type,
                amount: row.amount,
                verificationTier: row.verificationTier,
                verificationWeight: row.verificationWeight,
                occurredAt: row.occurredAt,
                createdAt: row.createdAt,
                deviceId: row.deviceId,
                syncStatus: row.syncStatus,
                syncedAt: row.syncedAt,
                metadata: row.metadataJson.isNotEmpty ? jsonDecode(row.metadataJson) : {},
              ))
          .toList();
    });
  }
}
