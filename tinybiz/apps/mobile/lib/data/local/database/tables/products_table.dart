import 'package:drift/drift.dart';

@DataClassName('ProductEntry')
class ProductsTable extends Table {
  TextColumn get id => text()();
  TextColumn get merchantId => text()();
  TextColumn get name => text()();
  TextColumn get emoji => text().withDefault(const Constant('📦'))();
  TextColumn get unit => text().withDefault(const Constant('item'))();
  RealColumn get costPrice => real()();
  RealColumn get sellPrice => real()();
  IntColumn get currentStock => integer().withDefault(const Constant(0))();
  IntColumn get lowStockThreshold => integer().withDefault(const Constant(5))();

  @override
  Set<Column> get primaryKey => {id};
}
