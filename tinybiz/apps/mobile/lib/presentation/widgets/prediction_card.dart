import 'package:flutter/material.dart';
import '../../domain/models/stock_prediction.dart';
import '../../core/theme/app_theme.dart';

class PredictionCard extends StatelessWidget {
  final StockPrediction prediction;
  final VoidCallback onRestockTap;

  const PredictionCard({
    super.key,
    required this.prediction,
    required this.onRestockTap,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Text(prediction.product.emoji, style: const TextStyle(fontSize: 32)),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    prediction.product.name,
                    style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 16),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    prediction.statusMessage,
                    style: TextStyle(
                      color: prediction.isLowStock ? Colors.orangeAccent : AppTheme.fnbTurquoise,
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  Text(
                    '${prediction.product.currentStock} ${prediction.product.unit}s left • ${prediction.unitsSoldLast7Days} sold in 7 days',
                    style: const TextStyle(color: AppTheme.textSecondary, fontSize: 12),
                  ),
                ],
              ),
            ),
            IconButton(
              icon: const Icon(Icons.add_shopping_cart, color: AppTheme.fnbAmber),
              onPressed: onRestockTap,
            ),
          ],
        ),
      ),
    );
  }
}
