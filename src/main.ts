import "./style.css";

type Note = {
  number: string;
  category: string;
  title: string;
  description: string;
  x: number;
  y: number;
};

const notes: Note[] = [
  {
    number: "01",
    category: "North America",
    title: "Ideas begin here.",
    description:
      "A quiet place for the first thought, the rough sketch, or the question worth following. Replace this copy with the story behind your first topic.",
    x: 39,
    y: 39,
  },
  {
    number: "02",
    category: "South America",
    title: "Look a little closer.",
    description:
      "Small details can shift the way we see the whole picture. Use this space to share an observation, a discovery, or something you want people to notice.",
    x: 48,
    y: 65,
  },
  {
    number: "03",
    category: "Europe",
    title: "What could this become?",
    description:
      "Some things are more interesting while they are still taking shape. Add a description of a possibility, an experiment, or a direction you are exploring.",
    x: 61,
    y: 42,
  },
  {
    number: "04",
    category: "Africa",
    title: "Everything touches.",
    description:
      "Follow the unexpected links between people, places, and ideas. This is a placeholder for the connection you want to bring into focus.",
    x: 57,
    y: 55,
  },
  {
    number: "05",
    category: "Asia",
    title: "Keep what matters.",
    description:
      "Gather the pieces that make a thought feel complete. Share the references, details, or fragments that belong together.",
    x: 70,
    y: 49,
  },
  {
    number: "06",
    category: "Pacific Ocean",
    title: "Leave room to grow.",
    description:
      "The end of one idea is often the beginning of another. Use this tile for a next step, an invitation, or a closing thought.",
    x: 31,
    y: 55,
  },
];

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root element was not found.");
}

app.innerHTML = `
  <main class="page-shell">
    <header class="topbar">
      <a class="wordmark" href="#" aria-label="NASA SpaceApps Challenge home">
        <img class="wordmark-icon" src="${new URL("./img/planet-icon.svg", import.meta.url).href}" alt="" aria-hidden="true" />
        NASA SPACEAPPS CHALLENGE
      </a>
      <span class="topbar-note">A LITTLE SPACE TO EXPLORE</span>
    </header>

    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow"><span class="eyebrow-line"></span> A WORK IN PROGRESS</p>
      <h1 id="page-title">Things worth<br /><span>a closer look.</span></h1>
      <div class="intro-bottom">
        <p>Choose a point on Earth to zoom in and explore.</p>
        <p class="instruction"><span aria-hidden="true">↘</span> SELECT A POINT ON EARTH</p>
      </div>
    </section>

    <section class="earth-explorer" aria-label="Explore locations on Earth">
      <div class="earth-stage">
        <img class="earth-image" draggable="false" src="${new URL("./img/Earth.jpg", import.meta.url).href}" alt="Earth viewed from space" />
        <span class="earth-label">OUR HOME, IN FOCUS</span>
        <span class="earth-coordinates" aria-hidden="true">A BLUE MARBLE · 01 / 06</span>
      ${notes
        .map(
          (note) => `
            <button
              class="earth-marker"
              type="button"
              data-note="${note.number}"
              style="--marker-x: ${note.x}%; --marker-y: ${note.y}%"
              aria-haspopup="dialog"
              aria-label="Zoom into ${note.category}: ${note.title}"
            >
              <span>${note.number}</span>
            </button>
          `,
        )
        .join("")}
      </div>
    </section>

    <footer class="footer">
      <span>NASA SPACEAPPS CHALLENGE<span class="footer-dot">©</span> 2025</span>
      <span>MADE FOR CURIOSITY</span>
    </footer>

    <span class="cursor-glow" aria-hidden="true"></span>

    <dialog class="detail-dialog" aria-labelledby="dialog-title">
      <img class="zoom-earth" draggable="false" src="${new URL("./img/Earth.jpg", import.meta.url).href}" alt="" />
      <span class="cursor-glow" aria-hidden="true"></span>
      <article class="detail-card">
        <div class="detail-top">
          <span class="detail-kicker"><span class="detail-dot"></span><span data-detail-category></span></span>
          <button class="close-button" type="button" aria-label="Close detail">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="detail-content">
          <span class="detail-number" data-detail-number></span>
          <h2 id="dialog-title" data-detail-title></h2>
          <p data-detail-description></p>
        </div>
        <div class="detail-bottom">
          <span>NASA SPACEAPPS CHALLENGE — AN OPEN CANVAS</span>
          <span aria-hidden="true">↗</span>
        </div>
      </article>
    </dialog>
  </main>
`;

const dialog = app.querySelector<HTMLDialogElement>(".detail-dialog");
const closeButton = app.querySelector<HTMLButtonElement>(".close-button");
const category = app.querySelector<HTMLElement>("[data-detail-category]");
const number = app.querySelector<HTMLElement>("[data-detail-number]");
const title = app.querySelector<HTMLElement>("[data-detail-title]");
const description = app.querySelector<HTMLElement>("[data-detail-description]");
const zoomEarth = app.querySelector<HTMLImageElement>(".zoom-earth");
const cursorGlows = app.querySelectorAll<HTMLElement>(".cursor-glow");
let activeMarker: HTMLButtonElement | null = null;

if (
  !dialog ||
  !closeButton ||
  !category ||
  !number ||
  !title ||
  !description ||
  !zoomEarth
) {
  throw new Error("Detail display elements were not found.");
}

document.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") {
    return;
  }

  cursorGlows.forEach((glow) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
    glow.classList.add("is-visible");
  });
});

document.addEventListener("pointerdown", () => {
  cursorGlows.forEach((glow) => glow.classList.add("is-active"));
});

document.addEventListener("pointerup", () => {
  cursorGlows.forEach((glow) => glow.classList.remove("is-active"));
});

document.documentElement.addEventListener("pointerleave", () => {
  cursorGlows.forEach((glow) => glow.classList.remove("is-visible"));
});

app.querySelectorAll<HTMLButtonElement>(".earth-marker").forEach((marker) => {
  marker.addEventListener("click", () => {
    const note = notes.find((item) => item.number === marker.dataset.note);
    if (!note) {
      throw new Error(`No note found for marker ${marker.dataset.note ?? ""}.`);
    }

    activeMarker = marker;
    category.textContent = note.category;
    number.textContent = note.number;
    title.textContent = note.title;
    description.textContent = note.description;
    zoomEarth.style.setProperty("--zoom-x", `${-note.x * 3}%`);
    zoomEarth.style.setProperty("--zoom-y", `${-note.y * 3}%`);
    dialog.showModal();
  });
});

closeButton.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog || event.target === zoomEarth) {
    dialog.close();
  }
});
dialog.addEventListener("close", () => {
  activeMarker?.focus();
  activeMarker = null;
});
