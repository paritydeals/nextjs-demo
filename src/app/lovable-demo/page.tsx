"use client";

import { useEffect, useState } from "react";
import {
    ParityDealsProvider,
    PDPriceFormatted,
} from "@paritydeals/react-sdk";

const PD_IDENTIFIER = "9655984b-569d-4c05-8e77-38f773e7a393";

const CHECKOUT_URL = "https://www.paritydeals.com/api/v1/stripe-checkout/";
const SUCCESS_URL = "https://lovable.dev/settings/plans";

const pdOptions = {
    showCurrencyCode: false,
    showCurrencySymbol: true,
    showDecimal: false,
    roundTo: "up",
    convertToLocal: true,
};

const tiers = [
    {
        name: "Starter",
        id: "tier-starter",
        price: {
            monthly: 20,
        },
        paymentId: "price_1R24QhEEwDDegOMGHx1ZBK8e",
        description: "Perfect for hobby and occasional use",
        features: [
            "Everything in Free, plus:",
            "Go beyond daily limits with a monthly limit",
            "Unlimited private projects",
            "Custom domains",
        ],
        mostPopular: false,
    },
    {
        name: "Launch",
        id: "tier-launch",
        price: { monthly: 50 },
        description: "For individuals working on small projects",
        paymentId: "price_1R24RHEEwDDegOMGxjmGkHYB",
        features: [
            "Everything in Starter, plus:",
            "2.5x monthly limits",
        ],
        mostPopular: true,
    },
];
const scaleTiers = [
    {
        name: "Scale1",
        id: "tier-scale1",
        price: { monthly: 100 },
        description: "For individuals working on larger projects",
        paymentId: "price_1R25CUEEwDDegOMGNn2efeGO",
        features: [
            "Everything in Launch, plus:",
            "Larger message limits",
            "Advanced analytics",
            "Early access to new features",
        ],
        mostPopular: false,
    },
    {
        name: "Scale2",
        id: "tier-scale2",
        price: { monthly: 200 },
        description: "For individuals working on larger projects",
        paymentId: "price_1R25DNEEwDDegOMGnc06uqOB",
        features: [
            "Everything in Launch, plus:",
            "Larger message limits",
            "Advanced analytics",
            "Early access to new features",
        ],
        mostPopular: false,
    },
    {
        name: "Scale3",
        id: "tier-scale3",
        price: { monthly: 294 },
        description: "For individuals working on larger projects",
        paymentId: "price_1R25DnEEwDDegOMGkVYuW3P0",
        features: [
            "Everything in Launch, plus:",
            "Larger message limits",
            "Advanced analytics",
            "Early access to new features",
        ],
        mostPopular: false,
    },
];


export default function Pricing() {
    const [isLoading, setIsLoading] = useState(false);
    const [selectedScaleTierId, setSelectedScaleTierId] = useState<string | null>(
        null
    );

    const [selectedTierId, setSelectedTierId] = useState<string | null>(null);

    const [selectedScaleTier, setSelectedScaleTier] = useState<
        (typeof scaleTiers)[0] | null
    >(scaleTiers[0]);

    useEffect(() => {
        if (selectedScaleTierId) {
            setSelectedScaleTier(
                scaleTiers.find((tier) => tier.id === selectedScaleTierId) || null
            );
        }
    }, [selectedScaleTierId]);

    const getCheckoutUrl = (tier: (typeof tiers)[0] | null) => {
        if (!tier) return;
        setIsLoading(true);
        setSelectedTierId(tier.id);
        const fetchCheckoutUrl = async () => {
            const data = {
                pd_identifier: PD_IDENTIFIER,
                is_localized: pdOptions.convertToLocal,
                checkout_data: {
                    line_items: [{ price: tier.paymentId, quantity: 1 }],
                    mode: "payment",
                },
                success_url: SUCCESS_URL,
            };

            try {
                const response = await fetch(
                    CHECKOUT_URL,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(data),
                    }
                );

                const result = await response.json();

                // Redirect to the checkout URL
                window.location.href = result.url;
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
                setSelectedTierId(null);
            }
        };

        // Call the function
        fetchCheckoutUrl();
    };

    return (
        <ParityDealsProvider>
            <div className="min-h-screen w-full bg-black text-white">
                <div className="max-w-6xl mx-auto px-4 py-12">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-semibold mb-4">Pricing</h1>
                        <p className="text-lg text-gray-300">
                            Start for free. Upgrade to get the capacity that exactly matches
                            your teams needs.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {tiers.map((tier) => (
                            <div
                                key={tier.id}
                                className="bg-[#111111] border border-gray-700 rounded-lg p-6 flex flex-col"
                            >
                                <h2 className="text-xl font-bold mb-2">{tier.name}</h2>
                                <p className="text-3xl font-semibold mb-2">
                                    <PDPriceFormatted
                                        originalPrice={tier.price.monthly}
                                        {...pdOptions}
                                    />{" "}
                                    <span className="text-base font-normal">/ month</span>
                                </p>
                                <p className="text-gray-400 mb-6">{tier.description}</p>
                                <ul className="space-y-2 mb-8 text-gray-300 text-sm">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <span className="mr-2">✔</span> {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => getCheckoutUrl(tier)}
                                    disabled={isLoading}
                                    className="mt-auto bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                                >
                                    {isLoading && selectedTierId === tier.id ? "Redirecting..." : "Upgrade to " + tier.name}
                                </button>
                            </div>
                        ))}

                        <div className="bg-[#111111] border border-gray-700 rounded-lg p-6 flex flex-col">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-xl font-bold">
                                    {selectedScaleTier ? selectedScaleTier.name : "Scale1"}
                                </h2>
                                <select
                                    onChange={(e) => setSelectedScaleTierId(e.target.value)}
                                    className="bg-[#222222] text-gray-300 text-sm px-2 py-1 rounded focus:outline-none"
                                >
                                    {scaleTiers.map((tier) => (
                                        <option key={tier.id} value={tier.id}>
                                            {tier.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <p className="text-3xl font-semibold mb-2">
                                <PDPriceFormatted
                                    originalPrice={
                                        selectedScaleTier
                                            ? selectedScaleTier.price.monthly
                                            : scaleTiers[0].price.monthly
                                    }
                                    {...pdOptions}
                                />{" "}
                                <span className="text-base font-normal">/ month</span>
                            </p>
                            <p className="text-gray-400 mb-6">
                                For individuals working on larger projects:
                            </p>
                            <ul className="space-y-2 mb-8 text-gray-300 text-sm">
                                {selectedScaleTier
                                    ? selectedScaleTier.features.map((feature) => (
                                        <li key={feature} className="flex items-start">
                                            <span className="mr-2">✔</span> {feature}
                                        </li>
                                    ))
                                    : null}
                            </ul>
                            <button
                                onClick={() => getCheckoutUrl(selectedScaleTier)}
                                className="mt-auto bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                {isLoading && selectedTierId === selectedScaleTier?.id ? "Redirecting..." : "Upgrade to " + selectedScaleTier?.name}
                            </button>
                        </div>

                        <div className="bg-[#111111] border border-gray-700 rounded-lg p-6 flex flex-col">
                            <h2 className="text-xl font-bold mb-2">Teams</h2>
                            <p className="text-gray-400 mb-6 mt-auto">Contact us for:</p>
                            <ul className="space-y-2 mb-8 text-gray-300">
                                <li className="flex items-start">
                                    <span className="mr-2">✔</span> Centralized billing
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✔</span> Centralized billing
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✔</span> SSO
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✔</span> Custom integrations
                                </li>
                                <li className="flex items-start">
                                    <span className="mr-2">✔</span> Dedicated support & account
                                    management
                                </li>
                            </ul>
                            <button className="mt-auto bg-white text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 transition-colors cursor-pointer">
                                Contact us
                            </button>
                        </div>
                    </div>

                    {/* Footer note */}
                    <div className="mt-8 text-center text-sm text-gray-500">
                        100 GB free hosting bandwidth included per month during beta.
                    </div>

                    <div className="mt-8 text-center text-sm text-yellow-200 max-w-md mx-auto">
                        VPN protection is disabled for the demonstration purpose. Use a VPN to simulate different location to test the pricing.
                    </div>
                </div>
            </div>
        </ParityDealsProvider>
    );
}
