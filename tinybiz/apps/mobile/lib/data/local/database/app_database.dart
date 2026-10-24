import 'package:drift/drift.dart';
import 'package:drift_flutter/drift_flutter.dart';
import 'tables/products_table.dart';
import 'tables/events_table.dart';
import 'tables/offers_table.dart';
import 'tables/repayments_table.dart';
import 'tables/settings_table.dart';

part 'app_database.g.dart';

@DriftDatabase(tables: [
  ProductsTable,
  EventsTable,
  OffersTable,
  RepaymentsTable,
  SettingsTable,
])
class AppDatabase extends _$AppDatabase {
  AppDatabase([QueryExecutor? executor]) : super(executor ?? _openConnection());

  @override
  int get schemaVersion => 1;

  static QueryExecutor _openConnection() {
    return driftDatabase(name: 'tinybiz.db');
  }
}
