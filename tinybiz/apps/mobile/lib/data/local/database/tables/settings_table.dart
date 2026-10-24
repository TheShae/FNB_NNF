import 'package:drift/drift.dart';

@DataClassName('SettingEntry')
class SettingsTable extends Table {
  TextColumn get key => text()();
  TextColumn get value => text()();

  @override
  Set<Column> get primaryKey => {key};
}
