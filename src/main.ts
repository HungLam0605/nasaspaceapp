import Globe from "globe.gl";
import "./style.css";

type PlanetId = "earth" | "mars";

type DetailSlide = {
  heading: string;
  description: string;
  metric?: string;
  chart?: {
    title: string;
    scaleMax: number;
    scaleLabel: string;
    note?: string;
    values: { label: string; value: number; display: string }[];
  };
  source?: string;
  background?: string;
  photoCredit: {
    label: string;
    href: string;
  };
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
          photoCredit: {
            label: "NASA Earthdata Worldview · MODIS Terra",
            href: "https://wvs.earthdata.nasa.gov/",
          },
          actionLabel: "Why choose Bodélé?",
        },
        {
          heading: "Dust emission under strong winds",
          description:
            "During a major dust event on 10–12 March 2005, BoDEx recorded a peak two-minute surface wind of 16 m/s. Large-scale deflation, saltation, and suspension were associated with winds near 12 m/s. These are field observations, not safe flight limits.",
          metric: "16 m/s · PEAK TWO-MINUTE SURFACE WIND",
          chart: {
            title: "BoDEx surface wind observations",
            scaleMax: 20,
            scaleLabel: "Scale: 0–20 m/s",
            note: "The 12 m/s value is associated with widespread dust mobilization; 16 m/s was the peak two-minute surface wind during the March 2005 event.",
            values: [
              { label: "Dust mobilization", value: 12, display: "12 m/s" },
              { label: "Event peak", value: 16, display: "16 m/s" },
            ],
          },
          source:
            "Washington et al. (2006), BoDEx observations; NASA/ASTER imagery (PIA11752).",
          background: "/assets/Bodele2.jpg",
          photoCredit: {
            label: "NASA/ASTER · PIA11752",
            href: "https://photojournal.jpl.nasa.gov/catalog/PIA11752",
          },
        },
        {
          heading: "A regional wind-lens effect",
          description:
            "A 2003–2023 ERA5/MODIS analysis describes wind acceleration through the surrounding mountain pass and stronger dust-emission conditions at its exit. The study reports winds nearly doubling through the pass and a strong-emission direction cluster near 48°.",
          metric: "2003–2023 · REGIONAL REANALYSIS AND SATELLITE STUDY",
          chart: {
            title: "Reported wind amplification through the pass",
            scaleMax: 2,
            scaleLabel: "Relative wind speed",
            note: "Schematic comparison: the study describes wind speeds as nearly doubled, not an exact fixed ratio.",
            values: [
              { label: "Upwind reference", value: 1, display: "1× reference" },
              { label: "Through-pass flow", value: 2, display: "Nearly 2×" },
            ],
          },
          source: "2025 Geophysical Research Letters wind-lens study.",
          background: "/assets/Bodele3.jpg",
          photoCredit: {
            label: "NASA Earthdata Worldview · MODIS Terra",
            href: "https://wvs.earthdata.nasa.gov/",
          },
        },
        {
          heading: "Wind-lens behavior and campaign direction",
          description:
            "The 2025 wind-lens study identifies a regime split near 8 m/s at the exit region and a strong dust-emission direction cluster near 48°. The broad analysis boxes represent regional flow patterns, not operational test boundaries or flight corridors.",
          metric: "8 m/s · REGIME SPLIT · 48° DUST-EMISSION CLUSTER",
          source: "2025 Geophysical Research Letters wind-lens study; broad study boxes only.",
          background: "/assets/SkyFallSurveyBackground.jpg",
          photoCredit: {
            label: "NASA/JPL-Caltech/University of Arizona/USGS · PIA24814",
            href: "https://photojournal.jpl.nasa.gov/catalog/PIA24814",
          },
        },
        {
          heading: "A test-site candidate, not a surveyed pad",
          description:
            "The Chicha coordinate is a published field-site point. A stable desert-pavement corridor near the eastern/southeastern margin of the exposed diatomite is a candidate staging concept; access, permissions, ground conditions, evacuation routes, and dust hazards still require assessment. Bodélé can support environmental and instrument stress tests, but cannot reproduce Mars gravity or its thin atmosphere.",
          metric: "REGIONAL DUST EVIDENCE: HIGH · CORRIDOR CANDIDATE: MODERATE · PAD SUITABILITY: NOT ASSESSED",
          source:
            "Site status from the supplied SkyFall research package; NASA Earthdata Worldview, MODIS Terra, 15 Jan 2025.",
          background: "/assets/Bodele4.jpg",
          photoCredit: {
            label: "NASA Earthdata Worldview · MODIS Terra · 15 Jan 2025",
            href: "https://wvs.earthdata.nasa.gov/",
          },
        },
      ],
      lat: 16.88,
      lng: 18.53,
    },
  ],
  mars: [
    {
      number: "",
      category: "Mars · Representative location",
      title: "A thin, dusty atmosphere",
      slides: [
        {
          heading: "Pressure at the surface",
          description:
            "The point shown on the Mars selector is representative only; it does not mark one exact research site or a single location where all observations summarized here were collected. A supplied, previously compiled MEDA workbook reports a mean surface pressure of 720.71 Pa across 18,728 hourly rows from sols 1–900. This is a provisional summary, not a complete reprocessing of the public archive.",
          metric: "720.71 Pa · MEAN PRESSURE · SOLS 1–900",
          chart: {
            title: "MEDA surface pressure summary",
            scaleMax: 900,
            scaleLabel: "Scale: 0–900 Pa",
            note: "P05–P95 interval from a provisional user-supplied compilation; not a full archive reprocessing.",
            values: [
              { label: "5th percentile", value: 630.61, display: "630.61 Pa" },
              { label: "Median", value: 734.27, display: "734.27 Pa" },
              { label: "Mean", value: 720.71, display: "720.71 Pa" },
              { label: "95th percentile", value: 789.44, display: "789.44 Pa" },
            ],
          },
          source: "User-supplied MEDA extract; NASA PDS MEDA archive; image: NASA/JPL-Caltech (PIA23764).",
          background: "/assets/MarsBG1.jpg",
          photoCredit: {
            label: "NASA/JPL-Caltech · PIA23764",
            href: "https://photojournal.jpl.nasa.gov/catalog/PIA23764",
          },
        },
        {
          heading: "Wind measurements have gaps",
          description:
            "The compiled MEDA extract reports a horizontal wind-speed mean of 3.376 m/s and a 95th percentile of 6.721 m/s. Wind appears in only 4,095 of 18,728 hourly rows, so these values do not describe full temporal coverage or gusts.",
          metric: "21.9% · HOURLY ROWS WITH WIND VALUES",
          chart: {
            title: "MEDA horizontal wind speed",
            scaleMax: 8,
            scaleLabel: "Scale: 0–8 m/s",
            note: "Only 4,095 of 18,728 hourly rows contain wind values (21.9%); these summaries do not represent full temporal coverage or gusts.",
            values: [
              { label: "Mean", value: 3.376, display: "3.376 m/s" },
              { label: "95th percentile", value: 6.721, display: "6.721 m/s" },
            ],
          },
          source:
            "User-supplied MEDA extract; image: NASA/JPL-Caltech/University of Arizona (PIA18244).",
          background: "/assets/MarsBG2.jpg",
          photoCredit: {
            label: "NASA/JPL-Caltech/University of Arizona · PIA18244",
            href: "https://photojournal.jpl.nasa.gov/catalog/PIA18244",
          },
        },
        {
          heading: "MEDA signals are partial and easy to overread",
          description:
            "The supplied MEDA workbook spans 18,728 hourly rows over 836 represented sol-days, but wind values appear in only 4,095 rows (21.9%). Relative humidity is available in 16,008 rows, and the reported wind-direction mean is arithmetic, not circular, so it should not be treated as a valid average direction.",
          metric: "18,728 HOURLY ROWS · 4,095 WITH WIND · 16,008 WITH HUMIDITY",
          source: "User-supplied MEDA extract; verify sensor definitions and quality flags before interpreting.",
          background: "/assets/SkyFallSurveyBackground.jpg",
          photoCredit: {
            label: "NASA/JPL-Caltech/University of Arizona/USGS · PIA24814",
            href: "https://photojournal.jpl.nasa.gov/catalog/PIA24814",
          },
        },
        {
          heading: "Dust opacity is wavelength-specific",
          description:
            "A quality-filtered Mars Climate Sounder extract reports dust opacity per kilometre at 21.6 µm. It is an extinction/opacity measure—not dust mass concentration or particle count—and comes from one four-hour orbital product.",
          metric: "MEAN 6.9 × 10⁻⁵ km⁻¹ · P95 4.17 × 10⁻⁴ km⁻¹",
          chart: {
            title: "MCS dust opacity at 21.6 µm",
            scaleMax: 0.0005,
            scaleLabel: "Scale: 0–5 × 10⁻⁴ km⁻¹",
            note: "A quality-filtered extract from one four-hour product; opacity is not dust mass concentration or particle count.",
            values: [
              { label: "Median", value: 0.000004, display: "4 × 10⁻⁶ km⁻¹" },
              { label: "Mean", value: 0.000069, display: "6.9 × 10⁻⁵ km⁻¹" },
              { label: "95th percentile", value: 0.000417, display: "4.17 × 10⁻⁴ km⁻¹" },
            ],
          },
          source:
            "MCS DDR product, 1 July 2025, Ls ≈ 104.28°; NASA PDS; image: NASA/JPL-Caltech (PIA22737).",
          background: "/assets/MarsBG3.jpg",
          photoCredit: {
            label: "NASA/JPL-Caltech · PIA22737",
            href: "https://photojournal.jpl.nasa.gov/catalog/PIA22737",
          },
        },
        {
          heading: "An analogue has limits",
          description:
            "Mars observations help define the environmental context for dust, cameras, wind sensing, and other instruments. Earth-based Bodélé tests can stress-test dust response and visibility, but Earth’s atmospheric density and gravity differ fundamentally from Mars. They cannot validate a Mars rotorcraft flight envelope.",
          metric: "MARS COMPARISONS REQUIRE MATCHED VARIABLES AND QUALITY FLAGS",
          source:
            "SkyFall mission context; image: NASA/JPL-Caltech/University of Arizona/USGS (PIA24814).",
          background: "/assets/MarsBG4.jpg",
          photoCredit: {
            label: "NASA/JPL-Caltech/University of Arizona/USGS · PIA24814",
            href: "https://photojournal.jpl.nasa.gov/catalog/PIA24814",
          },
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
const soaringAudioUrl = new URL("./song/Soaring.mp3", import.meta.url).href;
const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("App root element was not found.");
}

app.innerHTML = `
  <div class="loading-screen" role="region" aria-label="Loading page" aria-live="polite" aria-busy="true">
    <span class="loading-orbit" aria-hidden="true"><span></span></span>
    <p class="loading-title">Preparing the SkyFall analogue</p>
    <p class="loading-message">Loading Earth and Mars research assets</p>
    <button class="loading-retry" type="button" hidden>Reload page</button>
  </div>
  <main class="page-shell">
    <header class="topbar">
      <a class="wordmark" href="#" aria-label="NASA SpaceApps Challenge home">
        <img class="wordmark-icon" src="${planetIconUrl}" alt="" aria-hidden="true" />
        NASA SPACEAPPS CHALLENGE
      </a>
      <div class="topbar-actions">
        <button class="topbar-motion-toggle" type="button" aria-label="Low motion" aria-pressed="false">
          LOW MOTION <span class="motion-switch" aria-hidden="true"><span></span></span>
        </button>
        <button class="topbar-audio-toggle" type="button" aria-label="Mute audio" aria-pressed="false" title="Mute audio">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10v4h4l5 4V6l-5 4H4Z" />
            <path class="audio-wave" d="M16 9a5 5 0 0 1 0 6m2-9a9 9 0 0 1 0 12" />
          </svg>
        </button>
        <button class="topbar-nav-button" type="button" aria-haspopup="dialog">
          WHY BODÉLÉ?
        </button>
      </div>
    </header>

    <section class="intro" aria-labelledby="page-title">
      <p class="eyebrow"><span class="eyebrow-line"></span>Analoguing skyfall testing conditions on Earth</p>
      <h1 id="page-title"><span class="hero-mars">Mars</span> at <span class="hero-earth">home</span></h1>
      <div class="intro-bottom">
        <p>Choose a planet, drag to spin it, or select a point to explore.</p>
        <p class="instruction"><span aria-hidden="true">↘</span> DRAG TO SPIN · SELECT A POINT</p>
      </div>
    </section>

    <section class="earth-explorer" aria-label="Explore Earth and Mars">
      <canvas class="starfield" aria-hidden="true"></canvas>
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
      <span>EARTH TO MARS ANALOGUE</span>
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
          <h2 id="dialog-title">
            <span class="detail-title-layer" data-detail-title-layer="0" aria-hidden="true"></span>
            <span class="detail-title-layer" data-detail-title-layer="1" aria-hidden="true"></span>
          </h2>
          <div class="detail-description-panel">
            <div class="detail-description-slides" aria-live="polite">
              <div class="detail-description-slide" data-detail-description="0" aria-hidden="true">
                <p class="detail-slide-copy" data-slide-copy></p>
                <figure class="detail-chart" data-slide-chart hidden>
                  <figcaption class="detail-chart-title" data-chart-title></figcaption>
                  <div class="detail-chart-rows" data-chart-rows></div>
                  <p class="detail-chart-note" data-chart-note hidden></p>
                  <p class="detail-chart-scale" data-chart-scale></p>
                </figure>
                <p class="detail-slide-metric" data-slide-metric hidden></p>
                <p class="detail-slide-source" data-slide-source hidden></p>
                <button class="detail-slide-action" data-slide-action type="button" hidden></button>
              </div>
              <div class="detail-description-slide" data-detail-description="1" aria-hidden="true">
                <p class="detail-slide-copy" data-slide-copy></p>
                <figure class="detail-chart" data-slide-chart hidden>
                  <figcaption class="detail-chart-title" data-chart-title></figcaption>
                  <div class="detail-chart-rows" data-chart-rows></div>
                  <p class="detail-chart-note" data-chart-note hidden></p>
                  <p class="detail-chart-scale" data-chart-scale></p>
                </figure>
                <p class="detail-slide-metric" data-slide-metric hidden></p>
                <p class="detail-slide-source" data-slide-source hidden></p>
                <button class="detail-slide-action" data-slide-action type="button" hidden></button>
              </div>
            </div>
          </div>
        </div>
        <div class="detail-bottom">
          <span>SKYFALL ANALOGUE — EARTH AND MARS RESEARCH</span>
          <span class="detail-slide-count" aria-live="polite"></span>
        </div>
      </article>
      <p class="detail-photo-credit" aria-live="polite">
        <span aria-hidden="true">PHOTO CREDIT: </span>
        <a target="_blank" rel="noreferrer"></a>
      </p>
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
          Bodélé is a candidate terrestrial field site for focused experiments on dust, wind, visibility, and
          instrument response. Published observations at Chicha and regional wind-lens research make it a
          useful place to test selected SkyFall workflows—not to reproduce Mars or validate a Mars flight envelope.
        </p>
        <div class="research-facts" aria-label="Site facts">
          <div><span>FIELD REFERENCE</span><strong>Chicha, Chad</strong></div>
          <div><span>COORDINATES</span><strong>16.88° N · 18.53° E</strong></div>
          <div><span>ELEVATION</span><strong>179 m</strong></div>
          <div><span>EVIDENCE BASE</span><strong>BoDEx 2005 · published 2025 regional study</strong></div>
        </div>
        <section class="research-reasons" aria-labelledby="reasons-title">
          <h3 id="reasons-title">Reasons for the choice</h3>
          <ol>
            <li>
              <strong>A documented field reference.</strong>
              The 2005 Bodélé Dust Experiment (BoDEx) recorded meteorology and aerosol processes at Chicha.
              Its published coordinate and elevation anchor the candidate to a real field location rather than
              an assumed map point.
            </li>
            <li>
              <strong>Dust and visibility under real conditions.</strong>
              Bodélé is a major Sahara dust source. During 10–12 March 2005, BoDEx observed a peak two-minute
              surface wind of about 16 m/s; winds near 12 m/s were associated with large-scale deflation,
              saltation, and suspension. These observations motivate camera, visibility, and dust-exposure
              studies; they are not universal dust thresholds or safe operating limits.
            </li>
            <li>
              <strong>A regional wind-lens mechanism.</strong>
              A published 2025 study used 2003–2023 ERA5 and MODIS data to examine wind and dust around the
              mountain pass. It reports winds nearly doubling through the pass, an approximately 8 m/s regime
              split at the exit, and a strong-emission direction cluster near 48°. These are regional study
              diagnostics, not pad-scale forecasts or flight rules.
            </li>
            <li>
              <strong>A candidate corridor away from the source core.</strong>
              The proposed concept is a stable desert-pavement staging area near the eastern/southeastern
              margin of the exposed diatomite, with instrument transects toward the source. This may avoid
              placing equipment directly in the active plume core, but the corridor is not surveyed and its
              final pad suitability has not been assessed.
            </li>
            <li>
              <strong>A useful seasonal planning context.</strong>
              The regional study reports stronger, more aligned northeasterly flow and more frequent dust
              events in autumn and winter; summer southwesterly monsoon flow may weaken or oppose that flow.
              November–March is a planning window only. Campaign decisions should depend on forecasts and
              on-site wind, gust, visibility, and dust measurements.
            </li>
          </ol>
        </section>
        <section class="research-reasons" aria-labelledby="test-objectives-title">
          <h3 id="test-objectives-title">What SkyFall could test here</h3>
          <ol>
            <li>
              <strong>Visible and near-infrared imaging.</strong>
              Measure how dust haze affects contrast, target detection, image quality, and recovery after
              events. Assess visible and near-infrared camera response separately rather than assuming they
              respond to dust in the same way.
            </li>
            <li>
              <strong>Wind and temperature sensing.</strong>
              Deploy calibrated wind sensors at multiple heights and shielded temperature sensors to study
              local profiles and diurnal changes. A single 10 m reanalysis value or historical surface
              observation cannot establish rotor-height gust conditions.
            </li>
            <li>
              <strong>Dust resuspension procedures.</strong>
              Controlled future experiments could examine particle resuspension and optical obscuration
              caused by induced airflow. The brief reports no completed rotor-wash test, so this is a proposed
              activity that needs protocols and safety limits.
            </li>
            <li>
              <strong>Ground-penetrating radar workflows.</strong>
              GPR can be evaluated against surveyed, characterized shallow targets. Diatomite is not
              automatically a Martian regolith or ice analogue, and no subsurface-ice suitability is established.
            </li>
            <li>
              <strong>Thermal and radiation instrument workflows.</strong>
              Field deployment can exercise sensing, logging, and calibration procedures. Chad temperature
              and surface radiation are not Mars environmental measurements; direct Mars comparisons require
              matched data and appropriate context.
            </li>
          </ol>
        </section>
        <aside class="research-caveat">
          <strong>Scientific and operational limits</strong>
          <p>
            Chicha is a published field-site point, not a surveyed pad boundary. Regional study boxes and
            historical winds do not describe pad-scale turbulence or rotor-height gusts. Access, permissions,
            ground conditions, communications, medical/evacuation planning, and dust hazards require field
            assessment. Bodélé cannot reproduce Mars atmospheric density, gravity, aerosol composition,
            particle charging, or spectral conditions. The brief also distinguishes the team's 2025 ERA5
            processing from the published 2003–2023 ERA5/MODIS study; MERRA-2 and MODIS MAIAC were not
            acquired or processed by the team. Environmental similarity, instrument stress-test value, and
            field feasibility should remain separate assessments; no composite score or global-optimality
            claim is supported.
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
const motionToggleButton = app.querySelector<HTMLButtonElement>(".topbar-motion-toggle");
const audioToggleButton = app.querySelector<HTMLButtonElement>(".topbar-audio-toggle");
const previousSlideButton = app.querySelector<HTMLButtonElement>(".slide-previous");
const nextSlideButton = app.querySelector<HTMLButtonElement>(".slide-next");
const previousPlanetButton = app.querySelector<HTMLButtonElement>(".planet-switch-previous");
const nextPlanetButton = app.querySelector<HTMLButtonElement>(".planet-switch-next");
const intro = app.querySelector<HTMLElement>(".intro");
const category = app.querySelector<HTMLElement>("[data-detail-category]");
const number = app.querySelector<HTMLElement>("[data-detail-number]");
const titleHeading = app.querySelector<HTMLHeadingElement>("#dialog-title");
const titleLayers = Array.from(
  app.querySelectorAll<HTMLSpanElement>("[data-detail-title-layer]"),
);
const firstDescription = app.querySelector<HTMLDivElement>('[data-detail-description="0"]');
const secondDescription = app.querySelector<HTMLDivElement>('[data-detail-description="1"]');
const descriptionSlides = app.querySelector<HTMLDivElement>(".detail-description-slides");
const slideCount = app.querySelector<HTMLElement>(".detail-slide-count");
const firstSlideBackground = app.querySelector<HTMLSpanElement>('[data-slide-background="0"]');
const secondSlideBackground = app.querySelector<HTMLSpanElement>('[data-slide-background="1"]');
const photoCreditLink = app.querySelector<HTMLAnchorElement>(".detail-photo-credit a");
const earthGlobeContainer = app.querySelector<HTMLDivElement>(".earth-globe");
const marsGlobeContainer = app.querySelector<HTMLDivElement>(".mars-globe");
const starfield = app.querySelector<HTMLCanvasElement>(".starfield");
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
  !motionToggleButton ||
  !audioToggleButton ||
  !previousSlideButton ||
  !nextSlideButton ||
  !previousPlanetButton ||
  !nextPlanetButton ||
  !intro ||
  !category ||
  !number ||
  !titleHeading ||
  titleLayers.length !== 2 ||
  !firstDescription ||
  !secondDescription ||
  !descriptionSlides ||
  !slideCount ||
  !firstSlideBackground ||
  !secondSlideBackground ||
  !photoCreditLink ||
  !earthGlobeContainer ||
  !marsGlobeContainer ||
  !starfield ||
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

const backgroundAudio = new Audio(soaringAudioUrl);
backgroundAudio.loop = true;
backgroundAudio.volume = 0.35;
let audioStartPending = false;
let audioResumeListenersInstalled = false;
let interfaceAudioContext: AudioContext | null = null;
let interfaceAudioGain: GainNode | null = null;
let interfaceAudioResumePending = false;
let interfaceAudioResumeBlocked = false;

const removeAudioResumeListeners = () => {
  document.removeEventListener("pointerdown", handleAudioResume);
  document.removeEventListener("keydown", handleAudioResume);
  audioResumeListenersInstalled = false;
};

const startBackgroundAudio = () => {
  if (!backgroundAudio.paused || audioStartPending) {
    return;
  }

  audioStartPending = true;
  backgroundAudio.play().then(
    () => {
      audioStartPending = false;
      removeAudioResumeListeners();
    },
    (error: unknown) => {
      audioStartPending = false;
      if (error instanceof DOMException && error.name === "NotAllowedError") {
        if (!audioResumeListenersInstalled) {
          audioResumeListenersInstalled = true;
          document.addEventListener("pointerdown", handleAudioResume, { once: true });
          document.addEventListener("keydown", handleAudioResume, { once: true });
        }
        return;
      }

      console.error("Unable to play the background audio.", error);
    },
  );
};

const handleAudioResume = () => {
  audioResumeListenersInstalled = false;
  startBackgroundAudio();
};

backgroundAudio.addEventListener("error", () => {
  console.error("Unable to load the background audio.", backgroundAudio.error);
});

audioToggleButton.addEventListener("click", () => {
  backgroundAudio.muted = !backgroundAudio.muted;
  const isMuted = backgroundAudio.muted;
  const label = isMuted ? "Unmute audio" : "Mute audio";
  audioToggleButton.setAttribute("aria-label", label);
  audioToggleButton.setAttribute("title", label);
  audioToggleButton.setAttribute("aria-pressed", String(isMuted));
  if (interfaceAudioContext && interfaceAudioGain) {
    interfaceAudioGain.gain.setTargetAtTime(
      isMuted ? 0 : 0.18,
      interfaceAudioContext.currentTime,
      0.02,
    );
  }
  if (!isMuted) {
    startBackgroundAudio();
  }
});

const playInterfaceTone = (kind: "hover" | "click" | "typewriter") => {
  if (backgroundAudio.muted || interfaceAudioResumeBlocked) {
    return;
  }

  if (!interfaceAudioContext) {
    interfaceAudioContext = new AudioContext();
    interfaceAudioGain = interfaceAudioContext.createGain();
    interfaceAudioGain.gain.value = 0.18;
    interfaceAudioGain.connect(interfaceAudioContext.destination);
  }

  const context = interfaceAudioContext;
  const masterGain = interfaceAudioGain;
  if (!masterGain) {
    throw new Error("Interface sound effects audio gain was not initialized.");
  }

  const playTone = () => {
    if (backgroundAudio.muted || context.state !== "running") {
      return;
    }

    const isHover = kind === "hover";
    const isTypewriter = kind === "typewriter";
    const duration = isHover ? 0.045 : isTypewriter ? 0.024 : 0.075;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const noteGain = context.createGain();
    oscillator.type = isTypewriter ? "triangle" : "sine";
    oscillator.frequency.setValueAtTime(isHover ? 660 : isTypewriter ? 1100 : 880, now);
    oscillator.frequency.exponentialRampToValueAtTime(
      isHover ? 520 : isTypewriter ? 620 : 560,
      now + duration,
    );
    noteGain.gain.setValueAtTime(0.0001, now);
    noteGain.gain.exponentialRampToValueAtTime(
      isHover ? 0.24 : isTypewriter ? 0.2 : 0.34,
      now + 0.004,
    );
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(noteGain);
    noteGain.connect(masterGain);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.01);
  };

  if (context.state === "suspended") {
    if (!interfaceAudioResumePending) {
      interfaceAudioResumePending = true;
      context.resume().then(
        () => {
          interfaceAudioResumePending = false;
          playTone();
        },
        (error: unknown) => {
          interfaceAudioResumePending = false;
          if (error instanceof DOMException && error.name === "NotAllowedError") {
            interfaceAudioResumeBlocked = true;
            return;
          }

          console.error("Unable to resume interface sound effects.", error);
        },
      );
    }
    return;
  }

  playTone();
};

const typewriterSoundTimers = new WeakMap<HTMLElement, number[]>();
const stopTypewriterSound = (label: HTMLElement) => {
  const timers = typewriterSoundTimers.get(label);
  if (!timers) {
    return;
  }

  timers.forEach(window.clearTimeout);
  typewriterSoundTimers.delete(label);
};

app.addEventListener("animationstart", (event: AnimationEvent) => {
  if (event.animationName !== "focus-point-typewriter" || !(event.target instanceof HTMLElement)) {
    return;
  }

  const label = event.target;
  const style = window.getComputedStyle(label);
  const durationText = style.animationDuration.split(",")[0]?.trim() ?? "";
  const duration = Number.parseFloat(durationText);
  const durationMs = durationText.endsWith("ms") ? duration : duration * 1000;
  const stepCount = Number.parseInt(style.getPropertyValue("--marker-label-steps"), 10);
  if (!Number.isFinite(durationMs) || !Number.isFinite(stepCount) || durationMs <= 0 || stepCount < 1) {
    return;
  }

  stopTypewriterSound(label);
  const timers = Array.from({ length: stepCount }, (_, index) =>
    window.setTimeout(
      () => playInterfaceTone("typewriter"),
      Math.round((durationMs * index) / stepCount),
    ),
  );
  typewriterSoundTimers.set(label, timers);
});

const handleTypewriterAnimationEnd = (event: AnimationEvent) => {
  if (
    event.animationName === "focus-point-typewriter" &&
    event.target instanceof HTMLElement
  ) {
    stopTypewriterSound(event.target);
  }
};

app.addEventListener("animationend", handleTypewriterAnimationEnd);
app.addEventListener("animationcancel", handleTypewriterAnimationEnd);

app.addEventListener("pointerover", (event: PointerEvent) => {
  if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
    return;
  }

  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  const button = target.closest("button");
  if (
    !button ||
    button.disabled ||
    (event.relatedTarget instanceof Node && button.contains(event.relatedTarget))
  ) {
    return;
  }

  playInterfaceTone("hover");
});

app.addEventListener(
  "click",
  (event: MouseEvent) => {
    const target = event.target;
    if (!(target instanceof Element)) {
  return;
    }

    const button = target.closest("button");
    if (button && !button.disabled) {
  interfaceAudioResumeBlocked = false;
  playInterfaceTone("click");
    }
  },
  true,
);

startBackgroundAudio();

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
const starfieldContext = starfield.getContext("2d");
if (!starfieldContext) {
  throw new Error("Starfield canvas is unavailable.");
}
const transitionDuration = prefersReducedMotion ? 0 : 1000;
const fadeDuration = prefersReducedMotion ? 0 : 900;
const researchFadeDuration = prefersReducedMotion ? 0 : 450;
const slideTransitionDuration = prefersReducedMotion ? 0 : 900;
let heroIdleTimer = 0;
let autoRotateRampFrame = 0;
let researchCloseTimeout = 0;
let motionBlurBoost = 0;
let isLowMotionEnabled = false;

const starTileSize = 512;
const starTile = document.createElement("canvas");
starTile.width = starTileSize;
starTile.height = starTileSize;
const starTileContext = starTile.getContext("2d");
if (!starTileContext) {
  throw new Error("Star texture canvas is unavailable.");
}

const starfieldStars = Array.from({ length: 80 }, () => ({
  x: Math.random(),
  y: Math.random(),
  radius: 0.35 + Math.random() * 1.15,
  opacity: 0.25 + Math.random() * 0.65,
  tint: Math.random() > 0.88 ? "#b9d8ff" : "#ffffff",
}));

starfieldStars.forEach(({ x, y, radius, opacity, tint }) => {
  const starX = x * starTileSize;
  const starY = y * starTileSize;
  const edge = radius * 5;
  const xOffsets = starX < edge ? [0, starTileSize] : starX > starTileSize - edge ? [-starTileSize, 0] : [0];
  const yOffsets = starY < edge ? [0, starTileSize] : starY > starTileSize - edge ? [-starTileSize, 0] : [0];

  xOffsets.forEach((offsetX) =>
    yOffsets.forEach((offsetY) => {
      starTileContext.beginPath();
      starTileContext.fillStyle = tint;
      starTileContext.globalAlpha = opacity;
      starTileContext.shadowBlur = radius * 4;
      starTileContext.shadowColor = tint;
      starTileContext.arc(
        starX + offsetX,
        starY + offsetY,
        radius,
        0,
        Math.PI * 2,
      );
      starTileContext.fill();
    }),
  );
});
starTileContext.globalAlpha = 1;
starTileContext.shadowBlur = 0;

let starfieldWidth = 0;
let starfieldHeight = 0;
let starfieldPixelRatio = 1;
let starOffsetX = 0;
let starOffsetY = 0;

const drawStarfield = () => {
  starfieldContext.clearRect(0, 0, starfieldWidth, starfieldHeight);
  const startX = ((starOffsetX % starTileSize) + starTileSize) % starTileSize;
  const startY = ((starOffsetY % starTileSize) + starTileSize) % starTileSize;

  for (let x = startX - starTileSize; x < starfieldWidth; x += starTileSize) {
    for (let y = startY - starTileSize; y < starfieldHeight; y += starTileSize) {
      starfieldContext.drawImage(starTile, x, y, starTileSize, starTileSize);
    }
  }
};

motionToggleButton.addEventListener("click", () => {
  isLowMotionEnabled = !isLowMotionEnabled;
  motionToggleButton.setAttribute("aria-pressed", String(isLowMotionEnabled));
  starfield.hidden = isLowMotionEnabled;
  if (!isLowMotionEnabled) {
    drawStarfield();
  }
});

const resizeStarfield = () => {
  starfieldPixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  starfieldWidth = window.innerWidth;
  starfieldHeight = window.innerHeight;
  starfield.width = Math.ceil(starfieldWidth * starfieldPixelRatio);
  starfield.height = Math.ceil(starfieldHeight * starfieldPixelRatio);
  starfieldContext.setTransform(starfieldPixelRatio, 0, 0, starfieldPixelRatio, 0, 0);
  if (!isLowMotionEnabled) {
    drawStarfield();
  }
};

resizeStarfield();
window.addEventListener("resize", resizeStarfield);

const triggerMotionBlur = () => {
  if (!isLowMotionEnabled) {
    motionBlurBoost = Math.max(motionBlurBoost, prefersReducedMotion ? 0 : 2.2);
  }
};

let previousMotionFrame = performance.now();
let previousAzimuth = controlsByPlanet[activePlanetId].getAzimuthalAngle();
let previousPolar = controlsByPlanet[activePlanetId].getPolarAngle();

const updateSpaceMotion = (time: number) => {
  const elapsed = Math.max((time - previousMotionFrame) / 1000, 0.001);
  const controls = controlsByPlanet[activePlanetId];
  const azimuth = controls.getAzimuthalAngle();
  const polar = controls.getPolarAngle();
  const azimuthDelta = Math.atan2(
    Math.sin(azimuth - previousAzimuth),
    Math.cos(azimuth - previousAzimuth),
  );
  const polarDelta = polar - previousPolar;
  const angularSpeed = Math.hypot(azimuthDelta, polarDelta) / elapsed;
  const spinBlur = prefersReducedMotion
    ? 0
    : Math.min(Math.max((angularSpeed - 0.6) * 0.58, 0), 2.6);
  motionBlurBoost *= Math.exp(-elapsed / 0.42);
  const blur = isLowMotionEnabled ? 0 : Math.max(spinBlur, motionBlurBoost);

  if (!isLowMotionEnabled) {
    starOffsetX -= azimuthDelta * (starTileSize / (Math.PI * 2));
    starOffsetY += polarDelta * (starTileSize / (Math.PI * 2));
    drawStarfield();
  }
  starfield.style.setProperty(
    "--star-motion-blur",
    `${isLowMotionEnabled ? 0 : blur * 0.65}px`,
  );
  earthGlobeContainer.style.setProperty(
    "--globe-motion-blur",
    `${activePlanetId === "earth" ? blur : isLowMotionEnabled ? 0 : motionBlurBoost}px`,
  );
  marsGlobeContainer.style.setProperty(
    "--globe-motion-blur",
    `${activePlanetId === "mars" ? blur : isLowMotionEnabled ? 0 : motionBlurBoost}px`,
  );

  previousAzimuth = azimuth;
  previousPolar = polar;
  previousMotionFrame = time;
  requestAnimationFrame(updateSpaceMotion);
};
requestAnimationFrame(updateSpaceMotion);

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

const resetDescriptionLayer = (layer: HTMLDivElement) => {
  const copy = layer.querySelector<HTMLParagraphElement>("[data-slide-copy]");
  const chart = layer.querySelector<HTMLElement>("[data-slide-chart]");
  const chartTitle = layer.querySelector<HTMLElement>("[data-chart-title]");
  const chartRows = layer.querySelector<HTMLDivElement>("[data-chart-rows]");
  const chartNote = layer.querySelector<HTMLParagraphElement>("[data-chart-note]");
  const chartScale = layer.querySelector<HTMLParagraphElement>("[data-chart-scale]");
  const metric = layer.querySelector<HTMLParagraphElement>("[data-slide-metric]");
  const source = layer.querySelector<HTMLParagraphElement>("[data-slide-source]");
  const action = layer.querySelector<HTMLButtonElement>("[data-slide-action]");
  if (
    !copy ||
    !chart ||
    !chartTitle ||
    !chartRows ||
    !chartNote ||
    !chartScale ||
    !metric ||
    !source ||
    !action
  ) {
    throw new Error("Description slide content elements were not found.");
  }

  layer.classList.remove(
    "is-active",
    "is-incoming",
    "is-fading-in",
    "is-fading-out",
  );
  layer.setAttribute("aria-hidden", "true");
  copy.textContent = "";
  chart.hidden = true;
  chartTitle.textContent = "";
  chartRows.replaceChildren();
  chartNote.textContent = "";
  chartNote.hidden = true;
  chartScale.textContent = "";
  metric.textContent = "";
  metric.hidden = true;
  source.textContent = "";
  source.hidden = true;
  action.textContent = "";
  action.hidden = true;
  action.disabled = true;
};

const populateDescriptionLayer = (layer: HTMLDivElement, slide: DetailSlide) => {
  const copy = layer.querySelector<HTMLParagraphElement>("[data-slide-copy]");
  const chart = layer.querySelector<HTMLElement>("[data-slide-chart]");
  const chartTitle = layer.querySelector<HTMLElement>("[data-chart-title]");
  const chartRows = layer.querySelector<HTMLDivElement>("[data-chart-rows]");
  const chartNote = layer.querySelector<HTMLParagraphElement>("[data-chart-note]");
  const chartScale = layer.querySelector<HTMLParagraphElement>("[data-chart-scale]");
  const metric = layer.querySelector<HTMLParagraphElement>("[data-slide-metric]");
  const source = layer.querySelector<HTMLParagraphElement>("[data-slide-source]");
  const action = layer.querySelector<HTMLButtonElement>("[data-slide-action]");
  if (
    !copy ||
    !chart ||
    !chartTitle ||
    !chartRows ||
    !chartNote ||
    !chartScale ||
    !metric ||
    !source ||
    !action
  ) {
    throw new Error("Description slide content elements were not found.");
  }

  copy.textContent = slide.description;
  const chartData = slide.chart;
  chart.hidden = !chartData;
  chartRows.replaceChildren();
  if (chartData) {
    chartTitle.textContent = chartData.title;
    chartNote.textContent = chartData.note ?? "";
    chartNote.hidden = !chartData.note;
    chartScale.textContent = chartData.scaleLabel;
    chartData.values.forEach(({ label, value, display }) => {
      const row = document.createElement("div");
      row.className = "detail-chart-row";
      const rowLabel = document.createElement("span");
      rowLabel.className = "detail-chart-label";
      rowLabel.textContent = label;
      const track = document.createElement("span");
      track.className = "detail-chart-track";
      track.setAttribute("aria-hidden", "true");
      const bar = document.createElement("span");
      bar.className = "detail-chart-bar";
      bar.style.width = `${Math.max(0, Math.min(value / chartData.scaleMax, 1) * 100)}%`;
      track.append(bar);
      const rowValue = document.createElement("span");
      rowValue.className = "detail-chart-value";
      rowValue.textContent = display;
      row.append(rowLabel, track, rowValue);
      chartRows.append(row);
    });
  }
  metric.textContent = slide.metric ?? "";
  metric.hidden = !slide.metric;
  source.textContent = slide.source ?? "";
  source.hidden = !slide.source;
  action.textContent = slide.actionLabel ?? "";
  action.hidden = !slide.actionLabel;
  action.disabled = !slide.actionLabel;
};

const setPhotoCredit = (slide: DetailSlide) => {
  photoCreditLink.textContent = slide.photoCredit.label;
  photoCreditLink.href = slide.photoCredit.href;
  photoCreditLink.setAttribute(
    "aria-label",
    `Photo credit: ${slide.photoCredit.label} (opens in a new tab)`,
  );
};

const animateChartBars = (layer: HTMLDivElement) => {
  if (prefersReducedMotion) {
    return;
  }

  layer.querySelectorAll<HTMLElement>(".detail-chart-bar").forEach((bar) => {
    bar.animate([{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], {
      duration: 450,
      easing: "ease-out",
    });
  });
};

const cancelChartBarAnimations = (layer: HTMLDivElement) => {
  layer.querySelectorAll<HTMLElement>(".detail-chart-bar").forEach((bar) => {
    bar.getAnimations().forEach((animation) => animation.cancel());
  });
};

const renderSlide = (note: Note) => {
  const slide = note.slides[activeSlideIndex];
  if (!slide) {
    throw new Error("Detail slide was not found.");
  }

  const descriptionLayers = [firstDescription, secondDescription];
  const backgroundLayers = [firstSlideBackground, secondSlideBackground];
  descriptionLayers.forEach((layer) => {
    resetDescriptionLayer(layer);
  });
  descriptionSlides.style.height = "";
  titleHeading.style.height = "";
  titleLayers.forEach((layer, index) => {
    layer.textContent = index === activeSlideLayerIndex ? slide.heading : "";
    layer.setAttribute("aria-hidden", String(index !== activeSlideLayerIndex));
    layer.classList.remove("is-active", "is-incoming", "is-fading-in", "is-fading-out");
  });
  titleLayers[activeSlideLayerIndex]?.classList.add("is-active");
  backgroundLayers.forEach((layer) => {
    layer.classList.remove("is-active", "is-incoming", "is-fading-in");
    layer.style.backgroundImage = "";
  });

  const activeDescriptionLayer = descriptionLayers[activeSlideLayerIndex];
  const activeBackgroundLayer = backgroundLayers[activeSlideLayerIndex];

  if (!activeDescriptionLayer || !activeBackgroundLayer) {
    throw new Error("Active slide layers were not found.");
  }

  setPhotoCredit(slide);
  populateDescriptionLayer(activeDescriptionLayer, slide);
  activeDescriptionLayer.setAttribute("aria-hidden", "false");
  activeDescriptionLayer.classList.add("is-active");
  animateChartBars(activeDescriptionLayer);
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

  const currentDescriptionHeight = descriptionSlides.getBoundingClientRect().height;
  descriptionSlides.style.height = `${currentDescriptionHeight}px`;
  void descriptionSlides.offsetHeight;
  populateDescriptionLayer(nextDescription, nextSlide);
  previousDescription.style.display = "none";
  descriptionSlides.style.height = "auto";
  const nextDescriptionHeight = descriptionSlides.getBoundingClientRect().height;
  previousDescription.style.display = "";
  descriptionSlides.style.height = `${currentDescriptionHeight}px`;
  void descriptionSlides.offsetHeight;
  descriptionSlides.style.height = `${nextDescriptionHeight}px`;
  const previousTitle = titleLayers[previousLayerIndex];
  const nextTitle = titleLayers[nextLayerIndex];
  if (!previousTitle || !nextTitle) {
    throw new Error("Slide transition titles were not found.");
  }
  const currentTitleHeight = titleHeading.getBoundingClientRect().height;
  titleHeading.style.height = `${currentTitleHeight}px`;
  void titleHeading.offsetHeight;
  nextTitle.textContent = nextSlide.heading;
  previousTitle.style.display = "none";
  titleHeading.style.height = "auto";
  const nextTitleHeight = titleHeading.getBoundingClientRect().height;
  previousTitle.style.display = "";
  titleHeading.style.height = `${currentTitleHeight}px`;
  void titleHeading.offsetHeight;
  titleHeading.style.height = `${nextTitleHeight}px`;
  nextTitle.setAttribute("aria-hidden", "false");
  nextTitle.classList.add("is-incoming");
  previousTitle.setAttribute("aria-hidden", "true");
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
    cancelChartBarAnimations(previousDescription);
    previousTitle.classList.add("is-fading-out");
    nextTitle.classList.add("is-fading-in");
    previousDescription.classList.add("is-fading-out");
    nextDescription.classList.add("is-fading-in");
    nextBackground.classList.add("is-fading-in");
    animateChartBars(nextDescription);
    slideTransitionTimeout = window.setTimeout(() => {
      slideTransitionTimeout = 0;
      descriptionSlides.style.height = "";
      previousTitle.textContent = "";
      previousTitle.classList.remove("is-active", "is-fading-out");
      nextTitle.classList.remove("is-incoming", "is-fading-in");
      nextTitle.classList.add("is-active");
      titleHeading.style.height = "";
      resetDescriptionLayer(previousDescription);
      previousBackground.classList.remove("is-active");
      previousBackground.style.backgroundImage = "";
      nextDescription.classList.remove("is-incoming", "is-fading-in");
      nextDescription.classList.add("is-active");
      nextBackground.classList.remove("is-incoming", "is-fading-in");
      nextBackground.classList.add("is-active");
      setPhotoCredit(nextSlide);
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
  }, 2000);
};

const switchPlanet = () => {
  if (isTransitioning || dialog.open) {
    return;
  }

  isTransitioning = true;
  triggerMotionBlur();
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
      const locationLabel = planetId === "earth" ? "Bodélé Depression" : "Mars";
      marker.style.setProperty(
        "--marker-label-steps",
        String(Array.from(locationLabel).length + 1),
      );
      const markerLabel = document.createElement("span");
      markerLabel.className = "earth-marker-label";
      markerLabel.textContent = locationLabel;
      markerLabel.setAttribute("aria-hidden", "true");
      if (planetId === "mars") {
        markerLabel.style.setProperty("--marker-label-duration", "300ms");
      }
      marker.append(markerLabel);
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
  titleLayers.forEach((layer) => {
    layer.classList.remove("is-incoming", "is-fading-in", "is-fading-out");
  });
  cancelChartBarAnimations(firstDescription);
  cancelChartBarAnimations(secondDescription);
  titleHeading.style.height = "";
  descriptionSlides.style.height = "";
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
  window.clearTimeout(researchCloseTimeout);
  if (!researchDialog.open) {
    researchDialog.showModal();
    requestAnimationFrame(() => researchDialog.classList.add("is-visible"));
  } else {
    researchDialog.classList.add("is-visible");
  }
};

const closeResearchPage = () => {
  if (!researchDialog.open) {
    return;
  }

  researchDialog.classList.remove("is-visible");
  window.clearTimeout(researchCloseTimeout);
  researchCloseTimeout = window.setTimeout(
    () => researchDialog.close(),
    researchFadeDuration,
  );
};

closeButton.addEventListener("click", closeNote);
researchNavButton.addEventListener("click", openResearchPage);
researchCloseButton.addEventListener("click", closeResearchPage);
researchDialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeResearchPage();
});
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