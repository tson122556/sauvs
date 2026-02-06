import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface AppointmentFormProps {
  language?: "zh" | "en";
}

export default function AppointmentForm({ language = "zh" }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    consultationType: "ai",
    preferredDate: "",
    preferredTime: "09:00",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const createAppointment = trpc.appointments.create.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        consultationType: "ai",
        preferredDate: "",
        preferredTime: "09:00",
        message: "",
      });
      setError("");
      setTimeout(() => setSubmitted(false), 5000);
    },
    onError: (error: any) => {
      setError(error.message || "预约失败，请稍后重试");
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.phone || !formData.preferredDate) {
      setError(language === "zh" ? "请填写所有必填项" : "Please fill in all required fields");
      return;
    }

    createAppointment.mutate({
      ...formData,
      consultationType: formData.consultationType as "ai" | "robot" | "iot",
    });
  };

  const labels = {
    zh: {
      title: "预约咨询",
      subtitle: "填写以下信息，我们的专家将在 24 小时内与您联系",
      name: "姓名",
      email: "邮箱",
      phone: "电话",
      consultationType: "咨询类型",
      preferredDate: "偏好日期",
      preferredTime: "偏好时间",
      message: "备注信息",
      submit: "提交预约",
      submitting: "提交中...",
      success: "预约成功！我们将在 24 小时内与您联系",
      error: "预约失败",
      required: "必填项",
      aiApplication: "AI 应用",
      robot: "智能机器人",
      iot: "物联网",
    },
    en: {
      title: "Book a Consultation",
      subtitle: "Fill in the information below and our experts will contact you within 24 hours",
      name: "Name",
      email: "Email",
      phone: "Phone",
      consultationType: "Consultation Type",
      preferredDate: "Preferred Date",
      preferredTime: "Preferred Time",
      message: "Message",
      submit: "Submit",
      submitting: "Submitting...",
      success: "Appointment booked successfully! We will contact you within 24 hours",
      error: "Failed to book appointment",
      required: "Required",
      aiApplication: "AI Application",
      robot: "Intelligent Robot",
      iot: "IoT",
    },
  };

  const t = labels[language];

  return (
    <Card className="bg-slate-800/50 border-slate-700 p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-2">{t.title}</h3>
      <p className="text-gray-400 mb-6">{t.subtitle}</p>

      {submitted && (
        <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
          <p className="text-green-300">{t.success}</p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {t.name} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
              placeholder={t.name}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {t.email} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
              placeholder={t.email}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {t.phone} <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition"
              placeholder={t.phone}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {t.consultationType} <span className="text-red-400">*</span>
            </label>
            <select
              name="consultationType"
              value={formData.consultationType}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
            >
              <option value="ai">{t.aiApplication}</option>
              <option value="robot">{t.robot}</option>
              <option value="iot">{t.iot}</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {t.preferredDate} <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              name="preferredDate"
              value={formData.preferredDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-white mb-2">
              {t.preferredTime}
            </label>
            <input
              type="time"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            {t.message}
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition resize-none"
            placeholder={t.message}
          />
        </div>

        <Button
          type="submit"
          disabled={createAppointment.isPending}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {createAppointment.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t.submitting}
            </>
          ) : (
            t.submit
          )}
        </Button>
      </form>
    </Card>
  );
}
