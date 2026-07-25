const API_BASE_URL = "http://127.0.0.1:8000";

export async function predictLungCancer(patientId, file) {
  const formData = new FormData();
  formData.append("patient_id", patientId);
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/api/v1/lung-cancer/predict`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let message = "Prediction failed";

    try {
      const errorData = await response.json();
      message = errorData.detail || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  return response.json();
}
