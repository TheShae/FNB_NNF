class Product {
  final String id;
  final String merchantId;
  final String name;
  final String emoji;
  final String unit;
  final double costPrice;
  final double sellPrice;
  final int currentStock;
  final int lowStockThreshold;

  const Product({
    required this.id,
    required this.merchantId,
    required this.name,
    required this.emoji,
    required this.unit,
    required this.costPrice,
    required this.sellPrice,
    required this.currentStock,
    this.lowStockThreshold = 5,
  });

  Product copyWith({
    String? id,
    String? merchantId,
    String? name,
    String? emoji,
    String? unit,
    double? costPrice,
    double? sellPrice,
    int? currentStock,
    int? lowStockThreshold,
  }) {
    return Product(
      id: id ?? this.id,
      merchantId: merchantId ?? this.merchantId,
      name: name ?? this.name,
      emoji: emoji ?? this.emoji,
      unit: unit ?? this.unit,
      costPrice: costPrice ?? this.costPrice,
      sellPrice: sellPrice ?? this.sellPrice,
      currentStock: currentStock ?? this.currentStock,
      lowStockThreshold: lowStockThreshold ?? this.lowStockThreshold,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'merchantId': merchantId,
        'name': name,
        'emoji': emoji,
        'unit': unit,
        'costPrice': costPrice,
        'sellPrice': sellPrice,
        'currentStock': currentStock,
        'lowStockThreshold': lowStockThreshold,
      };

  factory Product.fromJson(Map<String, dynamic> json) => Product(
        id: json['id'],
        merchantId: json['merchantId'],
        name: json['name'],
        emoji: json['emoji'] ?? '📦',
        unit: json['unit'] ?? 'item',
        costPrice: (json['costPrice'] as num).toDouble(),
        sellPrice: (json['sellPrice'] as num).toDouble(),
        currentStock: (json['currentStock'] as num).toInt(),
        lowStockThreshold: (json['lowStockThreshold'] as num?)?.toInt() ?? 5,
      );
}
