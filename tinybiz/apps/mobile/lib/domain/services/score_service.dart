import 'dart:math';
import '../models/business_event.dart';
import '../models/readiness_score.dart';

class ScoreService {
  static ReadinessScore calculateReadinessScore(List<BusinessEvent> events, DateTime now) {
    final fourteenDaysAgo = now.subtract(const Duration(days: 14));
    final sevenDaysAgo = now.subtract(const Duration(days: 7));

    final recentEvents = events.where((e) => e.occurredAt.isAfter(fourteenDaysAgo)).toList();

    // 1. Days active share (25%)
    final Set<String> activeDays = {};
    for (final e in recentEvents) {
      if (e.type == 'SALE') {
        final dayKey = '${e.occurredAt.year}-${e.occurredAt.month}-${e.occurredAt.day}';
        activeDays.add(dayKey);
      }
    }
    final double activeDaysScore = min(25.0, (activeDays.length / 14.0) * 25.0);

    // 2. Average Daily Sales (30%)
    double totalRevenue14Days = 0.0;
    for (final e in recentEvents) {
      if (e.type == 'SALE') {
        totalRevenue14Days += e.amount ?? ((e.unitPrice ?? 0) * (e.quantity ?? 0));
      }
    }
    final double avgDailySales = totalRevenue14Days / 14.0;
    final double avgSalesScore = min(30.0, (avgDailySales / 500.0) * 30.0);

    // 3. Profit Trend (20%)
    double firstHalfProfit = 0.0;
    double secondHalfProfit = 0.0;
    for (final e in recentEvents) {
      final rev = e.type == 'SALE' ? (e.amount ?? 0.0) : 0.0;
      final cost = e.type == 'SALE' ? ((e.unitCost ?? 0.0) * (e.quantity ?? 0)) : 0.0;
      final exp = e.type == 'EXPENSE' ? (e.amount ?? 0.0) : 0.0;
      final profit = rev - cost - exp;

      if (e.occurredAt.isBefore(sevenDaysAgo)) {
        firstHalfProfit += profit;
      } else {
        secondHalfProfit += profit;
      }
    }
    double profitTrendScore = 20.0;
    if (firstHalfProfit > 0) {
      if (secondHalfProfit < firstHalfProfit) {
        profitTrendScore = max(5.0, (secondHalfProfit / firstHalfProfit) * 20.0);
      }
    }

    // 4. Verified Sales Share (25%)
    int totalWeightSum = 0;
    int saleCount = 0;
    int verifiedCount = 0;
    for (final e in recentEvents) {
      if (e.type == 'SALE') {
        saleCount++;
        totalWeightSum += e.verificationWeight;
        if (e.verificationTier != 'SELF') {
          verifiedCount++;
        }
      }
    }
    final double avgWeight = saleCount > 0 ? (totalWeightSum / saleCount) : 1.0;
    final double verifiedSalesScore = min(25.0, ((avgWeight - 1.0) / 2.0) * 20.0 + (saleCount > 0 ? 5.0 : 0.0));

    final totalScore = (activeDaysScore + avgSalesScore + profitTrendScore + verifiedSalesScore).round().clamp(0, 100);

    final List<String> positiveFactors = [];
    final List<String> negativeFactors = [];
    final List<String> nextActions = [];

    if (activeDays.length >= 5) {
      positiveFactors.add('Active trading on ${activeDays.length}/14 days');
    } else {
      negativeFactors.add('Low active trading days (${activeDays.length}/14)');
      nextActions.add('Record sales daily to build a continuous trading record');
    }

    if (avgDailySales >= 300) {
      positiveFactors.add('Strong average daily sales (${avgDailySales.toStringAsFixed(0)} ZAR/day)');
    } else {
      negativeFactors.add('Average daily sales under R300');
    }

    if (verifiedCount >= 3) {
      positiveFactors.add('$verifiedCount verified customer/FNB sales');
    } else {
      negativeFactors.add('Low proportion of verified sales');
      nextActions.add('Ask customers to scan your sale QR code for higher readiness score');
    }

    final bool isEligibleForLoan = totalScore >= 65 && activeDays.length >= 5 && verifiedCount >= 3;

    return ReadinessScore(
      score: totalScore,
      activeDaysFactor: activeDaysScore,
      avgSalesFactor: avgSalesScore,
      profitTrendFactor: profitTrendScore,
      verifiedSalesFactor: verifiedSalesScore,
      positiveFactors: positiveFactors,
      negativeFactors: negativeFactors,
      nextActions: nextActions,
      isEligibleForLoan: isEligibleForLoan,
    );
  }
}
