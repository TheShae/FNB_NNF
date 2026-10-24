import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/domain/models/business_event.dart';
import 'package:mobile/domain/models/product.dart';
import 'package:mobile/domain/services/profit_service.dart';

void main() {
  group('ProfitService Tests', () {
    final now = DateTime.now();

    final testProduct = Product(
      id: 'p1',
      merchantId: 'm1',
      name: 'Bread',
      emoji: '🍞',
      unit: 'loaf',
      costPrice: 10.0,
      sellPrice: 15.0,
      currentStock: 20,
    );

    test('calculates today sales, cost, gross profit, and net profit', () {
      final events = [
        BusinessEvent(
          id: 'e1',
          merchantId: 'm1',
          productId: 'p1',
          type: 'SALE',
          quantity: 2,
          unitPrice: 15.0,
          unitCost: 10.0,
          amount: 30.0,
          occurredAt: now,
          createdAt: now,
          deviceId: 'd1',
        ),
        BusinessEvent(
          id: 'e2',
          merchantId: 'm1',
          type: 'EXPENSE',
          amount: 5.0,
          occurredAt: now,
          createdAt: now,
          deviceId: 'd1',
        ),
      ];

      final summary = ProfitService.calculateTodaySummary(events, [testProduct], now);

      expect(summary.totalSalesRevenue, equals(30.0));
      expect(summary.costOfGoodsSold, equals(20.0));
      expect(summary.grossProfit, equals(10.0));
      expect(summary.expenses, equals(5.0));
      expect(summary.netProfit, equals(5.0));
    });
  });
}
