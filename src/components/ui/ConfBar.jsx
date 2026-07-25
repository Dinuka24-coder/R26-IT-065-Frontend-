import { useEffect, useState } from "react";
import { C } from "../../data/mockData";
import { fmtConf } from "../../utils/helpers";

export default function ConfBar({ prob, color = C.primary }) {
  const [w, setW] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setW(prob * 100), 80);
    return () => clearTimeout(t);
  }, [prob]);

  return (
    <div className="conf-row">
      <div className="conf-track">
        <div className="conf-bar-inner" style={{ width: `${w}%`, background: color }} />
      </div>
      <span className="conf-text">{fmtConf(prob)}</span>
    </div>
  );
}
