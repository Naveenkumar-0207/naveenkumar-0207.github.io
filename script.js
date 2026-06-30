const CONTACT_EMAIL = "naveen2807123@gmail.com";
const CONTACT_PHONE = "8667655030";

const projects = [
  {
    title: "Video 1",
    videoUrl:
      "https://res.cloudinary.com/dhxdqnpxb/video/upload/v1777562878/Digiplus_Services1_o8cmt0.mp4",
  },
  {
    title: "Video 2",
    videoUrl: "assets/BOJANALYA fin.mp4",
  },
  {
    title: "Video 3",
    videoUrl:
      "https://res.cloudinary.com/dhxdqnpxb/video/upload/q_auto,f_auto/v1774718847/video2_h3kqqn.mp4",
  },
  {
    title: "Video 4",
    videoUrl:
      "https://res.cloudinary.com/dhxdqnpxb/video/upload/q_auto,f_auto/v1774718580/video3_zimyhw.mp4",
  },
  {
    title: "Video 5",
    videoUrl:
      "https://res.cloudinary.com/dhxdqnpxb/video/upload/q_auto,f_auto/v1774717943/video4_dmf4px.mp4",
  },
  {
    title: "Video 6",
    videoUrl:
      "https://res.cloudinary.com/dhxdqnpxb/video/upload/q_auto,f_auto/v1774719181/video5_pzwh6h.mp4",
  },
  {
    title: "Video 7",
    videoUrl:
      "https://res.cloudinary.com/dhxdqnpxb/video/upload/q_auto,f_auto/v1774718987/video6_tzswrb.mp4",
  },
  {
    title: "Video 8",
    videoUrl:
      "https://res.cloudinary.com/dhxdqnpxb/video/upload/q_auto,f_auto/v1774718025/video7_nwbpnk.mp4",
  },
  {
    title: "Video 9",
    videoUrl:
      "https://res.cloudinary.com/dhxdqnpxb/video/upload/v1777563634/classic_Skill_Digital_Marketing3_1_wyioqa.mp4",
  },
];

const steps = [
  ["01", "Discovery", "Understanding your vision, brand, and goals"],
  ["02", "Script and Plan", "Crafting the narrative and shot list"],
  ["03", "Footage Selection", "Curating the best clips and assets"],
  ["04", "Rough Cut", "Building the foundational edit timeline"],
  ["05", "Motion Graphics", "Adding titles, transitions, and effects"],
  ["06", "Sound Design", "Music, SFX, and audio mixing"],
  ["07", "Color Grading", "Cinematic color science and mood"],
  ["08", "Revisions", "Collaborative feedback and refinement"],
  ["09", "Final Delivery", "Export in all formats and platforms"],
];

const services = [
  ["VC", "Video Editing", "Professional cuts, pacing, and storytelling for any platform."],
  ["MG", "Motion Graphics", "Animated titles, intros, transitions, and visual effects."],
  ["SM", "Social Media Reels", "Scroll-stopping vertical content for Instagram. "],
  ["AI", "AI Video Generation", "Next-gen content using AI-assisted tools and rapid iteration."],
  ["TH", "Thumbnail Design", "Click-worthy visual systems with proven CTR instincts."],
];

const tools = [
  ["Pr", "Adobe Premiere Pro"],
  ["Ae", "Adobe After Effects"],
  ["DR", "DaVinci Resolve"],
  ["Ps", "Adobe Photoshop"],
  ["V3", "Veo-3"],
  ["GK", "Grok"],
];

function getCloudinaryPoster(videoUrl) {
  if (!videoUrl.includes("res.cloudinary.com")) {
    return "";
  }

  return videoUrl.replace(
    /\/video\/upload\/(?:[^/]+\/)?(v\d+\/.*)\.mp4$/,
    "/video/upload/q_auto,f_jpg,so_1/$1.jpg",
  );
}

function createVideoCard(project, index) {
  const card = document.createElement("button");
  card.className = "video-card reveal-item";
  card.type = "button";
  card.setAttribute("aria-label", `Open ${project.title}`);
  card.style.transitionDelay = `${index * 45}ms`;

  const posterUrl = getCloudinaryPoster(project.videoUrl);
  const mediaMarkup = posterUrl
    ? `<img src="${posterUrl}" alt="" loading="lazy" decoding="async">`
    : `<video src="${project.videoUrl}" muted playsinline preload="metadata"></video>`;

  card.innerHTML = `
    <div class="video-inner">
      <div class="video-frame">
        ${mediaMarkup}
        <div class="play"><span aria-hidden="true"><i class="fa-solid fa-play"></i></span></div>
        <div class="video-meta">
          <h3>${project.title}</h3>
          <span>Watch</span>
        </div>
      </div>
    </div>
  `;

  const frame = card.querySelector(".video-frame");
  const poster = frame.querySelector("img, video");
  let previewVideo = poster instanceof HTMLVideoElement ? poster : null;

  card.addEventListener("mouseenter", () => {
    document.querySelectorAll(".video-card").forEach((other) => {
      if (other !== card) other.classList.add("dimmed");
    });

    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) {
      return;
    }

    if (!previewVideo) {
      previewVideo = document.createElement("video");
      previewVideo.src = project.videoUrl;
      if (posterUrl) previewVideo.poster = posterUrl;
      previewVideo.muted = true;
      previewVideo.loop = true;
      previewVideo.playsInline = true;
      previewVideo.preload = "metadata";
      poster.replaceWith(previewVideo);
    }

    previewVideo.play().catch(() => {});
  });

  card.addEventListener("mouseleave", () => {
    document.querySelectorAll(".video-card").forEach((other) => other.classList.remove("dimmed"));
    if (previewVideo) previewVideo.pause();
  });

  card.addEventListener("click", () => openVideoModal(project));

  return card;
}

function renderRepeatedContent() {
  const videoGrid = document.querySelector("#videoGrid");
  projects.forEach((project, index) => videoGrid.appendChild(createVideoCard(project, index)));

  const timeline = document.querySelector("#timeline");
  steps.forEach(([num, title, desc], index) => {
    const item = document.createElement("article");
    item.className = "timeline-item reveal-item";
    item.style.transitionDelay = `${index * 55}ms`;
    item.innerHTML = `
      <span class="timeline-dot" aria-hidden="true"></span>
      <div class="timeline-card glass-card">
        <strong>${num}</strong>
        <h3>${title}</h3>
        <p>${desc}</p>
      </div>
    `;
    timeline.appendChild(item);
  });

  const serviceGrid = document.querySelector("#serviceGrid");
  services.forEach(([icon, title, desc], index) => {
    const card = document.createElement("article");
    card.className = "service-card glass-card reveal-item";
    card.style.transitionDelay = `${index * 55}ms`;
    card.innerHTML = `
      <div class="service-icon">${icon}</div>
      <h3>${title}</h3>
      <p>${desc}</p>
    `;
    serviceGrid.appendChild(card);
  });

  const toolGrid = document.querySelector("#toolGrid");
  tools.forEach(([icon, name], index) => {
    const card = document.createElement("article");
    card.className = "tool-card glass-card reveal-item";
    card.style.transitionDelay = `${index * 55}ms`;
    card.innerHTML = `
      <div class="tool-icon">${icon}</div>
      <h3>${name}</h3>
    `;
    toolGrid.appendChild(card);
  });
}

function openVideoModal(project) {
  const modal = document.querySelector("#videoModal");
  const video = document.querySelector("#modalVideo");
  const title = document.querySelector("#modalTitle");

  title.textContent = project.title;
  video.src = project.videoUrl;
  video.currentTime = 0;
  document.body.classList.add("modal-open");

  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }

  video.play().catch(() => {});
}

function closeVideoModal() {
  const modal = document.querySelector("#videoModal");
  const video = document.querySelector("#modalVideo");
  video.pause();
  video.removeAttribute("src");
  video.load();
  document.body.classList.remove("modal-open");

  if (typeof modal.close === "function") {
    modal.close();
  } else {
    modal.removeAttribute("open");
  }
}

function setupModal() {
  const modal = document.querySelector("#videoModal");
  modal.querySelector(".modal-close").addEventListener("click", closeVideoModal);
  modal.addEventListener("click", (event) => {
    const dialogBox = modal.getBoundingClientRect();
    const inside =
      event.clientX >= dialogBox.left &&
      event.clientX <= dialogBox.right &&
      event.clientY >= dialogBox.top &&
      event.clientY <= dialogBox.bottom;

    if (!inside) closeVideoModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.open) closeVideoModal();
  });
}

function setupReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 },
  );

  document.querySelectorAll(".section-reveal, .reveal-item").forEach((el) => observer.observe(el));
}

function setupHeader() {
  const header = document.querySelector(".nav-shell");
  const update = () => {
    const y = Math.min(window.scrollY, 120);
    header.style.backgroundColor = `rgba(0, 0, 0, ${0.62 + (y / 120) * 0.28})`;
    header.style.backdropFilter = `blur(${12 + (y / 120) * 10}px)`;
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

function setupMobileMenu() {
  const header = document.querySelector(".nav-shell");
  const toggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector("#mobileNav");

  if (!header || !toggle || !mobileNav) return;

  const setMenuState = (isOpen) => {
    header.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    toggle.innerHTML = `<i class="fa-solid fa-${isOpen ? "xmark" : "bars"}" aria-hidden="true"></i>`;
  };

  toggle.addEventListener("click", () => {
    setMenuState(!header.classList.contains("is-open"));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  window.addEventListener("resize", () => {
    if (!window.matchMedia("(max-width: 980px)").matches) {
      setMenuState(false);
    }
  });
}

function setupTilt() {
  const tilt = document.querySelector("[data-tilt]");
  if (!tilt || window.matchMedia("(max-width: 980px), (prefers-reduced-motion: reduce)").matches) {
    return;
  }

  tilt.addEventListener("mousemove", (event) => {
    const rect = tilt.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tilt.style.transform = `rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
  });

  tilt.addEventListener("mouseleave", () => {
    tilt.style.transform = "";
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function readFormData(form) {
  const data = new FormData(form);
  return {
    name: String(data.get("name") || "").trim(),
    email: String(data.get("email") || "").trim(),
    brand: String(data.get("brand") || "").trim(),
    budget: String(data.get("budget") || "").trim(),
    deadline: String(data.get("deadline") || "").trim(),
    type: String(data.get("type") || "").trim(),
    references: String(data.get("references") || "").trim(),
    message: String(data.get("message") || "").trim(),
  };
}

function buildEmailSubject(formData) {
  const sender = formData.name || "New Client";
  const projectType = formData.type || "Project Inquiry";
  return `${projectType} Inquiry from ${sender}`;
}

function buildEmailBody(formData) {
  return [
    "Hello Naveen,",
    "",
    "A new client inquiry has been submitted from your portfolio website.",
    "",
    "CLIENT DETAILS",
    `Name: ${formData.name || "Not provided"}`,
    `Email: ${formData.email || "Not provided"}`,
    `Phone: ${CONTACT_PHONE}`,
    `Brand / Company: ${formData.brand || "Not provided"}`,
    "",
    "PROJECT SCOPE",
    `Project Type: ${formData.type || "Not provided"}`,
    `Budget Range: ${formData.budget || "Not provided"}`,
    `Deadline: ${formData.deadline || "Not provided"}`,
    `Reference Links: ${formData.references || "Not provided"}`,
    "",
    "PROJECT BRIEF",
    formData.message ||
      "The client has not added a project brief yet. Please share goals, deliverables, and audience details.",
    "",
    "PORTFOLIO SOURCE",
    "Sent from the Contact Section on the portfolio website.",
  ].join("\n");
}

function showFeedback(message, kind = "success") {
  const feedback = document.querySelector("#feedback");
  feedback.hidden = false;
  feedback.textContent = message;
  feedback.classList.toggle("error", kind === "error");
}

function validateForm(formData) {
  if (!formData.name) return "Please enter the client name.";
  if (!formData.email) return "Please enter the client email address.";
  if (!isValidEmail(formData.email)) return "Please enter a valid client email address.";
  if (!formData.type) return "Please select a project type.";
  if (!formData.message) return "Please add a short project brief so the inquiry is useful.";
  return "";
}

function setupContactForm() {
  const form = document.querySelector("#briefForm");
  const copyButton = document.querySelector("#copyBrief");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = readFormData(form);
    const error = validateForm(formData);

    if (error) {
      showFeedback(error, "error");
      return;
    }

    const subject = buildEmailSubject(formData);
    const body = buildEmailBody(formData);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    showFeedback("Email draft opened. Review it in your mail app and send it to Naveen.");
  });

  copyButton.addEventListener("click", async () => {
    const formData = readFormData(form);
    const subject = buildEmailSubject(formData);
    const body = buildEmailBody(formData);
    const text = `To: ${CONTACT_EMAIL}\nSubject: ${subject}\n\n${body}`;

    try {
      await navigator.clipboard.writeText(text);
      showFeedback("Structured project brief copied to clipboard.");
    } catch {
      showFeedback("Clipboard access failed. Please copy the preview manually.", "error");
    }
  });
}

function setupCursorRing() {
  if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const ring = document.createElement("div");
  ring.className = "cursor-ring";
  ring.setAttribute("aria-hidden", "true");
  document.body.appendChild(ring);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  const moveRing = () => {
    ringX += (mouseX - ringX) * 0.22;
    ringY += (mouseY - ringY) * 0.22;
    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(moveRing);
  };

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    ring.classList.add("visible");
  });

  window.addEventListener("mouseout", (event) => {
    if (!event.relatedTarget) ring.classList.remove("visible");
  });

  document.querySelectorAll("a, button, input, select, textarea, video").forEach((element) => {
    element.addEventListener("mouseenter", () => ring.classList.add("is-hovering"));
    element.addEventListener("mouseleave", () => ring.classList.remove("is-hovering"));
  });

  moveRing();
}

document.addEventListener("DOMContentLoaded", () => {
  renderRepeatedContent();
  setupModal();
  setupReveal();
  setupHeader();
  setupMobileMenu();
  setupTilt();
  setupContactForm();
  setupCursorRing();
  document.querySelector("#year").textContent = new Date().getFullYear();
});
