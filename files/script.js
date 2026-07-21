/* =====================================================
   CRICKETVERSE — MAIN JAVASCRIPT
   Structure:
   1. Data (players, teams, matches, rankings, news, testimonials)
   2. Render functions
   3. Player search
   4. Match filtering
   5. Rankings tab switching
   6. Modals (player + team)
   7. Navbar / mobile behavior + sticky shadow
   8. Smooth scroll (native, backup for older browsers)
   9. Scroll reveal animations
   10. Back to top button
   11. Init on DOMContentLoaded
===================================================== */

/* ---------- 1. DATA ---------- */

// NOTE ON IMAGES:
// Player photos use https://ui-avatars.com (auto-generated initials avatars) as a
// guaranteed-working placeholder. Team logos use https://flagcdn.com flag images.
// Both are free, reliable, and will never 404. To use your OWN local images instead,
// see the "image" property of each object below and read the instructions at the
// bottom of the chat response for exactly which local file path to swap in.

const players = [
  {
    id: 1,
    name: "Virat Kohli",
    country: "India",
    role: "Batsman",
    matches: 550,
    primaryStat: { label: "Runs", value: "26,000+" },
    image: "https://ui-avatars.com/api/?name=Virat+Kohli&background=0B6B3A&color=fff&size=256&bold=true",
    bio: "One of the most consistent run-scorers in modern cricket, known for his aggressive style and fitness standards."
  },
  {
    id: 2,
    name: "Rohit Sharma",
    country: "India",
    role: "Batsman",
    matches: 480,
    primaryStat: { label: "Runs", value: "19,000+" },
    image: "https://ui-avatars.com/api/?name=Rohit+Sharma&background=14A44D&color=fff&size=256&bold=true",
    bio: "Explosive opening batsman famous for his effortless timing and record-breaking double centuries in ODIs."
  },
  {
    id: 3,
    name: "Jasprit Bumrah",
    country: "India",
    role: "Bowler",
    matches: 220,
    primaryStat: { label: "Wickets", value: "350+" },
    image: "https://ui-avatars.com/api/?name=Jasprit+Bumrah&background=0A1128&color=fff&size=256&bold=true",
    bio: "Considered one of the finest fast bowlers of his generation, renowned for his unique action and yorkers."
  },
  {
    id: 4,
    name: "MS Dhoni",
    country: "India",
    role: "Wicketkeeper",
    matches: 538,
    primaryStat: { label: "Runs", value: "17,000+" },
    image: "https://ui-avatars.com/api/?name=MS+Dhoni&background=D4AF37&color=0A1128&size=256&bold=true",
    bio: "Legendary former captain celebrated for his calm finishing and lightning-fast stumpings behind the stumps."
  },
  {
    id: 5,
    name: "Joe Root",
    country: "England",
    role: "Batsman",
    matches: 400,
    primaryStat: { label: "Runs", value: "12,700+" },
    image: "https://ui-avatars.com/api/?name=Joe+Root&background=0B6B3A&color=fff&size=256&bold=true",
    bio: "England's premier Test batsman, admired for his technical solidity and elegant strokeplay."
  },
  {
    id: 6,
    name: "Babar Azam",
    country: "Pakistan",
    role: "Batsman",
    matches: 260,
    primaryStat: { label: "Runs", value: "10,500+" },
    image: "https://ui-avatars.com/api/?name=Babar+Azam&background=14A44D&color=fff&size=256&bold=true",
    bio: "Pakistan's captain and top-order batsman, widely regarded for his classical technique across formats."
  },
  {
    id: 7,
    name: "Kane Williamson",
    country: "New Zealand",
    role: "Batsman",
    matches: 350,
    primaryStat: { label: "Runs", value: "11,900+" },
    image: "https://ui-avatars.com/api/?name=Kane+Williamson&background=0A1128&color=fff&size=256&bold=true",
    bio: "Former New Zealand captain known for his composed temperament and match-winning big innings."
  },
  {
    id: 8,
    name: "Pat Cummins",
    country: "Australia",
    role: "Bowler",
    matches: 240,
    primaryStat: { label: "Wickets", value: "400+" },
    image: "https://ui-avatars.com/api/?name=Pat+Cummins&background=D4AF37&color=0A1128&size=256&bold=true",
    bio: "Australia's captain and strike fast bowler, valued for his pace, accuracy and leadership under pressure."
  }
];

const teams = [
  {
    id: "india",
    name: "India",
    achievement: "ICC Cricket World Cup Champions",
    captain: "Rohit Sharma",
    titles: "2x ODI World Cup, 2x T20 World Cup, 2x Champions Trophy",
    description: "One of the most dominant cricketing nations, known for its passionate fan base and deep batting line-ups.",
    logo: "https://flagcdn.com/w160/in.png"
  },
  {
    id: "australia",
    name: "Australia",
    achievement: "5 Times World Cup Champions",
    captain: "Pat Cummins",
    titles: "6x ODI World Cup, 2x T20 World Cup",
    description: "The most successful team in World Cup history, renowned for its aggressive and competitive cricket culture.",
    logo: "https://flagcdn.com/w160/au.png"
  },
  {
    id: "england",
    name: "England",
    achievement: "2019 ODI World Cup Winner",
    captain: "Jos Buttler",
    titles: "1x ODI World Cup, 1x T20 World Cup",
    description: "The birthplace of cricket, with a modern side known for its fearless, high-scoring style of play.",
    logo: "https://flagcdn.com/w160/gb-eng.png"
  },
  {
    id: "pakistan",
    name: "Pakistan",
    achievement: "1992 ODI World Cup Winner",
    captain: "Babar Azam",
    titles: "1x ODI World Cup, 1x T20 World Cup",
    description: "Famous for producing some of the most naturally gifted fast bowlers and batsmen in the game's history.",
    logo: "https://flagcdn.com/w160/pk.png"
  }
];

const matches = [
  {
    id: 1,
    status: "live",
    format: "T20I",
    teamA: { name: "India", score: "186/4 (18.2 ov)", logo: "https://flagcdn.com/w80/in.png" },
    teamB: { name: "Australia", score: "Yet to bat", logo: "https://flagcdn.com/w80/au.png" },
    stadium: "M. A. Chidambaram Stadium, Chennai",
    note: "India need 32 runs off 10 balls"
  },
  {
    id: 2,
    status: "upcoming",
    format: "ODI",
    teamA: { name: "England", score: "—", logo: "https://flagcdn.com/w80/gb-eng.png" },
    teamB: { name: "Pakistan", score: "—", logo: "https://flagcdn.com/w80/pk.png" },
    stadium: "Lord's, London",
    note: "Starts tomorrow, 2:00 PM local time"
  },
  {
    id: 3,
    status: "completed",
    format: "Test",
    teamA: { name: "Australia", score: "412 & 198/6d", logo: "https://flagcdn.com/w80/au.png" },
    teamB: { name: "India", score: "289 & 276", logo: "https://flagcdn.com/w80/in.png" },
    stadium: "Melbourne Cricket Ground",
    note: "Australia won by 45 runs"
  },
  {
    id: 4,
    status: "live",
    format: "T20I",
    teamA: { name: "Pakistan", score: "142/3 (15.0 ov)", logo: "https://flagcdn.com/w80/pk.png" },
    teamB: { name: "New Zealand", score: "Yet to bat", logo: "https://flagcdn.com/w80/nz.png" },
    stadium: "Gaddafi Stadium, Lahore",
    note: "Pakistan looking to post a big total"
  },
  {
    id: 5,
    status: "upcoming",
    format: "ODI",
    teamA: { name: "India", score: "—", logo: "https://flagcdn.com/w80/in.png" },
    teamB: { name: "South Africa", score: "—", logo: "https://flagcdn.com/w80/za.png" },
    stadium: "Wankhede Stadium, Mumbai",
    note: "Starts in 2 days, 1:30 PM local time"
  },
  {
    id: 6,
    status: "completed",
    format: "T20I",
    teamA: { name: "England", score: "178/5 (20 ov)", logo: "https://flagcdn.com/w80/gb-eng.png" },
    teamB: { name: "Australia", score: "179/4 (19.1 ov)", logo: "https://flagcdn.com/w80/au.png" },
    stadium: "The Oval, London",
    note: "Australia won by 6 wickets"
  }
];

const rankings = {
  test: [
    { rank: 1, team: "Australia", rating: 128, points: 6784 },
    { rank: 2, team: "India", rating: 121, points: 6413 },
    { rank: 3, team: "England", rating: 108, points: 5832 },
    { rank: 4, team: "New Zealand", rating: 102, points: 5210 },
    { rank: 5, team: "South Africa", rating: 98, points: 4890 }
  ],
  odi: [
    { rank: 1, team: "India", rating: 122, points: 6350 },
    { rank: 2, team: "Australia", rating: 115, points: 5990 },
    { rank: 3, team: "South Africa", rating: 110, points: 5540 },
    { rank: 4, team: "England", rating: 105, points: 5120 },
    { rank: 5, team: "Pakistan", rating: 99, points: 4780 }
  ],
  t20: [
    { rank: 1, team: "India", rating: 265, points: 7920 },
    { rank: 2, team: "England", rating: 258, points: 7615 },
    { rank: 3, team: "Australia", rating: 250, points: 7402 },
    { rank: 4, team: "Pakistan", rating: 244, points: 7108 },
    { rank: 5, team: "New Zealand", rating: 238, points: 6890 }
  ]
};

// Sample / demo news content — clearly not fetched from a live API
const news = [
  {
    category: "Match Report",
    title: "India Seal Series with Dominant Chase in Chennai",
    date: "July 18, 2026",
    desc: "A blistering middle-order partnership guided India home with overs to spare in the series decider.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop"
  },
  {
    category: "Player Feature",
    title: "Bumrah's Yorker Masterclass Leaves Batters Guessing",
    date: "July 16, 2026",
    desc: "A deep dive into how the pace spearhead continues to redefine death-over bowling with pinpoint accuracy.",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=600&h=400&fit=crop"
  },
  {
    category: "Team News",
    title: "Australia Name Squad for Upcoming Test Tour",
    date: "July 14, 2026",
    desc: "Selectors have opted for a blend of experience and youth ahead of the highly anticipated overseas tour.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop"
  },
  {
    category: "Rankings",
    title: "England Climb to Second in Latest T20I Rankings",
    date: "July 12, 2026",
    desc: "A string of impressive series wins has pushed England up the ICC T20I team rankings this month.",
    image: "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?w=600&h=400&fit=crop"
  },
  {
    category: "Analysis",
    title: "How Spin Is Shaping Modern T20 Middle Overs",
    date: "July 10, 2026",
    desc: "Teams are increasingly turning to specialist spinners to control the middle phase of the innings.",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600&h=400&fit=crop"
  },
  {
    category: "Preview",
    title: "Five Storylines to Watch in the Upcoming ODI Series",
    date: "July 8, 2026",
    desc: "From returning captains to rookie debutants, here's what to keep an eye on in the coming series.",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=600&h=400&fit=crop"
  }
];

const testimonials = [
  {
    name: "Arjun Mehta",
    role: "Cricket Fan, Mumbai",
    rating: 5,
    review: "CricketVerse is my go-to for live scores. Clean layout, fast updates, and I love the player stats section.",
    image: "https://ui-avatars.com/api/?name=Arjun+Mehta&background=0A1128&color=fff&size=128"
  },
  {
    name: "Sophie Turner",
    role: "Fantasy League Player, London",
    rating: 5,
    review: "The rankings tab helps me plan my fantasy team every week. Best cricket portal I've used so far.",
    image: "https://ui-avatars.com/api/?name=Sophie+Turner&background=0B6B3A&color=fff&size=128"
  },
  {
    name: "Hassan Raza",
    role: "Sports Blogger, Lahore",
    rating: 4,
    review: "Great design and easy navigation. The news section keeps me updated without needing five other apps.",
    image: "https://ui-avatars.com/api/?name=Hassan+Raza&background=D4AF37&color=0A1128&size=128"
  }
];

/* ---------- 2. RENDER FUNCTIONS ---------- */

function renderMatches(filter = "all") {
  const container = document.getElementById("matchesContainer");
  container.innerHTML = "";

  const filtered = filter === "all" ? matches : matches.filter(m => m.status === filter);

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-center cv-no-results">No matches found for this filter.</p>`;
    return;
  }

  filtered.forEach(match => {
    const badge =
      match.status === "live" ? `<span class="cv-badge-live"><span class="cv-live-dot"></span> LIVE</span>` :
      match.status === "upcoming" ? `<span class="cv-badge-upcoming">UPCOMING</span>` :
      `<span class="cv-badge-completed">COMPLETED</span>`;

    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="cv-match-card is-${match.status} cv-reveal">
        <div class="cv-match-top">
          ${badge}
          <span class="cv-match-format">${match.format}</span>
        </div>
        <div class="cv-team-row">
          <div class="cv-team-info">
            <img src="${match.teamA.logo}" alt="${match.teamA.name} flag" class="cv-team-logo-sm">
            <span class="cv-team-name">${match.teamA.name}</span>
          </div>
          <span class="cv-team-score">${match.teamA.score}</span>
        </div>
        <div class="cv-team-row">
          <div class="cv-team-info">
            <img src="${match.teamB.logo}" alt="${match.teamB.name} flag" class="cv-team-logo-sm">
            <span class="cv-team-name">${match.teamB.name}</span>
          </div>
          <span class="cv-team-score">${match.teamB.score}</span>
        </div>
        <p class="cv-match-meta"><i class="bi bi-geo-alt"></i>${match.stadium}<br><i class="bi bi-info-circle"></i>${match.note}</p>
        <button class="btn cv-btn-outline-light" style="border-color: rgba(11,107,58,0.25); color:#0B6B3A;">View Scorecard</button>
      </div>
    `;
    container.appendChild(col);
  });

  revealOnScroll();
}

function renderPlayers(list) {
  const container = document.getElementById("playersContainer");
  const noResults = document.getElementById("noPlayersMsg");
  container.innerHTML = "";

  if (list.length === 0) {
    noResults.classList.remove("d-none");
    return;
  }
  noResults.classList.add("d-none");

  list.forEach(player => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-3";
    col.innerHTML = `
      <div class="cv-player-card cv-reveal">
        <div class="cv-player-img-wrap">
          <img src="${player.image}" alt="Photo of ${player.name}">
        </div>
        <h5 class="cv-player-name">${player.name}</h5>
        <p class="cv-player-country">${player.country}</p>
        <span class="cv-player-role">${player.role}</span>
        <div class="cv-player-stats">
          <div>
            <div class="cv-stat-num">${player.matches}</div>
            <div class="cv-stat-label">Matches</div>
          </div>
          <div>
            <div class="cv-stat-num">${player.primaryStat.value}</div>
            <div class="cv-stat-label">${player.primaryStat.label}</div>
          </div>
        </div>
        <button class="btn cv-btn-primary" data-player-id="${player.id}" onclick="openPlayerModal(${player.id})">View Profile</button>
      </div>
    `;
    container.appendChild(col);
  });

  revealOnScroll();
}

function renderTeams() {
  const container = document.getElementById("teamsContainer");
  container.innerHTML = "";

  teams.forEach(team => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-lg-3";
    col.innerHTML = `
      <div class="cv-team-card cv-reveal">
        <div class="cv-team-logo-wrap">
          <img src="${team.logo}" alt="${team.name} flag/logo">
        </div>
        <h5 class="cv-team-name">${team.name}</h5>
        <p class="cv-team-desc">${team.achievement}</p>
        <button class="btn cv-btn-outline-light" style="border-color: rgba(11,107,58,0.25); color:#0B6B3A;" onclick="openTeamModal('${team.id}')">View Team</button>
      </div>
    `;
    container.appendChild(col);
  });

  revealOnScroll();
}

function renderRankings(format = "test") {
  const tbody = document.getElementById("rankingsBody");
  tbody.innerHTML = "";

  rankings[format].forEach(row => {
    const badgeClass = row.rank === 1 ? "gold" : "";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><span class="cv-rank-badge ${badgeClass}">${row.rank}</span></td>
      <td class="fw-bold">${row.team}</td>
      <td>${row.rating}</td>
      <td>${row.points}</td>
    `;
    tbody.appendChild(tr);
  });
}

function renderNews() {
  const container = document.getElementById("newsContainer");
  container.innerHTML = "";

  news.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="cv-news-card cv-reveal">
        <img src="${item.image}" alt="${item.title}" class="cv-news-img">
        <div class="cv-news-body">
          <span class="cv-news-category">${item.category}</span>
          <h5 class="cv-news-title">${item.title}</h5>
          <p class="cv-news-date"><i class="bi bi-calendar3"></i> ${item.date}</p>
          <p class="cv-news-desc">${item.desc}</p>
          <button class="cv-btn-text">Read More <i class="bi bi-arrow-right"></i></button>
        </div>
      </div>
    `;
    container.appendChild(col);
  });

  revealOnScroll();
}

function renderTestimonials() {
  const container = document.getElementById("testimonialsContainer");
  container.innerHTML = "";

  testimonials.forEach(t => {
    const stars = "★".repeat(t.rating) + "☆".repeat(5 - t.rating);
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4";
    col.innerHTML = `
      <div class="cv-testimonial-card cv-reveal">
        <div class="cv-testimonial-stars">${stars}</div>
        <p class="cv-testimonial-review">"${t.review}"</p>
        <div class="cv-testimonial-person">
          <img src="${t.image}" alt="${t.name}">
          <div>
            <div class="cv-testimonial-name">${t.name}</div>
            <div class="cv-testimonial-role">${t.role}</div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });

  revealOnScroll();
}

/* ---------- 3. PLAYER SEARCH ---------- */

function setupPlayerSearch() {
  const input = document.getElementById("playerSearchInput");
  input.addEventListener("input", () => {
    const query = input.value.trim().toLowerCase();
    const filtered = players.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.country.toLowerCase().includes(query) ||
      p.role.toLowerCase().includes(query)
    );
    renderPlayers(filtered);
  });
}

/* ---------- 4. MATCH FILTERING ---------- */

function setupMatchFilters() {
  const buttons = document.querySelectorAll("#matchFilters .cv-filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderMatches(btn.dataset.filter);
    });
  });
}

/* ---------- 5. RANKINGS TAB SWITCHING ---------- */

function setupRankingTabs() {
  const buttons = document.querySelectorAll("#rankingTabs .cv-filter-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderRankings(btn.dataset.format);
    });
  });
}

/* ---------- 6. MODALS ---------- */

function openPlayerModal(id) {
  const player = players.find(p => p.id === id);
  if (!player) return;

  const body = document.getElementById("playerModalBody");
  const isBowler = player.role === "Bowler";

  body.innerHTML = `
    <img src="${player.image}" alt="Photo of ${player.name}" class="cv-modal-img">
    <h4 class="cv-modal-name">${player.name}</h4>
    <div class="cv-modal-tags">
      <span class="cv-modal-tag"><i class="bi bi-flag"></i> ${player.country}</span>
      <span class="cv-modal-tag"><i class="bi bi-person-badge"></i> ${player.role}</span>
    </div>
    <div class="cv-modal-stats-grid">
      <div><div class="cv-stat-num">${player.matches}</div><div class="cv-stat-label">Matches</div></div>
      <div><div class="cv-stat-num">${player.primaryStat.value}</div><div class="cv-stat-label">${player.primaryStat.label}</div></div>
    </div>
    <p class="cv-modal-bio">${player.bio}</p>
  `;

  const modal = new bootstrap.Modal(document.getElementById("playerModal"));
  modal.show();
}

function openTeamModal(id) {
  const team = teams.find(t => t.id === id);
  if (!team) return;

  const body = document.getElementById("teamModalBody");
  body.innerHTML = `
    <img src="${team.logo}" alt="${team.name} flag/logo" class="cv-modal-logo">
    <h4 class="cv-modal-name">${team.name}</h4>
    <div class="cv-modal-tags">
      <span class="cv-modal-tag"><i class="bi bi-trophy"></i> ${team.titles}</span>
    </div>
    <p class="cv-modal-bio"><strong>Captain:</strong> ${team.captain}</p>
    <p class="cv-modal-bio">${team.description}</p>
  `;

  const modal = new bootstrap.Modal(document.getElementById("teamModal"));
  modal.show();
}

/* ---------- 7. NAVBAR / MOBILE BEHAVIOR ---------- */

function setupNavbar() {
  const navbar = document.querySelector(".cv-navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("cv-scrolled", window.scrollY > 20);
  });

  // Close mobile menu after clicking a nav link
  const navLinks = document.querySelectorAll(".cv-nav-links .nav-link");
  const collapseEl = document.getElementById("cvNavbar");
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");
      if (collapseEl.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(collapseEl).hide();
      }
    });
  });
}

/* ---------- 8. SMOOTH SCROLL (backup for older browsers) ---------- */

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });
}

/* ---------- 9. SCROLL REVEAL ANIMATIONS ---------- */

let revealObserver;

function revealOnScroll() {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cv-revealed");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
  }
  document.querySelectorAll(".cv-reveal:not(.cv-revealed)").forEach(el => {
    revealObserver.observe(el);
  });
}

/* ---------- 10. BACK TO TOP ---------- */

function setupBackToTop() {
  const btn = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------- NAV SEARCH (simple demo: searches players + teams by name) ---------- */

function setupNavSearch() {
  const input = document.getElementById("navSearchInput");
  if (!input) return;
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const query = input.value.trim().toLowerCase();
      if (!query) return;
      // If it matches a player or team, scroll to the relevant section
      const isPlayer = players.some(p => p.name.toLowerCase().includes(query));
      const isTeam = teams.some(t => t.name.toLowerCase().includes(query));
      if (isPlayer) {
        document.getElementById("playerSearchInput").value = input.value;
        document.getElementById("playerSearchInput").dispatchEvent(new Event("input"));
        document.getElementById("players").scrollIntoView({ behavior: "smooth" });
      } else if (isTeam) {
        document.getElementById("teams").scrollIntoView({ behavior: "smooth" });
      }
    }
  });
}

/* ---------- VIEW ALL NEWS (demo button) ---------- */

function setupViewAllNews() {
  const btn = document.getElementById("viewAllNewsBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("This is a demo project. In a full build, this would load a complete news archive page.");
    });
  }
}

/* ---------- 11. INIT ---------- */

document.addEventListener("DOMContentLoaded", () => {
  // Render all dynamic content
  renderMatches();
  renderPlayers(players);
  renderTeams();
  renderRankings();
  renderNews();
  renderTestimonials();

  // Wire up interactivity
  setupPlayerSearch();
  setupMatchFilters();
  setupRankingTabs();
  setupNavbar();
  setupSmoothScroll();
  setupBackToTop();
  setupNavSearch();
  setupViewAllNews();

  // Footer year
  document.getElementById("footerYear").textContent = new Date().getFullYear();
});
