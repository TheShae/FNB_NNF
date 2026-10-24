import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/offer_providers.dart';
import '../providers/repayment_providers.dart';
import '../providers/repository_providers.dart';
import '../widgets/offer_card.dart';
import '../widgets/repayment_tracker.dart';
import '../../data/local/seed/demo_seed.dart';
import '../../domain/models/business_event.dart';
import '../../core/utils/money_formatter.dart';
import '../../core/theme/app_theme.dart';
import '../../core/config/app_config.dart';

class OfferScreen extends ConsumerWidget {
  const OfferScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final activeOfferAsync = ref.watch(activeOfferStreamProvider);
    final repaymentsAsync = ref.watch(repaymentsStreamProvider);

    return SingleChildScrollView(
      child: Column(
        children: [
          activeOfferAsync.when(
            data: (offer) {
              final currentOffer = offer ?? DemoSeed.getDemoOffer(DateTime.now());
              return Column(
                children: [
                  OfferCard(
                    offer: currentOffer,
                    onAccept: () async {
                      final updated = currentOffer.copyWith(
                        status: 'ACCEPTED',
                        acceptedAt: DateTime.now(),
                      );
                      await ref.read(offerRepositoryProvider).saveOffer(updated);

                      // Create LOAN_OFFER_ACCEPTED event
                      final acceptedEvent = BusinessEvent(
                        id: 'evt-accept-${DateTime.now().millisecondsSinceEpoch}',
                        merchantId: AppConfig.defaultMerchantId,
                        type: 'LOAN_OFFER_ACCEPTED',
                        amount: currentOffer.amount,
                        occurredAt: DateTime.now(),
                        createdAt: DateTime.now(),
                        deviceId: AppConfig.defaultDeviceId,
                        syncStatus: 'PENDING',
                      );
                      await ref.read(eventRepositoryProvider).saveEvent(acceptedEvent);
                    },
                  ),
                  if (currentOffer.status == 'ACCEPTED' || currentOffer.status == 'ACTIVE')
                    RepaymentTracker(offer: currentOffer),
                ],
              );
            },
            loading: () => const Center(child: CircularProgressIndicator()),
            error: (err, stack) => Center(child: Text('Error loading offer: $err')),
          ),
          const SizedBox(height: 16),
          const Align(
            alignment: Alignment.centerLeft,
            padding: EdgeInsets.symmetric(horizontal: 16),
            child: Text('Recent Automatic Deductions', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 16)),
          ),
          repaymentsAsync.when(
            data: (repayments) {
              if (repayments.isEmpty) {
                return const Padding(
                  padding: EdgeInsets.all(16.0),
                  child: Text('No automatic repayments recorded yet.', style: TextStyle(color: AppTheme.textSecondary)),
                );
              }
              return ListView.builder(
                shrinkWrap: true,
                physics: const NeverScrollableScrollPhysics(),
                itemCount: repayments.length,
                itemBuilder: (context, index) {
                  final rep = repayments[index];
                  return ListTile(
                    leading: const Icon(Icons.price_check, color: AppTheme.fnbTurquoise),
                    title: Text('15% Daily Sales Deduction: ${MoneyFormatter.format(rep.amount ?? 0.0)}'),
                    subtitle: Text('${rep.occurredAt.day}/${rep.occurredAt.month}/${rep.occurredAt.year}'),
                  );
                },
              );
            },
            loading: () => const SizedBox(),
            error: (_, __) => const SizedBox(),
          ),
        ],
      ),
    );
  }
}
