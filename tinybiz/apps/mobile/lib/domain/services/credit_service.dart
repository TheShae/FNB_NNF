import '../models/product.dart';
import '../models/business_event.dart';
import '../models/restock_offer.dart';
import '../models/readiness_score.dart';
import 'score_service.dart';
import 'prediction_service.dart';

class CreditService {
  static RestockOffer? evaluateEligibility({
    required List<BusinessEvent> events,
    required List<Product> products,
    required RestockOffer? activeOffer,
    required DateTime now,
    required String merchantId,
  }) {
    if (activeOffer != null && (activeOffer.status == 'ACTIVE' || activeOffer.status == 'ACCEPTED')) {
      return null; // Already has active loan
    }

    final ReadinessScore scoreResult = ScoreService.calculateReadinessScore(events, now);
    if (!scoreResult.isEligibleForLoan) {
      return null;
    }

    bool hasOutProductIn7Days = false;
    for (final p in products) {
      final pred = PredictionService.predictProductStockOut(p, events, now);
      if (pred.daysLeft <= 7.0) {
        hasOutProductIn7Days = true;
        break;
      }
    }

    if (!hasOutProductIn7Days) {
      return null;
    }

    return RestockOffer(
      id: 'offer-${now.millisecondsSinceEpoch}',
      merchantId: merchantId,
      amount: 800.00,
      status: 'OFFERED',
      repaymentPercent: 0.15,
      outstandingAmount: 800.00,
      expiresAt: now.add(const Duration(days: 30)),
      averageWeeklyVerifiedSales: 650.00,
      readinessScore: scoreResult.score,
      creditFraction: 0.15,
    );
  }
}
