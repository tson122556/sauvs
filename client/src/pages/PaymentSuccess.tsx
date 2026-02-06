/**
 * 支付成功页面
 */

import { useEffect, useState } from "react";
import { useSearchParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Loader } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  // 获取 Checkout Session 状态
  const { data: sessionStatus } = trpc.stripe.getCheckoutSessionStatus.useQuery(
    { sessionId: sessionId || "" },
    { enabled: !!sessionId }
  );

  useEffect(() => {
    if (sessionStatus?.paymentStatus === "paid") {
      setStatus("success");
    } else if (sessionStatus?.paymentStatus === "unpaid") {
      setStatus("error");
    }
  }, [sessionStatus]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
          <p className="text-muted-foreground">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <div className="text-red-600 mb-4">
            <div className="text-6xl">❌</div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Payment Failed</h1>
          <p className="text-muted-foreground mb-6">
            We couldn't process your payment. Please try again or contact support.
          </p>
          <Button onClick={() => window.location.href = "/pricing"} className="w-full">
            Back to Pricing
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="text-green-600 mb-4">
          <CheckCircle className="w-16 h-16 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Payment Successful!</h1>
        <p className="text-muted-foreground mb-6">
          Thank you for your purchase. Your subscription is now active.
        </p>

        <div className="bg-muted p-4 rounded-lg mb-6 text-left">
          <h3 className="font-semibold text-foreground mb-3">What's Next?</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✓ Your subscription is active immediately</li>
            <li>✓ Check your email for a confirmation receipt</li>
            <li>✓ Access your account dashboard to get started</li>
            <li>✓ You can manage your subscription anytime</li>
          </ul>
        </div>

        <div className="space-y-3">
          <Button onClick={() => (window.location.href = "/dashboard")} className="w-full">
            Go to Dashboard
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
