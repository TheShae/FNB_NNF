# TinyBiz 3-Minute Hackathon Demo Script

## Setup
1. Backend running: Express API in `backend/` on `http://localhost:4000` connected to PostgreSQL `tinybiz`.
2. Mobile app running on emulator or real device with loaded 14-day seed data.

## Step-by-Step Demo Guide

1. **Airplane Mode Demonstration (Offline Sale < 5s)**
   - Enable Airplane Mode on the mobile device.
   - On the **Sell** screen, tap **Bread** (x2) and **Milk** (x1).
   - Tap **Complete Sale**.
   - Note the instantaneous execution (under 1 second) and the pending badge showing `"3 pending"`.

2. **Stock & Today Verification**
   - Open **Stock**: Show that Bread stock decreased and displays stock-out prediction warning ("Bread likely gone today").
   - Open **Today**: Point out real-time gross revenue, cost of goods sold, and net profit updates.

3. **Re-connection & Background Sync**
   - Turn off Airplane Mode.
   - Observe the sync badge automatically change from `"3 pending"` to `"Synced"`.
   - Show PostgreSQL event query confirming the sale events persisted with matching UUIDs.

4. **Score & Verified Sales**
   - Navigate to **Score**: Explain the 0–100 Readiness Score breakdown (Active days, Avg daily sales, Profit growth, Verified share).
   - Perform a simulated Customer QR Scan or FNB Payment verification to show verification tier elevation.

5. **FNB Restock Credit & Repayment**
   - Navigate to **Offer**: Show the R800 simulated FNB restock credit offer.
   - Tap **Accept Offer**.
   - Perform a new sale and highlight the **automatic 15% repayment deduction** on the repayment tracker.

6. **Closing Statement**
   - "TinyBiz turns everyday offline sales into a trustworthy record that unlocks stock before the shelf runs empty."
