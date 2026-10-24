import 'package:flutter/material.dart';
import '../../domain/models/restock_offer.dart';
import '../../core/utils/money_formatter.dart';
import '../../core/theme/app_theme.dart';

class OfferCard extends StatelessWidget {
  final RestockOffer offer;
  final VoidCallback onAccept;

  const OfferCard({
    super.key,
    required this.offer,
    required this.onAccept,
  });

  @override
  Widget build(BuildContext context) {
    final isAccepted = offer.status == 'ACCEPTED' || offer.status == 'ACTIVE';

    return Card(
      color: AppTheme.cardSurface,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(16),
        side: const BorderSide(color: AppTheme.fnbAmber, width: 1.5),
      ),
      margin: const EdgeInsets.all(16),
      child: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.account_balance, color: AppTheme.fnbAmber),
                    SizedBox(width: 8),
                    Text(
                      'Simulated FNB Offer',
                      style: TextStyle(color: AppTheme.fnbAmber, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 2),
                  decoration: BoxDecoration(
                    color: AppTheme.fnbAmber.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    offer.status,
                    style: const TextStyle(color: AppTheme.fnbAmber, fontSize: 10, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            Text(
              MoneyFormatter.format(offer.amount),
              style: const TextStyle(fontSize: 36, fontWeight: FontWeight.bold, color: Colors.white),
            ),
            const Text(
              'Restock Credit Facility',
              style: TextStyle(color: AppTheme.textSecondary),
            ),
            const Divider(height: 24),
            Text('• Repayment: ${(offer.repaymentPercent * 100).toStringAsFixed(0)}% of daily sales'),
            Text('• Outstanding Balance: ${MoneyFormatter.format(offer.outstandingAmount)}'),
            const SizedBox(height: 20),
            if (!isAccepted)
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppTheme.fnbAmber,
                    foregroundColor: Colors.black,
                    padding: const EdgeInsets.symmetric(vertical: 14),
                  ),
                  onPressed: onAccept,
                  child: const Text('Accept R800 Restock Credit', style: TextStyle(fontWeight: FontWeight.bold)),
                ),
              )
            else
              const Center(
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(Icons.check_circle, color: AppTheme.fnbTurquoise),
                    SizedBox(width: 8),
                    Text('Credit Facility Active', style: TextStyle(color: AppTheme.fnbTurquoise, fontWeight: FontWeight.bold)),
                  ],
                ),
              ),
          ],
        ),
      ),
    );
  }
}
