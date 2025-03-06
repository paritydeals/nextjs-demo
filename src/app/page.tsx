"use client";

import { useState } from "react";
import { Radio, RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { ParityDealsProvider, PDPriceFormatted } from "@paritydeals/react-sdk";

const frequencies = [
  { value: "monthly", label: "Monthly", priceSuffix: "/month" },
  { value: "annually", label: "Annually", priceSuffix: "/year" },
];
const tiers = [
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    price: { 
      monthly: 199, 
      annually: 1990 
    },
    paymentId: "price_1QzZ9NEEwDDegOMGA2MLhb5h",
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    price: { monthly: 599, annually: 5990 },
    description: "A plan that scales with your rapidly growing business.",
    paymentId: "price_1QzZ9tEEwDDegOMGoYiqo6HI",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    price: { monthly: 999, annually: 9990 },
    description: "Dedicated support and infrastructure for your company.",
    paymentId: "price_1QzZABEEwDDegOMGmCp18k3h",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
      "Custom reporting tools",
    ],
    mostPopular: false,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const getCheckoutUrl = (tier: typeof tiers[0]) => {
    setIsLoading(true);
    setSelectedTier(tier.name);
    const fetchCheckoutUrl = async () => {
      const data = {
        pd_identifier: '9639aa61-9180-43e7-af03-d178ab5a62dd',
        checkout_data: {
          line_items: [{"price": tier.paymentId, "quantity": 1}],
          mode: "payment",
        },
        success_url: 'https://paritydeals.com'
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

        // Redirect to the checkout URL
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

  return (
    <ParityDealsProvider>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-base/7 font-semibold text-indigo-600">
              Pricing
            </h2>
            <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
              Pricing that grows with you
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
            Choose an affordable plan that’s packed with the best features for
            engaging your audience, creating customer loyalty, and driving
            sales.
          </p>
          <div className="mt-16 flex justify-center">
            <fieldset aria-label="Payment frequency">
              <RadioGroup
                value={frequency}
                onChange={setFrequency}
                className="grid grid-cols-2 gap-x-1 rounded-full p-1 text-center text-xs/5 font-semibold ring-1 ring-gray-200 ring-inset"
              >
                {frequencies.map((option) => (
                  <Radio
                    key={option.value}
                    value={option}
                    className="cursor-pointer rounded-full px-2.5 py-1 text-gray-500 data-checked:bg-indigo-600 data-checked:text-white"
                  >
                    {option.label}
                  </Radio>
                ))}
              </RadioGroup>
            </fieldset>
          </div>
          <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "ring-2 ring-indigo-600"
                    : "ring-1 ring-gray-200",
                  "rounded-3xl p-8 xl:p-10"
                )}
              >
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={classNames(
                      tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                      "text-lg/8 font-semibold"
                    )}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs/5 font-semibold text-indigo-600">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className="mt-4 text-sm/6 text-gray-600">
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-semibold tracking-tight text-gray-900">
                    <PDPriceFormatted
                      originalPrice={tier.price[frequency.value as keyof typeof tier.price]}
                      showDecimal={false}
                      showCurrencyCode={false}
                      showCurrencySymbol={true}
                      convertToLocal={false}
                    />
                  </span>
                  <span className="text-sm/6 font-semibold text-gray-600">
                    {frequency.priceSuffix}
                  </span>
                </p>
                <a
                  onClick={() => getCheckoutUrl(tier)}
                  aria-describedby={tier.id}
                  className={classNames(
                    tier.mostPopular
                      ? "bg-indigo-600 text-white shadow-xs hover:bg-indigo-500"
                      : "text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300",
                    isLoading && selectedTier === tier.name ? "cursor-default pointer-events-none" : "cursor-pointer",
                    "mt-6 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}
                >
                  {isLoading && selectedTier === tier.name ? "Redirecting..." : "Buy plan"}
                </a>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm/6 text-gray-600 xl:mt-10"
                >
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-indigo-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ParityDealsProvider>
  );
}
