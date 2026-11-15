# Additional research notes

This file collects evidence from `src/info/SkyFall_Bodele_Research_App_Package.zip` that is not currently presented in the interactive descriptions. The package is preliminary; use its source links and caveats when deciding what to add.

## Bodélé and Chicha

- The 2025 ERA5/MODIS wind-lens study reports a regime split near **8 m/s** at the exit region, wind speeds **nearly doubling** through the pass, and a strong-dust-emission direction cluster near **48°**. The app now charts the reported near-doubling schematically; the 8 m/s regime split and direction are additional details.
- The study's entrance analysis region is approximately **17.75–21.25° N, 19.75–23.75° E**; its exit region is approximately **17.75–18.25° N, 17.75–20.75° E**. These are broad study-analysis boxes, not operational test or flight boundaries.
- The recommended idea is a **desert-pavement staging corridor near the eastern/southeastern margin of the exposed diatomite**, with instrument transects toward the source. It is a candidate concept, not a surveyed pad. The Chicha coordinate is a published field-site point: **16.88° N, 18.53° E, 179 m**.
- The regional evidence is assessed as high confidence, the specific corridor candidate as moderate, and final pad suitability as **not assessed**. Present-day access, permits, safety, communications, medical/evacuation feasibility, ground conditions, and dust hazards remain unverified.
- The study describes stronger, more aligned northeasterly flow and more frequent dust events in the boreal autumn/winter; summer southwesterly monsoon flow weakens or opposes the corridor flow. The package suggests November–March as a campaign window, but operations should be event-triggered using current wind, gust, visibility, and dust conditions—not calendar dates alone.

## Additional Mars observations

### MEDA compiled hourly workbook

These are user-supplied compilation statistics, not a complete reprocessing of the public MEDA archive:

- The workbook contains **18,728 hourly rows** over **836 represented sol-days**, spanning sols **1–900**.
- Surface pressure: **586.48–819.89 Pa** overall; median **734.27 Pa**; P05 **630.61 Pa**; P95 **789.44 Pa**. The app charts selected percentiles and mean.
- Horizontal wind speed: **0.277–9.667 m/s** overall; median **3.166 m/s**; P05 **0.916 m/s**. Wind is present in **4,095 / 18,728 rows (21.86%)**, so neither its summaries nor the mean represent full temporal coverage or gust statistics.
- Relative humidity: **16,008 available rows**; mean **4.776%**, median **0.942%**, P05 **0.034%**, P95 **21.453%**, maximum **90.165%**. Verify the MEDA humidity product and sensor definition before interpreting it.
- The workbook's wind-direction mean (**163.32°**) is an arithmetic mean, not a circular mean; do not treat it as a valid average direction. The reported median is **130.91°**, P05 **48.55°**, and P95 **313.91°**.
- MEDA pressure is Mars context, not a like-for-like Earth pressure or air-density comparison. The humidity sensor's local temperature is not automatically ambient air temperature.

### Mars Climate Sounder (MCS)

- The cited product is **MRO-M-MCS-5-DDR-V6.2**, observed on **1 July 2025, 00:00:11–03:59:50 UTC**, at solar longitude **Ls ≈ 104.28°**. It is one four-hour orbital product, not a seasonal climatology.
- The supplied quality-filtered dust summary has **22,397 values across 570 profiles**: median **4 × 10⁻⁶ km⁻¹**, P05 **1 × 10⁻⁹ km⁻¹**, P95 **4.17 × 10⁻⁴ km⁻¹**, and maximum **0.005948 km⁻¹**. Opacity at **21.6 µm** is spectral extinction/opacity, not dust mass concentration or particle count.
- A prior temperature summary reports **69,134 values across 1,124 profiles**: median **154.723 K**, P05 **125.259 K**, P95 **182.768 K**, minimum **98.087 K**, and maximum **213.042 K**. Confirm the retrieval and quality-filtering interpretation before adding it.
- The product has nonzero retrieval quality flags. Retain the flags and follow the product format before selecting science-grade values. Do not compare this 21.6 µm opacity directly with Earth 550 nm aerosol optical depth without spectral forward modelling.

## SkyFall test implications

- Relevant objectives listed in the package include ground-penetrating radar, 13 MP visible colour cameras, near-infrared cameras, air-temperature sensing, multi-altitude wind speed/direction, and microdosimeter radiation measurements.
- Dust and visibility trials can inform optical imaging/navigation; rotor-wash tests should assess particle resuspension and optical obscuration. The public instrument list does not identify a dedicated airborne dust-particle counter.
- GPR tests need controlled subsurface targets and dielectric characterization. Natural diatomite is not automatically a Mars-regolith analogue.
- Radiation comparisons need defined dosimeter measurements and a radiation environment; Chad surface conditions do not reproduce Mars cosmic-radiation exposure.
- Earth testing at Bodélé cannot validate a Mars rotorcraft flight envelope because atmospheric density and gravity differ fundamentally. Low-pressure chamber tests and validated aerodynamic modelling remain necessary.

## Data still to acquire or process

The package says these source datasets are catalogued but their raw files were not included:

- **ERA5, hourly 2003–2023:** 10 m u/v wind, gust, 2 m temperature/dewpoint, surface pressure, radiation, cloud, and boundary-layer height for Chicha and the wind-lens regions. Reanalysis cannot resolve pad-scale turbulence.
- **MERRA-2 M2T1NXAER, hourly 2003–2023:** dust column mass, surface dust mass concentration, and aerosol extinction/scattering optical thickness. Its regional grid is coarse.
- **MODIS MAIAC MCD19A2 v6.1, daily 2003–2023:** 0.47/0.55 µm AOD, quality flags, aerosol type, and cloud mask; QA screening is required.
- **High-resolution elevation/imagery:** slope, roughness, drainage, substrate, access, and candidate pad boundary; field verification is still required.
- **In-situ campaign data:** 3D wind/gust at rotorcraft heights, visibility, dust concentration/size, temperature, radiation, and surface properties; requires permits, safety planning, and instrument calibration.
- Compare at least two alternate Bodélé subregions before describing Chicha as globally optimal. Keep environmental similarity, instrument/flight stress-test value, and field feasibility as separate dimensions.
- The suggested SkyFall Environmental Analogue Score (SEAS) is a proposed team metric, **not a NASA standard**. The package recommends against publishing a single composite score until multi-year Earth datasets and alternatives have been processed. Suggested comparisons include percentiles, seasonal/diurnal distributions, event exceedance frequency, and distribution distances, using matched variables/units and Mars solar-longitude seasons.

## Source package references

- `src/info/SkyFall_Bodele_Research_App_Package.zip` contains `evidence_metrics.csv`, `site_candidates.csv`, `data_acquisition_status.csv`, and `skyfall_bodele_app_data.json`.
- BoDEx wind observations: [Washington et al. (2006)](https://doi.org/10.1029/2005JD006502).
- BoDEx site and dust emission: [Todd et al. (2007)](https://doi.org/10.1029/2006JD007170).
- Wind-lens analysis: [2025 Geophysical Research Letters study](https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2025GL118979).
- MEDA data: [NASA Planetary Data System](https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html).
- MCS aerosols: [NASA Planetary Data System](https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/MARS/aerosols.html).
