import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'event_providers.dart';
import 'product_providers.dart';
import '../../domain/models/today_summary.dart';
import '../../domain/services/profit_service.dart';

final todaySummaryProvider = Provider<TodaySummary>((ref) {
  final eventsAsync = ref.watch(eventsStreamProvider);
  final productsAsync = ref.watch(productsStreamProvider);

  final events = eventsAsync.value ?? [];
  final products = productsAsync.value ?? [];
  final now = DateTime.now();

  return ProfitService.calculateTodaySummary(events, products, now);
});
