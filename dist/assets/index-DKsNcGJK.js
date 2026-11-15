(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))p(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&p(d)}).observe(document,{childList:!0,subtree:!0});function c(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function p(a){if(a.ep)return;a.ep=!0;const o=c(a);fetch(a.href,o)}})();const h=[{number:"01",category:"North America",title:"Ideas begin here.",description:"A quiet place for the first thought, the rough sketch, or the question worth following. Replace this copy with the story behind your first topic.",x:39,y:39},{number:"02",category:"South America",title:"Look a little closer.",description:"Small details can shift the way we see the whole picture. Use this space to share an observation, a discovery, or something you want people to notice.",x:48,y:65},{number:"03",category:"Europe",title:"What could this become?",description:"Some things are more interesting while they are still taking shape. Add a description of a possibility, an experiment, or a direction you are exploring.",x:61,y:42},{number:"04",category:"Africa",title:"Everything touches.",description:"Follow the unexpected links between people, places, and ideas. This is a placeholder for the connection you want to bring into focus.",x:57,y:55},{number:"05",category:"Asia",title:"Keep what matters.",description:"Gather the pieces that make a thought feel complete. Share the references, details, or fragments that belong together.",x:70,y:49},{number:"06",category:"Pacific Ocean",title:"Leave room to grow.",description:"The end of one idea is often the beginning of another. Use this tile for a next step, an invitation, or a closing thought.",x:31,y:55}],r=document.querySelector("#app");if(!r)throw new Error("App root element was not found.");r.innerHTML=`
  <main class="page-shell">
    <header class="topbar">
      <a class="wordmark" href="#" aria-label="NASA SpaceApps Challenge home">
        <img class="wordmark-icon" src="${new URL("data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3c!--%20Uploaded%20to:%20SVG%20Repo,%20www.svgrepo.com,%20Generator:%20SVG%20Repo%20Mixer%20Tools%20--%3e%3csvg%20width='800px'%20height='800px'%20viewBox='0%200%2016%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M2.34313%2013.6569C1.78335%2013.0971%201.32387%2012.475%200.964684%2011.8129C0.616724%2012.3943%200.344087%2012.943%200.180413%2013.4311C0.0744537%2013.7471%20-0.0046342%2014.0918%200.000211182%2014.433C0.00512994%2014.7793%200.101017%2015.2121%200.444436%2015.5556C0.787856%2015.899%201.22074%2015.9949%201.56705%2015.9998C1.90818%2016.0046%202.25291%2015.9255%202.56888%2015.8196C3.20464%2015.6064%203.9433%2015.2083%204.72317%2014.6997C5.16617%2014.4108%205.63715%2014.0765%206.12819%2013.7023C6.71718%2013.8955%207.34639%2014%208%2014C11.3137%2014%2014%2011.3137%2014%208C14%207.34639%2013.8955%206.71718%2013.7023%206.12819C14.0765%205.63715%2014.4108%205.16617%2014.6997%204.72317C15.2083%203.9433%2015.6064%203.20464%2015.8196%202.56888C15.9255%202.25291%2016.0046%201.90818%2015.9998%201.56705C15.9949%201.22074%2015.899%200.787856%2015.5556%200.444436C15.2121%200.101017%2014.7793%200.00512994%2014.433%200.000211182C14.0918%20-0.0046342%2013.7471%200.0744537%2013.4311%200.180413C12.943%200.344088%2012.3943%200.616728%2011.8129%200.964692C12.475%201.32388%2013.0971%201.78336%2013.6568%202.34314C13.3784%203.01413%2013.0579%203.6038%2012.6403%204.19604C12.6359%204.20221%2012.6315%204.20838%2012.6272%204.21457C11.7592%205.44256%2010.5387%206.89539%209.07872%208.38692C8.8506%208.61996%208.62%208.85057%208.38695%209.07868C6.88789%2010.546%205.42794%2011.7714%204.19603%2012.6402C3.60792%2013.055%203.00258%2013.3649%202.34313%2013.6569Z'%20fill='%23000000'/%3e%3cpath%20d='M8%202C9.14392%202%2010.2131%202.32012%2011.1228%202.87567C10.2717%204.11121%208.95721%205.68369%207.32047%207.32043C5.6837%208.9572%204.11121%2010.2717%202.87566%2011.1227C2.32012%2010.2131%202%209.14392%202%208C2%204.68629%204.68629%202%208%202Z'%20fill='%23000000'/%3e%3c/svg%3e",import.meta.url).href}" alt="" aria-hidden="true" />
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
        <img class="earth-image" draggable="false" src="${new URL("/assets/Earth-CFJrSPDA.jpg",import.meta.url).href}" alt="Earth viewed from space" />
        <span class="earth-label">OUR HOME, IN FOCUS</span>
        <span class="earth-coordinates" aria-hidden="true">A BLUE MARBLE · 01 / 06</span>
      ${h.map(e=>`
            <button
              class="earth-marker"
              type="button"
              data-note="${e.number}"
              style="--marker-x: ${e.x}%; --marker-y: ${e.y}%"
              aria-haspopup="dialog"
              aria-label="Zoom into ${e.category}: ${e.title}"
            >
              <span>${e.number}</span>
            </button>
          `).join("")}
      </div>
    </section>

    <footer class="footer">
      <span>NASA SPACEAPPS CHALLENGE<span class="footer-dot">©</span> 2025</span>
      <span>MADE FOR CURIOSITY</span>
    </footer>

    <span class="cursor-glow" aria-hidden="true"></span>

    <dialog class="detail-dialog" aria-labelledby="dialog-title">
      <img class="zoom-earth" draggable="false" src="${new URL("/assets/Earth-CFJrSPDA.jpg",import.meta.url).href}" alt="" />
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
`;const s=r.querySelector(".detail-dialog"),u=r.querySelector(".close-button"),m=r.querySelector("[data-detail-category]"),g=r.querySelector("[data-detail-number]"),f=r.querySelector("[data-detail-title]"),y=r.querySelector("[data-detail-description]"),n=r.querySelector(".zoom-earth"),l=r.querySelectorAll(".cursor-glow");let i=null;if(!s||!u||!m||!g||!f||!y||!n)throw new Error("Detail display elements were not found.");document.addEventListener("pointermove",e=>{e.pointerType!=="touch"&&l.forEach(t=>{t.style.left=`${e.clientX}px`,t.style.top=`${e.clientY}px`,t.classList.add("is-visible")})});document.addEventListener("pointerdown",()=>{l.forEach(e=>e.classList.add("is-active"))});document.addEventListener("pointerup",()=>{l.forEach(e=>e.classList.remove("is-active"))});document.documentElement.addEventListener("pointerleave",()=>{l.forEach(e=>e.classList.remove("is-visible"))});r.querySelectorAll(".earth-marker").forEach(e=>{e.addEventListener("click",()=>{const t=h.find(c=>c.number===e.dataset.note);if(!t)throw new Error(`No note found for marker ${e.dataset.note??""}.`);i=e,m.textContent=t.category,g.textContent=t.number,f.textContent=t.title,y.textContent=t.description,n.style.setProperty("--zoom-x",`${-t.x*3}%`),n.style.setProperty("--zoom-y",`${-t.y*3}%`),s.showModal()})});u.addEventListener("click",()=>s.close());s.addEventListener("click",e=>{(e.target===s||e.target===n)&&s.close()});s.addEventListener("close",()=>{i==null||i.focus(),i=null});
