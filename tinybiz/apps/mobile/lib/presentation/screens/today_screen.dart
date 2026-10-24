import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/today_providers.dart';
import '../providers/repository_providers.dart';
import '../../core/utils/money_formatter.dart';
import '../../core/theme/app_theme.dart';
import '../../core/config/app_config.dart';
import '../../core/utils/id_generator.dart';
import '../../domain/models/business_event.dart';

class TodayScreen extends ConsumerWidget {
  const TodayScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final summary = ref.watch(todaySummaryProvider);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Net Profit Big Card
          Card(
            color: AppTheme.cardSurface,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: Padding(
              padding: const EdgeInsets.all(20.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text('Today Net Profit', style: TextStyle(color: AppTheme.textSecondary)),
                  const SizedBox(height: 8),
                  Text(
                    MoneyFormatter.format(summary.netProfit),
                    style: const TextStyle(fontSize: 36, fontWeight: FontWeight.bold, color: AppTheme.fnbTurquoise),
                  ),
                  const Divider(height: 24),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      _StatItem(label: 'Sales Revenue', value: MoneyFormatter.format(summary.totalSalesRevenue)),
                      _StatItem(label: 'Cost of Goods', value: MoneyFormatter.format(summary.costOfGoodsSold)),
                      _StatItem(label: 'Expenses', value: MoneyFormatter.format(summary.expenses)),
                    ],
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          // Verified Sales Share
          Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Verified Sales Share', style: TextStyle(fontWeight: FontWeight.bold)),
                      Text('Customer QR & FNB Payments', style: TextStyle(color: AppTheme.textSecondary, fontSize: 12)),
                    ],
                  ),
                  Text(
                    '${summary.verifiedSalesPercentage.toStringAsFixed(0)}%',
                    style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: AppTheme.fnbAmber),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),
          // Add Expense Button
          SizedBox(
            width: double.infinity,
            child: OutlinedButton.icon(
              icon: const Icon(Icons.add_card, color: AppTheme.fnbAmber),
              label: const Text('Add Business Expense'),
              onPressed: () => _showAddExpenseDialog(context, ref),
            ),
          ),
          const SizedBox(height: 20),
          const Text('Top Selling Today', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
          const SizedBox(height: 8),
          if (summary.topSellingProducts.isEmpty)
            const Padding(
              padding: EdgeInsets.all(16.0),
              child: Center(child: Text('No sales recorded today', style: TextStyle(color: AppTheme.textSecondary))),
            )
          else
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: summary.topSellingProducts.length,
              itemBuilder: (context, index) {
                final item = summary.topSellingProducts[index];
                return ListTile(
                  leading: Text(item.product.emoji, style: const TextStyle(fontSize: 24)),
                  title: Text(item.product.name),
                  subtitle: Text('${item.quantitySold} ${item.product.unit}s sold'),
                  trailing: Text(MoneyFormatter.format(item.revenue), style: const TextStyle(fontWeight: FontWeight.bold)),
                );
              },
            ),
        ],
      ),
    );
  }

  void _showAddExpenseDialog(BuildContext context, WidgetRef ref) {
    final amountController = TextEditingController();
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: const Text('Record Business Expense'),
        content: TextField(
          controller: amountController,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(labelText: 'Amount (ZAR)', prefixText: 'R '),
        ),
        actions: [
          TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('Cancel')),
          ElevatedButton(
            onPressed: () async {
              final amount = double.tryParse(amountController.text) ?? 0.0;
              if (amount > 0) {
                final eventRepo = ref.read(eventRepositoryProvider);
                final expenseEvent = BusinessEvent(
                  id: IdGenerator.newId(),
                  merchantId: AppConfig.defaultMerchantId,
                  type: 'EXPENSE',
                  amount: amount,
                  occurredAt: DateTime.now(),
                  createdAt: DateTime.now(),
                  deviceId: AppConfig.defaultDeviceId,
                  syncStatus: 'PENDING',
                );
                await eventRepo.saveEvent(expenseEvent);
              }
              if (ctx.mounted) Navigator.pop(ctx);
            },
            child: const Text('Save Expense'),
          ),
        ],
      ),
    );
  }
}

class _StatItem extends StatelessWidget {
  final String label;
  final String value;

  const _StatItem({required this.label, required this.value});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(label, style: const TextStyle(color: AppTheme.textSecondary, fontSize: 11)),
        const SizedBox(height: 4),
        Text(value, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 14)),
      ],
    );
  }
}
