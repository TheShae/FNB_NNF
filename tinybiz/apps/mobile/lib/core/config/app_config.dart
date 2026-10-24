class AppConfig {
  static const String apiBaseUrl = String.fromEnvironment(
    'TINYBIZ_API_URL',
    defaultValue: 'http://10.0.2.2:4000/api/v1',
  );

  static const String defaultMerchantId = '11111111-1111-1111-1111-111111111111';
  static const String defaultDeviceId = 'device-emulator-01';
}
