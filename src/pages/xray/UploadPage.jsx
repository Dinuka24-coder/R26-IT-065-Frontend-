import { CheckCircle, Loader, Upload, X, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { predictLungCancer } from "../../api/component4Api.js";
import Button from "../../components/ui/Button.jsx";
import PageHeader from "../../components/ui/PageHeader.jsx";
import { C, PATIENTS, XRAY_DISEASES } from "../../data/mockData.js";
import { sleep } from "../../utils/helpers.js";

export default function UploadPage({ navigate, disease, mode = "xray" }) {
  const [img, setImg] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [drag, setDrag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patient, setPatient] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const isCT = mode === "ct";
  const label = isCT
    ? "Lung Cancer Classification"
    : XRAY_DISEASES.find((d) => d.id === disease)?.label || disease;

  function resetFile() {
    setImg(null);
    setSelectedFile(null);
    setFileName("");
  }

  function onFile(file) {
    setError("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    setSelectedFile(file);
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (ev) => {
      setImg(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function handleAnalyze() {
    if (!patient) {
      setError("Please select a patient before analysis.");
      return;
    }

    if (!selectedFile) {
      setError("Please upload a scan image.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (isCT) {
        const result = await predictLungCancer(patient, selectedFile);

        localStorage.setItem("ct_result", JSON.stringify(result));
        localStorage.setItem("ct_file_name", selectedFile.name);
        localStorage.setItem("ct_preview", img || "");

        navigate("ct-results");
        return;
      }

      await sleep(2200);
      navigate("xray-results", disease);
    } catch (err) {
      setError(err.message || "Prediction failed. Please check the backend server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-enter">
      <PageHeader
        title={isCT ? "CT Scan — Upload" : "X-ray Analysis — Upload"}
        subtitle={isCT ? "Upload a lung CT scan image for cancer classification" : "Upload the patient's chest X-ray image for AI analysis"}
        onBack={() => navigate(isCT ? "dashboard" : "xray-options")}
      />

      <div className="upload-layout">
        <div className="upload-left">
          <div className="card padded">
            <label className="form-label select-label">Select Patient</label>
            <select className="form-select full" value={patient} onChange={(e) => setPatient(e.target.value)}>
              <option value="">— Choose patient —</option>
              {PATIENTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id})
                </option>
              ))}
            </select>
          </div>

          <div className="card padded">
            <div className="section-small-title">Upload Image</div>

            <div
              className={`upload-zone${drag ? " drag" : ""}`}
              onDragOver={(e) => {
                e.preventDefault();
                setDrag(true);
              }}
              onDragLeave={() => setDrag(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDrag(false);
                onFile(e.dataTransfer.files[0]);
              }}
              onClick={() => inputRef.current?.click()}
            >
              {!img ? (
                <>
                  <Upload size={34} color="#94A3B8" />
                  <div className="upload-title">Drop scan image here</div>
                  <div className="upload-subtitle">PNG, JPG, JPEG accepted</div>
                  <span className="btn btn-secondary btn-sm browse-btn">Browse Files</span>
                </>
              ) : (
                <div className="preview-wrap">
                  <img src={img} alt="Preview" className="scan-preview" />
                  <button
                    className="preview-remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      resetFile();
                    }}
                  >
                    <X size={14} color="white" />
                  </button>
                </div>
              )}
            </div>

            <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files[0])} />
          </div>
        </div>

        <div className="upload-right">
          <div className="card padded">
            <div className="section-small-title">Analysis Config</div>

            <div className="config-list">
              {[
                { label: "Analysis Type", value: label },
                { label: "Model", value: disease === "full" ? "Multi-Model Screening" : isCT ? "DenseNet121 + Custom-CNN" : "MobileNetV2 Demo" },
                { label: "Output", value: isCT ? "Subtype + Grad-CAM" : "Prediction + Confidence + XAI Preview" },
                { label: "Patient", value: patient || "Not selected" },
              ].map((r) => (
                <div key={r.label} className="config-row">
                  <span>{r.label}</span>
                  <strong>{r.value}</strong>
                </div>
              ))}
            </div>
          </div>

          {error && <div className="error-box">{error}</div>}

          {img && !loading && (
            <div className="ready-box">
              <CheckCircle size={16} color={C.success} />
              <span>Image loaded — ready to analyze {fileName && `(${fileName})`}</span>
            </div>
          )}

          <Button
            variant="primary"
            onClick={handleAnalyze}
            disabled={loading}
            style={{ width: "100%", justifyContent: "center", padding: "13px 18px", fontSize: 15, fontWeight: 600 }}
          >
            {loading ? (
              <>
                <Loader size={17} className="spin" /> Analyzing…
              </>
            ) : (
              <>
                <Zap size={17} /> Run AI Analysis
              </>
            )}
          </Button>

          {loading && (
            <div className="card padded">
              <div className="section-small-title">Processing…</div>
              {[
                "Uploading image to backend",
                "Preprocessing CT image",
                "Running Component 4 inference",
                "Saving result to MongoDB",
              ].map((s) => (
                <div key={s} className="process-row">
                  <Loader size={13} color={C.primary} className="spin" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
