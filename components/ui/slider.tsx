import * as React from "react";
import { cn } from "../../lib/utils";

export interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChangeValue?: (value: number) => void;
  showValue?: boolean;
  valueLabel?: string;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ className, onChangeValue, onChange, showValue = false, valueLabel, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeValue?.(parseFloat(e.target.value));
      onChange?.(e);
    };

    return (
      <div className={cn("flex items-center gap-2", className)}>
        {showValue && (
          <span className="text-xs text-slate-300 font-mono w-8 text-right">
            {props.value}
            {valueLabel}
          </span>
        )}
        <input
          type="range"
          className={cn("flex-1", "range-slider")}
          onChange={handleChange}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Slider.displayName = "Slider";

export { Slider };
