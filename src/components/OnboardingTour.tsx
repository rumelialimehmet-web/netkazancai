import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, Check } from 'lucide-react';

interface TourStep {
  target: string; // CSS selector for the element to highlight
  title: string;
  description: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface OnboardingTourProps {
  steps: TourStep[];
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ steps, onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [currentStep]);

  const updatePosition = () => {
    const step = steps[currentStep];
    const targetElement = document.querySelector(step.target);

    if (!targetElement) return;

    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // Set highlight position
    setHighlightPosition({
      top: rect.top + scrollTop - 8,
      left: rect.left + scrollLeft - 8,
      width: rect.width + 16,
      height: rect.height + 16
    });

    // Calculate tooltip position based on step.position
    let top = 0;
    let left = 0;

    switch (step.position) {
      case 'top':
        top = rect.top + scrollTop - 200;
        left = rect.left + scrollLeft + rect.width / 2 - 200;
        break;
      case 'bottom':
        top = rect.bottom + scrollTop + 20;
        left = rect.left + scrollLeft + rect.width / 2 - 200;
        break;
      case 'left':
        top = rect.top + scrollTop;
        left = rect.left + scrollLeft - 420;
        break;
      case 'right':
        top = rect.top + scrollTop;
        left = rect.right + scrollLeft + 20;
        break;
    }

    setTooltipPosition({ top, left });

    // Scroll element into view
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-[9998]" onClick={onSkip} />

      {/* Highlight box */}
      <div
        className="fixed border-4 border-blue-500 rounded-lg pointer-events-none z-[9999] transition-all duration-300"
        style={{
          top: `${highlightPosition.top}px`,
          left: `${highlightPosition.left}px`,
          width: `${highlightPosition.width}px`,
          height: `${highlightPosition.height}px`,
          boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)'
        }}
      />

      {/* Tooltip */}
      <div
        className="fixed bg-white rounded-xl shadow-2xl p-6 z-[10000] w-96 transition-all duration-300"
        style={{
          top: `${tooltipPosition.top}px`,
          left: `${tooltipPosition.left}px`
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                Adım {currentStep + 1}/{steps.length}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
          </div>
          <button
            onClick={onSkip}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            title="Turu atla"
          >
            <X size={20} />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-6 leading-relaxed">{step.description}</p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={18} />
            Geri
          </button>

          <button
            onClick={onSkip}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Turu Atla
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
          >
            {currentStep === steps.length - 1 ? (
              <>
                Tamamla
                <Check size={18} />
              </>
            ) : (
              <>
                İleri
                <ChevronRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default OnboardingTour;
