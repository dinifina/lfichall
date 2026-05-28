'use server';

export async function uploadPhoto(formData) {
  const file = formData.get("uploaded_photo");

  if (!file || file.size === 0) {
    return;
  }

  const backendForm = new FormData();
  backendForm.append("uploaded_photo", file);

  const res = await fetch("http://localhost:8080/photos", {
    method: "POST",
    body: backendForm,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.Error);
  }

  return res.json();
}