// Main JS for EchoWithin landing page
(function(){
  'use strict'

  const projects = [
    {
      name: 'Blog',
      desc: 'A public blog for sharing thoughts, ideas and news.',
      href: 'https://blog.echowithin.xyz',
      status: 'live',
      note: 'A growing set of short posts and social app.'
    },
    {
      name: 'Discussio',
      desc: 'A small discussion app for group learning and management.',
      href: 'https://discussio.echowithin.xyz',
      status: 'experimental',
      note: 'Community-first, lightweight threading.'
    },
    {
      name: 'Scrapper',
      desc: 'An experimental scrapper for scrapping gospel lyrics and medium articles.',
      href: 'https://scrapper.echowithin.xyz',
      status: 'live',
      note: 'Mostly a tinkering tool; use carefully.'
    },
    {
      name: 'Library',
      desc: 'A curated collection of useful books for personal growth and learning.',
      href: 'https://library.echowithin.xyz',
      status: 'live',
      note: 'A curated collection of useful links and resources.'
    },
    {
      name: 'EchoWithin',
      desc: 'A personal homepage and lab for web experiments.',
      href: 'https://echowithin.xyz',
      status: 'live',
      note: 'You are here!'
    }
  ];

  const notes = [
    {text: 'Updated blog post on small frontend utilities', date: '2025-12-10'},
    {text: 'Improved the competition and reward system and also added a threaded discussion system in discussio', date: '2025-11-28'},
    {text: 'Improved the echowithin branding and design.', date: '2026-01-14'},
    {text: 'Improved the security and introduced personalised search history in scrapper.', date: '2026-01-13'},
    {text: 'Added new books and resources to the library.', date: '2026-01-10'},
    {text: 'Improved the pwa app of the blog for caching and offline support.', date: '2026-01-14'}
  ];

  // render projects with improved card design
  function renderProjects(){
    const grid = document.getElementById('projects-grid');
    if(!grid) return;
    grid.innerHTML = '';
    projects.forEach((p, index) => {
      const col = document.createElement('div');
      col.className = 'col-12 col-md-6 col-lg-4 reveal';
      col.style.transitionDelay = `${index * 0.05}s`;
      col.innerHTML = `
        <div class="card h-100">
          <div class="card-header-row d-flex justify-content-between align-items-start mb-3">
            <h3 class="h5 mb-0">${escapeHtml(p.name)}</h3>
            <span class="status ${statusClass(p.status)}">${statusLabel(p.status)}</span>
          </div>
          <p class="project-meta mb-3">${escapeHtml(p.desc)}</p>
          <div class="mt-auto pt-2">
            <a class="project-link" href="${p.href}" target="_blank" rel="noopener noreferrer">
              Visit project
            </a>
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

  // render notes with "see more" functionality
  const NOTES_LIMIT = 5;
  let showAllNotes = false;

  function renderNotes(){
    const list = document.getElementById('notes-list');
    if(!list) return;
    list.innerHTML = '';
    
    const notesToShow = showAllNotes ? notes : notes.slice(0, NOTES_LIMIT);
    
    notesToShow.forEach(n =>{
      const li = document.createElement('li');
      li.className = 'lab-note';
      li.innerHTML = `
        <span class="note-text">${escapeHtml(n.text)}</span>
        ${n.date ? `<span class="note-date">${escapeHtml(n.date)}</span>` : ''}
      `;
      list.appendChild(li);
    });

    // Add "See more" or "See less" button if there are more than NOTES_LIMIT notes
    if(notes.length > NOTES_LIMIT){
      const btnContainer = document.createElement('li');
      btnContainer.className = 'notes-toggle-container';
      const btn = document.createElement('button');
      btn.className = 'btn-see-more';
      btn.textContent = showAllNotes ? 'See less' : `See more (${notes.length - NOTES_LIMIT} more)`;
      btn.addEventListener('click', ()=>{
        showAllNotes = !showAllNotes;
        renderNotes();
      });
      btnContainer.appendChild(btn);
      list.appendChild(btnContainer);
    }
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

  // Mobile navigation toggle
  function setupMobileNav(){
    const toggle = document.getElementById('mobile-nav-toggle');
    const nav = document.getElementById('mobile-nav');
    if(!toggle || !nav) return;

    toggle.addEventListener('click', ()=>{
      const isActive = nav.classList.toggle('active');
      toggle.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isActive);
    });

    // Close mobile nav when clicking a link
    nav.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', ()=>{
        nav.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on escape key
    document.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && nav.classList.contains('active')){
        nav.classList.remove('active');
        toggle.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // theme toggle (persisted)
  function themeToggle(){
    const btn = document.getElementById('theme-toggle');
    const html = document.documentElement;
    if(!btn) return;
    
    const stored = localStorage.getItem('ew-theme');
    if(stored === 'light'){
      html.classList.remove('theme-dark');
      html.classList.add('theme-light');
      btn.textContent = '☀️';
    }
    
    btn.addEventListener('click', ()=>{
      if(html.classList.contains('theme-light')){
        html.classList.remove('theme-light');
        html.classList.add('theme-dark');
        localStorage.setItem('ew-theme','dark');
        btn.textContent = '🌙';
      } else {
        html.classList.remove('theme-dark');
        html.classList.add('theme-light');
        localStorage.setItem('ew-theme','light');
        btn.textContent = '☀️';
      }
    });
  }

  // fade-in reveal with staggered animation
  function setupReveal(){
    const obs = new IntersectionObserver(entries=>{
      entries.forEach(ent=>{
        if(ent.isIntersecting){
          ent.target.classList.add('visible');
          obs.unobserve(ent.target);
        }
      });
    },{threshold:0.1, rootMargin: '0px 0px -50px 0px'});
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  // set current year
  function setYear(){
    const el = document.getElementById('year');
    if(el) el.textContent = new Date().getFullYear();
  }

  // Smooth scroll for anchor links
  function setupSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href === '#') return;
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // init
  function init(){
    renderProjects();
    renderNotes();
    startBlinker();
    attachNoteHandlers();
    setupMobileNav();
    themeToggle();
    setupReveal();
    setupSmoothScroll();
    setYear();
  }

  // run when DOM ready
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
