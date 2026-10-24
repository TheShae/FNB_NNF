import 'package:flutter/material.dart';
import '../../core/theme/app_theme.dart';

class ScoreGauge extends StatelessWidget {
  final int score;

  const ScoreGauge({super.key, required this.score});

  @override
  Widget build(BuildContext context) {
    Color scoreColor = Colors.redAccent;
    if (score >= 70) {
      scoreColor = AppTheme.fnbTurquoise;
    } else if (score >= 50) {
      scoreColor = AppTheme.fnbAmber;
    }

    return Container(
      width: 140,
      height: 140,
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: scoreColor, width: 8),
      ),
      child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              '$score',
              style: TextStyle(
                fontSize: 42,
                fontWeight: FontWeight.bold,
                color: scoreColor,
              ),
            ),
            const Text(
              '/ 100',
              style: TextStyle(color: AppTheme.textSecondary, fontSize: 12),
            ),
          ],
        ),
      ),
    );
  }
}
