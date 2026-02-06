/**
 * 支付取消页面
 */

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="text-yellow-600 mb-4">
          <AlertCircle className="w-16 h-16 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Payment Cancelled</h1>
        <p className="text-muted-foreground mb-6">
          Your payment was cancelled. No charges have been made to your account.
        </p>

        <div className="bg-muted p-4 rounded-lg mb-6 text-left">
          <h3 className="font-semibold text-foreground mb-3">What happened?</h3>
          <p className="text-sm text-muted-foreground">
            You cancelled the payment process during checkout. If this was unintentional, you can try again anytime.
          </p>
        </div>

        <div className="space-y-3">
          <Button onClick={() => (window.location.href = "/pricing")} className="w-full">
            Return to Pricing
          </Button>
          <Button
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="w-full"
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </div>
  );
}
