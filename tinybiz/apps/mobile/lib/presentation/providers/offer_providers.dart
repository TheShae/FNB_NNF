import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'repository_providers.dart';
import '../../domain/models/restock_offer.dart';

final activeOfferStreamProvider = StreamProvider<RestockOffer?>((ref) {
  final repo = ref.watch(offerRepositoryProvider);
  return repo.watchActiveOffer();
});
