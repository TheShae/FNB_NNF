import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'bottom_nav.dart';
import 'sync_badge.dart';
import '../providers/connectivity_provider.dart';
import '../providers/repository_providers.dart';
import '../../core/config/app_config.dart';

class AppShell extends ConsumerWidget {
  final StatefulNavigationShell navigationShell;

  const AppShell({super.key, required this.navigationShell});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    // Listen for network reconnect and auto-trigger sync
    ref.listen<bool>(isOnlineProvider, (previous, isOnline) {
      if (isOnline) {
        ref.read(syncRepositoryProvider).syncPendingEvents(
              merchantId: AppConfig.defaultMerchantId,
              deviceId: AppConfig.defaultDeviceId,
            );
      }
    });

    return Scaffold(
      appBar: AppBar(
        title: const Text('TinyBiz'),
        actions: const [
          Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: SyncBadge(),
          ),
        ],
      ),
      body: navigationShell,
      bottomNavigationBar: BottomNav(navigationShell: navigationShell),
    );
  }
}

