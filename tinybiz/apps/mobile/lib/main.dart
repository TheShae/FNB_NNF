import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'app.dart';
import 'data/local/database/app_database.dart';
import 'data/repositories/product_repository.dart';
import 'data/repositories/event_repository.dart';
import 'data/repositories/offer_repository.dart';
import 'data/local/seed/demo_seed.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final db = AppDatabase();
  final productRepo = ProductRepository(db);
  final eventRepo = EventRepository(db);
  final offerRepo = OfferRepository(db);

  // Auto-seed demo data on first launch
  final existingProducts = await productRepo.watchAllProducts().first;
  if (existingProducts.isEmpty) {
    await productRepo.saveAllProducts(DemoSeed.demoProducts);
    final now = DateTime.now();
    await eventRepo.saveAllEvents(DemoSeed.getDemoEvents(now));
    await offerRepo.saveOffer(DemoSeed.getDemoOffer(now));
  }

  runApp(
    const ProviderScope(
      child: TinyBizApp(),
    ),
  );
}
