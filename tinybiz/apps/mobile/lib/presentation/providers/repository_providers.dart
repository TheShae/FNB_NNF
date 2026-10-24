import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'database_provider.dart';
import '../../data/repositories/product_repository.dart';
import '../../data/repositories/event_repository.dart';
import '../../data/repositories/offer_repository.dart';
import '../../data/repositories/repayment_repository.dart';
import '../../data/repositories/sync_repository.dart';
import '../../data/remote/api_client.dart';
import '../../data/remote/sync_api.dart';
import '../../data/remote/verification_api.dart';
import '../../data/remote/offer_api.dart';

final apiClientProvider = Provider<ApiClient>((ref) => ApiClient());
final syncApiProvider = Provider<SyncApi>((ref) => SyncApi(ref.watch(apiClientProvider)));
final offerApiProvider = Provider<OfferApi>((ref) => OfferApi(ref.watch(apiClientProvider)));
final verificationApiProvider = Provider<VerificationApi>((ref) => VerificationApi(ref.watch(apiClientProvider)));

final productRepositoryProvider = Provider<ProductRepository>((ref) {
  return ProductRepository(ref.watch(databaseProvider));
});

final eventRepositoryProvider = Provider<EventRepository>((ref) {
  return EventRepository(ref.watch(databaseProvider));
});

final offerRepositoryProvider = Provider<OfferRepository>((ref) {
  return OfferRepository(ref.watch(databaseProvider));
});

final repaymentRepositoryProvider = Provider<RepaymentRepository>((ref) {
  return RepaymentRepository(ref.watch(databaseProvider));
});

final syncRepositoryProvider = Provider<SyncRepository>((ref) {
  return SyncRepository(
    eventRepository: ref.watch(eventRepositoryProvider),
    syncApi: ref.watch(syncApiProvider),
  );
});
