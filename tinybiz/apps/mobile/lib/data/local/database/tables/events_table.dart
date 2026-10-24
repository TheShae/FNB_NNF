import 'package:drift/drift.dart';

@DataClassName('EventEntry')
class EventsTable extends Table {
  TextColumn get id => text()();
  TextColumn get merchantId => text()();
  TextColumn get productId => text().nullable()();
  TextColumn get type => text()();
  IntColumn get quantity => integer().nullable()();
  RealColumn get unitPrice => real().nullable()();
  RealColumn get unitCost => real().nullable()();
  RealColumn get amount => real().nullable()();
  TextColumn get verificationTier => text().withDefault(const Constant('SELF'))();
  IntColumn get verificationWeight => integer().withDefault(const Constant(1))();
  DateTimeColumn get occurredAt => dateTime()();
  DateTimeColumn get createdAt => dateTime()();
  TextColumn get deviceId => text()();
  TextColumn get syncStatus => text().withDefault(const Constant('PENDING'))();
  DateTimeColumn get syncedAt => dateTime().nullable()();
  TextColumn get metadataJson => text().withDefault(const Constant('{}'))();

  @override
  Set<Column> get primaryKey => {id};
}
