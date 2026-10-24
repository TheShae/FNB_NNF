class ApiEndpoints {
  static const String register = '/auth/register';
  static const String login = '/auth/login';
  static const String products = '/products';
  static const String events = '/events';
  static const String sync = '/sync';
  static const String offersEligibility = '/offers/eligibility';
  static const String offers = '/offers';
  static String acceptOffer(String offerId) => '/offers/$offerId/accept';
  static const String activeOffer = '/offers/active';
  static const String repayments = '/repayments';
  static const String health = '/health';
  static String verifyCustomerQr(String eventId) => '/events/$eventId/verify/customer-qr';
  static String verifyFnbPayment(String eventId) => '/events/$eventId/verify/fnb-payment';
}
