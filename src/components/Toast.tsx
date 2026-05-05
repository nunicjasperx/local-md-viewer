import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import type { ToastItem } from '../hooks/useToast';

interface Props {
  toasts: ToastItem[];
  onRemove: (id: number) => void;
}

const icons = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
};

const colors = {
  success: { bg: 'rgba(5, 46, 22, 0.9)', border: 'rgba(34, 197, 94, 0.3)', icon: '#22c55e' },
  error: { bg: 'rgba(69, 10, 10, 0.9)', border: 'rgba(239, 68, 68, 0.3)', icon: '#ef4444' },
  info: { bg: 'rgba(23, 37, 84, 0.9)', border: 'rgba(59, 130, 246, 0.3)', icon: '#3b82f6' },
};

export default function Toast({ toasts, onRemove }: Props) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container fixed top-20 right-4 z-[100] flex flex-col gap-2" style={{ maxWidth: 360 }}>
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        const c = colors[toast.type];
        return (
          <div
            key={toast.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl"
            style={{
              background: c.bg,
              border: `1px solid ${c.border}`,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              animation: 'toastIn 200ms ease-out',
            }}
          >
            <Icon size={16} color={c.icon} className="flex-shrink-0" />
            <span className="text-sm flex-1" style={{ color: '#e4e4e7' }}>{toast.message}</span>
            <button
              onClick={() => onRemove(toast.id)}
              className="flex-shrink-0 cursor-pointer"
              style={{ color: '#52525b', transition: 'color 160ms ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#a1a1aa'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#52525b'; }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
