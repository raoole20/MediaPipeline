"use server";

/**
 *
 * @param file Realmente es un file? o un blob? buena pregunta
 */
export async function uploadFile(file: File) {
  const endpoint = new URL("/api/upload", process.env.API_URL || "");

  try {
    const response = await fetch(endpoint.toString(), {
      method: "POST",
      body: file,
    });

    const result = await response.json();

    return {
        success: response.ok,
        message: result.message || (response.ok ? "Upload successful" : "Upload failed"),
        data: result.data || null,
    }
  } catch (error) {
    return {
        success: false,
        message: "Network error",
        data: null,
    }
  }
}
