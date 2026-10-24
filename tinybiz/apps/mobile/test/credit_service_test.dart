import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/domain/models/product.dart';
import 'package:mobile/domain/models/business_event.dart';
import 'package:mobile/domain/services/credit_service.dart';

void main() {
  group('CreditService Tests', () {
    final now = DateTime.now();

    const testProduct = Product(
      id: 'p1',
      merchantId: 'm1',
      name: 'Bread',
      emoji: '🍞',
      unit: 'loaf',
      costPrice: 12.0,
      sellPrice: 18.0,
      currentStock: 2,
    );

    test('evaluates eligibility for R800 restock credit', () {
      final events = List.generate(
        8,
        (i) => BusinessEvent(
          id: 'e-$i',
          merchantId: 'm1',
          productId: 'p1',
          type: 'SALE',
          quantity: 3,
          amount: 54.0,
          verificationTier: 'CUSTOMER_QR',
          verificationWeight: 2,
          occurredAt: now.subtract(Duration(days: i)),
          createdAt: now,
          deviceId: 'd1',
        ),
      );

      final offer = CreditService.evaluateEligibility(
        events: events,
        products: [testProduct],
        activeOffer: null,
        now: now,
        merchantId: 'm1',
      );

      expect(offer, isNotNull);
      expect(offer!.amount, equals(800.0));
      expect(offer.repaymentPercent, equals(0.15));
    });
  });
}
