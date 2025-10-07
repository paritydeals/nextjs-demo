"use client";

import { ParityDealsProvider, PDPricingTable } from "@paritydeals/react-ui";
import "@paritydeals/react-ui/dist/pd-react-ui.css";
import "./pricingTable.scss";

export default function Pricing() {
  return (
    <ParityDealsProvider
      accessToken="client-b5ddb0c6-d98d-458d-8c8c-4027ffca9f20:9cef7609-d6e8-4d13-81e9-997f84a31390"
      offeringId="b10b301e-6d51-4780-a3e5-6c455788b519"
    >
      <div className="py-24 sm:py-32 transition-colors">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="mt-2 text-5xl font-semibold tracking-tight text-balance  text-white sm:text-6xl">
              Billing
            </p>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
            Choose the perfect plan for your team.
          </p>

          <div className="pricing-table-thena mt-10 flex justify-center">
            <PDPricingTable
              onCustomPriceClick={() => {
                console.log("custom price clicked");
              }}
            />
          </div>
        </div>
      </div>
    </ParityDealsProvider>
  );
}
