'use client';

import { ReactNode } from 'react';

export interface TooltipData {
  x: number;
  y: number;
  visible: boolean;
  label: string;
  description?: string;
  color?: string;
  children?: ReactNode;
  pinned?: boolean;
}

interface TooltipOverlayProps {
  tooltips: Map<string, TooltipData>;
  onClose?: (label: string) => void;
}

export default function TooltipOverlay({ tooltips, onClose }: TooltipOverlayProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from(tooltips.values()).map((tooltip) => {
        if (!tooltip.visible) return null;

        const adjustedX = Math.min(
          Math.max(tooltip.x, 20),
          typeof window !== 'undefined' ? window.innerWidth - 220 : tooltip.x
        );
        const adjustedY = Math.min(
          Math.max(tooltip.y, 20),
          typeof window !== 'undefined' ? window.innerHeight - 120 : tooltip.y
        );

        return (
          <div
            key={tooltip.label}
            className={`absolute ${tooltip.pinned ? '' : 'transition-all duration-200 ease-out'}`}
            style={{
              left: `${adjustedX}px`,
              top: `${adjustedY}px`,
              transform: 'translate(-50%, -120%)',
            }}
          >
            <div
              className="bg-gray-900/95 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-2xl border-2 min-w-[180px] pointer-events-auto"
              style={{
                borderColor: tooltip.color || '#10b981',
                boxShadow: `0 0 20px ${tooltip.color || '#10b981'}40, 0 10px 40px rgba(0,0,0,0.5)`,
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full animate-pulse"
                  style={{
                    backgroundColor: tooltip.color || '#10b981',
                    boxShadow: `0 0 10px ${tooltip.color || '#10b981'}`,
                  }}
                />
                <h3 className="font-bold text-sm flex-1">{tooltip.label}</h3>
                {tooltip.pinned && onClose && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose(tooltip.label);
                    }}
                    className="text-gray-400 hover:text-white transition-colors w-5 h-5 flex items-center justify-center rounded hover:bg-gray-700/50"
                    aria-label="Zamknij tooltip"
                  >
                    ✕
                  </button>
                )}
              </div>

              {tooltip.description && (
                <p className="text-xs text-gray-300 mb-2">{tooltip.description}</p>
              )}

              {tooltip.children && (
                <div className="text-xs text-gray-400 border-t border-gray-700 pt-2 mt-2">
                  {tooltip.children}
                </div>
              )}

              <div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '8px solid transparent',
                  borderRight: '8px solid transparent',
                  borderTop: `8px solid ${tooltip.color || '#10b981'}`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
