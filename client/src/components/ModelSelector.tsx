import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronDown, Lock, Unlock, Zap } from "lucide-react";

export interface Model {
  id: string;
  name: string;
  provider: string;
  complexity: number; // 1-10
  speed: number; // 1-10
  quality: number; // 1-10
  cost: number; // per request in cents
  color: string;
  description?: string;
}

export interface ModelSelectorProps {
  models: Model[];
  selectedModel: Model | null;
  isLocked: boolean;
  onModelSelect: (model: Model) => void;
  onLockToggle: (locked: boolean) => void;
  isCompact?: boolean;
}

const MODEL_CATEGORIES = {
  text: ["gpt-4", "claude", "grok", "gemini", "kimi", "deepseek"],
  image: ["dall-e-3", "midjourney", "stable-diffusion", "flux"],
  video: ["runway-ml", "synthesia", "d-id"],
};

export function ModelSelector({
  models,
  selectedModel,
  isLocked,
  onModelSelect,
  onLockToggle,
  isCompact = false,
}: ModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleModelSelect = (model: Model) => {
    onModelSelect(model);
    setIsOpen(false);
  };

  const handleLockToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLockToggle(!isLocked);
  };

  if (isCompact && selectedModel) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-card rounded-lg border border-border">
        <div
          className={`w-3 h-3 rounded-full ${selectedModel.color}`}
          style={{
            backgroundColor: selectedModel.color,
          }}
        />
        <span className="text-xs font-medium text-foreground">
          {selectedModel.name}
        </span>
        <button
          onClick={handleLockToggle}
          className="ml-auto p-1 hover:bg-accent rounded transition-colors"
          title={isLocked ? "Unlock model" : "Lock model"}
        >
          {isLocked ? (
            <Lock className="w-3 h-3 text-yellow-500" />
          ) : (
            <Unlock className="w-3 h-3 text-gray-400" />
          )}
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-all ${
          isOpen
            ? "border-purple-500 bg-purple-500/10"
            : "border-border bg-card hover:border-purple-400"
        }`}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {selectedModel && (
            <>
              <div
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{
                  backgroundColor: selectedModel.color,
                }}
              />
              <div className="flex-1 min-w-0 text-left">
                <div className="text-sm font-semibold text-foreground truncate">
                  {selectedModel.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedModel.provider}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleLockToggle}
            className="p-1.5 hover:bg-accent rounded transition-colors"
            title={isLocked ? "Unlock model" : "Lock model"}
          >
            {isLocked ? (
              <Lock className="w-4 h-4 text-yellow-500" />
            ) : (
              <Unlock className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-2">
              {/* Text Models */}
              <div className="mb-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Text Models
                </div>
                <div className="space-y-1">
                  {models
                    .filter((m) =>
                      MODEL_CATEGORIES.text.some((cat) =>
                        m.id.toLowerCase().includes(cat)
                      )
                    )
                    .map((model) => (
                      <ModelOption
                        key={model.id}
                        model={model}
                        isSelected={selectedModel?.id === model.id}
                        onSelect={() => handleModelSelect(model)}
                      />
                    ))}
                </div>
              </div>

              {/* Image Models */}
              <div className="mb-2 border-t border-border pt-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Image Models
                </div>
                <div className="space-y-1">
                  {models
                    .filter((m) =>
                      MODEL_CATEGORIES.image.some((cat) =>
                        m.id.toLowerCase().includes(cat)
                      )
                    )
                    .map((model) => (
                      <ModelOption
                        key={model.id}
                        model={model}
                        isSelected={selectedModel?.id === model.id}
                        onSelect={() => handleModelSelect(model)}
                      />
                    ))}
                </div>
              </div>

              {/* Video Models */}
              <div className="border-t border-border pt-2">
                <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Video Models
                </div>
                <div className="space-y-1">
                  {models
                    .filter((m) =>
                      MODEL_CATEGORIES.video.some((cat) =>
                        m.id.toLowerCase().includes(cat)
                      )
                    )
                    .map((model) => (
                      <ModelOption
                        key={model.id}
                        model={model}
                        isSelected={selectedModel?.id === model.id}
                        onSelect={() => handleModelSelect(model)}
                      />
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ModelOptionProps {
  model: Model;
  isSelected: boolean;
  onSelect: () => void;
}

function ModelOption({ model, isSelected, onSelect }: ModelOptionProps) {
  return (
    <motion.button
      onClick={onSelect}
      className={`w-full px-3 py-2 rounded-lg text-left transition-all ${
        isSelected
          ? "bg-purple-600 text-white"
          : "hover:bg-accent text-foreground"
      }`}
      whileHover={{ x: 4 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{model.name}</div>
          <div className="text-xs opacity-70 mt-0.5">
            {model.provider} • ${model.cost / 100}
          </div>
          {model.description && (
            <div className="text-xs opacity-60 mt-1">{model.description}</div>
          )}
        </div>

        {/* Model Stats */}
        <div className="flex gap-3 flex-shrink-0">
          <div className="text-right">
            <div className="text-xs font-semibold text-yellow-400">
              ⚡ {model.speed}
            </div>
            <div className="text-xs opacity-70">Speed</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-blue-400">
              ✨ {model.quality}
            </div>
            <div className="text-xs opacity-70">Quality</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-semibold text-purple-400">
              ⚙️ {model.complexity}
            </div>
            <div className="text-xs opacity-70">Complexity</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

export default ModelSelector;
