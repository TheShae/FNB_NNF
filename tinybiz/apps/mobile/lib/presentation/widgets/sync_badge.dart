import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../providers/event_providers.dart';
import '../../core/theme/app_theme.dart';

class SyncBadge extends ConsumerWidget {
  const SyncBadge({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final pendingCount = ref.watch(pendingEventsCountProvider);

    if (pendingCount > 0) {
      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: AppTheme.fnbAmber.withOpacity(0.2),
          border: Border.all(color: AppTheme.fnbAmber),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            const Icon(Icons.sync_problem, size: 14, color: AppTheme.fnbAmber),
            const SizedBox(width: 4),
            Text(
              '$pendingCount pending',
              style: const TextStyle(
                color: AppTheme.fnbAmber,
                fontSize: 12,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
      );
    }

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: AppTheme.fnbTurquoise.withOpacity(0.2),
        border: Border.all(color: AppTheme.fnbTurquoise),
        borderRadius: BorderRadius.circular(12),
      ),
      child: const Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          Icon(Icons.cloud_done, size: 14, color: AppTheme.fnbTurquoise),
          SizedBox(width: 4),
          Text(
            'Synced',
            style: TextStyle(
              color: AppTheme.fnbTurquoise,
              fontSize: 12,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}
