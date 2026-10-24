import 'package:drift/drift.dart';
import '../local/database/app_database.dart';
import '../../domain/models/restock_offer.dart';

class OfferRepository {
  final AppDatabase db;

  OfferRepository(this.db);

  Stream<RestockOffer?> watchActiveOffer() {
    return (db.select(db.offersTable)..where((t) => t.status.equals('ACCEPTED') | t.status.equals('ACTIVE') | t.status.equals('OFFERED')))
        .watchSingleOrNull()
        .map((row) {
      if (row == null) return null;
      return RestockOffer(
        id: row.id,
        merchantId: row.merchantId,
        amount: row.amount,
        status: row.status,
        repaymentPercent: row.repaymentPercent,
        outstandingAmount: row.outstandingAmount,
        acceptedAt: row.acceptedAt,
        expiresAt: row.expiresAt,
        averageWeeklyVerifiedSales: row.averageWeeklyVerifiedSales,
        readinessScore: row.readinessScore,
        creditFraction: row.creditFraction,
      );
    });
  }

  Future<void> saveOffer(RestockOffer offer) async {
    await db.into(db.offersTable).insertOnConflictUpdate(
          OffersTableCompanion.insert(
            id: offer.id,
            merchantId: offer.merchantId,
            amount: offer.amount,
            status: offer.status,
            repaymentPercent: offer.repaymentPercent,
            outstandingAmount: offer.outstandingAmount,
            acceptedAt: Value(offer.acceptedAt),
            expiresAt: offer.expiresAt,
            averageWeeklyVerifiedSales: offer.averageWeeklyVerifiedSales,
            readinessScore: offer.readinessScore,
            creditFraction: offer.creditFraction,
          ),
        );
  }
}
