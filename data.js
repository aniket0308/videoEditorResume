/* ============================================================
   EDIT ONLY THIS FILE to update your website.
   Add a new project / review / job by copying one block and
   pasting it at the TOP of its list. Save, push to GitHub. Done.
   ============================================================ */
window.PORTFOLIO = {
  name: "Your Name",
  role: "Video Editor & Colorist",
  tagline: "I turn raw footage into stories people finish watching.",
  about: "Write 2-3 lines about yourself here: your editing style, the kind of clients you work with, and what makes your work different.",
  photo: "",                       // e.g. "images/me.jpg" (leave empty to hide)
  showreel: "",                    // YouTube link or "videos/reel.mp4" (leave empty to hide)
  email: "you@example.com",
  phone: "+91 00000 00000",
  location: "Surat, Gujarat, India",
  social: [
    { label: "Instagram", url: "https://instagram.com/yourname" },
    { label: "YouTube",   url: "https://youtube.com/@yourname" },
    { label: "LinkedIn",  url: "https://linkedin.com/in/yourname" }
  ],
  stats: [
    { value: "3+",   label: "Years editing" },
    { value: "120+", label: "Projects delivered" },
    { value: "40+",  label: "Happy clients" }
  ],

  /* ---------- PROJECTS ----------
     video: YouTube/Vimeo link OR local file "videos/name.mp4"
     thumbnail: "images/name.jpg" (optional)   screenshots: list of images */
  projects: [
    {
      title: "Brand Promo Film", category: "Commercial", year: "2025",
      client: "Client Name", role: "Editing, Color Grading, Sound Design",
      tools: ["Premiere Pro", "DaVinci Resolve"],
      description: "Short description: what the brief was and what you did.",
      thumbnail: "", video: "", screenshots: []
    },
    {
      title: "Wedding Highlight", category: "Wedding", year: "2025",
      client: "Client Name", role: "Editing, Music Sync",
      tools: ["Final Cut Pro"],
      description: "Short description of the project.",
      thumbnail: "", video: "", screenshots: []
    },
    {
      title: "YouTube Channel Edits", category: "Social Media", year: "2024",
      client: "Client Name", role: "Editing, Motion Graphics",
      tools: ["After Effects", "Premiere Pro"],
      description: "Short description of the project.",
      thumbnail: "", video: "", screenshots: []
    }
  ],

  /* ---------- CLIENT REVIEWS ----------
     type "video": fill video (YouTube link or local mp4)
     type "text":  fill quote */
  reviews: [
    { type: "video", name: "Client Name", company: "Company", video: "", poster: "" },
    { type: "text",  name: "Client Name", company: "Company", quote: "Write the client's comment here exactly as they said it." },
    { type: "text",  name: "Client Name", company: "Company", quote: "Another client comment goes here." }
  ],

  /* ---------- RESUME ---------- */
  experience: [
    { title: "Video Editor", place: "Company Name", period: "2023 - Present", detail: "What you did there, in one line." },
    { title: "Freelance Editor", place: "Self-employed", period: "2022 - 2023", detail: "Type of clients and projects." }
  ],
  education: [
    { title: "Video Editing Course", place: "Institute Name", period: "2022", detail: "Where you completed your editing course." },
    { title: "Higher Secondary (12th)", place: "School Name", period: "2021", detail: "" },
    { title: "Secondary (10th)", place: "School Name", period: "2019", detail: "" }
  ],
  tools: [
    { name: "Premiere Pro", level: 90 },
    { name: "After Effects", level: 75 },
    { name: "DaVinci Resolve", level: 80 },
    { name: "Final Cut Pro", level: 70 },
    { name: "Photoshop", level: 65 }
  ],
  resumePDF: ""                    // e.g. "resume.pdf" (leave empty to hide button)
};
