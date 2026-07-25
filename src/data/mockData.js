import {
  AlertTriangle,
  Zap,
  Target,
  Scan,
} from "lucide-react";

export const C = {
  sidebar: "#09142A",
  sidebarBorder: "rgba(255,255,255,0.06)",
  sidebarHover: "rgba(255,255,255,0.06)",
  sidebarActive: "rgba(37,99,235,0.18)",
  sidebarActiveBar: "#3B82F6",
  sidebarText: "#94A3B8",
  sidebarActiveText: "#F1F5F9",
  primary: "#2563EB",
  primaryDark: "#1D4ED8",
  primaryLight: "#EFF6FF",
  bg: "#F0F4F8",
  card: "#FFFFFF",
  success: "#16A34A",
  successBg: "#DCFCE7",
  successBorder: "#BBF7D0",
  warning: "#D97706",
  warningBg: "#FEF3C7",
  warningBorder: "#FDE68A",
  danger: "#DC2626",
  dangerBg: "#FEF2F2",
  dangerBorder: "#FECACA",
  purple: "#7C3AED",
  purpleBg: "#F5F3FF",
  text: "#0F172A",
  textSub: "#475569",
  textMuted: "#94A3B8",
  border: "#E2E8F0",
  borderLight: "#F1F5F9",
};

export const USERS = [
  { email: "doctor@pulmoai.lk", password: "doctor123", name: "Dr. Anura Wijesekara", role: "Doctor" },
  { email: "admin@pulmoai.lk", password: "admin123", name: "Admin User", role: "Admin" },
];

export const PATIENTS = [
  { id: "PT001", name: "James Morrison", age: 58, gender: "Male", phone: "071-234-5678", address: "45 Lake Ave, Colombo", lastScan: "2025-05-01", status: "Active", notes: "Persistent cough and chest discomfort." },
  { id: "PT002", name: "Sarah Chen", age: 42, gender: "Female", phone: "077-876-5432", address: "12 Park Rd, Galle", lastScan: "2025-05-03", status: "Active", notes: "Follow-up CT scan requested." },
  { id: "PT003", name: "Ravi Peiris", age: 65, gender: "Male", phone: "076-543-2109", address: "78 Kandy Rd, Kandy", lastScan: "2025-04-28", status: "Active", notes: "History of smoking." },
  { id: "PT004", name: "Amara Silva", age: 50, gender: "Female", phone: "070-111-2222", address: "33 Hill St, Matara", lastScan: "2025-05-05", status: "Active", notes: "Suspected TB screening." },
  { id: "PT005", name: "Dinesh Bandara", age: 71, gender: "Male", phone: "075-333-4444", address: "22 Sea Ln, Negombo", lastScan: "2025-04-20", status: "Active", notes: "Routine CT follow-up." },
  { id: "PT006", name: "Nimal Fernando", age: 63, gender: "Male", phone: "072-555-0123", address: "90 Main St, Kurunegala", lastScan: "2025-05-06", status: "Active", notes: "Shortness of breath." },
];

export const PREDICTIONS = [
  { id: "PR001", patient: "James Morrison", scanType: "X-ray", disease: "Pneumonia", confidence: 0.89, date: "2025-05-08", status: "Positive" },
  { id: "PR002", patient: "Sarah Chen", scanType: "CT Scan", disease: "Adenocarcinoma", confidence: 0.76, date: "2025-05-07", status: "Positive" },
  { id: "PR003", patient: "Ravi Peiris", scanType: "X-ray", disease: "Normal", confidence: 0.94, date: "2025-05-06", status: "Normal" },
  { id: "PR004", patient: "Amara Silva", scanType: "X-ray", disease: "Tuberculosis", confidence: 0.82, date: "2025-05-05", status: "Positive" },
  { id: "PR005", patient: "Dinesh Bandara", scanType: "CT Scan", disease: "Normal", confidence: 0.91, date: "2025-05-04", status: "Normal" },
  { id: "PR006", patient: "James Morrison", scanType: "X-ray", disease: "Pneumothorax", confidence: 0.68, date: "2025-05-03", status: "Positive" },
  { id: "PR007", patient: "Sarah Chen", scanType: "X-ray", disease: "Normal", confidence: 0.88, date: "2025-05-02", status: "Normal" },
  { id: "PR008", patient: "Nimal Fernando", scanType: "CT Scan", disease: "Squamous Cell Carcinoma", confidence: 0.72, date: "2025-04-30", status: "Positive" },
];

export const REPORTS = [
  { id: "RP001", patient: "James Morrison", type: "Pneumonia Analysis", date: "2025-05-08", doctor: "Dr. Anura W.", pages: 4 },
  { id: "RP002", patient: "Sarah Chen", type: "Lung Cancer - CT", date: "2025-05-07", doctor: "Dr. Priya F.", pages: 6 },
  { id: "RP003", patient: "Amara Silva", type: "Tuberculosis Screen", date: "2025-05-05", doctor: "Dr. Anura W.", pages: 5 },
  { id: "RP004", patient: "Ravi Peiris", type: "Full X-ray Screening", date: "2025-05-06", doctor: "Dr. Priya F.", pages: 8 },
];

export const DOCTORS = [
  { id: "DR001", name: "Dr. Anura Wijesekara", specialty: "Pulmonologist", email: "a.wijesekara@pulmoai.lk", role: "Doctor", status: "Active", lastLogin: "2025-05-08" },
  { id: "DR002", name: "Dr. Priya Fernandez", specialty: "Pulmonologist", email: "p.fernandez@pulmoai.lk", role: "Doctor", status: "Active", lastLogin: "2025-05-07" },
  { id: "DR003", name: "Dr. Kasun Perera", specialty: "Thoracic Specialist", email: "k.perera@pulmoai.lk", role: "Doctor", status: "Inactive", lastLogin: "2025-04-30" },
  { id: "ADM01", name: "Admin User", specialty: "System Admin", email: "admin@pulmoai.lk", role: "Admin", status: "Active", lastLogin: "2025-05-08" },
];

export const WEEKLY = [
  { day: "Mon", xray: 12, ct: 4 },
  { day: "Tue", xray: 18, ct: 7 },
  { day: "Wed", xray: 15, ct: 5 },
  { day: "Thu", xray: 22, ct: 9 },
  { day: "Fri", xray: 19, ct: 6 },
  { day: "Sat", xray: 8, ct: 3 },
  { day: "Sun", xray: 5, ct: 2 },
];

export const DISEASE_PIE = [
  { name: "Pneumonia", value: 38, color: "#3B82F6" },
  { name: "Pneumothorax", value: 22, color: "#EF4444" },
  { name: "Tuberculosis", value: 18, color: "#F59E0B" },
  { name: "Lung Cancer", value: 14, color: "#8B5CF6" },
  { name: "Normal", value: 8, color: "#10B981" },
];

export const CT_PROBS = [
  { name: "Adenocarcinoma", prob: 0.76, color: C.danger },
  { name: "Large Cell Carcinoma", prob: 0.12, color: C.warning },
  { name: "Squamous Cell Carcinoma", prob: 0.08, color: C.purple },
  { name: "Normal", prob: 0.04, color: C.success },
];

export const XRAY_DISEASES = [
  { id: "pneumothorax", label: "Pneumothorax", desc: "Detect collapsed lung / air in pleural space", Icon: AlertTriangle, color: C.danger, bg: C.dangerBg },
  { id: "pneumonia", label: "Pneumonia", desc: "Identify bacterial or viral lung infection", Icon: Zap, color: C.warning, bg: C.warningBg },
  { id: "tuberculosis", label: "Tuberculosis", desc: "Screen for Mycobacterium tuberculosis", Icon: Target, color: C.purple, bg: C.purpleBg },
  { id: "full", label: "Full Screening", desc: "Run all three X-ray models together", Icon: Scan, color: C.primary, bg: C.primaryLight },
];

export const XRAY_RESULTS_MOCK = {
  pneumothorax: { prediction: "Pneumothorax", confidence: 0.84, status: "Positive", heatmapLabel: "Pleural air region highlighted" },
  pneumonia: { prediction: "Pneumonia", confidence: 0.89, status: "Positive", severity: "Moderate", heatmapLabel: "Affected lung opacity region" },
  tuberculosis: { prediction: "Normal", confidence: 0.93, status: "Normal", lungImpact: 0.12, heatmapLabel: "No significant TB lesion focus" },
  full: {
    prediction: "Pneumonia",
    confidence: 0.87,
    status: "Positive",
    multi: [
      { disease: "Pneumothorax", confidence: 0.09, status: "Normal" },
      { disease: "Pneumonia", confidence: 0.87, status: "Positive" },
      { disease: "Tuberculosis", confidence: 0.04, status: "Normal" },
    ],
  },
};

export const LOG_ENTRIES = [
  { time: "09:42:11", level: "INFO", msg: "Model comp1 inference completed — 142ms" },
  { time: "09:41:55", level: "INFO", msg: "User dr.anura logged in from 192.168.1.4" },
  { time: "09:38:20", level: "WARN", msg: "High memory usage detected on CT model — 78%" },
  { time: "09:35:05", level: "INFO", msg: "CT scan inference completed — 218ms" },
  { time: "09:30:00", level: "INFO", msg: "Database backup completed successfully" },
  { time: "09:12:44", level: "ERROR", msg: "Timeout on scan upload — retried successfully" },
];
