import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'repository_providers.dart';
import '../../domain/models/business_event.dart';

final repaymentsStreamProvider = StreamProvider<List<BusinessEvent>>((ref) {
  final repo = ref.watch(repaymentRepositoryProvider);
  return repo.watchRepaymentEvents();
});
