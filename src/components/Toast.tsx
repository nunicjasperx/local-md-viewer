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
  success: { bg: '#052e16', border: '#22c55e', icon: '#22c55e' },
  error: { bg: '#450a0a', border: '#ef4444', icon: '#ef4444' },
  info: { bg: '#172554', border: '#3b82f6', icon: '#3b82f6' },
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
            className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg animate-slide-in"
            style={{
              background: c.bg,
              border: `1px solid ${c.border}`,
              animation: 'slideIn 0.2s ease-out',
            }}
          >
            <Icon size={16} color={c.icon} className="flex-shrink-0" />
            <span className="text-sm flex-1" style={{ color: '#e4e4e7' }}>{toast.message}</span>
            <button
              onClick={() => onRemove(toast.id)}
              className="flex-shrink-0 cursor-pointer"
              style={{ color: '#71717a' }}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
