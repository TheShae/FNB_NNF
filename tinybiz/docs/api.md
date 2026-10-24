# TinyBiz REST API Specification

Base URL: `/api/v1`

## Endpoints

### Health Check
- **`GET /api/v1/health`**
  - **Response (200 OK)**:
    ```json
    { "status": "ok", "timestamp": "2026-10-24T09:12:00.000Z" }
    ```

### Authentication
- **`POST /api/v1/auth/register`**
- **`POST /api/v1/auth/login`**
- **`POST /api/v1/auth/refresh`**

### Sync Endpoint (Idempotent)
- **`POST /api/v1/sync`**
  - **Request Payload**:
    ```json
    {
      "merchantId": "uuid",
      "deviceId": "device-123",
      "events": [
        {
          "id": "event-uuid",
          "type": "SALE",
          "productId": "product-uuid",
          "quantity": 2,
          "unitPrice": 18.00,
          "unitCost": 12.00,
          "amount": 36.00,
          "verificationTier": "SELF",
          "verificationWeight": 1,
          "occurredAt": "2026-10-24T09:12:00.000Z",
          "createdAt": "2026-10-24T09:12:01.100Z",
          "metadata": {}
        }
      ]
    }
    ```
  - **Response (200 OK)**:
    ```json
    {
      "acceptedEventIds": ["event-uuid"],
      "rejectedEvents": [],
      "serverTime": "2026-10-24T09:12:05.000Z"
    }
    ```

### Products
- **`GET /api/v1/products`**
- **`POST /api/v1/products`**
- **`PATCH /api/v1/products/:id`**
- **`DELETE /api/v1/products/:id`**

### Verification
- **`POST /api/v1/events/:eventId/verify/customer-qr`**
- **`POST /api/v1/events/:eventId/verify/fnb-payment`**

### Offers & Repayments
- **`GET /api/v1/offers/eligibility`**
- **`POST /api/v1/offers`**
- **`POST /api/v1/offers/:offerId/accept`**
- **`GET /api/v1/offers/active`**
- **`GET /api/v1/repayments`**
- **`POST /api/v1/repayments`**
