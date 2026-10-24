import 'package:flutter/material.dart';
import 'package:qr_flutter/qr_flutter.dart';
import '../../domain/models/business_event.dart';
import '../../core/utils/money_formatter.dart';
import '../../core/theme/app_theme.dart';

class QrReceiptSheet extends StatelessWidget {
  final BusinessEvent event;
  final VoidCallback onSimulateCustomerScan;
  final VoidCallback onSimulateFnbPayment;

  const QrReceiptSheet({
    super.key,
    required this.event,
    required this.onSimulateCustomerScan,
    required this.onSimulateFnbPayment,
  });

  @override
  Widget build(BuildContext context) {
    final amount = event.amount ?? 0.0;
    final qrData = 'tinybiz://verify?eventId=${event.id}&amount=$amount';

    return Container(
      padding: const EdgeInsets.all(24),
      decoration: const BoxDecoration(
        color: AppTheme.cardSurface,
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          const Text(
            'Sale Completed! 🎉',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),
          Text(
            MoneyFormatter.format(amount),
            style: const TextStyle(fontSize: 32, fontWeight: FontWeight.bold, color: AppTheme.fnbTurquoise),
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
            ),
            child: QrImageView(
              data: qrData,
              version: QrVersions.auto,
              size: 160.0,
            ),
          ),
          const SizedBox(height: 16),
          Text(
            'Verification Tier: ${event.verificationTier} (Weight ${event.verificationWeight})',
            style: const TextStyle(color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 20),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: onSimulateCustomerScan,
                  child: const Text('Simulate Customer Scan', style: TextStyle(fontSize: 11)),
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(backgroundColor: AppTheme.fnbTurquoise),
                  onPressed: onSimulateFnbPayment,
                  child: const Text('Simulate FNB Pay', style: TextStyle(fontSize: 11, color: Colors.white)),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text('Done', style: TextStyle(color: AppTheme.textSecondary)),
          ),
        ],
      ),
    );
  }
}
