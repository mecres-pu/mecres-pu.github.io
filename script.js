/* ===== EDITABLE SITE CONFIGURATION ===== */
const SITE = {
  short: "Mecres",
  name: "Mechatronics & Research Society",
  university: "Presidency University, Kolkata",
  tagline: "Students building, testing and researching across engineering, computation and the physical sciences.",
  mission: "Mecres exists to create a welcoming environment for technology and research at Presidency University. We run fests, workshops, hackathons, national challenges and symposiums, and we give every member, from first-year beginners to experienced researchers, a team to build with and a problem worth solving.",
  email: "mecres.presiunimechatronics@gmail.com",
  social: [
    { label: "GitHub", url: "https://github.com/mecres-pu" },
    { label: "Instagram", url: "https://instagram.com/mech.at.presi" },
    { label: "LinkedIn", url: "https://linkedin.com/company/mecres" }
  ],
  fields: [
    "Computation", "AI & ML", "Mechanical & Electrical Engineering",
    "Sustainable Development", "Quantum Computing", "Aerospace",
    "Robotics", "Astronomy & Astrophysics", "Applied Physics"
  ],
  events: [
    { t: "Fests", d: "Annual tech and research festival with exhibits, talks and competitions." },
    { t: "Workshops", d: "Hands-on sessions on microcontrollers, machine learning, CAD and more." },
    { t: "Hackathons", d: "Time-boxed build events across software, hardware and data." },
    { t: "National Challenges", d: "Open competitions for students from institutions across India." },
    { t: "Symposiums", d: "Invited talks and paper sessions with researchers and industry speakers." }
  ],
  teams: [
    { t: "Mechanical Engineering", d: "Design, prototyping and fabrication." },
    { t: "Electrical Engineering", d: "Circuits, power systems and embedded hardware." },
    { t: "Computation", d: "Software, simulation and scientific computing." },
    { t: "AI & Robotics", d: "Machine learning models and autonomous systems." },
    { t: "Research & Analyst", d: "Literature reviews, data analysis and paper writing." },
    { t: "PR & Media", d: "Design, photography, social media and documentation." }
  ],
  leaders: [
    { r: "President", n: "Name Surname" },
    { r: "Vice-President", n: "Name Surname" },
    { r: "Chief Technology Officer (CTO)", n: "Name Surname" },
    { r: "Chief Operating Officer (COO)", n: "Name Surname" },
    { r: "Inventory Manager", n: "Name Surname" },
    { r: "IT Lead", n: "Name Surname" },
    { r: "Corporate Relations Head", n: "Name Surname" },
    { r: "PR & Outreach Head", n: "Name Surname" }
  ],
  joinText: "Students from any department are welcome. Sponsors, speakers and partner institutions can reach us through the same form."
};

/* ===== CORE APPLICATION LOGIC ===== */
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

document.addEventListener("DOMContentLoaded", () => {
  // Brand & General Dynamic Fields
  if ($("brand")) $("brand").textContent = SITE.short;
  if ($("uni")) $("uni").textContent = SITE.university;
  if ($("title")) $("title").textContent = SITE.name;
  if ($("tagline")) $("tagline").textContent = SITE.tagline;
  if ($("mission")) $("mission").textContent = SITE.mission;
  if ($("joinText")) $("joinText").textContent = SITE.joinText;

  // Active Navigation Highlighting
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(link => {
    if (link.getAttribute("href") === path) {
      link.classList.add("active");
    }
  });

  // Render Research Fields
  if ($("fieldList")) {
    $("fieldList").innerHTML = SITE.fields.map(f => `<li>${esc(f)}</li>`).join("");
  }

  // Render Events
  if ($("eventList")) {
    $("eventList").innerHTML = SITE.events.map(e => `<div class="box ev"><h3>${esc(e.t)}</h3><p>${esc(e.d)}</p></div>`).join("");
  }

  // Render Teams
  if ($("teamList")) {
    $("teamList").innerHTML = SITE.teams.map(e => `<div class="box"><h3>${esc(e.t)}</h3><p>${esc(e.d)}</p></div>`).join("");
  }

  // Render Leaders
  if ($("leaderList")) {
    $("leaderList").innerHTML = SITE.leaders.map(p => `<div class="box person"><h3>${esc(p.n)}</h3><small>${esc(p.r)}</small></div>`).join("");
  }

  // Render Footer
  if ($("foot")) {
    $("foot").innerHTML = `<p>${esc(SITE.short)}, ${esc(SITE.university)}. Contact: <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>. ` +
      SITE.social.map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join(", ") + `</p>`;
  }

  // Contact Form Submission
  if ($("contact")) {
    $("contact").addEventListener("submit", e => {
      e.preventDefault();
      const f = new FormData(e.target);
      const body = `${f.get("msg")}\n\nFrom: ${f.get("name")} (${f.get("email")})`;
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Message to " + SITE.short)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Theme Toggle Mechanism
  if ($("theme")) {
    $("theme").addEventListener("click", () => {
      const r = document.documentElement;
      const dark = r.dataset.theme ? r.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
      r.dataset.theme = dark ? "light" : "dark";
    });
  }
});
