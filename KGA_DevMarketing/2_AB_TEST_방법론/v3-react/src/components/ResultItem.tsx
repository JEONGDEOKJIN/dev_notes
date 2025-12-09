interface ResultItemProps {
  label: string;
  value: string | number;
  highlight?: boolean;
  success?: boolean;
  danger?: boolean;
}

export function ResultItem({ label, value, highlight, success, danger }: ResultItemProps) {
  let valueClass = 'text-gray-800';
  if (highlight) valueClass = 'text-blue-600 font-bold';
  if (success) valueClass = 'text-green-600 font-bold';
  if (danger) valueClass = 'text-red-600 font-bold';

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600">{label}</span>
      <span className={valueClass}>{value}</span>
    </div>
  );
}
