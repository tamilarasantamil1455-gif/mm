/**
 * Upload a File object to the backend server or convert to base64 as fallback.
 * @param {File} file - Browser File object
 * @param {string} folder - Destination folder: 'colour-grading' | 'video' | 'websites' | 'poster'
 * @returns {Promise<{ url: string, name: string, size: number, type: string }>}
 */
export async function uploadFile(file, folder = 'misc') {
  if (!file) throw new Error('No file provided');

  // Try server upload first
  try {
    const query = new URLSearchParams({
      folder,
      filename: file.name,
    });

    const res = await fetch(`/api/upload?${query.toString()}`, {
      method: 'POST',
      body: file,
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.url) {
        return {
          url: data.url,
          name: file.name,
          size: file.size,
          type: file.type,
        };
      }
    }
  } catch (err) {
    console.warn('Server upload failed, falling back to client data URL:', err);
  }

  // Fallback: Read as base64 Data URL
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        url: reader.result,
        name: file.name,
        size: file.size,
        type: file.type,
      });
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
}

/**
 * Format bytes into human-readable string (e.g. 1.2 MB)
 */
export function formatBytes(bytes, decimals = 1) {
  if (!+bytes) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
