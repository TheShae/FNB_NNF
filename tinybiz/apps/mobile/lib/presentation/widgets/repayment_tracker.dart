import 'package:flutter/material.dart';
import '../../domain/models/restock_offer.dart';
import '../../core/utils/money_formatter.dart';
import '../../core/theme/app_theme.dart';

class RepaymentTracker extends StatelessWidget {
  final RestockOffer offer;

  const RepaymentTracker({super.key, required this.offer});

  @override
  Widget build(BuildContext context) {
    final double repaidAmount = offer.amount - offer.outstandingAmount;
    final double progress = (repaidAmount / offer.amount).clamp(0.0, 1.0);

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Automatic Repayment Progress',
              style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
            ),
            const SizedBox(height: 12),
            LinearProgressIndicator(
              value: progress,
              backgroundColor: Colors.white12,
              valueColor: const AlwaysStoppedAnimation<Color>(AppTheme.fnbTurquoise),
              minHeight: 10,
              borderRadius: BorderRadius.circular(5),
            ),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Repaid: ${MoneyFormatter.format(repaidAmount)}', style: const TextStyle(color: AppTheme.fnbTurquoise)),
                Text('Remaining: ${MoneyFormatter.format(offer.outstandingAmount)}', style: const TextStyle(color: Colors.orangeAccent)),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
