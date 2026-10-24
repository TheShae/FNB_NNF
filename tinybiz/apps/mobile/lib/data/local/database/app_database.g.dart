// GENERATED CODE - DO NOT MODIFY BY HAND
part of 'app_database.dart';

abstract class _$AppDatabase extends GeneratedDatabase {
  _$AppDatabase(QueryExecutor e) : super(e);
  
  $ProductsTableTable get productsTable => $ProductsTableTable(this);
  $EventsTableTable get eventsTable => $EventsTableTable(this);
  $OffersTableTable get offersTable => $OffersTableTable(this);
  $RepaymentsTableTable get repaymentsTable => $RepaymentsTableTable(this);
  $SettingsTableTable get settingsTable => $SettingsTableTable(this);

  @override
  Iterable<TableInfo<Table, Object?>> get allTables => allSchemaEntities.whereType<TableInfo<Table, Object?>>();
  @override
  List<DatabaseEntity> get allSchemaEntities => [productsTable, eventsTable, offersTable, repaymentsTable, settingsTable];
}

class $ProductsTableTable extends ProductsTable with TableInfo<$ProductsTableTable, ProductEntry> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $ProductsTableTable(this.attachedDatabase, [this._alias]);
  
  late final GeneratedColumn<String> id = GeneratedColumn<String>('id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> merchantId = GeneratedColumn<String>('merchant_id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> name = GeneratedColumn<String>('name', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> emoji = GeneratedColumn<String>('emoji', aliasedName, false, type: DriftSqlType.string, defaultValue: const Constant('📦'));
  late final GeneratedColumn<String> unit = GeneratedColumn<String>('unit', aliasedName, false, type: DriftSqlType.string, defaultValue: const Constant('item'));
  late final GeneratedColumn<double> costPrice = GeneratedColumn<double>('cost_price', aliasedName, false, type: DriftSqlType.double);
  late final GeneratedColumn<double> sellPrice = GeneratedColumn<double>('sell_price', aliasedName, false, type: DriftSqlType.double);
  late final GeneratedColumn<int> currentStock = GeneratedColumn<int>('current_stock', aliasedName, false, type: DriftSqlType.int, defaultValue: const Constant(0));
  late final GeneratedColumn<int> lowStockThreshold = GeneratedColumn<int>('low_stock_threshold', aliasedName, false, type: DriftSqlType.int, defaultValue: const Constant(5));

  @override
  List<GeneratedColumn> get $columns => [id, merchantId, name, emoji, unit, costPrice, sellPrice, currentStock, lowStockThreshold];
  @override
  String get aliasedName => _alias ?? 'products_table';
  @override
  String get actualTableName => 'products_table';
  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  ProductEntry map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return ProductEntry(
      id: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}id'])!,
      merchantId: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}merchant_id'])!,
      name: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}name'])!,
      emoji: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}emoji']) ?? '📦',
      unit: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}unit']) ?? 'item',
      costPrice: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}cost_price'])!,
      sellPrice: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}sell_price'])!,
      currentStock: attachedDatabase.typeMapping.read(DriftSqlType.int, data['${effectivePrefix}current_stock'])!,
      lowStockThreshold: attachedDatabase.typeMapping.read(DriftSqlType.int, data['${effectivePrefix}low_stock_threshold']) ?? 5,
    );
  }
  @override
  $ProductsTableTable createAlias(String alias) => $ProductsTableTable(attachedDatabase, alias);
}

class ProductEntry {
  final String id;
  final String merchantId;
  final String name;
  final String emoji;
  final String unit;
  final double costPrice;
  final double sellPrice;
  final int currentStock;
  final int lowStockThreshold;

  ProductEntry({
    required this.id,
    required this.merchantId,
    required this.name,
    required this.emoji,
    required this.unit,
    required this.costPrice,
    required this.sellPrice,
    required this.currentStock,
    required this.lowStockThreshold,
  });
}

class $EventsTableTable extends EventsTable with TableInfo<$EventsTableTable, EventEntry> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $EventsTableTable(this.attachedDatabase, [this._alias]);

  late final GeneratedColumn<String> id = GeneratedColumn<String>('id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> merchantId = GeneratedColumn<String>('merchant_id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> productId = GeneratedColumn<String>('product_id', aliasedName, true, type: DriftSqlType.string);
  late final GeneratedColumn<String> type = GeneratedColumn<String>('type', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<int> quantity = GeneratedColumn<int>('quantity', aliasedName, true, type: DriftSqlType.int);
  late final GeneratedColumn<double> unitPrice = GeneratedColumn<double>('unit_price', aliasedName, true, type: DriftSqlType.double);
  late final GeneratedColumn<double> unitCost = GeneratedColumn<double>('unit_cost', aliasedName, true, type: DriftSqlType.double);
  late final GeneratedColumn<double> amount = GeneratedColumn<double>('amount', aliasedName, true, type: DriftSqlType.double);
  late final GeneratedColumn<String> verificationTier = GeneratedColumn<String>('verification_tier', aliasedName, false, type: DriftSqlType.string, defaultValue: const Constant('SELF'));
  late final GeneratedColumn<int> verificationWeight = GeneratedColumn<int>('verification_weight', aliasedName, false, type: DriftSqlType.int, defaultValue: const Constant(1));
  late final GeneratedColumn<DateTime> occurredAt = GeneratedColumn<DateTime>('occurred_at', aliasedName, false, type: DriftSqlType.dateTime);
  late final GeneratedColumn<DateTime> createdAt = GeneratedColumn<DateTime>('created_at', aliasedName, false, type: DriftSqlType.dateTime);
  late final GeneratedColumn<String> deviceId = GeneratedColumn<String>('device_id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> syncStatus = GeneratedColumn<String>('sync_status', aliasedName, false, type: DriftSqlType.string, defaultValue: const Constant('PENDING'));
  late final GeneratedColumn<DateTime> syncedAt = GeneratedColumn<DateTime>('synced_at', aliasedName, true, type: DriftSqlType.dateTime);
  late final GeneratedColumn<String> metadataJson = GeneratedColumn<String>('metadata_json', aliasedName, false, type: DriftSqlType.string, defaultValue: const Constant('{}'));

  @override
  List<GeneratedColumn> get $columns => [id, merchantId, productId, type, quantity, unitPrice, unitCost, amount, verificationTier, verificationWeight, occurredAt, createdAt, deviceId, syncStatus, syncedAt, metadataJson];
  @override
  String get aliasedName => _alias ?? 'events_table';
  @override
  String get actualTableName => 'events_table';
  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  EventEntry map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return EventEntry(
      id: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}id'])!,
      merchantId: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}merchant_id'])!,
      productId: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}product_id']),
      type: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}type'])!,
      quantity: attachedDatabase.typeMapping.read(DriftSqlType.int, data['${effectivePrefix}quantity']),
      unitPrice: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}unit_price']),
      unitCost: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}unit_cost']),
      amount: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}amount']),
      verificationTier: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}verification_tier']) ?? 'SELF',
      verificationWeight: attachedDatabase.typeMapping.read(DriftSqlType.int, data['${effectivePrefix}verification_weight']) ?? 1,
      occurredAt: attachedDatabase.typeMapping.read(DriftSqlType.dateTime, data['${effectivePrefix}occurred_at'])!,
      createdAt: attachedDatabase.typeMapping.read(DriftSqlType.dateTime, data['${effectivePrefix}created_at'])!,
      deviceId: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}device_id'])!,
      syncStatus: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}sync_status']) ?? 'PENDING',
      syncedAt: attachedDatabase.typeMapping.read(DriftSqlType.dateTime, data['${effectivePrefix}synced_at']),
      metadataJson: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}metadata_json']) ?? '{}',
    );
  }
  @override
  $EventsTableTable createAlias(String alias) => $EventsTableTable(attachedDatabase, alias);
}

class EventEntry {
  final String id;
  final String merchantId;
  final String? productId;
  final String type;
  final int? quantity;
  final double? unitPrice;
  final double? unitCost;
  final double? amount;
  final String verificationTier;
  final int verificationWeight;
  final DateTime occurredAt;
  final DateTime createdAt;
  final String deviceId;
  final String syncStatus;
  final DateTime? syncedAt;
  final String metadataJson;

  EventEntry({
    required this.id,
    required this.merchantId,
    this.productId,
    required this.type,
    this.quantity,
    this.unitPrice,
    this.unitCost,
    this.amount,
    required this.verificationTier,
    required this.verificationWeight,
    required this.occurredAt,
    required this.createdAt,
    required this.deviceId,
    required this.syncStatus,
    this.syncedAt,
    required this.metadataJson,
  });
}

class $OffersTableTable extends OffersTable with TableInfo<$OffersTableTable, OfferEntry> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $OffersTableTable(this.attachedDatabase, [this._alias]);

  late final GeneratedColumn<String> id = GeneratedColumn<String>('id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> merchantId = GeneratedColumn<String>('merchant_id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<double> amount = GeneratedColumn<double>('amount', aliasedName, false, type: DriftSqlType.double);
  late final GeneratedColumn<String> status = GeneratedColumn<String>('status', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<double> repaymentPercent = GeneratedColumn<double>('repayment_percent', aliasedName, false, type: DriftSqlType.double);
  late final GeneratedColumn<double> outstandingAmount = GeneratedColumn<double>('outstanding_amount', aliasedName, false, type: DriftSqlType.double);
  late final GeneratedColumn<DateTime> acceptedAt = GeneratedColumn<DateTime>('accepted_at', aliasedName, true, type: DriftSqlType.dateTime);
  late final GeneratedColumn<DateTime> expiresAt = GeneratedColumn<DateTime>('expires_at', aliasedName, false, type: DriftSqlType.dateTime);
  late final GeneratedColumn<double> averageWeeklyVerifiedSales = GeneratedColumn<double>('average_weekly_verified_sales', aliasedName, false, type: DriftSqlType.double);
  late final GeneratedColumn<int> readinessScore = GeneratedColumn<int>('readiness_score', aliasedName, false, type: DriftSqlType.int);
  late final GeneratedColumn<double> creditFraction = GeneratedColumn<double>('credit_fraction', aliasedName, false, type: DriftSqlType.double);

  @override
  List<GeneratedColumn> get $columns => [id, merchantId, amount, status, repaymentPercent, outstandingAmount, acceptedAt, expiresAt, averageWeeklyVerifiedSales, readinessScore, creditFraction];
  @override
  String get aliasedName => _alias ?? 'offers_table';
  @override
  String get actualTableName => 'offers_table';
  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  OfferEntry map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return OfferEntry(
      id: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}id'])!,
      merchantId: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}merchant_id'])!,
      amount: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}amount'])!,
      status: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}status'])!,
      repaymentPercent: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}repayment_percent'])!,
      outstandingAmount: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}outstanding_amount'])!,
      acceptedAt: attachedDatabase.typeMapping.read(DriftSqlType.dateTime, data['${effectivePrefix}accepted_at']),
      expiresAt: attachedDatabase.typeMapping.read(DriftSqlType.dateTime, data['${effectivePrefix}expires_at'])!,
      averageWeeklyVerifiedSales: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}average_weekly_verified_sales'])!,
      readinessScore: attachedDatabase.typeMapping.read(DriftSqlType.int, data['${effectivePrefix}readiness_score'])!,
      creditFraction: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}credit_fraction'])!,
    );
  }
  @override
  $OffersTableTable createAlias(String alias) => $OffersTableTable(attachedDatabase, alias);
}

class OfferEntry {
  final String id;
  final String merchantId;
  final double amount;
  final String status;
  final double repaymentPercent;
  final double outstandingAmount;
  final DateTime? acceptedAt;
  final DateTime expiresAt;
  final double averageWeeklyVerifiedSales;
  final int readinessScore;
  final double creditFraction;

  OfferEntry({
    required this.id,
    required this.merchantId,
    required this.amount,
    required this.status,
    required this.repaymentPercent,
    required this.outstandingAmount,
    this.acceptedAt,
    required this.expiresAt,
    required this.averageWeeklyVerifiedSales,
    required this.readinessScore,
    required this.creditFraction,
  });
}

class $RepaymentsTableTable extends RepaymentsTable with TableInfo<$RepaymentsTableTable, RepaymentEntry> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $RepaymentsTableTable(this.attachedDatabase, [this._alias]);

  late final GeneratedColumn<String> id = GeneratedColumn<String>('id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> offerId = GeneratedColumn<String>('offer_id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> merchantId = GeneratedColumn<String>('merchant_id', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<double> amount = GeneratedColumn<double>('amount', aliasedName, false, type: DriftSqlType.double);
  late final GeneratedColumn<DateTime> occurredAt = GeneratedColumn<DateTime>('occurred_at', aliasedName, false, type: DriftSqlType.dateTime);
  late final GeneratedColumn<String> sourceEventIdsJson = GeneratedColumn<String>('source_event_ids_json', aliasedName, false, type: DriftSqlType.string, defaultValue: const Constant('[]'));

  @override
  List<GeneratedColumn> get $columns => [id, offerId, merchantId, amount, occurredAt, sourceEventIdsJson];
  @override
  String get aliasedName => _alias ?? 'repayments_table';
  @override
  String get actualTableName => 'repayments_table';
  @override
  Set<GeneratedColumn> get $primaryKey => {id};
  @override
  RepaymentEntry map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return RepaymentEntry(
      id: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}id'])!,
      offerId: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}offer_id'])!,
      merchantId: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}merchant_id'])!,
      amount: attachedDatabase.typeMapping.read(DriftSqlType.double, data['${effectivePrefix}amount'])!,
      occurredAt: attachedDatabase.typeMapping.read(DriftSqlType.dateTime, data['${effectivePrefix}occurred_at'])!,
      sourceEventIdsJson: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}source_event_ids_json']) ?? '[]',
    );
  }
  @override
  $RepaymentsTableTable createAlias(String alias) => $RepaymentsTableTable(attachedDatabase, alias);
}

class RepaymentEntry {
  final String id;
  final String offerId;
  final String merchantId;
  final double amount;
  final DateTime occurredAt;
  final String sourceEventIdsJson;

  RepaymentEntry({
    required this.id,
    required this.offerId,
    required this.merchantId,
    required this.amount,
    required this.occurredAt,
    required this.sourceEventIdsJson,
  });
}

class $SettingsTableTable extends SettingsTable with TableInfo<$SettingsTableTable, SettingEntry> {
  @override
  final GeneratedDatabase attachedDatabase;
  final String? _alias;
  $SettingsTableTable(this.attachedDatabase, [this._alias]);

  late final GeneratedColumn<String> key = GeneratedColumn<String>('key', aliasedName, false, type: DriftSqlType.string);
  late final GeneratedColumn<String> value = GeneratedColumn<String>('value', aliasedName, false, type: DriftSqlType.string);

  @override
  List<GeneratedColumn> get $columns => [key, value];
  @override
  String get aliasedName => _alias ?? 'settings_table';
  @override
  String get actualTableName => 'settings_table';
  @override
  Set<GeneratedColumn> get $primaryKey => {key};
  @override
  SettingEntry map(Map<String, dynamic> data, {String? tablePrefix}) {
    final effectivePrefix = tablePrefix != null ? '$tablePrefix.' : '';
    return SettingEntry(
      key: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}key'])!,
      value: attachedDatabase.typeMapping.read(DriftSqlType.string, data['${effectivePrefix}value'])!,
    );
  }
  @override
  $SettingsTableTable createAlias(String alias) => $SettingsTableTable(attachedDatabase, alias);
}

class SettingEntry {
  final String key;
  final String value;
  SettingEntry({required this.key, required this.value});
}
