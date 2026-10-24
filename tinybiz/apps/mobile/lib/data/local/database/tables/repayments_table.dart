import 'package:drift/drift.dart';

@DataClassName('RepaymentEntry')
class RepaymentsTable extends Table {
  TextColumn get id => text()();
  TextColumn get offerId => text()();
  TextColumn get merchantId => text()();
  RealColumn get amount => real()();
  DateTimeColumn get occurredAt => dateTime()();
  TextColumn get sourceEventIdsJson => text().withDefault(const Constant('[]'))();

  @override
  Set<Column> get primaryKey => {id};
}
