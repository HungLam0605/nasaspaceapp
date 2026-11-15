import Globe from "globe.gl";
import "./style.css";

type PlanetId = "earth" | "mars";

type Note = {
  number: string;
  category: string;
  title: string;
  slides: { description: string; background?: string }[];
  lat: number;
  lng: number;
};

const notes: Record<PlanetId, Note[]> = {
  earth: [
    {
      number: "",
      category: "Africa",
      title: "Bodele Depression",
      slides: [
        {
          description: "Follow the unexpected links between people, places, and ideas.",
          background: "/assets/Bodele1.jpg",
        },
        {
          description:
            "Notice how a change in one place can ripple across a landscape, a community, or an ecosystem.",
          background: "/assets/Bodele2.jpg",
        },
        {
          description: "Bring one of those connections into focus—and follow where it leads.",
          background: "/assets/Bodele3.jpg",
        },
      ],
      lat: 17,
      lng: 18,
    },
  ],
  mars: [
    {
      number: "01",
      category: "Mars · Site 01",
      title: "A point to explore",
      slides: [{ description: "Placeholder description for a location on Mars." }],
      lat: 23.5,
      lng: -132.4,
    },
    {
      number: "02",
      category: "Mars · Site 02",
      title: "Another red-world marker",
      slides: [{ description: "A second temporary point of interest on Mars." }],
      lat: -13.9,
      lng: -59.2,
    },
    {
      number: "03",
      category: "Mars · Site 03",
      title: "A distant landmark",
      slides: [{ description: "A third placeholder point for future Mars content." }],
      lat: -5.4,
      lng: 137.8,
    },
  ],
};

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
          <div class="detail-description-slides" aria-live="polite">
            <p class="detail-description-slide" data-detail-description="0" aria-hidden="true"></p>
            <p class="detail-description-slide" data-detail-description="1" aria-hidden="true"></p>
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
  </main>
`;

const dialog = app.querySelector<HTMLDialogElement>(".detail-dialog");
const closeButton = app.querySelector<HTMLButtonElement>(".close-button");
const previousSlideButton = app.querySelector<HTMLButtonElement>(".slide-previous");
const nextSlideButton = app.querySelector<HTMLButtonElement>(".slide-next");
const previousPlanetButton = app.querySelector<HTMLButtonElement>(".planet-switch-previous");
const nextPlanetButton = app.querySelector<HTMLButtonElement>(".planet-switch-next");
const intro = app.querySelector<HTMLElement>(".intro");
const category = app.querySelector<HTMLElement>("[data-detail-category]");
const number = app.querySelector<HTMLElement>("[data-detail-number]");
const title = app.querySelector<HTMLElement>("[data-detail-title]");
const firstDescription = app.querySelector<HTMLParagraphElement>('[data-detail-description="0"]');
const secondDescription = app.querySelector<HTMLParagraphElement>('[data-detail-description="1"]');
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
  !closeButton ||
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
  !returnFocusButton
) {
  throw new Error("Detail display elements were not found.");
}

const earthGlobe = new Globe(earthGlobeContainer, {
  animateIn: false,
  rendererConfig: { antialias: true, alpha: true },
})
  .globeImageUrl(new URL("./img/Earth.jpg", import.meta.url).href)
  .backgroundColor("rgba(0, 0, 0, 0)")
  .showAtmosphere(true)
  .atmosphereColor("#5a9ed6")
  .atmosphereAltitude(0.12);

const marsGlobe = new Globe(marsGlobeContainer, {
  animateIn: false,
  rendererConfig: { antialias: true, alpha: true },
})
  .globeImageUrl(new URL("./img/Mars.jpg", import.meta.url).href)
  .backgroundColor("rgba(0, 0, 0, 0)")
  .showAtmosphere(true)
  .atmosphereColor("#c46b48")
  .atmosphereAltitude(0.1);

const globes = { earth: earthGlobe, mars: marsGlobe };
const controlsByPlanet = {
  earth: earthGlobe.controls(),
  mars: marsGlobe.controls(),
};
const autoRotateSpeed = 0.3;
const defaultPointOfView = { lat: 10, lng: -25, altitude: 2.05 };

(["earth", "mars"] as const).forEach((planetId) => {
  const controls = controlsByPlanet[planetId];
  controls.autoRotate = planetId === activePlanetId;
  controls.autoRotateSpeed = autoRotateSpeed;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enabled = planetId === activePlanetId;
  globes[planetId].pointOfView(defaultPointOfView);
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

const renderSlide = (note: Note) => {
  const slide = note.slides[activeSlideIndex];
  if (!slide) {
    throw new Error("Detail slide was not found.");
  }

  const descriptionLayers = [firstDescription, secondDescription];
  const backgroundLayers = [firstSlideBackground, secondSlideBackground];
  descriptionLayers.forEach((layer) => {
    layer.classList.remove("is-active", "is-incoming", "is-fading-in", "is-fading-out");
    layer.textContent = "";
    layer.setAttribute("aria-hidden", "true");
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

  activeDescriptionLayer.textContent = slide.description;
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

  isChangingSlide = true;
  previousSlideButton.disabled = true;
  nextSlideButton.disabled = true;

  nextDescription.textContent = nextSlide.description;
  nextDescription.setAttribute("aria-hidden", "false");
  nextDescription.classList.add("is-incoming");
  previousDescription.setAttribute("aria-hidden", "true");
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
      previousDescription.textContent = "";
      previousBackground.classList.remove("is-active");
      previousBackground.style.backgroundImage = "";
      nextDescription.classList.remove("is-incoming", "is-fading-in");
      nextDescription.classList.add("is-active");
      nextBackground.classList.remove("is-incoming", "is-fading-in");
      nextBackground.classList.add("is-active");
      activeSlideLayerIndex = nextLayerIndex;
      isChangingSlide = false;
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
  globes[nextPlanet].pointOfView(defaultPointOfView, transitionDuration);

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

closeButton.addEventListener("click", closeNote);
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
