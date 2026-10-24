class BusinessEvent {
  final String id;
  final String merchantId;
  final String? productId;
  final String type; // 'SALE','RESTOCK','EXPENSE','STOCK_ADJUSTMENT','LOAN_OFFER_ACCEPTED','LOAN_REPAYMENT'
  final int? quantity;
  final double? unitPrice;
  final double? unitCost;
  final double? amount;
  final String verificationTier; // 'SELF','CUSTOMER_QR','FNB_PAYMENT'
  final int verificationWeight; // 1, 2, 3
  final DateTime occurredAt;
  final DateTime createdAt;
  final String deviceId;
  final String syncStatus; // 'PENDING','SYNCED','FAILED'
  final DateTime? syncedAt;
  final Map<String, dynamic> metadata;

  const BusinessEvent({
    required this.id,
    required this.merchantId,
    this.productId,
    required this.type,
    this.quantity,
    this.unitPrice,
    this.unitCost,
    this.amount,
    this.verificationTier = 'SELF',
    this.verificationWeight = 1,
    required this.occurredAt,
    required this.createdAt,
    required this.deviceId,
    this.syncStatus = 'PENDING',
    this.syncedAt,
    this.metadata = const {},
  });

  BusinessEvent copyWith({
    String? id,
    String? merchantId,
    String? productId,
    String? type,
    int? quantity,
    double? unitPrice,
    double? unitCost,
    double? amount,
    String? verificationTier,
    int? verificationWeight,
    DateTime? occurredAt,
    DateTime? createdAt,
    String? deviceId,
    String? syncStatus,
    DateTime? syncedAt,
    Map<String, dynamic>? metadata,
  }) {
    return BusinessEvent(
      id: id ?? this.id,
      merchantId: merchantId ?? this.merchantId,
      productId: productId ?? this.productId,
      type: type ?? this.type,
      quantity: quantity ?? this.quantity,
      unitPrice: unitPrice ?? this.unitPrice,
      unitCost: unitCost ?? this.unitCost,
      amount: amount ?? this.amount,
      verificationTier: verificationTier ?? this.verificationTier,
      verificationWeight: verificationWeight ?? this.verificationWeight,
      occurredAt: occurredAt ?? this.occurredAt,
      createdAt: createdAt ?? this.createdAt,
      deviceId: deviceId ?? this.deviceId,
      syncStatus: syncStatus ?? this.syncStatus,
      syncedAt: syncedAt ?? this.syncedAt,
      metadata: metadata ?? this.metadata,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'merchantId': merchantId,
        'productId': productId,
        'type': type,
        'quantity': quantity,
        'unitPrice': unitPrice,
        'unitCost': unitCost,
        'amount': amount,
        'verificationTier': verificationTier,
        'verificationWeight': verificationWeight,
        'occurredAt': occurredAt.toIso8601String(),
        'createdAt': createdAt.toIso8601String(),
        'deviceId': deviceId,
        'syncStatus': syncStatus,
        'syncedAt': syncedAt?.toIso8601String(),
        'metadata': metadata,
      };

  factory BusinessEvent.fromJson(Map<String, dynamic> json) => BusinessEvent(
        id: json['id'],
        merchantId: json['merchantId'],
        productId: json['productId'],
        type: json['type'],
        quantity: (json['quantity'] as num?)?.toInt(),
        unitPrice: (json['unitPrice'] as num?)?.toDouble(),
        unitCost: (json['unitCost'] as num?)?.toDouble(),
        amount: (json['amount'] as num?)?.toDouble(),
        verificationTier: json['verificationTier'] ?? 'SELF',
        verificationWeight: (json['verificationWeight'] as num?)?.toInt() ?? 1,
        occurredAt: DateTime.parse(json['occurredAt']),
        createdAt: DateTime.parse(json['createdAt']),
        deviceId: json['deviceId'] ?? 'device-1',
        syncStatus: json['syncStatus'] ?? 'PENDING',
        syncedAt: json['syncedAt'] != null ? DateTime.parse(json['syncedAt']) : null,
        metadata: (json['metadata'] as Map<String, dynamic>?) ?? {},
      );
}
