interface CardProps {
  title: string;
  icon?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, icon, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 ${className}`}>
      <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title}
      </h2>
      {children}
    </div>
  );
}
