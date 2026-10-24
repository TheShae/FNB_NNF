import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../providers/score_providers.dart';
import '../widgets/score_gauge.dart';
import '../../core/theme/app_theme.dart';

class ScoreScreen extends ConsumerWidget {
  const ScoreScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final score = ref.watch(scoreProvider);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        children: [
          const SizedBox(height: 12),
          ScoreGauge(score: score.score),
          const SizedBox(height: 16),
          const Text(
            'Trader Readiness Score',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const Text(
            '4-Factor Explainable Calculation',
            style: TextStyle(color: AppTheme.textSecondary),
          ),
          const SizedBox(height: 24),
          // Factors Breakdown
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                children: [
                  _ScoreFactorRow(label: 'Active Days Share (25%)', score: score.activeDaysFactor, maxScore: 25),
                  _ScoreFactorRow(label: 'Average Daily Sales (30%)', score: score.avgSalesFactor, maxScore: 30),
                  _ScoreFactorRow(label: 'Profit Growth Trend (20%)', score: score.profitTrendFactor, maxScore: 20),
                  _ScoreFactorRow(label: 'Verified Sales Share (25%)', score: score.verifiedSalesFactor, maxScore: 25),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          if (score.positiveFactors.isNotEmpty) ...[
            const Align(
              alignment: Alignment.centerLeft,
              child: Text('What is helping your score', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.fnbTurquoise)),
            ),
            const SizedBox(height: 8),
            ...score.positiveFactors.map((f) => ListTile(
                  dense: true,
                  leading: const Icon(Icons.check_circle, color: AppTheme.fnbTurquoise, size: 20),
                  title: Text(f),
                )),
          ],
          if (score.nextActions.isNotEmpty) ...[
            const SizedBox(height: 12),
            const Align(
              alignment: Alignment.centerLeft,
              child: Text('Next Actions to Boost Score', style: TextStyle(fontWeight: FontWeight.bold, color: AppTheme.fnbAmber)),
            ),
            const SizedBox(height: 8),
            ...score.nextActions.map((a) => ListTile(
                  dense: true,
                  leading: const Icon(Icons.arrow_forward, color: AppTheme.fnbAmber, size: 20),
                  title: Text(a),
                )),
          ],
          const SizedBox(height: 24),
          if (score.isEligibleForLoan)
            SizedBox(
              width: double.infinity,
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: AppTheme.fnbAmber,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(vertical: 14),
                ),
                icon: const Icon(Icons.local_offer),
                label: const Text('See Restock Credit Offer (Eligible)', style: TextStyle(fontWeight: FontWeight.bold)),
                onPressed: () => context.go('/offer'),
              ),
            ),
        ],
      ),
    );
  }
}

class _ScoreFactorRow extends StatelessWidget {
  final String label;
  final double score;
  final double maxScore;

  const _ScoreFactorRow({required this.label, required this.score, required this.maxScore});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6.0),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(label, style: const TextStyle(fontSize: 13)),
          Text(
            '${score.toStringAsFixed(1)} / ${maxScore.toStringAsFixed(0)}',
            style: const TextStyle(fontWeight: FontWeight.bold, color: AppTheme.fnbTurquoise),
          ),
        ],
      ),
    );
  }
}
