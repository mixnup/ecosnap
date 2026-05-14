# QA Demo Script & User Flows

This document outlines the primary user flows for EcoSnap, structured sequentially to assist non-technical QA testers in recording comprehensive demo videos or conducting end-to-end testing.

## Flow 1: The "Daily Triage" (Core Value Proposition)
**Objective**: Demonstrate the app's primary capability—saving money by converting expiring food into dinner.

1. **Dashboard Overview**
   - **Action**: Open the app and navigate to the `Dashboard`.
   - **Visuals**: Highlight the "Urgent/Expiring Soon" section. Emphasize that the app puts expiring items front and center.
   - **Narration**: "When the user opens EcoSnap at 5:30 PM, they immediately see what's about to go bad and cost them money."

2. **Triggering the Triage**
   - **Action**: Click the "Triage Dinner" button to open the `TriageModal`.
   - **Visuals**: Show the item selection interface. Select 2-3 items that are close to expiry.
   - **Narration**: "Users select the ingredients they want to rescue. The modal clearly shows what needs to be used."

3. **AI Generation**
   - **Action**: Click "Triage Selected Items".
   - **Visuals**: Capture the animated loading states ("Analyzing ingredients...", "Waking up Chef...", etc.).
   - **Narration**: "EcoSnap's AI cross-references the expiring items with pantry staples and dietary preferences to generate the perfect recipe."

4. **Review & Save**
   - **Action**: Review the generated Recipe Card. Hover over the "Seasonal Context" and "Value Saved" badges. Click "Save & Let's Cook!".
   - **Visuals**: The toast notification confirming the recipe is saved.
   - **Narration**: "The app not only provides a recipe but shows the exact dollar amount saved, reinforcing the financial win. Saving it moves it to their history."

## Flow 2: Recipe History & Impact Tracking
**Objective**: Show how users access their saved recipes and track their long-term impact.

1. **Navigating to History**
   - **Action**: Click on the `Recipe History` tab in the navigation menu.
   - **Visuals**: Scroll through the list of previously saved recipes.
   - **Narration**: "All saved triage sessions are stored here for easy access while cooking."

2. **Reviewing a Saved Recipe**
   - **Action**: Click on the recipe generated in Flow 1 to view its full details.
   - **Visuals**: Show the clean, easy-to-read recipe instructions and ingredient list.
   - **Narration**: "The minimalist design makes it easy to read instructions while in a busy kitchen."

## Flow 3: Inventory & Pantry Management
**Objective**: Demonstrate how users maintain their digital kitchen.

1. **Inventory Management (Expiring Goods)**
   - **Action**: Navigate to the `Inventory` page.
   - **Visuals**: Show the list of items sorted by expiry date.
   - **Narration**: "The Inventory strictly tracks perishable items. Users can easily see what needs attention."
   - **Action**: Add a new item manually, setting a short expiry window (e.g., 2 days). 

2. **Pantry Management (Staples)**
   - **Action**: Navigate to the `Pantry` page.
   - **Visuals**: Show items like spices, oils, and grains.
   - **Narration**: "The Pantry tracks non-perishables. These staples are automatically considered by the AI during the Triage flow, preventing 'I don't have olive oil' moments."

## Flow 4: Dietary Preferences
**Objective**: Prove the AI adheres to user-specific dietary needs.

1. **Updating Settings**
   - **Action**: Navigate to the `Settings` page.
   - **Visuals**: Select specific dietary restrictions (e.g., "Vegetarian", "Gluten-Free").
   - **Narration**: "Users can lock in their dietary restrictions here."

2. **Validating the Restriction**
   - **Action**: Return to the Dashboard and trigger a new Triage.
   - **Visuals**: The resulting recipe should visibly conform to the new restrictions.
   - **Narration**: "The AI engine strictly respects these constraints, ensuring the generated dinner is safe and appropriate for the user."

---

### QA Recording Tips
- **Pacing**: Leave the cursor still for 2-3 seconds after clicking major buttons (like "Triage") to let the viewer process the UI changes.
- **Data Prep**: Before recording, ensure your test account has at least 5 inventory items, 3 pantry items, and 1-2 items expiring within 24 hours to make the dashboard look active.
- **Resolution**: Record in standard 1080p (1920x1080) for clarity.
