// Default data
export const defaultColorGrading = [
  { id: 1, title: "Paddy Field Sunset", before: "/projects/colour-grading/img1.jpg", after: "/projects/colour-grading/cg_img1.jpg" },
  { id: 2, title: "Orange Rose", before: "/projects/colour-grading/img2.jpg", after: "/projects/colour-grading/cg_img2.jpg" },
  { id: 3, title: "Forest Canopy", before: "/projects/colour-grading/img3.jpg", after: "/projects/colour-grading/cg_img3.jpg" },
  { id: 4, title: "Pink Rose Garden", before: "/projects/colour-grading/img4.jpg", after: "/projects/colour-grading/cg_img4.jpg" },
];

export const defaultVideos = [
  { id: 1, title: "Creative Reel 01", url: "/projects/video/video1.MOV", tag: "Reel Edit" },
  { id: 2, title: "Video Project 02", url: "/projects/video/video2.mp4", tag: "Visual Showcase" },
  { id: 3, title: "Video Project 03", url: "/projects/video/video3.MOV", tag: "New Edit" },
];

export const defaultWebsites = [
  { id: 1, title: "FoodieHub", description: "A modern culinary concept and restaurant web application.", tech: ["React.js", "Tailwind CSS", "Framer Motion"], demo: "https://foodihup.netlify.app/", image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80", color: "#FF8C00" },
  { id: 2, title: "NovaCore Solutions", description: "A comprehensive digital agency platform providing modern web development.", tech: ["Bootstrap 5", "UI/UX", "JavaScript", "CSS3"], demo: "https://novaacoree.netlify.app/", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", color: "#FF0033" },
  { id: 3, title: "Shopiffy E-Commerce", description: "A feature-rich digital storefront featuring interactive shopping cart.", tech: ["React.js", "Tailwind CSS", "State Management"], demo: "https://shopifffyyy.netlify.app/", image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80", color: "#FF5500" },
];

export const defaultPosters = [
  { id: 1, title: "Brand Poster Design 01", url: "/projects/poster/po1.png" },
  { id: 2, title: "Brand Poster Design 02", url: "/projects/poster/po3.png" },
  { id: 3, title: "Creative Graphic Showcase", url: "/projects/poster/posters.png" },
];

const KEYS = {
  colorGrading: "nxt_colorGrading",
  videos: "nxt_videos",
  websites: "nxt_websites",
  posters: "nxt_posters",
};

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch { return fallback; }
}

function save(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)); } catch (e) { console.error(e); }
}

export function loadProjects() {
  return {
    colorGrading: load(KEYS.colorGrading, defaultColorGrading),
    videos: load(KEYS.videos, defaultVideos),
    websites: load(KEYS.websites, defaultWebsites),
    posters: load(KEYS.posters, defaultPosters),
  };
}

export function saveProjects({ colorGrading, videos, websites, posters }) {
  save(KEYS.colorGrading, colorGrading);
  save(KEYS.videos, videos);
  save(KEYS.websites, websites);
  save(KEYS.posters, posters);
}

export function resetProjects() {
  Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
}

export function nextId(arr) {
  return arr.length > 0 ? Math.max(...arr.map((x) => x.id)) + 1 : 1;
}
