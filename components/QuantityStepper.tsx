"use client";

interface QuantityStepperProps {
  id: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

/** Selector de quantitat amb botons +/− i entrada numèrica directa. */
export function QuantityStepper({ id, value, onChange, min = 1, max = 20 }: QuantityStepperProps) {
  return (
    <div className="quantitat-control">
      <button
        type="button"
        aria-label="Reduir la quantitat"
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <input
        type="number"
        id={id}
        min={min}
        max={max}
        value={value}
        onChange={(event) => {
          const valor = parseInt(event.target.value, 10);
          onChange(Number.isNaN(valor) ? min : Math.min(max, Math.max(min, valor)));
        }}
      />
      <button
        type="button"
        aria-label="Augmentar la quantitat"
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        +
      </button>
    </div>
  );
}
