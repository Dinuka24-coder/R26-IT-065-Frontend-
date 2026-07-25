import { ArrowLeft } from "lucide-react";
import { C } from "../../data/mockData";

export default function PageHeader({ title, subtitle, onBack, actions }) {
  return (
    <div className="page-header">
      <div className="page-title-wrap">
        {onBack && (
          <button onClick={onBack} className="btn btn-ghost btn-sm back-btn">
            <ArrowLeft size={16} />
          </button>
        )}
        <div>
          <h1 className="section-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="page-actions">{actions}</div>}
    </div>
  );
}
