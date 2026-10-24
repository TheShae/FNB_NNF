import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'core/theme/app_theme.dart';
import 'presentation/widgets/app_shell.dart';
import 'presentation/screens/sell_screen.dart';
import 'presentation/screens/stock_screen.dart';
import 'presentation/screens/today_screen.dart';
import 'presentation/screens/score_screen.dart';
import 'presentation/screens/offer_screen.dart';

final GoRouter _router = GoRouter(
  initialLocation: '/sell',
  routes: [
    StatefulShellRoute.indexedStack(
      builder: (context, state, navigationShell) {
        return AppShell(navigationShell: navigationShell);
      },
      branches: [
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/sell',
              builder: (context, state) => const SellScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/stock',
              builder: (context, state) => const StockScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/today',
              builder: (context, state) => const TodayScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/score',
              builder: (context, state) => const ScoreScreen(),
            ),
          ],
        ),
        StatefulShellBranch(
          routes: [
            GoRoute(
              path: '/offer',
              builder: (context, state) => const OfferScreen(),
            ),
          ],
        ),
      ],
    ),
  ],
);

class TinyBizApp extends StatelessWidget {
  const TinyBizApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp.router(
      title: 'TinyBiz',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.theme,
      routerConfig: _router,
    );
  }
}
