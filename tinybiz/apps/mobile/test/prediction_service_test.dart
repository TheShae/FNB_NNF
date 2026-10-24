import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/domain/models/product.dart';
import 'package:mobile/domain/models/business_event.dart';
import 'package:mobile/domain/services/prediction_service.dart';

void main() {
  group('PredictionService Tests', () {
    final now = DateTime.now();

    const testProduct = Product(
      id: 'p1',
      merchantId: 'm1',
      name: 'Bread',
      emoji: '🍞',
      unit: 'loaf',
      costPrice: 12.0,
      sellPrice: 18.0,
      currentStock: 4,
    );

    test('predicts stock-out within 3 days when 14 units sold in last 7 days', () {
      final events = List.generate(
        7,
        (i) => BusinessEvent(
          id: 'e-$i',
          merchantId: 'm1',
          productId: 'p1',
          type: 'SALE',
          quantity: 2,
          unitPrice: 18.0,
          unitCost: 12.0,
          amount: 36.0,
          occurredAt: now.subtract(Duration(days: i)),
          createdAt: now,
          deviceId: 'd1',
        ),
      );

      final prediction = PredictionService.predictProductStockOut(testProduct, events, now);

      expect(prediction.unitsSoldLast7Days, equals(14));
      expect(prediction.averageDailyUnitsSold, equals(2.0));
      expect(prediction.daysLeft, equals(2.0));
      expect(prediction.isLowStock, isTrue);
    });
  });
}
