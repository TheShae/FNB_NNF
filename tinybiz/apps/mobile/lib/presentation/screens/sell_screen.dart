import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/product_providers.dart';
import '../providers/cart_provider.dart';
import '../providers/repository_providers.dart';
import '../providers/offer_providers.dart';
import '../widgets/product_tile.dart';
import '../widgets/qr_receipt_sheet.dart';
import '../../domain/services/sales_service.dart';
import '../../domain/services/repayment_service.dart';
import '../../domain/services/verification_service.dart';
import '../../core/config/app_config.dart';
import '../../core/utils/money_formatter.dart';
import '../../core/theme/app_theme.dart';

class SellScreen extends ConsumerWidget {
  const SellScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsAsync = ref.watch(productsStreamProvider);
    final cart = ref.watch(cartProvider);
    final cartNotifier = ref.read(cartProvider.notifier);

    return Scaffold(
      body: productsAsync.when(
        data: (products) {
          if (products.isEmpty) {
            return const Center(child: Text('No products available'));
          }
          return GridView.builder(
            padding: const EdgeInsets.all(12),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              childAspectRatio: 0.9,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
            ),
            itemCount: products.length,
            itemBuilder: (context, index) {
              final product = products[index];
              final cartItem = cart.firstWhere(
                (item) => item.product.id == product.id,
                orElse: () => CartItem(product: product, quantity: 0),
              );
              return ProductTile(
                product: product,
                cartQuantity: cartItem.quantity,
                onTap: () => cartNotifier.addProduct(product),
              );
            },
          );
        },
        loading: () => const Center(child: CircularProgressIndicator()),
        error: (err, stack) => Center(child: Text('Error loading products: $err')),
      ),
      bottomSheet: cart.isNotEmpty
          ? Container(
              padding: const EdgeInsets.all(16),
              color: AppTheme.cardSurface,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '${cartNotifier.totalItems} items',
                        style: const TextStyle(color: AppTheme.textSecondary),
                      ),
                      Text(
                        MoneyFormatter.format(cartNotifier.totalAmount),
                        style: const TextStyle(
                          fontSize: 22,
                          fontWeight: FontWeight.bold,
                          color: AppTheme.fnbTurquoise,
                        ),
                      ),
                    ],
                  ),
                  ElevatedButton(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppTheme.fnbAmber,
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                    ),
                    onPressed: () => _completeSale(context, ref),
                    child: const Text('Complete Sale (Offline)', style: TextStyle(fontWeight: FontWeight.bold)),
                  ),
                ],
              ),
            )
          : null,
    );
  }

  Future<void> _completeSale(BuildContext context, WidgetRef ref) async {
    final cart = ref.read(cartProvider);
    if (cart.isEmpty) return;

    final eventRepo = ref.read(eventRepositoryProvider);
    final productRepo = ref.read(productRepositoryProvider);
    final offerRepo = ref.read(offerRepositoryProvider);
    final activeOffer = ref.read(activeOfferStreamProvider).value;

    final now = DateTime.now();

    final events = SalesService.createSaleEventsFromCart(
      cart: cart,
      merchantId: AppConfig.defaultMerchantId,
      deviceId: AppConfig.defaultDeviceId,
      occurredAt: now,
    );

    // Save events & update stock immediately
    for (final event in events) {
      await eventRepo.saveEvent(event);

      // Decrement local stock
      final product = cart.firstWhere((item) => item.product.id == event.productId).product;
      final newStock = (product.currentStock - (event.quantity ?? 0)).clamp(0, 99999);
      await productRepo.updateProductStock(product.id, newStock);

      // Process repayment if active loan exists
      if (activeOffer != null && (activeOffer.status == 'ACCEPTED' || activeOffer.status == 'ACTIVE')) {
        final repaymentResult = RepaymentService.processRepaymentForSale(
          activeOffer: activeOffer,
          saleEvent: event,
          deviceId: AppConfig.defaultDeviceId,
        );
        if (repaymentResult.repaymentEvent != null) {
          await eventRepo.saveEvent(repaymentResult.repaymentEvent!);
          await offerRepo.saveOffer(repaymentResult.updatedOffer);
        }
      }
    }

    ref.read(cartProvider.notifier).clear();

    if (context.mounted && events.isNotEmpty) {
      showModalBottomSheet(
        context: context,
        isScrollControlled: true,
        builder: (_) => QrReceiptSheet(
          event: events.first,
          onSimulateCustomerScan: () async {
            final updated = VerificationService.verifyWithCustomerQr(events.first);
            await eventRepo.saveEvent(updated);
            if (context.mounted) Navigator.pop(context);
          },
          onSimulateFnbPayment: () async {
            final updated = VerificationService.verifyWithFnbPayment(events.first);
            await eventRepo.saveEvent(updated);
            if (context.mounted) Navigator.pop(context);
          },
        ),
      );
    }
  }
}
