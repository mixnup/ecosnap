# EcoSnap: Product & Technical Source of Truth

**Core Strategy:** Expiry-First Dinner Triage

## 1. Executive Summary

EcoSnap is a high-urgency utility designed to convert expiring household groceries into immediate dinner plans. Moving away from the crowded, generic "smart pantry" market, the product focuses exclusively on resolving economic pain: preventing food waste by telling users exactly what to cook tonight before their ingredients go bad.

## 2. Core Value Proposition & Positioning

* **The Wedge:** High-friction manual entry and broad "sustainability" framing are abandoned in favor of immediate financial utility. The primary user job to be done is: *"Tell me what to cook tonight so I don't throw away money."*
* **Secondary Narrative:** The original carbon-footprint tracking is demoted to a secondary "impact receipt." It serves as a feel-good retention mechanic after the user experiences the primary value (saving money and reducing mental load).

## 3. Monetization Strategy

To combat the low blended lifetime value (LTV) associated with rigid $4.99/month subscriptions in the highly saturated food-waste category, EcoSnap will utilize a **sachet-driven (pay-per-use) pricing model**.

* **Free Tier:** Basic expiration tracking for a limited number of items and standard recipe suggestions to build the daily habit.
* **Premium Micro-transactions (Sachets):** Users purchase small credit packs to unlock high-value, high-friction actions when their urgency is highest. This includes advanced receipt-scanning API calls, complex dietary-restricted recipe generation, or scaling recipes for multi-day family meal prep.

## 4. MVP Technical Architecture

The application will be built using a streamlined, highly constrained stack optimized for fast iteration and low infrastructure overhead. To reduce friction and complex overhead, heavy or custom AI model implementations are strictly avoided.

* **Client / Frontend:** Next.js (configured as a Progressive Web App optimized for mobile kitchen environments). Styled strictly with TailwindCSS for rapid UI scaling.
* **Frontend Deployment:** Vercel.
* **Backend & API Layer:** Python REST API (e.g., FastAPI or Flask) deployed on Render. This service serves as the core engine, handling business logic, external API requests, and secure user authentication.
* **Database:** PostgreSQL hosted on Render. The schema will be highly constrained, focusing strictly on:
* `Users`
* `Inventory_Items` (enforcing strict expiry timestamps)
* `Transaction_History` (ledger for the sachet credits)


* **Processing Layer:** Standardized, lightweight API calls executed securely from the Python backend to an external natural language processor. This strictly handles matching the `Inventory_Items` array against optimal, edible recipe structures without the burden of maintaining in-house AI infrastructure.

## 5. UI/UX Design Philosophy

* **Aesthetic:** Engineered Professionalism.
* **Execution:** The UI must establish immediate trust by utilizing high-fidelity, minimalist design elements, precise typography, and stark layouts. This distinct visual precision is required to cut through the noise and differentiate EcoSnap from the visually cluttered, generic interfaces of competitors like Clove AI and NoWaste.ai.

## 6. Sample User Flows

**Flow A: The Daily Triage (Free Tier)**

1. **Trigger:** The user opens the app at 5:30 PM, facing the daily dilemma of what to cook for dinner.
2. **Dashboard:** The minimalist home screen instantly isolates high-urgency data, displaying: "Expiring within 48h: 1/2 bag Spinach, 2 Chicken Breasts."
3. **Action:** The user taps the primary "Triage Dinner" button.
4. **Processing:** The lightweight external API cross-references the targeted expiring ingredients with standardized recipe structures.
5. **Resolution:** A stark, easy-to-read recipe card is generated (e.g., "Pan-Seared Chicken & Wilted Spinach").
6. **Retention Loop:** The user taps "Cooked." The items are automatically removed from the `Inventory_Items` database. The UI displays a clean "Impact Receipt" confirming an estimated $6.50 saved and the equivalent carbon offset, reinforcing the financial and environmental win.

**Flow B: High-Friction Data Entry (Premium Sachet Use)**

1. **Trigger:** The user returns from a large grocery run and needs to update their digital inventory, but wants to avoid the friction of manual typing.
2. **Action:** The user taps the "Scan Grocery Receipt" camera interface.
3. **Monetization Gate:** A highly precise modal appears: "Advanced Receipt Parsing requires 1 Sachet. You have 3 left."
4. **Conversion:** The user confirms the action. One Sachet is immediately deducted from their `Transaction_History` ledger.
5. **Processing:** The user snaps a photo of the receipt. The external API parses the image text, categorizes the grocery items, and assigns strict estimated expiry timestamps to each line item.
6. **Resolution:** The inventory dashboard auto-populates within seconds, completely bypassing manual data entry while capturing micro-transaction revenue during a moment of high user convenience.

## 7. Liability & Legal Protection

Because the core utility directly influences users' decisions regarding food consumption and safety, active measures must be engineered into both the legal foundation and the user experience to shield the platform from liability.

* **UX & UI Friction (The First Line of Defense):**
* **Non-Absolute Language:** The interface will never use definitive safety phrasing (e.g., "Safe to eat"). All data points must be framed as algorithmic estimates (e.g., "Estimated Expiry," "Triage Window").
* **Visible Disclaimers:** The onboarding flow and settings will feature a stark, clearly visible disclaimer: *"EcoSnap provides algorithmic estimates based on average shelf-life databases. These are not guarantees. Always inspect food, check packaging dates, and use your senses before consuming."*


* **Ironclad Terms of Service (ToS):**
* **Assumption of Risk:** A mandatory agreement prior to account creation and Sachet purchases acknowledging that variables such as transport time and storage temperature are outside the platform's control.
* **Limitation of Liability:** A strict legal clause explicitly stating the company is not liable for health issues, medical expenses, or damages resulting from spoiled food.


* **Corporate Shielding:** Prior to processing real user data or releasing functional MVP features, EcoSnap will operate under a formal corporate entity (e.g., LLC) to establish a firm legal barrier between the application's operations and personal assets.