/**
 * 定价页面 - 展示订阅计划和一次性产品
 */

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const { isAuthenticated } = useAuth();

  // 获取订阅计划
  const { data: plans = [], isLoading } = trpc.stripe.getSubscriptionPlans.useQuery();

  // 创建订阅 Checkout
  const createSubscriptionCheckout = trpc.stripe.createSubscriptionCheckout.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.open(data.url, "_blank");
      }
    },
    onError: (error) => {
      console.error("Failed to create checkout:", error);
      alert("Failed to create checkout session");
    },
  });

  const handleSubscribe = (planId: string) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }

    createSubscriptionCheckout.mutate({
      planId: planId as "basic" | "pro" | "enterprise",
      billingCycle,
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your needs
          </p>

          {/* Billing Toggle */}
          <div className="flex justify-center items-center gap-4">
            <span className={billingCycle === "monthly" ? "text-foreground font-semibold" : "text-muted-foreground"}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-muted"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-primary transition ${
                  billingCycle === "yearly" ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span className={billingCycle === "yearly" ? "text-foreground font-semibold" : "text-muted-foreground"}>
              Yearly
              <span className="ml-2 text-sm text-green-600">(Save 17%)</span>
            </span>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => {
            const price =
              billingCycle === "yearly" && plan.yearlyPrice
                ? Math.floor(plan.yearlyPrice / 100)
                : Math.floor(plan.monthlyPrice / 100);
            const period = billingCycle === "yearly" ? "/year" : "/month";

            return (
              <Card
                key={plan.planId}
                className={`relative flex flex-col p-8 ${
                  plan.planId === "pro"
                    ? "ring-2 ring-primary scale-105"
                    : ""
                }`}
              >
                {plan.planId === "pro" && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-foreground">${price}</span>
                  <span className="text-muted-foreground ml-2">{period}</span>
                </div>

                <Button
                  onClick={() => handleSubscribe(plan.planId)}
                  disabled={createSubscriptionCheckout.isPending}
                  className="w-full mb-8"
                  variant={plan.planId === "pro" ? "default" : "outline"}
                >
                  {createSubscriptionCheckout.isPending ? "Processing..." : "Get Started"}
                </Button>

                <div className="space-y-4 flex-1">
                  {plan.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Can I change my plan anytime?</h3>
              <p className="text-muted-foreground">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">
                We accept all major credit cards (Visa, Mastercard, American Express) through Stripe.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">
                Contact our sales team to discuss a free trial for your organization.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">What if I need to cancel?</h3>
              <p className="text-muted-foreground">
                You can cancel your subscription anytime from your account settings. No questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
