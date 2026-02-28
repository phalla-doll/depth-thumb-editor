'use client';

interface SafeZonesOverlayProps {
  canvasWidth: number;
  canvasHeight: number;
}

export function SafeZonesOverlay({ canvasWidth, canvasHeight }: SafeZonesOverlayProps) {
  const safeZoneMargin = Math.min(canvasWidth, canvasHeight) * 0.05;
  const thirdWidth = canvasWidth / 3;
  const thirdHeight = canvasHeight / 3;

  return (
    <svg
      className="absolute inset-0 pointer-events-none w-full h-full"
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      xmlns="http://www.w3.org/2000/svg"
      data-export-exclude="true"
    >
      <title>Canvas Safe Zones Overlay</title>
      <defs>
        <pattern id="grid" width="canvasWidth" height="canvasHeight" patternUnits="userSpaceOnUse">
          <rect width="canvasWidth" height="canvasHeight" fill="transparent" />
        </pattern>
      </defs>

      {[]}

      <g>
        <rect
          x={safeZoneMargin}
          y={safeZoneMargin}
          width={canvasWidth - safeZoneMargin * 2}
          height={canvasHeight - safeZoneMargin * 2}
          fill="none"
          stroke="rgba(249, 115, 22, 0.6)"
          strokeWidth={2}
          strokeDasharray="8 4"
        />
        <text
          x={safeZoneMargin + 4}
          y={safeZoneMargin - 4}
          fill="rgba(249, 115, 22, 0.8)"
          fontSize="12"
          fontWeight="600"
        >
          Safe Zone
        </text>
      </g>

      <g>
        <line
          x1={thirdWidth}
          y1={0}
          x2={thirdWidth}
          y2={canvasHeight}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={1}
        />
        <line
          x1={thirdWidth * 2}
          y1={0}
          x2={thirdWidth * 2}
          y2={canvasHeight}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={1}
        />
        <line
          x1={0}
          y1={thirdHeight}
          x2={canvasWidth}
          y2={thirdHeight}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={1}
        />
        <line
          x1={0}
          y1={thirdHeight * 2}
          x2={canvasWidth}
          y2={thirdHeight * 2}
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth={1}
        />
      </g>

      <g>
        <line
          x1={canvasWidth / 2}
          y1={0}
          x2={canvasWidth / 2}
          y2={canvasHeight}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth={1.5}
        />
        <line
          x1={0}
          y1={canvasHeight / 2}
          x2={canvasWidth}
          y2={canvasHeight / 2}
          stroke="rgba(255, 255, 255, 0.5)"
          strokeWidth={1.5}
        />
        <circle
          cx={canvasWidth / 2}
          cy={canvasHeight / 2}
          r={6}
          fill="rgba(249, 115, 22, 0.8)"
          stroke="rgba(0, 0, 0, 0.5)"
          strokeWidth={1}
        />
      </g>
    </svg>
  );
}
