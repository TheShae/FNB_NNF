import 'package:flutter_test/flutter_test.dart';
import 'package:mobile/domain/models/business_event.dart';
import 'package:mobile/domain/services/score_service.dart';

void main() {
  group('ScoreService Tests', () {
    final now = DateTime.now();

    test('calculates readiness score between 0 and 100', () {
      final events = List.generate(
        10,
        (i) => BusinessEvent(
          id: 'e-$i',
          merchantId: 'm1',
          type: 'SALE',
          amount: 200.0,
          verificationTier: i % 2 == 0 ? 'CUSTOMER_QR' : 'SELF',
          verificationWeight: i % 2 == 0 ? 2 : 1,
          occurredAt: now.subtract(Duration(days: i)),
          createdAt: now,
          deviceId: 'd1',
        ),
      );

      final result = ScoreService.calculateReadinessScore(events, now);

      expect(result.score, greaterThanOrEqualTo(0));
      expect(result.score, lessThanOrEqualTo(100));
      expect(result.positiveFactors, isNotEmpty);
    });
  });
}
