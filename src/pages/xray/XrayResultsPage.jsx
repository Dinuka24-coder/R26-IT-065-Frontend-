import { AlertTriangle, CheckCircle, Download, FileImage } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import ConfBar from "../../components/ui/ConfBar";
import PageHeader from "../../components/ui/PageHeader";
import { C, XRAY_DISEASES, XRAY_RESULTS_MOCK } from "../../data/mockData";
import { fmtConf } from "../../utils/helpers";

export default function XrayResultsPage({ navigate, disease }) {
  const r = XRAY_RESULTS_MOCK[disease] || XRAY_RESULTS_MOCK.pneumonia;
  const isPos = r.status === "Positive";

  return (
    <div className="page-enter">
      <PageHeader
        title="X-ray Analysis Results"
        subtitle="AI-generated diagnostic preview"
        onBack={() => navigate("xray-upload", disease)}
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Download size={14} /> Download PDF
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate("history")}>
              Save to History
            </Button>
          </>
        }
      />

      <div className="results-layout">
        <div className="results-left">
          <div className="card result-card" style={{ borderLeft: `4px solid ${isPos ? C.danger : C.success}` }}>
            <div className="result-card-head">
              <span>Primary Diagnosis</span>
              <Badge status={r.status} />
            </div>
            <div className="diagnosis-title" style={{ color: isPos ? C.danger : C.success }}>
              {r.prediction}
            </div>
            <div className="diagnosis-sub">Confidence: <strong>{fmtConf(r.confidence)}</strong></div>
          </div>

          {r.multi && (
            <div className="card padded">
              <div className="section-small-title">Full Screening Results</div>
              {r.multi.map((m) => (
                <div key={m.disease} className="result-breakdown">
                  <div className="breakdown-top">
                    <span>{m.disease}</span>
                    <Badge status={m.status} />
                  </div>
                  <ConfBar prob={m.confidence} color={m.status === "Positive" ? C.danger : C.success} />
                </div>
              ))}
            </div>
          )}

          <div className="card padded">
            <div className="section-small-title">Scan Information</div>
            {[
              { l: "Analysis Type", v: XRAY_DISEASES.find((d) => d.id === disease)?.label || disease },
              { l: "Model Used", v: disease === "full" ? "Multi-Model Demo Pipeline" : "MobileNetV2 Demo" },
              { l: "Processed At", v: new Date().toLocaleTimeString() },
              { l: "Image Quality", v: "Good" },
            ].map((i) => (
              <div key={i.l} className="config-row">
                <span>{i.l}</span>
                <strong>{i.v}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="results-right">
          <div className="card padded">
            <div className="section-small-title">Uploaded X-ray</div>
            <div className="scan-placeholder">
              <FileImage size={48} color="#374151" />
            </div>
            <div className="file-caption">chest_xray_sample.jpg</div>
          </div>

          <div className="card padded">
            <div className="section-small-title">XAI Preview</div>
            <div className="heatmap-preview">
              <div className="heatmap-circle" />
              <span>{r.heatmapLabel || "Highlighted model attention region"}</span>
            </div>
          </div>

          {isPos ? (
            <div className="clinical-alert danger-alert">
              <div className="alert-title">
                <AlertTriangle size={16} color={C.danger} />
                Clinical Alert
              </div>
              <p>
                AI model indicates a high probability of <strong>{r.prediction}</strong>. Please review before clinical action.
              </p>
            </div>
          ) : (
            <div className="clinical-alert success-alert">
              <div className="alert-title">
                <CheckCircle size={16} color={C.success} />
                No Abnormality Detected
              </div>
              <p>The model found no significant pulmonary abnormality in this demo result.</p>
            </div>
          )}

          <Button variant="secondary" style={{ width: "100%", justifyContent: "center" }}>
            <Download size={15} /> Download Full Report
          </Button>
        </div>
      </div>
    </div>
  );
}
