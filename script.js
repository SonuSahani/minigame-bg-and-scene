const regions = [
  {
    id: "agni",
    icon: "🔥",
    label: "Agni Ritual Plains",
    title: "The altar-fire answers your footsteps.",
    desc: "Embers drift through sacred grasslands while priests chant around fading altars."
  },
  {
    id: "ushas",
    icon: "🌅",
    label: "Realm of Ushas",
    title: "Dawn breaks the oldest darkness.",
    desc: "Golden mist opens paths as awakened souls run sunrise trials across the frontier."
  },
  {
    id: "indra",
    icon: "⚡",
    label: "Indra Storm Highlands",
    title: "Thunder crowns the shattered peaks.",
    desc: "Lightning rivers cut broken mountains where Vritra fragments call down violent skies."
  },
  {
    id: "rivers",
    icon: "🌊",
    label: "Released Rivers Basin",
    title: "Waters of release carve new destiny.",
    desc: "Fresh currents flood fertile plains as settlements and crops rise from renewed earth."
  },
  {
    id: "marut",
    icon: "🌬️",
    label: "Marut Tempest Fields",
    title: "Wind corridors race beneath storm choirs.",
    desc: "Cloud armies sweep constantly while lightning tests every traveler in motion."
  },
  {
    id: "surya",
    icon: "🌞",
    label: "Solar Sky Path",
    title: "Daylight reveals the floating route.",
    desc: "Sunlit platforms appear only at day, purifying corrupted zones in radiant arcs."
  },
  {
    id: "varuna",
    icon: "🌌",
    label: "Varuna Cosmic Ocean",
    title: "Stars reflect upon judicial waters.",
    desc: "Tidal gravity twists around truth-trials where karma itself becomes visible."
  },
  {
    id: "rishi",
    icon: "🧠",
    label: "Rishi Inner Realm",
    title: "Thought forms the world before you.",
    desc: "Metaphors speak aloud in symbolic space, and knowledge unlocks rewritten reality."
  }
];

const eventScenes = {
  "agni-weakening": {
    tag: "GLOBAL EVENT — CRISIS",
    title: "Agni Weakening",
    desc: "Ritual fires are neglected. Night corruption spreads and hostile entities multiply.",
    tone: "danger",
    delta: { agni: -18, rta: -12 }
  },
  "indra-victory": {
    tag: "GLOBAL EVENT — TRIUMPH",
    title: "Indra Victory",
    desc: "Storm-clearing strike succeeds. Rivers unlock, agriculture blooms, and villages emerge.",
    tone: "blessing",
    delta: { agni: 2, rta: 14 }
  },
  "dawn-renewal": {
    tag: "GLOBAL EVENT — CYCLE",
    title: "Dawn Renewal Cycle",
    desc: "Night corruption is reset. Rare beings appear and exploration speed surges at sunrise.",
    tone: "blessing",
    delta: { agni: 4, rta: 9 }
  },
  "rain-invocation": {
    tag: "GLOBAL EVENT — CO-OP",
    title: "Rain Invocation",
    desc: "Players chant in rhythm. Server-wide rainfall restores lands and calms heat zones.",
    tone: "blessing",
    delta: { agni: -5, rta: 10 }
  },
  "rta-collapse": {
    tag: "GLOBAL EVENT — ANOMALY",
    title: "Rta Collapse",
    desc: "Cosmic balance fails. Floating terrain, time warps, and unstable physics invade all scenes.",
    tone: "danger",
    delta: { agni: -10, rta: -20 }
  }
};

const world = {
  rta: 64,
  agni: 72,
  region: "agni"
};

const stage = document.getElementById("stage");
const sceneButtons = document.getElementById("sceneButtons");
const sceneLabel = document.getElementById("sceneLabel");
const sceneTitle = document.getElementById("sceneTitle");
const sceneDesc = document.getElementById("sceneDesc");
const eventOverlay = document.getElementById("eventOverlay");
const eventTag = document.getElementById("eventTag");
const eventTitle = document.getElementById("eventTitle");
const eventDesc = document.getElementById("eventDesc");

const rtaMeter = document.getElementById("rtaMeter");
const agniMeter = document.getElementById("agniMeter");
const rtaValue = document.getElementById("rtaValue");
const agniValue = document.getElementById("agniValue");

function clampMeter(value) {
  return Math.max(0, Math.min(100, value));
}

function syncMeters() {
  rtaMeter.value = world.rta;
  agniMeter.value = world.agni;
  rtaValue.textContent = `${world.rta}%`;
  agniValue.textContent = `${world.agni}%`;
}

function setRegion(regionId) {
  const region = regions.find((item) => item.id === regionId);
  if (!region) return;

  world.region = region.id;
  stage.className = `vn-stage region-${region.id}`;

  sceneLabel.textContent = `${region.icon} ${region.label}`;
  sceneTitle.textContent = region.title;
  sceneDesc.textContent = region.desc;

  document.querySelectorAll("[data-region]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.region === region.id);
  });
}

function showEvent(eventId) {
  if (eventId === "clear") {
    eventOverlay.classList.add("hidden");
    eventOverlay.removeAttribute("data-tone");
    return;
  }

  const event = eventScenes[eventId];
  if (!event) return;

  eventTag.textContent = event.tag;
  eventTitle.textContent = event.title;
  eventDesc.textContent = event.desc;
  eventOverlay.dataset.tone = event.tone;
  eventOverlay.classList.remove("hidden");

  world.agni = clampMeter(world.agni + event.delta.agni);
  world.rta = clampMeter(world.rta + event.delta.rta);
  syncMeters();
}

function renderRegionButtons() {
  regions.forEach((region) => {
    const btn = document.createElement("button");
    btn.dataset.region = region.id;
    btn.textContent = `${region.icon} ${region.label}`;
    btn.addEventListener("click", () => setRegion(region.id));
    sceneButtons.appendChild(btn);
  });
}

document.querySelectorAll("button[data-event]").forEach((button) => {
  button.addEventListener("click", () => {
    showEvent(button.dataset.event);
  });
});

renderRegionButtons();
setRegion(world.region);
syncMeters();
