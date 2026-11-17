export default function StatusMessage({ type = 'info', title, children }) {
  return <div className={`status-message status-${type}`} role={type === 'error' ? 'alert' : 'status'}><strong>{title}</strong>{children && <span>{children}</span>}</div>;
}

