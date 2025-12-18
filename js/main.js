// Main JS for EchoWithin landing page
(function(){
  'use strict'

  const projects = [
    {
      name: 'Blog',
      desc: 'Short essays, experiments, and lab write-ups.',
      href: 'https://blog.echowithin.xyz',
      status: 'live',
      note: 'A growing set of short posts and project notes.'
    },
    {
      name: 'Discussio',
      desc: 'A small discussion board for questions and ideas.',
      href: 'https://discussio.echowithin.xyz',
      status: 'experimental',
      note: 'Community-first, lightweight threading.'
    },
    {
      name: 'Scraper',
      desc: 'An experimental scraper for public data collections.',
      href: 'https://scraper.echowithin.xyz',
      status: 'paused',
      note: 'Mostly a tinkering tool; use carefully.'
    }
  ];

  const notes = [
    {text: 'Updated blog post on small frontend utilities — 2025-12-10'},
    {text: 'Experimented with a minimal discussion backend — trying out federated comments.'},
    {text: 'Refined the scraper’s rate limiting and small caching system.'}
  ];

  // render projects
  function renderProjects(){
    const grid = document.getElementById('projects-grid');
    grid.innerHTML = '';
    projects.forEach(p => {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-4 reveal';
      col.innerHTML = `
        <div class="card h-100">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <div>
              <h3 class="h5 mb-1">${escapeHtml(p.name)}</h3>
              <div class="project-meta">${escapeHtml(p.desc)}</div>
            </div>
            <div>
              <span class="status ${statusClass(p.status)}">${statusLabel(p.status)}</span>
            </div>
          </div>
          <div class="mt-3 d-flex justify-content-between align-items-center">
            <a class="stretched-link text-decoration-none" href="${p.href}" target="_blank" rel="noopener noreferrer">Open</a>
            <button class="btn-note btn btn-link text-muted" data-note="${escapeHtml(p.note)}">note</button>
          </div>
        </div>
      `;
      grid.appendChild(col);
    });
  }

  function statusClass(s){
    if(!s) return '';
    if(s.toLowerCase().startsWith('live')) return 'live';
    if(s.toLowerCase().startsWith('exp')) return 'exp';
    return 'arch';
  }

  function statusLabel(s){
    if(!s) return 'Unknown';
    if(s.toLowerCase().startsWith('live')) return 'Live';
    if(s.toLowerCase().startsWith('exp')) return 'Experimental';
    if(s.toLowerCase().startsWith('paused')) return 'Paused';
    return s;
  }

  // simple HTML escaper
  function escapeHtml(str){
    return (str+'').replace(/[&<>"]+/g, function(match){
      const map = {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'};
      return map[match] || match;
    });
  }

  // render notes
  function renderNotes(){
    const list = document.getElementById('notes-list');
    list.innerHTML = '';
    notes.forEach(n =>{
      const li = document.createElement('li');
      li.className = 'lab-note';
      li.textContent = n.text;
      list.appendChild(li);
    });
  }

  // simple blinking cursor
  function startBlinker(){
    const blink = document.getElementById('blinker');
    if(!blink) return;
    let on = true;
    setInterval(()=>{
      blink.style.opacity = on? '1' : '0.15';
      on = !on;
    },600);
  }

  // attach note button handlers
  function attachNoteHandlers(){
    document.addEventListener('click', (e)=>{
      if(e.target.matches('.btn-note')){
        const note = e.target.dataset.note || '';
        // simple ephemeral tooltip
        const tip = document.createElement('div');
        tip.className = 'lab-note';
        tip.textContent = note;
        document.body.appendChild(tip);
        const rect = e.target.getBoundingClientRect();
        tip.style.position = 'absolute';
        tip.style.left = (rect.left)+'px';
        tip.style.top = (rect.bottom + 8 + window.scrollY)+'px';
        setTimeout(()=> tip.remove(), 4000);
      }
    });
  }

  // theme toggle (persisted)
  function themeToggle(){
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const stored = localStorage.getItem('ew-theme');
    if(stored === 'light') html.classList.remove('theme-dark'), html.classList.add('theme-light');
    btn.addEventListener('click', ()=>{
      if(html.classList.contains('theme-light')){
        html.classList.remove('theme-light'); html.classList.add('theme-dark');
        localStorage.setItem('ew-theme','dark'); btn.textContent = '🌙';
      } else {
        html.classList.remove('theme-dark'); html.classList.add('theme-light');
        localStorage.setItem('ew-theme','light'); btn.textContent = '☀️';
      }
    });
  }

  // fade-in reveal
  function setupReveal(){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.classList.add('visible');
          obs.unobserve(ent.target);
        }
      });
    },{threshold:0.1});
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  // set current year
  function setYear(){
    const el = document.getElementById('year'); if(el) el.textContent = new Date().getFullYear();
  }

  // init
  function init(){
    renderProjects();
    renderNotes();
    startBlinker();
    attachNoteHandlers();
    themeToggle();
    setupReveal();
    setYear();
  }

  // run when DOM ready
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
