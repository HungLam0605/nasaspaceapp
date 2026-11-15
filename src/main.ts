import Globe from "globe.gl";
import "./style.css";

type PlanetId = "earth" | "mars";

type DetailSlide = {
  heading: string;
  description: string;
  metric?: string;
  source?: string;
  background?: string;
  actionLabel?: string;
};

type Note = {
  number: string;
  category: string;
  title: string;
  slides: DetailSlide[];
  lat: number;
  lng: number;
};

const notes: Record<PlanetId, Note[]> = {
  earth: [
    {
      number: "",
      category: "Chad · Central Sahara",
      title: "Bodélé Depression",
      slides: [
        {
          heading: "A natural dust laboratory",
          description:
            "The Bodélé Depression is an active source of mineral dust in northern Chad. At the Chicha field site, the published BoDEx campaign documented meteorology and aerosol processes near exposed diatomite deposits.",
          metric: "CHICHA FIELD SITE · 16.88° N, 18.53° E · 179 m",
          source: "Todd et al. (2007), BoDEx 2005 site observations.",
          background: "/assets/Bodele1.jpg",
          actionLabel: "Why choose Bodélé?",
        },
        {
          heading: "Dust emission under strong winds",
          description:
            "During a major dust event on 10–12 March 2005, BoDEx recorded a peak two-minute surface wind of 16 m/s. Large-scale deflation, saltation, and suspension were associated with winds near 12 m/s. These are field observations, not safe flight limits.",
          metric: "16 m/s · PEAK TWO-MINUTE SURFACE WIND",
          source:
            "Washington et al. (2006), BoDEx observations; NASA/ASTER imagery (PIA11752).",
          background: "/assets/Bodele2.jpg",
        },
        {
          heading: "A regional wind-lens effect",
          description:
            "A 2003–2023 ERA5/MODIS analysis describes wind acceleration through the surrounding mountain pass and stronger dust-emission conditions at its exit. The study reports winds nearly doubling through the pass and a strong-emission direction cluster near 48°.",
          metric: "2003–2023 · REGIONAL REANALYSIS AND SATELLITE STUDY",
          source: "2025 Geophysical Research Letters wind-lens study.",
          background: "/assets/Bodele3.jpg",
        },
        {
          heading: "A test-site candidate, not a surveyed pad",
          description:
            "The Chicha coordinate is a published field-site point. A stable desert-pavement corridor near the source margin is a candidate staging concept; access, permissions, ground conditions, evacuation routes, and dust hazards still require assessment. Bodélé can support environmental and instrument stress tests, but cannot reproduce Mars gravity or its thin atmosphere.",
          metric: "REGIONAL DUST EVIDENCE: HIGH · CORRIDOR CANDIDATE: MODERATE",
          source:
            "Site status from the supplied SkyFall research package; NASA Earthdata Worldview, MODIS Terra, 15 Jan 2025.",
          background: "/assets/Bodele4.jpg",
        },
      ],
      lat: 16.88,
      lng: 18.53,
    },
  ],
  mars: [
    {
      number: "01",
      category: "Mars · Jezero Crater",
      title: "A thin, dusty atmosphere",
      slides: [
        {
          heading: "Pressure at the surface",
          description:
            "A supplied, previously compiled MEDA workbook reports a mean surface pressure of 720.71 Pa across 18,702 hourly records from sols 1–900. This is a provisional summary, not a complete reprocessing of the public archive.",
          metric: "720.71 Pa · MEAN PRESSURE · SOLS 1–900",
          source: "User-supplied MEDA extract; NASA PDS MEDA archive; image: NASA/JPL-Caltech (PIA23764).",
          background: "/assets/MarsBG1.jpg",
        },
        {
          heading: "Wind measurements have gaps",
          description:
            "The compiled MEDA extract reports a horizontal wind-speed mean of 3.376 m/s and a 95th percentile of 6.721 m/s. Wind appears in only 4,095 of 18,728 hourly rows, so these values do not describe full temporal coverage or gusts.",
          metric: "21.9% · HOURLY ROWS WITH WIND VALUES",
          source:
            "User-supplied MEDA extract; image: NASA/JPL-Caltech/University of Arizona (PIA18244).",
          background: "/assets/MarsBG2.jpg",
        },
        {
          heading: "Dust opacity is wavelength-specific",
          description:
            "A quality-filtered Mars Climate Sounder extract reports dust opacity per kilometre at 21.6 µm. It is an extinction/opacity measure—not dust mass concentration or particle count—and comes from one four-hour orbital product.",
          metric: "MEAN 6.9 × 10⁻⁵ km⁻¹ · P95 4.17 × 10⁻⁴ km⁻¹",
          source:
            "MCS DDR product, 1 July 2025, Ls ≈ 104.28°; NASA PDS; image: NASA/JPL-Caltech (PIA22737).",
          background: "/assets/MarsBG3.jpg",
        },
        {
          heading: "An analogue has limits",
          description:
            "Mars observations help define the environmental context for dust, cameras, wind sensing, and other instruments. Earth-based Bodélé tests can stress-test dust response and visibility, but Earth’s atmospheric density and gravity differ fundamentally from Mars. They cannot validate a Mars rotorcraft flight envelope.",
          metric: "MARS COMPARISONS REQUIRE MATCHED VARIABLES AND QUALITY FLAGS",
          source:
            "SkyFall mission context; image: NASA/JPL-Caltech/University of Arizona/USGS (PIA24814).",
          background: "/assets/MarsBG4.jpg",
        },
      ],
      lat: 18.4,
      lng: 77.7,
    },
  ],
};

const planetIconUrl = new URL("./img/planet-icon.svg", import.meta.url).href;
const earthTextureUrl = new URL("./img/Earth.jpg", import.meta.url).href;
const marsTextureUrl = new URL("./img/Mars.jpg", import.meta.url).href;
const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root element was not found.");
}

app.innerHTML = `
  <div class="loading-screen" role="region" aria-label="Loading page" aria-live="polite" aria-busy="true">
    <span class="loading-orbit" aria-hidden="true"><span></span></span>
    <p class="loading-title">Preparing your experience</p>
    <p class="loading-message">Loading planets and assets</p>
    <button class="loading-retry" type="button" hidden>Reload page</button>
  </div>
  <main class="page-shell">
    <header class="topbar">
      <a class="wordmark" href="#" aria-label="NASA SpaceApps Challenge home">
        <img class="wordmark-icon" src="${planetIconUrl}" alt="" aria-hidden="true" />
        NASA SPACEAPPS CHALLENGE
      </a>
      <button class="topbar-nav-button" type="button" aria-haspopup="dialog">
        WHY BODÉLÉ?
      </button>
    </header>

    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow"><span class="eyebrow-line"></span>Analoguing skyfall testing conditions on Earth</p>
      <h1 id="page-title">Mars <span>at home</span></h1>
      <div class="intro-bottom">
        <p>Choose a planet, drag to spin it, or select a point to explore.</p>
        <p class="instruction"><span aria-hidden="true">↘</span> DRAG TO SPIN · SELECT A POINT</p>
      </div>
    </section>

    <section class="earth-explorer" aria-label="Explore Earth and Mars">
      <div class="planet-stage" role="group" aria-label="Choose a planet to explore">
        <div class="planet-card planet-card-earth is-focused" data-planet-card="earth">
          <div class="planet-globe earth-globe" role="group" aria-label="Interactive Earth globe"></div>
        </div>
        <div class="planet-card planet-card-mars is-unfocused" data-planet-card="mars">
          <div class="planet-globe mars-globe" role="group" aria-label="Mars globe"></div>
        </div>
      </div>
      <button class="slide-button planet-switch-button planet-switch-previous" type="button" aria-label="Switch to Mars">
        <span aria-hidden="true">&lt;</span>
      </button>
      <button class="slide-button planet-switch-button planet-switch-next" type="button" aria-label="Switch to Mars">
        <span aria-hidden="true">&gt;</span>
      </button>
      <span class="planet-indicator" aria-live="polite">EARTH · 01 / 02</span>
    </section>

    <button class="return-focus-button" type="button" aria-hidden="true" disabled>
      RETURN TO FOCUS POINT
    </button>

    <footer class="footer">
      <span>NASA SPACEAPPS CHALLENGE<span class="footer-dot">©</span> 2026</span>
      <span>MADE FOR CURIOSITY</span>
    </footer>

    <span class="cursor-glow" aria-hidden="true"></span>

    <dialog class="detail-dialog" aria-labelledby="dialog-title" closedby="none">
      <span class="detail-black-base" aria-hidden="true"></span>
      <span class="detail-slide-background" data-slide-background="0" aria-hidden="true"></span>
      <span class="detail-slide-background" data-slide-background="1" aria-hidden="true"></span>
      <span class="detail-backdrop" aria-hidden="true"></span>
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
          <div class="detail-description-panel">
            <div class="detail-description-slides" aria-live="polite">
              <div class="detail-description-slide" data-detail-description="0" aria-hidden="true">
                <p class="detail-slide-copy" data-slide-copy></p>
                <p class="detail-slide-metric" data-slide-metric hidden></p>
                <p class="detail-slide-source" data-slide-source hidden></p>
                <button class="detail-slide-action" data-slide-action type="button" hidden></button>
              </div>
              <div class="detail-description-slide" data-detail-description="1" aria-hidden="true">
                <p class="detail-slide-copy" data-slide-copy></p>
                <p class="detail-slide-metric" data-slide-metric hidden></p>
                <p class="detail-slide-source" data-slide-source hidden></p>
                <button class="detail-slide-action" data-slide-action type="button" hidden></button>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-bottom">
          <span>NASA SPACEAPPS CHALLENGE — AN OPEN CANVAS</span>
          <span class="detail-slide-count" aria-live="polite"></span>
        </div>
      </article>
      <button class="slide-button slide-previous" type="button" aria-label="Previous slide">
        <span aria-hidden="true">&lt;</span>
      </button>
      <button class="slide-button slide-next" type="button" aria-label="Next slide">
        <span aria-hidden="true">&gt;</span>
      </button>
    </dialog>
    <dialog class="research-dialog" aria-labelledby="research-title">
      <div class="research-page">
        <header class="research-page-header">
          <p class="eyebrow"><span class="eyebrow-line"></span> SITE SELECTION · CHAD</p>
          <button class="close-button research-close-button" type="button" aria-label="Close site rationale">
            <span aria-hidden="true">×</span>
          </button>
        </header>
        <h2 id="research-title">Why the Bodélé Depression?</h2>
        <p class="research-intro">
          We selected the Chicha field corridor as a candidate Earth site for studying dust, wind, visibility,
          and instrument response relevant to the SkyFall Mars research context—not as a Mars flight simulator.
        </p>
        <div class="research-facts" aria-label="Site facts">
          <div><span>FIELD REFERENCE</span><strong>Chicha, Chad</strong></div>
          <div><span>COORDINATES</span><strong>16.88° N · 18.53° E</strong></div>
          <div><span>ELEVATION</span><strong>179 m</strong></div>
          <div><span>EVIDENCE BASE</span><strong>BoDEx 2005 · 2003–2023 regional analysis</strong></div>
        </div>
        <section class="research-reasons" aria-labelledby="reasons-title">
          <h3 id="reasons-title">Reasons for the choice</h3>
          <ol>
            <li>
              <strong>Published field observations.</strong>
              BoDEx recorded meteorology and aerosol behaviour at the Chicha field site, giving the study a
              traceable observational foundation.
            </li>
            <li>
              <strong>Active dust processes.</strong>
              The depression’s exposed diatomite source and documented dust events make it relevant for
              investigating dust transport, visibility, and sensor response.
            </li>
            <li>
              <strong>A regional wind-lens setting.</strong>
              A 2003–2023 ERA5/MODIS study reports strong, directionally organized winds and dust activity
              around the surrounding pass and its exit.
            </li>
            <li>
              <strong>A testable field-corridor concept.</strong>
              A desert-pavement corridor near the source margin may be a more defensible staging candidate
              than the active plume core, while transects can examine nearby source material.
            </li>
          </ol>
        </section>
        <aside class="research-caveat">
          <strong>Scientific and operational limits</strong>
          <p>
            The coordinate is a published field-site point, not a surveyed landing-pad boundary. Present-day
            access, permits, safety, ground conditions, and dust hazards remain unverified. Regional findings
            are not pad-scale forecasts, and Bodélé cannot reproduce Mars’ low atmospheric density or gravity.
            No single numerical Earth–Mars analogue score is claimed.
          </p>
        </aside>
        <section class="research-sources" aria-labelledby="sources-title">
          <h3 id="sources-title">Selected sources</h3>
          <ul>
            <li><a href="https://doi.org/10.1029/2005JD006502" target="_blank" rel="noreferrer">Washington et al. (2006), BoDEx 2005 dust and low-level circulation observations</a></li>
            <li><a href="https://doi.org/10.1029/2006JD007170" target="_blank" rel="noreferrer">Todd et al. (2007), mineral dust emission during BoDEx 2005</a></li>
            <li><a href="https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2025GL118979" target="_blank" rel="noreferrer">2025 Geophysical Research Letters study of the Bodélé wind-lens effect</a></li>
            <li><a href="https://photojournal.jpl.nasa.gov/catalog/PIA11752" target="_blank" rel="noreferrer">NASA/ASTER, Bodele Sand Dunes, Chad (PIA11752)</a></li>
            <li><a href="https://wvs.earthdata.nasa.gov/" target="_blank" rel="noreferrer">NASA Earthdata Worldview, MODIS Terra imagery (15 January 2025)</a></li>
            <li><a href="https://photojournal.jpl.nasa.gov/catalog/PIA23764" target="_blank" rel="noreferrer">NASA/JPL-Caltech, Perseverance on Mars (PIA23764)</a></li>
            <li><a href="https://photojournal.jpl.nasa.gov/catalog/PIA18244" target="_blank" rel="noreferrer">NASA/JPL-Caltech/University of Arizona, Active Dunes of Nili Patera (PIA18244)</a></li>
            <li><a href="https://photojournal.jpl.nasa.gov/catalog/PIA22737" target="_blank" rel="noreferrer">NASA/JPL-Caltech, Mars Climate Sounder 2018 dust storm (PIA22737)</a></li>
            <li><a href="https://photojournal.jpl.nasa.gov/catalog/PIA24814" target="_blank" rel="noreferrer">NASA/JPL-Caltech/University of Arizona/USGS, Jezero Crater (PIA24814)</a></li>
            <li><a href="https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html" target="_blank" rel="noreferrer">NASA Planetary Data System · MEDA</a></li>
            <li><a href="https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/MARS/aerosols.html" target="_blank" rel="noreferrer">NASA Planetary Data System · Mars Climate Sounder aerosols</a></li>
          </ul>
        </section>
      </div>
      <span class="cursor-glow" aria-hidden="true"></span>
    </dialog>
  </main>
`;

const dialog = app.querySelector<HTMLDialogElement>(".detail-dialog");
const researchDialog = app.querySelector<HTMLDialogElement>(".research-dialog");
const closeButton = app.querySelector<HTMLButtonElement>(".close-button");
const researchCloseButton = app.querySelector<HTMLButtonElement>(".research-close-button");
const researchNavButton = app.querySelector<HTMLButtonElement>(".topbar-nav-button");
const previousSlideButton = app.querySelector<HTMLButtonElement>(".slide-previous");
const nextSlideButton = app.querySelector<HTMLButtonElement>(".slide-next");
const previousPlanetButton = app.querySelector<HTMLButtonElement>(".planet-switch-previous");
const nextPlanetButton = app.querySelector<HTMLButtonElement>(".planet-switch-next");
const intro = app.querySelector<HTMLElement>(".intro");
const category = app.querySelector<HTMLElement>("[data-detail-category]");
const number = app.querySelector<HTMLElement>("[data-detail-number]");
const title = app.querySelector<HTMLElement>("[data-detail-title]");
const firstDescription = app.querySelector<HTMLDivElement>('[data-detail-description="0"]');
const secondDescription = app.querySelector<HTMLDivElement>('[data-detail-description="1"]');
const slideCount = app.querySelector<HTMLElement>(".detail-slide-count");
const firstSlideBackground = app.querySelector<HTMLSpanElement>('[data-slide-background="0"]');
const secondSlideBackground = app.querySelector<HTMLSpanElement>('[data-slide-background="1"]');
const earthGlobeContainer = app.querySelector<HTMLDivElement>(".earth-globe");
const marsGlobeContainer = app.querySelector<HTMLDivElement>(".mars-globe");
const earthPlanetCard = app.querySelector<HTMLDivElement>('[data-planet-card="earth"]');
const marsPlanetCard = app.querySelector<HTMLDivElement>('[data-planet-card="mars"]');
const planetIndicator = app.querySelector<HTMLElement>(".planet-indicator");
const returnFocusButton = app.querySelector<HTMLButtonElement>(".return-focus-button");
const cursorGlows = app.querySelectorAll<HTMLElement>(".cursor-glow");
const loadingScreen = app.querySelector<HTMLDivElement>(".loading-screen");
const loadingMessage = app.querySelector<HTMLParagraphElement>(".loading-message");
const loadingRetryButton = app.querySelector<HTMLButtonElement>(".loading-retry");
let activeMarker: HTMLButtonElement | null = null;
let activeNote: Note | null = null;
let activeNotePlanet: PlanetId | null = null;
let startingPointOfView: { lat: number; lng: number; altitude: number } | null = null;
let isTransitioning = false;
let activePlanetId: PlanetId = "earth";
const visibleDescriptionPoints: Record<PlanetId, Set<string>> = {
  earth: new Set(),
  mars: new Set(),
};
const observedDescriptionPoints: Record<PlanetId, Set<string>> = {
  earth: new Set(),
  mars: new Set(),
};
let activeSlideIndex = 0;
let activeSlideLayerIndex = 0;
let isChangingSlide = false;
let slideTransitionTimeout = 0;
let slideTransitionFrame = 0;

if (
  !dialog ||
  !researchDialog ||
  !closeButton ||
  !researchCloseButton ||
  !researchNavButton ||
  !previousSlideButton ||
  !nextSlideButton ||
  !previousPlanetButton ||
  !nextPlanetButton ||
  !intro ||
  !category ||
  !number ||
  !title ||
  !firstDescription ||
  !secondDescription ||
  !slideCount ||
  !firstSlideBackground ||
  !secondSlideBackground ||
  !earthGlobeContainer ||
  !marsGlobeContainer ||
  !earthPlanetCard ||
  !marsPlanetCard ||
  !planetIndicator ||
  !returnFocusButton ||
  !loadingScreen ||
  !loadingMessage ||
  !loadingRetryButton
) {
  throw new Error("Detail display elements were not found.");
}

const earthGlobe = new Globe(earthGlobeContainer, {
  animateIn: false,
  rendererConfig: { antialias: true, alpha: true },
})
  .globeImageUrl(earthTextureUrl)
  .backgroundColor("rgba(0, 0, 0, 0)")
  .showAtmosphere(true)
  .atmosphereColor("#5a9ed6")
  .atmosphereAltitude(0.12);

const marsGlobe = new Globe(marsGlobeContainer, {
  animateIn: false,
  rendererConfig: { antialias: true, alpha: true },
})
  .globeImageUrl(marsTextureUrl)
  .backgroundColor("rgba(0, 0, 0, 0)")
  .showAtmosphere(true)
  .atmosphereColor("#c46b48")
  .atmosphereAltitude(0.1);

const imageUrls = [
  planetIconUrl,
  earthTextureUrl,
  marsTextureUrl,
  ...Object.values(notes).flatMap((planetNotes) =>
    planetNotes.flatMap((note) =>
      note.slides.flatMap((slide) => (slide.background ? [slide.background] : [])),
    ),
  ),
];
const imagesReady = Promise.all(
  [...new Set(imageUrls)].map(
    (url) =>
      new Promise<void>((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve();
        image.onerror = () => reject(new Error(`Failed to load image: ${url}`));
        image.src = url;

        if (image.complete) {
          if (image.naturalWidth > 0) {
            resolve();
          } else {
            reject(new Error(`Failed to load image: ${url}`));
          }
        }
      }),
  ),
);
const fontsReady = document.fonts.ready;

const revealPage = () => {
  loadingScreen.setAttribute("aria-busy", "false");
  loadingScreen.classList.add("is-hidden");
  loadingScreen.setAttribute("aria-hidden", "true");
};

const showLoadingError = (error: unknown) => {
  console.error("Page startup failed.", error);
  loadingScreen.setAttribute("aria-busy", "false");
  loadingScreen.classList.add("is-error");
  loadingMessage.textContent = "Some assets could not be loaded.";
  loadingRetryButton.hidden = false;
};

loadingRetryButton.addEventListener("click", () => window.location.reload());
void Promise.all([imagesReady, fontsReady])
  .then(revealPage)
  .catch(showLoadingError);

const globes = { earth: earthGlobe, mars: marsGlobe };
const controlsByPlanet = {
  earth: earthGlobe.controls(),
  mars: marsGlobe.controls(),
};
const autoRotateSpeed = 0.3;
const marsDefaultPointOfView = notes.mars[0]
  ? { lat: notes.mars[0].lat, lng: notes.mars[0].lng, altitude: 2.05 }
  : { lat: 18.4, lng: 77.7, altitude: 2.05 };
const defaultPointOfViewByPlanet = {
  earth: { lat: 10, lng: -25, altitude: 2.05 },
  mars: marsDefaultPointOfView,
} satisfies Record<PlanetId, { lat: number; lng: number; altitude: number }>;

(["earth", "mars"] as const).forEach((planetId) => {
  const controls = controlsByPlanet[planetId];
  controls.autoRotate = planetId === activePlanetId;
  controls.autoRotateSpeed = autoRotateSpeed;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enabled = planetId === activePlanetId;
  globes[planetId].pointOfView(defaultPointOfViewByPlanet[planetId]);
});

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;
const transitionDuration = prefersReducedMotion ? 0 : 1000;
const fadeDuration = prefersReducedMotion ? 0 : 900;
const slideTransitionDuration = prefersReducedMotion ? 0 : 900;
let heroIdleTimer = 0;
let autoRotateRampFrame = 0;

const updateReturnFocusButton = () => {
  const isVisible =
    observedDescriptionPoints[activePlanetId].size === notes[activePlanetId].length &&
    visibleDescriptionPoints[activePlanetId].size === 0 &&
    !dialog.open &&
    !isTransitioning;
  returnFocusButton.classList.toggle("is-visible", isVisible);
  returnFocusButton.disabled = !isVisible;
  returnFocusButton.setAttribute("aria-hidden", String(!isVisible));
};

const updatePlanetPresentation = () => {
  const isEarthFocused = activePlanetId === "earth";
  earthPlanetCard.classList.toggle("is-focused", isEarthFocused);
  earthPlanetCard.classList.toggle("is-unfocused", !isEarthFocused);
  marsPlanetCard.classList.toggle("is-focused", !isEarthFocused);
  marsPlanetCard.classList.toggle("is-unfocused", isEarthFocused);
  planetIndicator.textContent = `${isEarthFocused ? "EARTH" : "MARS"} · ${
    isEarthFocused ? "01" : "02"
  } / 02`;

  const otherPlanet = isEarthFocused ? "Mars" : "Earth";
  previousPlanetButton.setAttribute("aria-label", `Switch to ${otherPlanet}`);
  nextPlanetButton.setAttribute("aria-label", `Switch to ${otherPlanet}`);
  previousPlanetButton.disabled = isTransitioning || dialog.open;
  nextPlanetButton.disabled = isTransitioning || dialog.open;
};

const stopAutoRotateRamp = () => {
  if (autoRotateRampFrame) {
    cancelAnimationFrame(autoRotateRampFrame);
    autoRotateRampFrame = 0;
  }
  controlsByPlanet[activePlanetId].autoRotateSpeed = autoRotateSpeed;
};

const resumeAutoRotate = () => {
  stopAutoRotateRamp();
  const controls = controlsByPlanet[activePlanetId];
  controls.autoRotate = true;

  if (prefersReducedMotion) {
    return;
  }

  const rampDuration = 3000;
  const startTime = performance.now();
  controls.autoRotateSpeed = 0;

  const rampSpeed = (time: number) => {
    const progress = Math.min((time - startTime) / rampDuration, 1);
    controls.autoRotateSpeed = autoRotateSpeed * progress * progress;

    if (progress < 1) {
      autoRotateRampFrame = requestAnimationFrame(rampSpeed);
    } else {
      autoRotateRampFrame = 0;
    }
  };

  autoRotateRampFrame = requestAnimationFrame(rampSpeed);
};

const populateDescriptionLayer = (layer: HTMLDivElement, slide: DetailSlide) => {
  const copy = layer.querySelector<HTMLParagraphElement>("[data-slide-copy]");
  const metric = layer.querySelector<HTMLParagraphElement>("[data-slide-metric]");
  const source = layer.querySelector<HTMLParagraphElement>("[data-slide-source]");
  const action = layer.querySelector<HTMLButtonElement>("[data-slide-action]");
  if (!copy || !metric || !source || !action) {
    throw new Error("Description slide content elements were not found.");
  }

  copy.textContent = slide.description;
  metric.textContent = slide.metric ?? "";
  metric.hidden = !slide.metric;
  source.textContent = slide.source ?? "";
  source.hidden = !slide.source;
  action.textContent = slide.actionLabel ?? "";
  action.hidden = !slide.actionLabel;
  action.disabled = !slide.actionLabel;
};

const renderSlide = (note: Note) => {
  const slide = note.slides[activeSlideIndex];
  if (!slide) {
    throw new Error("Detail slide was not found.");
  }

  const descriptionLayers = [firstDescription, secondDescription];
  const backgroundLayers = [firstSlideBackground, secondSlideBackground];
  descriptionLayers.forEach((layer) => {
    layer.classList.remove("is-active", "is-incoming", "is-fading-in", "is-fading-out");
    layer.setAttribute("aria-hidden", "true");
    const action = layer.querySelector<HTMLButtonElement>("[data-slide-action]");
    if (!action) {
      throw new Error("Description slide action was not found.");
    }
    action.hidden = true;
    action.disabled = true;
  });
  backgroundLayers.forEach((layer) => {
    layer.classList.remove("is-active", "is-incoming", "is-fading-in");
    layer.style.backgroundImage = "";
  });

  const activeDescriptionLayer = descriptionLayers[activeSlideLayerIndex];
  const activeBackgroundLayer = backgroundLayers[activeSlideLayerIndex];

  if (!activeDescriptionLayer || !activeBackgroundLayer) {
    throw new Error("Active slide layers were not found.");
  }

  title.textContent = slide.heading;
  populateDescriptionLayer(activeDescriptionLayer, slide);
  activeDescriptionLayer.setAttribute("aria-hidden", "false");
  activeDescriptionLayer.classList.add("is-active");
  activeBackgroundLayer.style.backgroundImage = slide.background
    ? `url("${slide.background}")`
    : "";
  activeBackgroundLayer.classList.add("is-active");
  const hasMultipleSlides = note.slides.length > 1;
  previousSlideButton.hidden = !hasMultipleSlides;
  nextSlideButton.hidden = !hasMultipleSlides;
  slideCount.hidden = !hasMultipleSlides;
  slideCount.textContent = `${String(activeSlideIndex + 1).padStart(2, "0")} / ${String(
    note.slides.length,
  ).padStart(2, "0")}`;
};

const changeSlide = (direction: -1 | 1) => {
  if (!activeNote || !dialog.open || isChangingSlide) {
    return;
  }

  const note = activeNote;
  const nextSlideIndex = (activeSlideIndex + direction + note.slides.length) % note.slides.length;
  const nextSlide = note.slides[nextSlideIndex];
  if (!nextSlide) {
    throw new Error("Next detail slide was not found.");
  }

  const previousLayerIndex = activeSlideLayerIndex;
  const nextLayerIndex = 1 - previousLayerIndex;
  const descriptionLayers = [firstDescription, secondDescription];
  const backgroundLayers = [firstSlideBackground, secondSlideBackground];
  const previousDescription = descriptionLayers[previousLayerIndex];
  const nextDescription = descriptionLayers[nextLayerIndex];
  const previousBackground = backgroundLayers[previousLayerIndex];
  const nextBackground = backgroundLayers[nextLayerIndex];
  if (!previousDescription || !nextDescription || !previousBackground || !nextBackground) {
    throw new Error("Slide transition layers were not found.");
  }
  const previousAction = previousDescription.querySelector<HTMLButtonElement>("[data-slide-action]");
  const nextAction = nextDescription.querySelector<HTMLButtonElement>("[data-slide-action]");
  if (!previousAction || !nextAction) {
    throw new Error("Description slide actions were not found.");
  }

  isChangingSlide = true;
  previousSlideButton.disabled = true;
  nextSlideButton.disabled = true;

  title.textContent = nextSlide.heading;
  populateDescriptionLayer(nextDescription, nextSlide);
  nextAction.disabled = true;
  nextDescription.setAttribute("aria-hidden", "false");
  nextDescription.classList.add("is-incoming");
  previousDescription.setAttribute("aria-hidden", "true");
  previousAction.hidden = true;
  previousAction.disabled = true;
  nextBackground.style.backgroundImage = nextSlide.background
    ? `url("${nextSlide.background}")`
    : "";
  nextBackground.classList.add("is-incoming");
  activeSlideIndex = nextSlideIndex;
  slideCount.textContent = `${String(activeSlideIndex + 1).padStart(2, "0")} / ${String(
    note.slides.length,
  ).padStart(2, "0")}`;

  slideTransitionFrame = requestAnimationFrame(() => {
    slideTransitionFrame = 0;
    previousDescription.classList.add("is-fading-out");
    nextDescription.classList.add("is-fading-in");
    nextBackground.classList.add("is-fading-in");
    slideTransitionTimeout = window.setTimeout(() => {
      slideTransitionTimeout = 0;
      previousDescription.classList.remove("is-active");
      previousDescription.classList.remove("is-fading-out");
      previousBackground.classList.remove("is-active");
      previousBackground.style.backgroundImage = "";
      nextDescription.classList.remove("is-incoming", "is-fading-in");
      nextDescription.classList.add("is-active");
      nextBackground.classList.remove("is-incoming", "is-fading-in");
      nextBackground.classList.add("is-active");
      activeSlideLayerIndex = nextLayerIndex;
      isChangingSlide = false;
      nextAction.disabled = !nextSlide.actionLabel;
      previousSlideButton.disabled = false;
      nextSlideButton.disabled = false;
    }, slideTransitionDuration);
  });
};

const hideHeroAndScheduleReturn = () => {
  intro.classList.add("is-faded");
  window.clearTimeout(heroIdleTimer);

  if (dialog.open || isTransitioning) {
    return;
  }

  heroIdleTimer = window.setTimeout(() => {
      if (!dialog.open && !isTransitioning && !earthPointer?.isDragging) {
      intro.classList.remove("is-faded");
    }
  }, 3500);
};

const switchPlanet = () => {
  if (isTransitioning || dialog.open) {
    return;
  }

  isTransitioning = true;
  stopAutoRotateRamp();
  const previousPlanet = activePlanetId;
  const nextPlanet: PlanetId = previousPlanet === "earth" ? "mars" : "earth";
  controlsByPlanet[previousPlanet].autoRotate = false;
  controlsByPlanet[previousPlanet].enabled = false;
  controlsByPlanet[nextPlanet].autoRotate = false;
  controlsByPlanet[nextPlanet].enabled = false;
  activePlanetId = nextPlanet;
  updatePlanetPresentation();
  updateReturnFocusButton();
  globes[nextPlanet].pointOfView(defaultPointOfViewByPlanet[nextPlanet], transitionDuration);

  window.setTimeout(() => {
    controlsByPlanet[nextPlanet].enabled = true;
    isTransitioning = false;
    updatePlanetPresentation();
    updateReturnFocusButton();
    resumeAutoRotate();
  }, transitionDuration);
};

const openNote = (note: Note, marker: HTMLButtonElement, planetId: PlanetId) => {
  if (isTransitioning || dialog.open || planetId !== activePlanetId) {
    return;
  }

  isTransitioning = true;
  hideHeroAndScheduleReturn();
  stopAutoRotateRamp();
  activeNotePlanet = planetId;
  const globe = globes[planetId];
  const controls = controlsByPlanet[planetId];
  const planetCard = planetId === "earth" ? earthPlanetCard : marsPlanetCard;
  activeMarker = marker;
  activeNote = note;
  planetCard.classList.add("is-zooming");
  marker.classList.add("is-selected");
  startingPointOfView = globe.pointOfView();
  controls.autoRotate = false;
  controls.enabled = false;
  activeSlideIndex = 0;
  activeSlideLayerIndex = 0;
  category.textContent = note.category;
  number.textContent = note.number;
  title.textContent = note.title;
  renderSlide(note);
  globe.pointOfView(
    { lat: note.lat, lng: note.lng, altitude: 0.45 },
    transitionDuration,
  );

  window.setTimeout(() => {
    dialog.showModal();
    requestAnimationFrame(() => dialog.classList.add("is-visible"));
    isTransitioning = false;
    updatePlanetPresentation();
    updateReturnFocusButton();
  }, transitionDuration);
};

const addPlanetMarkers = (planetId: PlanetId) => {
  const planetNotes = notes[planetId];
  globes[planetId]
    .htmlElementsData(planetNotes)
    .htmlLat("lat")
    .htmlLng("lng")
    .htmlElement((data) => {
      const note = data as Note;
      const marker = document.createElement("button");

      marker.className = "earth-marker";
      marker.type = "button";
      marker.style.pointerEvents = "auto";
      marker.dataset.note = note.number;
      marker.setAttribute("aria-haspopup", "dialog");
      marker.setAttribute("aria-label", `Explore ${note.category}: ${note.title}`);
      marker.addEventListener("click", () => openNote(note, marker, planetId));

      return marker;
    })
    .htmlElementVisibilityModifier((element, isVisible) => {
      const marker = element as HTMLButtonElement;
      const noteNumber = marker.dataset.note;
      if (noteNumber === undefined) {
        throw new Error("Description point marker is missing its note number.");
      }
      marker.classList.toggle("is-globe-hidden", !isVisible);
      observedDescriptionPoints[planetId].add(noteNumber);
      if (isVisible) {
        visibleDescriptionPoints[planetId].add(noteNumber);
      } else {
        visibleDescriptionPoints[planetId].delete(noteNumber);
      }
      if (planetId === activePlanetId) {
        updateReturnFocusButton();
      }
    });
};

addPlanetMarkers("earth");
addPlanetMarkers("mars");
updatePlanetPresentation();
previousPlanetButton.addEventListener("click", switchPlanet);
nextPlanetButton.addEventListener("click", switchPlanet);

returnFocusButton.addEventListener("click", () => {
  if (isTransitioning || dialog.open) {
    return;
  }

  const focusNote = notes[activePlanetId][0];
  if (!focusNote) {
    throw new Error("Planet focus point was not found.");
  }

  const globe = globes[activePlanetId];
  const controls = controlsByPlanet[activePlanetId];
  isTransitioning = true;
  stopAutoRotateRamp();
  controls.enabled = false;
  controls.autoRotate = false;
  window.clearTimeout(heroIdleTimer);
  intro.classList.add("is-faded");
  updatePlanetPresentation();
  updateReturnFocusButton();
  globe.pointOfView(
    { lat: focusNote.lat, lng: focusNote.lng, altitude: 2.05 },
    transitionDuration,
  );

  window.setTimeout(() => {
    controls.enabled = true;
    visibleDescriptionPoints[activePlanetId].add(focusNote.number);
    isTransitioning = false;
    updatePlanetPresentation();
    updateReturnFocusButton();
    intro.classList.remove("is-faded");
    resumeAutoRotate();
  }, transitionDuration);
});

const resizeGlobe = () => {
  const isMobile = window.matchMedia("(max-width: 700px)").matches;
  const widthBasedSize = isMobile
    ? Math.min(window.innerWidth, 560) * 0.94
    : window.innerWidth * 0.72;
  const displaySize = Math.min(
    widthBasedSize,
    window.innerHeight * (isMobile ? 0.65 : 0.78),
    isMobile ? 620 : 760,
  );
  const renderSize = Math.min(window.innerWidth, window.innerHeight);
  const restScale = displaySize / renderSize;
  earthPlanetCard.style.setProperty("--planet-rest-scale", String(restScale));
  marsPlanetCard.style.setProperty("--planet-rest-scale", String(restScale));
  earthGlobe.width(earthGlobeContainer.clientWidth).height(earthGlobeContainer.clientHeight);
  marsGlobe.width(marsGlobeContainer.clientWidth).height(marsGlobeContainer.clientHeight);
};
const earthGlobeResizeObserver = new ResizeObserver(resizeGlobe);
const marsGlobeResizeObserver = new ResizeObserver(resizeGlobe);
earthGlobeResizeObserver.observe(earthGlobeContainer);
marsGlobeResizeObserver.observe(marsGlobeContainer);
window.addEventListener("resize", resizeGlobe);
resizeGlobe();

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

let earthPointer: {
  planetId: PlanetId;
  pointerId: number;
  startX: number;
  startY: number;
  isDragging: boolean;
} | null = null;

const trackPlanetPointer = (planetId: PlanetId) => (event: PointerEvent) => {
  if (planetId !== activePlanetId || dialog.open || isTransitioning) {
    return;
  }

  earthPointer = {
    planetId,
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    isDragging: false,
  };
};

earthGlobeContainer.addEventListener("pointerdown", trackPlanetPointer("earth"));
marsGlobeContainer.addEventListener("pointerdown", trackPlanetPointer("mars"));

document.addEventListener("pointermove", (event) => {
  if (
    !earthPointer ||
    event.pointerId !== earthPointer.pointerId ||
    earthPointer.planetId !== activePlanetId
  ) {
    return;
  }

  if (
    !earthPointer.isDragging &&
    Math.hypot(event.clientX - earthPointer.startX, event.clientY - earthPointer.startY) < 5
  ) {
    return;
  }

  earthPointer.isDragging = true;
  hideHeroAndScheduleReturn();
});

const clearEarthPointer = (event: PointerEvent) => {
  if (earthPointer?.pointerId === event.pointerId) {
    const wasDragging = earthPointer.isDragging;
    earthPointer = null;
    if (wasDragging) {
      hideHeroAndScheduleReturn();
    }
  }
};

document.addEventListener("pointerup", clearEarthPointer);
document.addEventListener("pointercancel", clearEarthPointer);

const closeNote = () => {
  if (!dialog.open || isTransitioning) {
    return;
  }

  window.clearTimeout(slideTransitionTimeout);
  slideTransitionTimeout = 0;
  if (slideTransitionFrame) {
    cancelAnimationFrame(slideTransitionFrame);
    slideTransitionFrame = 0;
  }
  isChangingSlide = false;
  previousSlideButton.disabled = false;
  nextSlideButton.disabled = false;
  isTransitioning = true;
  dialog.classList.remove("is-visible");
  window.setTimeout(() => dialog.close(), fadeDuration);
};

const openResearchPage = () => {
  if (!researchDialog.open) {
    researchDialog.showModal();
  }
};

closeButton.addEventListener("click", closeNote);
researchNavButton.addEventListener("click", openResearchPage);
researchCloseButton.addEventListener("click", () => researchDialog.close());
app.querySelectorAll<HTMLButtonElement>("[data-slide-action]").forEach((button) => {
  button.addEventListener("click", openResearchPage);
});
previousSlideButton.addEventListener("click", () => changeSlide(-1));
nextSlideButton.addEventListener("click", () => changeSlide(1));
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
});
dialog.addEventListener("close", () => {
  const pointOfView = startingPointOfView;
  const planetId = activeNotePlanet ?? activePlanetId;
  const globe = globes[planetId];
  const controls = controlsByPlanet[planetId];
  earthPlanetCard.classList.remove("is-zooming");
  marsPlanetCard.classList.remove("is-zooming");
  if (!pointOfView) {
    controls.enabled = planetId === activePlanetId;
    controls.autoRotate = planetId === activePlanetId;
    isTransitioning = false;
    updatePlanetPresentation();
    updateReturnFocusButton();
    return;
  }

  globe.pointOfView(pointOfView, transitionDuration);
  window.setTimeout(() => {
    controls.enabled = planetId === activePlanetId;
    controls.autoRotate = planetId === activePlanetId;
    isTransitioning = false;
    hideHeroAndScheduleReturn();
    activeMarker?.classList.remove("is-selected");
    activeMarker?.focus();
    activeMarker = null;
    activeNote = null;
    activeNotePlanet = null;
    startingPointOfView = null;
    updatePlanetPresentation();
    updateReturnFocusButton();
  }, transitionDuration);
});

/* 
Hung Created this website for NASA Space Apps 2026 as part of a collaborative project,
#Mypastisnottoday
#Friendshipismagic
*/