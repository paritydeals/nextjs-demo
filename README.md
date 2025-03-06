# ParityDeals + Next.js Demo

This repository demonstrates how to integrate [ParityDeals React SDK](https://www.npmjs.com/package/@paritydeals/react-sdk) into a basic [Next.js](https://nextjs.org/) application.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/paritydeals/nextjs-demo.git
cd nextjs-demo
```

### 2. Install dependencies

Install the required packages, including the ParityDeals React SDK:

```bash
# Using npm
npm install

# OR using yarn
yarn
```

This installs all project dependencies, including:

- `@paritydeals/react-sdk`
- Next.js
- React, etc.

### 3. Set up Stripe products and pricing

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/).
2. Create or select an existing **Product**.
3. Create a **Price** for your product (e.g., recurring monthly or annual price).
4. Copy the generated **Price ID** (something like `price_XXXXXXXX`).

You will use this `price_XXXXXXXX` value in your code to initiate the checkout session.

### 4. Configure ParityDeals

1. Log in to [ParityDeals](https://paritydeals.com/).
2. Navigate to your project or create a new one.
3. Retrieve your **ParityDeals Identifier** (`pd_identifier`). 
4. Replace the placeholder identifier in the code with your actual `pd_identifier`.

### 5. Run the application

After you've updated the code with your Stripe Price IDs and ParityDeals identifier, you can start the development server:

```bash
# Using npm
npm run dev

# OR using yarn
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the demo.

---

## Sample Checkout Code

### Basic Example

Below is a minimal snippet to demonstrate how you might fetch a Stripe checkout URL from ParityDeals using **fetch**:

```js
const fetchCheckoutUrl = async () => {
  const data = {
    pd_identifier: 'your_pd_identifier',  // (required) Replace with your actual pd_identifier
    ip_address: '',                       // (optional) Your user's IP address
    apply_coupons: true,                  // (optional) Automatically apply coupons if available
    payment_id: 'your_payment_id',        // (conditional) Required if checkout_data is not provided
    checkout_data: {},                    // (conditional) Required if payment_id is not provided
    success_url: 'https://your-success-url.com' // (optional) Redirect URL after successful payment
  };

  try {
    const response = await fetch('https://www.paritydeals.com/api/v1/stripe-checkout/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log('Success:', result);
    // You can redirect the user with:
    // window.location.href = result.url;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Call the function
fetchCheckoutUrl();
```

### Usage in Next.js

In the Next.js demo, the code is inside a React component. Here’s the relevant part:

```tsx
const getCheckoutUrl = (tier: typeof tiers[0]) => {
  setIsLoading(true);
  setSelectedTier(tier.name);

  const fetchCheckoutUrl = async () => {
    const data = {
      pd_identifier: 'YOUR_PD_IDENTIFIER', // Replace with your actual ParityDeals ID
      checkout_data: {
        // If using multiple line items, you can pass them here
        line_items: [{ price: tier.paymentId, quantity: 1 }],
        mode: 'payment',
      },
      success_url: 'https://your-success-url.com'
    };

    try {
      const response = await fetch('https://www.paritydeals.com/api/v1/stripe-checkout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      // Redirect the user to the Stripe Checkout URL
      window.location.href = result.url;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
      setSelectedTier(null);
    }
  };

  // Call the function
  fetchCheckoutUrl();
};
```

**Key points**:

- Replace `YOUR_PD_IDENTIFIER` with your actual ParityDeals project ID.
- Update `tier.paymentId` with your Stripe Price ID.
- Optionally, change the `success_url` to your desired post-checkout page.

---

**Happy coding!** If you encounter any issues or have questions, please open an [issue](https://github.com/YourUsername/paritydeals-nextjs-demo/issues) or reach out to the ParityDeals community.
