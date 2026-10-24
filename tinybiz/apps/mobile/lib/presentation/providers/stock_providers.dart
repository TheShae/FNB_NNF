import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'event_providers.dart';
import 'product_providers.dart';
import '../../domain/models/stock_prediction.dart';
import '../../domain/services/prediction_service.dart';

final stockPredictionsProvider = Provider<List<StockPrediction>>((ref) {
  final events = ref.watch(eventsStreamProvider).value ?? [];
  final products = ref.watch(productsStreamProvider).value ?? [];
  final now = DateTime.now();

  return products.map((product) {
    return PredictionService.predictProductStockOut(product, events, now);
  }).toList();
});
