import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/domain/models/product.dart';
import 'package:mobile/domain/services/stock_service.dart';

void main() {
  group('StockService Tests', () {
    const testProduct = Product(
      id: 'p1',
      merchantId: 'm1',
      name: 'Bread',
      emoji: '🍞',
      unit: 'loaf',
      costPrice: 12.0,
      sellPrice: 18.0,
      currentStock: 10,
    );

    test('applySaleToProduct reduces stock accurately', () {
      final updated = StockService.applySaleToProduct(testProduct, 3);
      expect(updated.currentStock, equals(7));
    });

    test('applyRestockToProduct increases stock accurately', () {
      final updated = StockService.applyRestockToProduct(testProduct, 10);
      expect(updated.currentStock, equals(20));
    });
  });
}
