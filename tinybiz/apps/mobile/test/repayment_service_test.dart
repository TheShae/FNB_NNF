import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/domain/models/restock_offer.dart';
import 'package:mobile/domain/models/business_event.dart';
import 'package:mobile/domain/services/repayment_service.dart';

void main() {
  group('RepaymentService Tests', () {
    final now = DateTime.now();

    final activeOffer = RestockOffer(
      id: 'o1',
      merchantId: 'm1',
      amount: 800.0,
      status: 'ACCEPTED',
      repaymentPercent: 0.15,
      outstandingAmount: 800.0,
      expiresAt: now.add(const Duration(days: 30)),
      averageWeeklyVerifiedSales: 600.0,
      readinessScore: 75,
      creditFraction: 0.15,
    );

    test('deducts 15% of sale from active offer outstanding balance', () {
      final saleEvent = BusinessEvent(
        id: 's1',
        merchantId: 'm1',
        type: 'SALE',
        amount: 100.0,
        occurredAt: now,
        createdAt: now,
        deviceId: 'd1',
      );

      final result = RepaymentService.processRepaymentForSale(
        activeOffer: activeOffer,
        saleEvent: saleEvent,
        deviceId: 'd1',
      );

      expect(result.updatedOffer.outstandingAmount, equals(785.0)); // 800 - 15
      expect(result.repaymentEvent, isNotNull);
      expect(result.repaymentEvent!.amount, equals(15.0));
    });
  });
}
