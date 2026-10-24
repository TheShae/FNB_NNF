class ReadinessScore {
  final int score;
  final double activeDaysFactor;
  final double avgSalesFactor;
  final double profitTrendFactor;
  final double verifiedSalesFactor;
  final List<String> positiveFactors;
  final List<String> negativeFactors;
  final List<String> nextActions;
  final bool isEligibleForLoan;

  const ReadinessScore({
    required this.score,
    required this.activeDaysFactor,
    required this.avgSalesFactor,
    required this.profitTrendFactor,
    required this.verifiedSalesFactor,
    required this.positiveFactors,
    required this.negativeFactors,
    required this.nextActions,
    required this.isEligibleForLoan,
  });
}
