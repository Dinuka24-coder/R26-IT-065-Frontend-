export default function EmptyState({ icon: Icon, title, desc }) {
  return (
    <div className="empty-state">
      <Icon size={40} color="#CBD5E1" />
      <div className="empty-title">{title}</div>
      <div className="empty-desc">{desc}</div>
    </div>
  );
}
