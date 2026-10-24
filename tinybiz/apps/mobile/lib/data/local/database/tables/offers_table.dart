import 'package:drift/drift.dart';

@DataClassName('OfferEntry')
class OffersTable extends Table {
  TextColumn get id => text()();
  TextColumn get merchantId => text()();
  RealColumn get amount => real()();
  TextColumn get status => text()();
  RealColumn get repaymentPercent => real()();
  RealColumn get outstandingAmount => real()();
  DateTimeColumn get acceptedAt => dateTime().nullable()();
  DateTimeColumn get expiresAt => dateTime()();
  RealColumn get averageWeeklyVerifiedSales => real()();
  IntColumn get readinessScore => integer()();
  RealColumn get creditFraction => real()();

  @override
  Set<Column> get primaryKey => {id};
}
