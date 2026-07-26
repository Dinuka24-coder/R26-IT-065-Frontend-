import { AlertTriangle, Download, Scan, CheckCircle } from "lucide-react";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import PageHeader from "../../components/ui/PageHeader";
import { C } from "../../data/mockData";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function CTScanResultsPage({ navigate }) {
    const storedResult = localStorage.getItem("ct_result");
    const fileName = localStorage.getItem("ct_file_name") || "Uploaded CT image";
    const preview = localStorage.getItem("ct_preview");

    const result = storedResult ? JSON.parse(storedResult) : null;

    if (!result) {
        return (
            <div className="page-enter">
                <PageHeader
                    title="CT Scan — Lung Cancer Classification"
                    subtitle="No prediction result found"
                    onBack={() => navigate("ct-upload")}
                />

                <div className="card padded">
                    <p>Please upload a CT image first.</p>

                    <Button variant="primary" onClick={() => navigate("ct-upload")}>
                        Go to Upload
                    </Button>
                </div>
            </div>
        );
    }

    const prediction = result.prediction;
    const confidence = result.confidence;
    const isNormal = prediction === "normal";

    const heatmapUrl =
        !isNormal && result.heatmap_url
            ? `${API_BASE_URL}${result.heatmap_url}`
            : null;

    const displayNameMap = {
        adenocarcinoma: "Adenocarcinoma",
        "large.cell.carcinoma": "Large Cell Carcinoma",
        normal: "Normal",
        "squamous.cell.carcinoma": "Squamous Cell Carcinoma",
    };

    const displayPrediction = displayNameMap[prediction] || prediction;
    const resultColor = isNormal ? C.success : C.danger;

    return (
        <div className="page-enter">
            <PageHeader
                title="CT Scan — Lung Cancer Classification"
                subtitle="Real Component 4 backend prediction result"
                onBack={() => navigate("ct-upload")}
                actions={
                    <>
                        <Button variant="secondary" size="sm">
                            <Download size={14} /> Download PDF
                        </Button>

                        <Button variant="primary" size="sm" onClick={() => navigate("history")}>
                            Save
                        </Button>
                    </>
                }
            />

            <div className="results-layout">
                <div className="results-left">
                    <div
                        className="card result-card"
                        style={{
                            borderLeft: `4px solid ${resultColor}`,
                        }}
                    >
                        <div className="result-card-head">
                            <span>Classification Result</span>
                            <Badge status={isNormal ? "Normal" : "Positive"} />
                        </div>

                        <div
                            className="diagnosis-title"
                            style={{
                                color: resultColor,
                            }}
                        >
                            {displayPrediction}
                        </div>

                        <div className="diagnosis-sub">
                            Confidence: <strong>{confidence}%</strong>
                        </div>
                    </div>

                    {!isNormal && (
                        <div className="clinical-alert danger-alert">
                            <div className="alert-title">
                                <AlertTriangle size={16} color={C.danger} />
                                Oncology Review Recommended
                            </div>

                            <p>
                                The model detected <strong>{displayPrediction}</strong> with{" "}
                                <strong>{confidence}%</strong> confidence. Doctor review is required
                                before any clinical decision.
                            </p>
                        </div>
                    )}

                    {isNormal && (
                        <div className="clinical-alert">
                            <div className="alert-title">
                                <CheckCircle size={16} color={C.success} />
                                Normal CT Classification
                            </div>

                            <p>
                                The uploaded CT image was classified as <strong>Normal</strong>{" "}
                                with <strong>{confidence}%</strong> confidence.
                            </p>
                        </div>
                    )}

                    {!isNormal && heatmapUrl && (
                        <div className="card padded">
                            <div className="section-small-title">
                                Grad-CAM Tumor Localization
                            </div>

                            <div className="scan-placeholder">
                                <img
                                    src={heatmapUrl}
                                    alt="Grad-CAM localization heatmap"
                                    className="scan-preview"
                                />
                            </div>

                            <div className="file-caption">
                                Highlighted suspicious regions based on model attention
                            </div>
                        </div>
                    )}

                    {isNormal && (
                        <div className="card padded">
                            <div className="section-small-title">
                                Localization Result
                            </div>

                            <div className="clinical-alert">
                                <div className="alert-title">
                                    <CheckCircle size={16} color={C.success} />
                                    No Suspicious Tumor Localization Detected
                                </div>

                                <p>
                                    Since the scan was classified as <strong>Normal</strong>, no
                                    tumor localization heatmap is displayed.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="results-right">
                    <div className="card padded">
                        <div className="section-small-title">
                            CT Scan Image
                        </div>

                        <div className="scan-placeholder">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Uploaded CT scan"
                                    className="scan-preview"
                                />
                            ) : (
                                <Scan size={48} color="#374151" />
                            )}
                        </div>

                        <div className="file-caption">
                            {fileName}
                        </div>
                    </div>

                    <div className="card padded">
                        <div className="section-small-title">
                            Model Details
                        </div>

                        {[
                            {
                                l: "Component",
                                v: result.component || "CT-Based Lung Cancer Classification",
                            },
                            {
                                l: "Model",
                                v: "DenseNet121 + Custom CNN Dual-Path",
                            },
                            {
                                l: "Classes",
                                v: "4 Lung Cancer Classes",
                            },
                            {
                                l: "Output",
                                v: isNormal
                                    ? "Subtype + Confidence"
                                    : "Subtype + Confidence + Grad-CAM",
                            },
                            {
                                l: "Patient ID",
                                v: result.patient_id || "N/A",
                            },
                            {
                                l: "Result ID",
                                v: result.result_id || "N/A",
                            },
                            {
                                l: "Processed",
                                v: result.created_at
                                    ? new Date(result.created_at).toLocaleString()
                                    : new Date().toLocaleString(),
                            },
                        ].map((i) => (
                            <div key={i.l} className="config-row">
                                <span>{i.l}</span>
                                <strong>{i.v}</strong>
                            </div>
                        ))}
                    </div>

                    <Button
                        variant="secondary"
                        style={{
                            width: "100%",
                            justifyContent: "center",
                        }}
                    >
                        <Download size={15} /> Download Oncology Report
                    </Button>
                </div>
            </div>
        </div>
    );
}