class RestockOffer {
  final String id;
  final String merchantId;
  final double amount;
  final String status; // 'OFFERED','ACCEPTED','ACTIVE','REPAID','DECLINED'
  final double repaymentPercent;
  final double outstandingAmount;
  final DateTime? acceptedAt;
  final DateTime expiresAt;
  final double averageWeeklyVerifiedSales;
  final int readinessScore;
  final double creditFraction;

  const RestockOffer({
    required this.id,
    required this.merchantId,
    required this.amount,
    required this.status,
    required this.repaymentPercent,
    required this.outstandingAmount,
    this.acceptedAt,
    required this.expiresAt,
    required this.averageWeeklyVerifiedSales,
    required this.readinessScore,
    required this.creditFraction,
  });

  RestockOffer copyWith({
    String? id,
    String? merchantId,
    double? amount,
    String? status,
    double? repaymentPercent,
    double? outstandingAmount,
    DateTime? acceptedAt,
    DateTime? expiresAt,
    double? averageWeeklyVerifiedSales,
    int? readinessScore,
    double? creditFraction,
  }) {
    return RestockOffer(
      id: id ?? this.id,
      merchantId: merchantId ?? this.merchantId,
      amount: amount ?? this.amount,
      status: status ?? this.status,
      repaymentPercent: repaymentPercent ?? this.repaymentPercent,
      outstandingAmount: outstandingAmount ?? this.outstandingAmount,
      acceptedAt: acceptedAt ?? this.acceptedAt,
      expiresAt: expiresAt ?? this.expiresAt,
      averageWeeklyVerifiedSales: averageWeeklyVerifiedSales ?? this.averageWeeklyVerifiedSales,
      readinessScore: readinessScore ?? this.readinessScore,
      creditFraction: creditFraction ?? this.creditFraction,
    );
  }
}
