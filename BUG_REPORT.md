# Bug Report — problem_user Exploration

Logged in as `problem_user` / `secret_sauce` and explored the inventory, cart, and checkout flow.

---

### Bug 1: Product images are wrong on both listing and detail pages
**Steps to Reproduce:**
1. Log in as `problem_user`
2. View the product listing page (`/inventory.html`)
3. Click into any product's detail page

**Expected:** Each product shows its own correct photo, consistently, on both the listing and detail views.
**Actual:** On the listing page, every product shows the same incorrect image (a photo of a dog). On the detail page, a different image appears, but it's still incorrect and unrelated to the product's description — e.g. the Bolt T-Shirt's detail page shows a generic black t-shirt with no branding, not matching the "heather gray with red bolt" description.

**Additional observation:** Cart state is also inconsistent between views — an item already added to the cart (showing "Remove" on the listing page) may still show "Add to cart" on its own detail page, meaning the two pages disagree about whether the item is in the cart.

**Severity:** Medium — purely visual/state display issues, doesn't block core functionality, but is misleading and would undermine trust in a real storefront.

---

### Bug 2: "Add to cart" does nothing for some products
**Steps to Reproduce:**
1. Log in as `problem_user`
2. On the inventory page, click "Add to cart" on Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, or Test.allTheThings() T-Shirt (Red)

**Expected:** The button changes to "Remove," and the cart badge count increases by 1.
**Actual:** The button stays as "Add to cart," the cart badge does not update, and no error is shown. The item is silently not added.
**Severity:** High — this is a functional failure with zero feedback to the user, meaning a shopper could believe an item was added when it wasn't.

---

### Bug 3: Last Name field clears itself and shows a false validation error
**Steps to Reproduce:**
1. Log in as `problem_user`, add any item to the cart, and proceed to checkout
2. On the checkout information page, enter a value into the Last Name field

**Expected:** The typed value stays in the field.
**Actual:** The moment text is entered, the field clears itself and displays "Last Name is required," even though a value was just typed. This happens every time, consistently, and only affects the Last Name field (First Name and Postal Code behave normally).
**Severity:** Critical — this completely blocks checkout for `problem_user`, since the form can never be submitted with a valid Last Name.

---

### Bug 4: "Remove" button unresponsive on inventory page for certain items
**Steps to Reproduce:**
1. Log in as `problem_user`
2. Add Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, and Test.allTheThings() T-Shirt (Red) to the cart (via the Cart page, since "Add to cart" fails for these on the inventory page — see Bug 2)
3. On the inventory page, click "Remove" on any of these three items

**Expected:** Clicking "Remove" removes the item from the cart and the button reverts to "Add to cart."
**Actual:** Nothing happens — the button does not respond at all. The item can only be removed by navigating to the Cart page and clicking "Remove" from there.
**Severity:** Medium — inconsistent behavior between the inventory page and cart page for the same action, on the same subset of products affected by Bug 2.

---

## Notes
This exploration focused on the inventory, cart, and checkout flow within the time available. With more time I'd also check the sort dropdown behavior and cart quantity edge cases (e.g. adding/removing the same item repeatedly) for `problem_user`.