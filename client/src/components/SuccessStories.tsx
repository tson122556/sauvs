import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SuccessStory {
  id: number;
  title: string;
  company: string;
  description: string;
  result: string;
  image?: string;
}

interface SuccessStoriesProps {
  language?: "zh" | "en";
}

const successStoriesZh: SuccessStory[] = [
  {
    id: 1,
    title: "AI 驱动的客户服务转型",
    company: "金融科技公司",
    description: "通过集成我们的 AI 模型，该公司将客户服务效率提升 300%，响应时间从 2 小时降低到 20 分钟。",
    result: "年度成本节省 500 万元，客户满意度提升 45%",
  },
  {
    id: 2,
    title: "智能机器人生产线优化",
    company: "制造业龙头企业",
    description: "部署我们的智能机器人解决方案，实现了生产线的全自动化，产能提升 200%。",
    result: "生产效率提升 200%，产品良率从 92% 提升到 98.5%",
  },
  {
    id: 3,
    title: "物联网智能城市项目",
    company: "城市管理部门",
    description: "实施我们的物联网平台，实现了城市基础设施的智能管理和实时监控。",
    result: "能源消耗降低 35%，应急响应时间缩短 60%",
  },
  {
    id: 4,
    title: "医疗影像 AI 诊断系统",
    company: "三甲医院",
    description: "集成我们的医疗 AI 模型，提升了医学影像诊断的准确率和效率。",
    result: "诊断准确率提升到 99.2%，医生工作量减少 40%",
  },
];

const successStoriesEn: SuccessStory[] = [
  {
    id: 1,
    title: "AI-Powered Customer Service Transformation",
    company: "FinTech Company",
    description: "By integrating our AI models, the company increased customer service efficiency by 300%, reducing response time from 2 hours to 20 minutes.",
    result: "Annual cost savings of 5 million yuan, customer satisfaction increased by 45%",
  },
  {
    id: 2,
    title: "Intelligent Robot Production Line Optimization",
    company: "Manufacturing Leader",
    description: "Deploying our intelligent robot solutions achieved full automation of the production line, increasing capacity by 200%.",
    result: "Production efficiency increased by 200%, product quality rate improved from 92% to 98.5%",
  },
  {
    id: 3,
    title: "IoT Smart City Project",
    company: "City Management Department",
    description: "Implementing our IoT platform enabled intelligent management and real-time monitoring of city infrastructure.",
    result: "Energy consumption reduced by 35%, emergency response time shortened by 60%",
  },
  {
    id: 4,
    title: "Medical Imaging AI Diagnostic System",
    company: "Top-Tier Hospital",
    description: "Integrating our medical AI models improved the accuracy and efficiency of medical image diagnosis.",
    result: "Diagnostic accuracy improved to 99.2%, doctor workload reduced by 40%",
  },
];

export default function SuccessStories({ language = "zh" }: SuccessStoriesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const stories = language === "zh" ? successStoriesZh : successStoriesEn;

  const labels = {
    zh: {
      title: "客户成功案例",
      subtitle: "我们与全球领先企业的合作成果",
      prev: "上一个",
      next: "下一个",
    },
    en: {
      title: "Success Stories",
      subtitle: "Our collaboration results with leading global enterprises",
      prev: "Previous",
      next: "Next",
    },
  };

  const t = labels[language];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [stories.length]);

  const currentStory = stories[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.title}</h2>
          <p className="text-xl text-gray-400">{t.subtitle}</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* 轮播卡片 */}
          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
            <div className="mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {currentStory.title}
              </h3>
              <p className="text-lg text-purple-300">{currentStory.company}</p>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">{currentStory.description}</p>

            <div className="bg-slate-800/50 border border-purple-500/20 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-400 mb-2">成果</p>
              <p className="text-lg text-green-400 font-semibold">{currentStory.result}</p>
            </div>

            {/* 导航按钮 */}
            <div className="flex items-center justify-between">
              <Button
                onClick={handlePrev}
                variant="outline"
                size="icon"
                className="border-purple-500/50 hover:bg-purple-500/20"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* 进度指示器 */}
              <div className="flex gap-2">
                {stories.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-purple-500 w-8"
                        : "bg-slate-600 w-2 hover:bg-slate-500"
                    }`}
                    aria-label={`Go to story ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="border-purple-500/50 hover:bg-purple-500/20"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            {/* 计数器 */}
            <div className="text-center mt-6 text-gray-400 text-sm">
              {currentIndex + 1} / {stories.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
