import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'repository_providers.dart';
import '../../domain/models/business_event.dart';

final eventsStreamProvider = StreamProvider<List<BusinessEvent>>((ref) {
  final repo = ref.watch(eventRepositoryProvider);
  return repo.watchAllEvents();
});

final pendingEventsCountProvider = Provider<int>((ref) {
  final eventsAsync = ref.watch(eventsStreamProvider);
  return eventsAsync.maybeWhen(
    data: (events) => events.where((e) => e.syncStatus == 'PENDING').length,
    orElse: () => 0,
  );
});
