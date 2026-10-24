import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'event_providers.dart';
import '../../domain/models/readiness_score.dart';
import '../../domain/services/score_service.dart';

final scoreProvider = Provider<ReadinessScore>((ref) {
  final events = ref.watch(eventsStreamProvider).value ?? [];
  final now = DateTime.now();
  return ScoreService.calculateReadinessScore(events, now);
});
