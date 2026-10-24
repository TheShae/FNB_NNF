import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/stock_providers.dart';
import '../providers/repository_providers.dart';
import '../widgets/prediction_card.dart';
import '../../domain/services/stock_service.dart';
import '../../domain/models/business_event.dart';
import '../../core/config/app_config.dart';
import '../../core/utils/id_generator.dart';

class StockScreen extends ConsumerWidget {
  const StockScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final predictions = ref.watch(stockPredictionsProvider);

    if (predictions.isEmpty) {
      return const Center(child: Text('No products found'));
    }

    return ListView.builder(
      padding: const EdgeInsets.symmetric(vertical: 8),
      itemCount: predictions.length,
      itemBuilder: (context, index) {
        final prediction = predictions[index];
        return PredictionCard(
          prediction: prediction,
          onRestockTap: () => _showRestockDialog(context, ref, prediction.product.id, prediction.product.name),
        );
      },
    );
  }

  void _showRestockDialog(BuildContext context, WidgetRef ref, String productId, String productName) {
    final controller = TextEditingController(text: '10');
    showDialog(
      context: context,
      builder: (ctx) => AlertDialog(
        title: Text('Restock $productName'),
        content: TextField(
          controller: controller,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(labelText: 'Quantity to add'),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx),
            child: const Text('Cancel'),
          ),
          ElevatedButton(
            onPressed: () async {
              final qty = int.tryParse(controller.text) ?? 10;
              final productRepo = ref.read(productRepositoryProvider);
              final eventRepo = ref.read(eventRepositoryProvider);

              final products = await ref.read(productRepositoryProvider).watchAllProducts().first;
              final product = products.firstWhere((p) => p.id == productId);

              final updatedProduct = StockService.applyRestockToProduct(product, qty);
              await productRepo.saveProduct(updatedProduct);

              final restockEvent = BusinessEvent(
                id: IdGenerator.newId(),
                merchantId: AppConfig.defaultMerchantId,
                productId: productId,
                type: 'RESTOCK',
                quantity: qty,
                unitCost: product.costPrice,
                amount: product.costPrice * qty,
                occurredAt: DateTime.now(),
                createdAt: DateTime.now(),
                deviceId: AppConfig.defaultDeviceId,
                syncStatus: 'PENDING',
              );
              await eventRepo.saveEvent(restockEvent);

              if (ctx.mounted) Navigator.pop(ctx);
            },
            child: const Text('Confirm Restock'),
          ),
        ],
      ),
    );
  }
}
