/* -------------------------------------------------------------
 * script.js
 * Interactive scripts for Arastu Thakur's Architectural Portfolio
 * Includes: Typewriter, Counters, Project, Pub & Cert Filters
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // --- MOBILE NAV TOGGLE ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksList = document.getElementById('nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  if (mobileMenuBtn && navLinksList) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksList.classList.toggle('mobile-active');
      mobileMenuBtn.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinksList.classList.remove('mobile-active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }


  // --- TYPEWRITER EFFECT ---
  const typewriterText = document.getElementById('typewriter-text');
  const phrases = [
    'AI/ML Engineer at Intel',
    'Generative AI & LLM Systems',
    'Production MLOps & Automation',
    '15 Publications | 550+ Citations'
  ];
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIdx];
    
    if (isDeleting) {
      typewriterText.textContent = currentPhrase.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typewriterText.textContent = currentPhrase.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIdx === currentPhrase.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      typeSpeed = 400;
    }

    setTimeout(type, typeSpeed);
  }

  if (typewriterText) {
    type();
  }


  // --- ANIMATED COUNTERS FOR STATS ---
  const statNumbers = document.querySelectorAll('.metric-number');
  const statsSection = document.getElementById('about');

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const speed = target / 40; 
      
      const updateCount = () => {
        const current = +stat.innerText;
        if (current < target) {
          stat.innerText = Math.ceil(current + speed);
          setTimeout(updateCount, 25);
        } else {
          stat.innerText = target;
        }
      };
      
      updateCount();
    });
  };

  if (statsSection) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(statsSection);
  }


  // --- PROJECT FILTER LOGIC ---
  const projFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  function filterProjects(activeFilter) {
    projectCards.forEach(card => {
      const category = card.getAttribute('data-proj-category');
      
      if (activeFilter === 'all' || category === activeFilter) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 250);
      }
    });
  }

  projFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const activeFilter = btn.getAttribute('data-proj-filter');
      filterProjects(activeFilter);
    });
  });


  // --- CERTIFICATIONS HUB RENDERING LOGIC (SIMPLIFIED CURRICULUM LEDGER) ---
  const certTabBtns = document.querySelectorAll('.cert-tab-btn');
  const certMainInfo = document.getElementById('cert-main-info');
  const certCoursesList = document.getElementById('cert-courses-list');

  const certificationsData = {
    'ibm-genai': {
      title: 'Generative AI Engineering with LLMs',
      issuer: 'IBM',
      completedDate: 'October 21, 2024',
      duration: '7 courses',
      courseCount: '7 courses',
      certificateUrl: 'https://coursera.org/verify/specialization/NYLN4DFH49A2',
      description: 'Learners developed practical skills for AI and NLP engineer roles, including tokenization, data loaders, transformers, attention mechanisms, prompt engineering, GPT, BERT, PyTorch, Hugging Face Transformers, RAG applications, and LangChain document loaders.',
      skills: ['7 Courses', 'Generative AI Architectures', 'LLMs', 'Prompt Engineering', 'PyTorch', 'Hugging Face Transformers', 'RAG Applications', 'LangChain'],
      courseHighlights: [
        'Generative AI and LLMs: Architecture and Data Preparation',
        'Gen AI Foundational Models for NLP & Language Understanding',
        'Generative AI Language Modeling with Transformers',
        'Generative AI Engineering and Fine-Tuning Transformers',
        'Generative AI Advanced Fine-Tuning for LLMs',
        'Fundamentals of AI Agents Using RAG and LangChain',
        'Project: Generative AI Applications with RAG and LangChain'
      ],
    },
    'duke-mlops': {
      title: 'MLOps | Machine Learning Operations',
      issuer: 'Duke University',
      completedDate: 'October 20, 2024',
      duration: '4 courses',
      courseCount: '4 courses',
      certificateUrl: 'https://coursera.org/verify/specialization/HK87TXCQG8ON',
      description: 'This specialization builds a strong foundation in Python fundamentals, MLOps principles, data management, and production deployment. It includes hands-on work with Amazon SageMaker, AWS, Azure, MLflow, and Hugging Face for end-to-end ML solutions, pipelines, APIs, and ONNX-based container exports.',
      skills: ['4 Courses', 'Python Essentials for MLOps', 'Amazon SageMaker', 'Azure ML', 'MLflow', 'Hugging Face', 'Production ML', 'ONNX'],
      courseHighlights: [
        'Python Essentials for MLOps',
        'DevOps, DataOps, MLOps',
        'MLOps Platforms: Amazon SageMaker and Azure ML',
        'MLOps Tools: MLflow and Hugging Face'
      ],
    },
    'packt-devops': {
      title: 'DevOps Complete Course',
      issuer: 'Packt Publishing',
      completedDate: 'October 21, 2024',
      duration: '4 courses',
      courseCount: '4 courses',
      certificateUrl: 'https://coursera.org/verify/specialization/R7NAWDY144XA',
      description: 'This certificate focuses on core DevOps principles and modern software delivery, including Git and GitHub workflows, Maven and Jenkins automation, Docker and Kubernetes containerization, and infrastructure management with Ansible, Prometheus, and Grafana.',
      skills: ['4 Courses', 'Git and GitHub', 'Maven', 'Jenkins', 'Docker', 'Kubernetes', 'Ansible', 'Prometheus & Grafana'],
      courseHighlights: [
        'Foundations of DevOps and Git',
        'Advanced Git and GitHub Practices',
        'Build Automation and Continuous Integration',
        'Advanced DevOps Tools and Practices'
      ],
    }
  };

  function renderCertification(tabId) {
    const data = certificationsData[tabId];
    if (!data) return;

    // 1. Render Left Column (Specialization Summary)
    let skillsHtml = data.skills.map(s => `<span class="tag">${s}</span>`).join('');
    
    certMainInfo.innerHTML = `
      <div class="cert-badge-row">
        <span class="cert-logo">${data.issuer}</span>
        <span class="cert-verified">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Verified
        </span>
      </div>
      <div class="cert-title-desc">
        <h3>${data.title} Specialization</h3>
        <p>${data.description}</p>
        <div class="tech-tags">${skillsHtml}</div>
        ${data.courseHighlights ? `<div class="course-highlights">${data.courseHighlights.map(course => `<span class="tag">${course}</span>`).join('')}</div>` : ''}
      </div>
    `;

    // 2. Render Right Column (Single Certificate Verification Link)
    certCoursesList.innerHTML = `
      <div class="ledger-course-card" style="display: flex; justify-content: center; align-items: center; min-height: 120px;">
        <a href="${data.certificateUrl}" target="_blank" class="btn btn-outline btn-sm" style="padding: 0.2rem 0.5rem; font-size: 0.72rem; gap: 0.3rem; border-radius: 3px;">
          Verify Certificate
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      </div>
    `;
  }

  // Bind Tab clicks
  certTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const activeTabId = btn.getAttribute('data-cert-tab');
      renderCertification(activeTabId);
    });
  });

  // Render Default on Startup
  if (certMainInfo && certCoursesList) {
    renderCertification('ibm-genai');
  }


  // --- SEARCH, SORT, AND FILTER FOR PUBLICATIONS ---
  const searchInput = document.getElementById('pub-search');
  const sortSelect = document.getElementById('pub-sort');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubListContainer = document.getElementById('pub-list-container');
  const pubCards = Array.from(document.querySelectorAll('.pub-card'));

  function filterAndSortPublications() {
    const query = searchInput.value.toLowerCase().trim();
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    const sortKey = sortSelect.value;

    // 1. Sort the array of cards in-memory
    pubCards.sort((a, b) => {
      if (sortKey === 'citations') {
        const citationsA = parseInt(a.getAttribute('data-citations')) || 0;
        const citationsB = parseInt(b.getAttribute('data-citations')) || 0;
        return citationsB - citationsA; // Descending citations
      } else {
        const yearA = parseInt(a.getAttribute('data-year')) || 0;
        const yearB = parseInt(b.getAttribute('data-year')) || 0;
        
        if (yearA !== yearB) {
          return yearB - yearA; // Descending year
        }
        // Sub-sort by citations if years match
        const citationsA = parseInt(a.getAttribute('data-citations')) || 0;
        const citationsB = parseInt(b.getAttribute('data-citations')) || 0;
        return citationsB - citationsA;
      }
    });

    // 2. Append sorted elements back to DOM and toggle visibility
    pubCards.forEach(card => {
      pubListContainer.appendChild(card); // Re-orders DOM node

      const title = card.querySelector('.pub-title').textContent.toLowerCase();
      const authors = card.querySelector('.pub-authors').textContent.toLowerCase();
      const details = card.querySelector('.pub-details').textContent.toLowerCase();
      const venue = card.querySelector('.pub-venue').textContent.toLowerCase();
      const category = card.getAttribute('data-category');

      const matchesSearch = title.includes(query) || authors.includes(query) || details.includes(query) || venue.includes(query);
      const matchesCategory = activeFilter === 'all' || category === activeFilter;

      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
        }, 10);
      } else {
        card.style.display = 'none';
        card.style.opacity = '0';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterAndSortPublications);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', filterAndSortPublications);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterAndSortPublications();
    });
  });


  // --- SMOOTH SCROLL FOR NAV LINKS ---
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = item.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });


  // --- SCROLLSPY NAV ACTIVE LINKS ---
  const sections = document.querySelectorAll('section');
  
  function scrollspy() {
    let scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop - 200 && scrollPos < section.offsetTop + section.offsetHeight - 200) {
        const currentId = section.getAttribute('id');
        navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href') === `#${currentId}`) {
            item.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', scrollspy);

  // Trigger initial sort (by Citations by default)
  if (pubListContainer) {
    filterAndSortPublications();
  }

  // --- RESUME MODAL CONTROLLER ---
  const resumeModal = document.getElementById('resume-download-modal');
  const openResumeModalBtn = document.getElementById('open-resume-modal-btn');
  const closeResumeModalBtn = document.getElementById('close-resume-modal-btn');

  function openResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (openResumeModalBtn) openResumeModalBtn.setAttribute('aria-expanded', 'true');
  }

  function closeResumeModal() {
    if (!resumeModal) return;
    resumeModal.classList.remove('open');
    document.body.style.overflow = '';
    if (openResumeModalBtn) openResumeModalBtn.setAttribute('aria-expanded', 'false');
  }

  if (openResumeModalBtn) {
    openResumeModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openResumeModal();
    });
  }

  if (closeResumeModalBtn) {
    closeResumeModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeResumeModal();
    });
  }

  if (resumeModal) {
    // Close when clicking backdrop
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        closeResumeModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && resumeModal.classList.contains('open')) {
      closeResumeModal();
    }
  });

  // --- TOAST NOTIFICATIONS & COPY TO CLIPBOARD ---
  let toastTimeout;
  const showToast = (message) => {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#56d364" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2500);
  };

  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'Text';
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied ${label} to clipboard!`);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied ${label} to clipboard!`);
      }
    });
  });

  // --- DYNAMIC INTERACTIVE WOLF CURSOR FOLLOWER ---
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (isFinePointer && !prefersReducedMotion) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'wolf-cursor-target cursor-hidden';
    document.body.appendChild(cursorDot);

    const wolf = document.createElement('div');
    wolf.className = 'wolf-follower cursor-hidden state-idle';
    wolf.setAttribute('aria-hidden', 'true');
    wolf.innerHTML = `
      <svg viewBox="0 0 140 95">
        <defs>
          <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="35%" stop-color="#ff3344"/>
            <stop offset="100%" stop-color="#880011"/>
          </radialGradient>
          <linearGradient id="furGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2a3547"/>
            <stop offset="50%" stop-color="#141a24"/>
            <stop offset="100%" stop-color="#090c12"/>
          </linearGradient>
          <linearGradient id="maneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#3d4960"/>
            <stop offset="100%" stop-color="#151b25"/>
          </linearGradient>
        </defs>

        <!-- SAVAGE ROAR SHOCKWAVE -->
        <g class="howl-pulse-ring" style="opacity: 0; transform-origin: 118px 22px;">
          <circle cx="0" cy="0" r="10" fill="none" stroke="#ff2a4b" stroke-width="2.5" stroke-dasharray="4,3"/>
          <circle cx="0" cy="0" r="18" fill="none" stroke="#ff7b72" stroke-width="1.5" stroke-dasharray="2,4" opacity="0.8"/>
          <circle cx="0" cy="0" r="28" fill="none" stroke="#ff3344" stroke-width="1" opacity="0.5"/>
        </g>

        <!-- POSE 1: STANDING & CHARGING -->
        <g class="wolf-pose-standing">
          <!-- Far Hind Leg -->
          <g class="leg-br">
            <path fill="#0d1117" d="M38,44 Q28,54 24,66 Q26,72 20,80 L28,80 Q32,73 35,63 Q41,53 45,46 Z"/>
            <polygon fill="#ffffff" points="20,80 16,81 22,78"/>
            <polygon fill="#ffffff" points="24,80 22,82 26,78"/>
          </g>

          <!-- Far Foreleg -->
          <g class="leg-fr">
            <path fill="#0d1117" d="M78,46 Q74,58 72,68 Q70,74 66,80 L74,80 Q78,73 80,65 Q83,55 84,46 Z"/>
            <polygon fill="#ffffff" points="66,80 62,81 68,78"/>
            <polygon fill="#ffffff" points="70,80 68,82 72,78"/>
          </g>

          <!-- Bristling Spiky Battle Tail -->
          <g class="wolf-tail">
            <path fill="url(#furGrad)" d="M32,42 Q20,44 12,52 L7,50 L10,57 L4,58 L8,65 L2,68 Q6,73 14,68 L17,73 Q24,66 30,55 Q34,48 35,44 Z"/>
            <path fill="#3b485e" d="M14,64 L8,67 Q12,71 18,67 L21,70 Q25,64 28,57 Z" opacity="0.6"/>
          </g>

          <!-- Torso with Raised Hackles & Savage Head -->
          <g class="wolf-body-group">
            <!-- Spiky Hackles along spine -->
            <path fill="url(#maneGrad)" d="M32,42 L36,36 L39,40 L44,32 L48,37 L55,28 L60,34 L68,25 L74,32 L82,23 L87,29 Q78,45 68,52 Q54,54 42,50 Q35,49 32,42 Z"/>
            <path fill="#0a0d13" d="M44,49 Q56,53 68,50 Q64,44 54,43 Q46,43 44,49 Z"/>

            <!-- Powerful Chest & Scruff -->
            <path fill="#2a3547" d="M72,30 Q82,24 92,28 Q88,38 90,44 Q85,48 80,54 Q72,53 68,50 Q76,42 72,30 Z"/>
            <!-- Jagged White Throat Fur -->
            <path fill="#e6edf3" d="M84,38 L92,44 L86,47 L94,52 L83,53 L81,46 Z" opacity="0.9"/>
            <!-- Blood-red Rage Marks -->
            <path fill="#ff3344" d="M75,34 L82,31 L78,38 L85,36 L79,42 Z" opacity="0.45"/>

            <!-- SAVAGE SNARLING HEAD -->
            <g class="wolf-head">
              <!-- Pinned Far Ear -->
              <polygon fill="#0d1117" points="80,24 74,9 86,18"/>
              <polygon fill="#ff3344" points="77,19 75,12 82,17" opacity="0.5"/>

              <!-- Skull Base & Brow Ridge -->
              <path fill="url(#furGrad)" d="M82,26 Q86,18 94,17 Q102,16 112,23 L118,25 Q114,29 108,31 L102,32 Q95,35 88,34 Q82,35 82,26 Z"/>

              <!-- Pinned Near Ear with aggressive fur spikes -->
              <polygon fill="#3b485e" points="86,22 83,5 95,16"/>
              <polygon fill="#ff3344" points="86,18 84,8 91,15" opacity="0.6"/>
              <polygon fill="#141a24" points="89,20 85,7 87,17"/>

              <!-- Snarl Creases / Wrinkles across muzzle bridge -->
              <path stroke="#ff3344" stroke-width="1.3" stroke-linecap="round" fill="none" d="M106,23 Q108,20 111,22 M103,24 Q105,21 107,23"/>

              <!-- Upper Snarl Jaw -->
              <path fill="#1f2735" d="M104,22 L116,25 L124,28 L122,32 L114,31 L108,32 Z"/>
              <!-- Black Nose with flared nostril -->
              <path fill="#05070a" d="M122,27 L125,29 L123,31 L120,30 Z"/>
              <circle cx="122.5" cy="29.5" r="0.8" fill="#ff3344"/>

              <!-- Vicious Crimson Open Mouth Cavity -->
              <path fill="#660a12" d="M108,31 L120,32 L118,37 L109,38 L105,33 Z"/>
              <path fill="#b31b2c" d="M109,37 Q114,35 116,36 Q113,38 109,38 Z"/>

              <!-- DEADLY WHITE CANINES & TEETH -->
              <!-- Huge Upper Fang -->
              <polygon fill="#ffffff" points="117,31 120,31 118,40 116,35"/>
              <polygon fill="#ffffff" points="113,31 115,31 114,35"/>
              <polygon fill="#ffffff" points="109,32 111,32 110,35"/>
              <!-- Huge Lower Fang pointing up -->
              <polygon fill="#ffffff" points="115,39 117,39 116,32 114,37"/>
              <polygon fill="#ffffff" points="111,38 113,38 112,35"/>

              <!-- Lower Jaw bared in rage -->
              <path fill="#141a24" d="M105,33 L109,38 L119,38 L118,41 L108,42 Q102,40 100,35 Z"/>

              <!-- Jagged Cheek Fur Spikes -->
              <path fill="#e6edf3" d="M88,28 L94,36 L87,35 L95,42 L88,41 L93,46 L85,42 Z"/>

              <!-- BLAZING PREDATOR EYE -->
              <polygon fill="#05070a" points="98,18 108,21 106,23 97,20"/>
              <ellipse cx="102" cy="22" rx="3.5" ry="1.6" transform="rotate(-15 102 22)" fill="url(#eyeGlow)" filter="drop-shadow(0 0 5px #ff2233)"/>
              <line x1="102" y1="20.5" x2="102" y2="23.5" stroke="#000000" stroke-width="1.2" stroke-linecap="round"/>
            </g>
          </g>

          <!-- Near Hind Leg with Sharp Claws -->
          <g class="leg-bl">
            <path fill="url(#furGrad)" d="M42,42 Q32,50 30,62 Q31,71 27,80 L36,80 Q40,72 42,62 Q47,52 50,44 Z"/>
            <polygon fill="#ffffff" points="27,80 22,81 29,78"/>
            <polygon fill="#ffffff" points="31,80 28,82 33,78"/>
            <polygon fill="#ffffff" points="35,80 34,82 37,78"/>
          </g>

          <!-- Near Foreleg with Claws out -->
          <g class="leg-fl">
            <path fill="url(#furGrad)" d="M82,46 Q80,56 80,66 Q79,72 76,80 L85,80 Q87,72 87,64 Q89,54 87,46 Z"/>
            <polygon fill="#ffffff" points="76,80 71,81 78,78"/>
            <polygon fill="#ffffff" points="80,80 77,82 82,78"/>
            <polygon fill="#ffffff" points="84,80 83,82 86,78"/>
          </g>
        </g>

        <!-- POSE 2: SITTING (Dominant Predator Rest) -->
        <g class="wolf-pose-sitting">
          <!-- Tail curled along ground with spiky tufts -->
          <path fill="url(#furGrad)" d="M38,70 Q48,76 65,78 Q85,78 92,75 L95,72 L88,72 Q78,74 65,73 Q50,71 40,64 Z"/>
          <path fill="#e6edf3" d="M82,76 L92,75 L86,72 Z" opacity="0.85"/>
          <!-- Folded Haunches -->
          <path fill="#0d1117" d="M32,54 Q25,64 28,78 L42,78 Q45,70 48,62 Z"/>
          <path fill="url(#furGrad)" d="M38,52 Q28,62 30,78 L45,78 Q48,68 53,60 Q55,52 45,50 Z"/>
          <!-- Claws on back paw -->
          <polygon fill="#ffffff" points="30,78 26,79 32,76"/>
          <polygon fill="#ffffff" points="34,78 31,80 36,76"/>
          <!-- Slanted upright chest with raised hackles -->
          <path fill="url(#maneGrad)" d="M42,52 L46,44 L50,49 L58,40 L65,47 L74,38 L84,44 Q83,56 76,68 Q62,70 44,66 Z"/>
          <!-- Upright front legs with claws -->
          <path fill="#0d1117" d="M74,48 L72,78 L79,78 L82,52 Z"/>
          <polygon fill="#ffffff" points="72,78 68,79 74,76"/>
          <path fill="url(#furGrad)" d="M80,46 L79,78 L87,78 L88,50 Z"/>
          <polygon fill="#ffffff" points="79,78 75,79 81,76"/>
          <polygon fill="#ffffff" points="83,78 80,80 85,76"/>
          <!-- Jagged white chest ruff -->
          <path fill="#e6edf3" d="M80,40 L88,48 L82,52 L91,58 L80,59 Z"/>
          <!-- Sitting Head (Held high, baring fangs fiercely) -->
          <g class="wolf-head-sit">
            <polygon fill="#0d1117" points="80,20 74,5 86,14"/>
            <path fill="url(#furGrad)" d="M82,22 Q86,14 94,13 Q102,12 112,19 L118,21 Q114,25 108,27 L102,28 Q95,31 88,30 Q82,31 82,22 Z"/>
            <polygon fill="#3b485e" points="86,18 83,1 95,12"/>
            <polygon fill="#ff3344" points="86,14 84,4 91,11" opacity="0.6"/>
            <!-- Snarl creases -->
            <path stroke="#ff3344" stroke-width="1.3" stroke-linecap="round" fill="none" d="M106,19 Q108,16 111,18 M103,20 Q105,17 107,19"/>
            <!-- Snarl Jaws with fangs -->
            <path fill="#1f2735" d="M104,18 L116,21 L124,24 L122,28 L114,27 L108,28 Z"/>
            <path fill="#05070a" d="M122,23 L125,25 L123,27 L120,26 Z"/>
            <path fill="#660a12" d="M108,27 L120,28 L118,33 L109,34 L105,29 Z"/>
            <polygon fill="#ffffff" points="117,27 120,27 118,36 116,31"/>
            <polygon fill="#ffffff" points="115,35 117,35 116,28 114,33"/>
            <path fill="#141a24" d="M105,29 L109,34 L119,34 L118,37 L108,38 Q102,36 100,31 Z"/>
            <!-- Cheek tufts & eye -->
            <path fill="#e6edf3" d="M88,24 L94,32 L87,31 L95,38 L88,37 Z"/>
            <polygon fill="#05070a" points="98,14 108,17 106,19 97,16"/>
            <ellipse cx="102" cy="18" rx="3.5" ry="1.6" transform="rotate(-15 102 18)" fill="url(#eyeGlow)" filter="drop-shadow(0 0 5px #ff2233)"/>
            <line x1="102" y1="16.5" x2="102" y2="19.5" stroke="#000000" stroke-width="1.2" stroke-linecap="round"/>
          </g>
        </g>
      </svg>
    `;
    document.body.appendChild(wolf);

    let mouseX = -100;
    let mouseY = -100;
    let wolfX = -100;
    let wolfY = -100;
    let initialized = false;
    let facingRight = true;
    let currentState = 'idle';
    let idleTicks = 0;
    let stepDistance = 0;
    let isHowling = false;
    let activePawprints = 0;
    const MAX_PAWPRINTS = 10;

    // Savage Wolf Paw Print with 4 sharp claw talons
    const pawSvg = `
      <svg viewBox="0 0 24 24" fill="#ff2a4b">
        <!-- Claws -->
        <polygon points="5,6 3,2 6,5"/>
        <polygon points="9,3 8.5,0 10.5,3"/>
        <polygon points="14,3 14.5,0 12.5,3"/>
        <polygon points="18,6 20,2 17,5"/>
        <!-- Digital Pads -->
        <ellipse cx="6" cy="9" rx="1.8" ry="2.6" transform="rotate(-20 6 9)"/>
        <ellipse cx="10" cy="6.5" rx="1.8" ry="2.7" transform="rotate(-6 10 6.5)"/>
        <ellipse cx="14" cy="6.5" rx="1.8" ry="2.7" transform="rotate(6 14 6.5)"/>
        <ellipse cx="18" cy="9" rx="1.8" ry="2.6" transform="rotate(20 18 9)"/>
        <!-- Main Plantar Pad -->
        <path d="M12,11.5 C9,11.5 7.5,14 8.5,16.8 C9.2,19 11,20 12,20 C13,20 14.8,19 15.5,16.8 C16.5,14 15,11.5 12,11.5 Z"/>
      </svg>
    `;

    const spawnPawprint = (x, y, angle) => {
      if (activePawprints >= MAX_PAWPRINTS) return;
      activePawprints++;
      const paw = document.createElement('div');
      paw.className = 'wolf-pawprint';
      paw.innerHTML = pawSvg;
      paw.style.left = `${x}px`;
      paw.style.top = `${y}px`;
      paw.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
      document.body.appendChild(paw);
      setTimeout(() => {
        paw.remove();
        activePawprints = Math.max(0, activePawprints - 1);
      }, 1200);
    };

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!initialized) {
        wolfX = mouseX - 50;
        wolfY = mouseY + 30;
        initialized = true;
      }
      cursorDot.classList.remove('cursor-hidden');
      wolf.classList.remove('cursor-hidden');
    });

    document.addEventListener('mouseleave', () => {
      cursorDot.classList.add('cursor-hidden');
      wolf.classList.add('cursor-hidden');
    });

    document.addEventListener('mouseenter', () => {
      cursorDot.classList.remove('cursor-hidden');
      wolf.classList.remove('cursor-hidden');
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.add('cursor-active');
      isHowling = true;
      wolf.classList.add('state-howl');
      setTimeout(() => {
        isHowling = false;
        wolf.classList.remove('state-howl');
      }, 750);
    });

    document.addEventListener('mouseup', () => {
      document.body.classList.remove('cursor-active');
    });

    // Delegate hover states dynamically on interactive elements
    document.addEventListener('mouseover', (e) => {
      const interactive = e.target.closest('a, button, .btn, .social-icon, .filter-btn, .project-filter-btn, .cert-tab-btn, .project-card, .pub-card, .copy-pill-btn, .metric-card, .resume-option-card, [role="button"]');
      const textInput = e.target.closest('input, textarea');

      if (textInput) {
        document.body.classList.add('cursor-text');
        document.body.classList.remove('cursor-hover');
      } else if (interactive) {
        document.body.classList.add('cursor-hover');
        document.body.classList.remove('cursor-text');
      } else {
        document.body.classList.remove('cursor-hover', 'cursor-text');
      }
    });

    // Render loop using requestAnimationFrame
    const renderWolf = () => {
      if (initialized) {
        // Position precision cursor dot
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

        // Calculate following target position (behind/beside the cursor)
        const targetOffsetX = facingRight ? -58 : 58;
        const targetOffsetY = 28;
        const targetX = mouseX + targetOffsetX;
        const targetY = mouseY + targetOffsetY;

        const dx = targetX - wolfX;
        const dy = targetY - wolfY;
        const dist = Math.hypot(dx, dy);

        // Smooth responsive follow speed based on distance
        const followSpeed = dist > 260 ? 0.14 : (dist > 90 ? 0.09 : 0.06);
        const vx = dx * followSpeed;
        const vy = dy * followSpeed;
        const speed = Math.hypot(vx, vy);

        wolfX += vx;
        wolfY += vy;

        // Facing direction with deadzone to avoid jitter
        if (dx > 8 && !facingRight) {
          facingRight = true;
        } else if (dx < -8 && facingRight) {
          facingRight = false;
        }

        // State Machine: running, walking, idle, sitting, howling
        if (!isHowling) {
          if (speed > 4.5) {
            currentState = 'running';
            idleTicks = 0;
            stepDistance += speed;
            if (stepDistance > 38) {
              stepDistance = 0;
              spawnPawprint(
                wolfX + (facingRight ? -16 : 16),
                wolfY + 28,
                Math.atan2(vy, vx) + (facingRight ? 0 : Math.PI)
              );
            }
          } else if (speed > 0.8) {
            currentState = 'walking';
            idleTicks = 0;
            stepDistance += speed;
            if (stepDistance > 50) {
              stepDistance = 0;
              spawnPawprint(
                wolfX + (facingRight ? -12 : 12),
                wolfY + 28,
                Math.atan2(vy, vx) + (facingRight ? 0 : Math.PI)
              );
            }
          } else {
            idleTicks++;
            if (idleTicks > 190) { // ~3.2s of inactivity
              currentState = 'sitting';
            } else {
              currentState = 'idle';
            }
          }

          // Apply state classes
          wolf.className = `wolf-follower state-${currentState} ${isHowling ? 'state-howl' : ''}`;
        }

        // Slight tilt based on vertical movement
        const tilt = Math.max(-14, Math.min(14, vy * 1.5)) * (facingRight ? 1 : -1);
        const flip = facingRight ? 1 : -1;

        wolf.style.transform = `translate3d(${wolfX}px, ${wolfY}px, 0) translate(-50%, -50%) scaleX(${flip}) rotate(${tilt}deg)`;
      }

      requestAnimationFrame(renderWolf);
    };

    requestAnimationFrame(renderWolf);
  }

});


