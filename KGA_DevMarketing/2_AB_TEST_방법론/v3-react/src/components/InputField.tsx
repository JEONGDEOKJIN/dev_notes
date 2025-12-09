interface InputFieldProps {
  label: string;
  value: number | string;
  onChange: (value: number) => void;
  type?: 'number' | 'text';
  step?: string;
  min?: number;
  max?: number;
  suffix?: string;
  hint?: string;
}

export function InputField({
  label,
  value,
  onChange,
  type = 'number',
  step,
  min,
  max,
  suffix,
  hint
}: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          step={step}
          min={min}
          max={max}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p className="text-xs text-gray-500 mt-1">{hint}</p>
      )}
    </div>
  );
}
