interface BadgeProps {
  children: React.ReactNode;
  variant: 'success' | 'danger' | 'warning' | 'info';
}

const variants = {
  success: 'bg-green-100 text-green-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-yellow-100 text-yellow-800',
  info: 'bg-blue-100 text-blue-800',
};

export function Badge({ children, variant }: BadgeProps) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
}
