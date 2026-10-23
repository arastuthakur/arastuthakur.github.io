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
      <svg viewBox="0 0 110 75">
        <!-- HOWL EFFECT RINGS -->
        <g class="howl-pulse-ring" style="opacity: 0; transform-origin: 88px 12px;">
          <circle cx="0" cy="0" r="8" fill="none" stroke="#ff7b72" stroke-width="2" stroke-dasharray="3,3"/>
          <circle cx="0" cy="0" r="16" fill="none" stroke="#ffa657" stroke-width="1.2" opacity="0.6"/>
        </g>

        <!-- POSE 1: STANDING & RUNNING -->
        <g class="wolf-pose-standing">
          <!-- Back Far Leg -->
          <g class="leg-br">
            <path class="wf-fur-far" d="M30,34 Q24,44 20,54 Q21,58 17,64 L23,64 Q25,58 27,50 Q31,42 34,36 Z"/>
          </g>
          <!-- Front Far Leg -->
          <g class="leg-fr">
            <path class="wf-fur-far" d="M63,36 Q60,46 59,54 Q57,59 55,64 L61,64 Q63,58 65,52 Q68,44 68,36 Z"/>
          </g>

          <!-- Tail -->
          <g class="wolf-tail">
            <path class="wf-fur-mid" d="M26,33 Q18,36 12,43 Q7,49 4,56 Q7,56 12,50 Q18,46 23,43 Q26,40 28,36 Z"/>
            <path class="wf-fur-ruff" d="M12,46 Q8,52 4,56 Q9,55 14,49 Z" opacity="0.85"/>
          </g>

          <!-- Torso & Head -->
          <g class="wolf-body-group">
            <path class="wf-fur-mid" d="M26,33 Q36,30 48,31 Q58,32 66,35 Q68,43 65,47 Q52,48 42,44 Q32,44 26,39 Z"/>
            <path class="wf-fur-belly" d="M38,43 Q48,46 58,45 Q54,42 46,41 Q39,41 38,43 Z" opacity="0.45"/>
            <path class="wf-fur-ruff" d="M62,34 Q68,38 70,44 Q65,46 62,43 Q65,39 61,36 Z"/>

            <!-- Head -->
            <g class="wolf-head">
              <polygon class="wf-fur-far" points="67,24 72,12 75,22"/>
              <path class="wf-fur-mid" d="M65,30 Q68,22 75,20 Q82,19 90,24 L91,27 Q83,29 78,34 Q70,36 65,30 Z"/>
              <path class="wf-fur-light" d="M82,21 L93,25 L92,27 L82,28 Z"/>
              <circle class="wf-nose" cx="92.5" cy="25.5" r="1.3"/>
              <polygon class="wf-fur-light" points="72,21 78,8 81,19"/>
              <polygon class="wf-ear-inner" points="74,19 78,11 79,18"/>
              <path class="wf-fur-ruff" d="M72,25 L75,32 L70,30 L73,34 L67,31 Z"/>
              <ellipse class="wf-eye" cx="81.5" cy="22" rx="2" ry="1.2" transform="rotate(-10 81.5 22)"/>
            </g>
          </g>

          <!-- Back Near Leg -->
          <g class="leg-bl">
            <path class="wf-fur-light" d="M33,34 Q28,43 25,52 Q26,57 23,64 L30,64 Q32,57 34,50 Q38,43 40,36 Z"/>
          </g>
          <!-- Front Near Leg -->
          <g class="leg-fl">
            <path class="wf-fur-light" d="M67,36 Q66,46 67,54 Q67,59 66,64 L73,64 Q73,58 73,52 Q74,44 72,36 Z"/>
          </g>
        </g>

        <!-- POSE 2: SITTING (Noble Alert Rest) -->
        <g class="wolf-pose-sitting">
          <!-- Tail curled around paws -->
          <path class="wf-fur-mid" d="M30,58 Q38,62 52,64 Q68,64 74,62 Q76,60 72,59 Q64,60 52,59 Q40,57 32,53 Z"/>
          <path class="wf-fur-ruff" d="M66,62 Q72,61 74,62 Q71,60 67,59 Z" opacity="0.85"/>
          <!-- Haunches folded -->
          <path class="wf-fur-far" d="M26,44 Q20,52 22,62 L32,62 Q34,56 36,50 Z"/>
          <path class="wf-fur-light" d="M30,42 Q23,50 25,62 L36,62 Q38,54 42,48 Q44,42 36,40 Z"/>
          <!-- Slanted sitting torso -->
          <path class="wf-fur-mid" d="M34,42 Q44,34 56,30 Q64,32 68,36 Q67,46 62,54 Q50,56 36,54 Z"/>
          <!-- Upright front legs -->
          <path class="wf-fur-far" d="M60,38 L58,62 L64,62 L66,42 Z"/>
          <path class="wf-fur-light" d="M65,37 L64,62 L70,62 L71,40 Z"/>
          <!-- Chest ruff -->
          <path class="wf-fur-ruff" d="M64,32 Q71,38 72,45 Q67,47 64,43 Z"/>
          <!-- Head held high -->
          <g class="wolf-head-sit">
            <polygon class="wf-fur-far" points="67,20 72,8 75,18"/>
            <path class="wf-fur-mid" d="M65,26 Q68,18 75,16 Q82,15 90,20 L91,23 Q83,25 78,30 Q70,32 65,26 Z"/>
            <path class="wf-fur-light" d="M82,17 L93,21 L92,23 L82,24 Z"/>
            <circle class="wf-nose" cx="92.5" cy="21.5" r="1.3"/>
            <polygon class="wf-fur-light" points="72,17 78,4 81,15"/>
            <polygon class="wf-ear-inner" points="74,15 78,7 79,14"/>
            <path class="wf-fur-ruff" d="M72,21 L75,28 L70,26 L73,30 L67,27 Z"/>
            <ellipse class="wf-eye" cx="81.5" cy="18" rx="2" ry="1.2" transform="rotate(-8 81.5 18)"/>
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

    const pawSvg = `
      <svg viewBox="0 0 20 20" fill="#ff7b72">
        <path d="M10,10 C7.5,10 6.2,12.2 7,14.5 C7.7,16.5 9,17.2 10,17.2 C11,17.2 12.3,16.5 13,14.5 C13.8,12.2 12.5,10 10,10 Z"/>
        <ellipse cx="5" cy="8.5" rx="1.6" ry="2.2" transform="rotate(-25 5 8.5)"/>
        <ellipse cx="8.3" cy="6" rx="1.6" ry="2.3" transform="rotate(-8 8.3 6)"/>
        <ellipse cx="11.7" cy="6" rx="1.6" ry="2.3" transform="rotate(8 11.7 6)"/>
        <ellipse cx="15" cy="8.5" rx="1.6" ry="2.2" transform="rotate(25 15 8.5)"/>
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
      }, 1300);
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
        const targetOffsetX = facingRight ? -45 : 45;
        const targetOffsetY = 24;
        const targetX = mouseX + targetOffsetX;
        const targetY = mouseY + targetOffsetY;

        const dx = targetX - wolfX;
        const dy = targetY - wolfY;
        const dist = Math.hypot(dx, dy);

        // Smooth responsive follow speed based on distance
        const followSpeed = dist > 260 ? 0.13 : (dist > 90 ? 0.085 : 0.055);
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
            if (stepDistance > 42) {
              stepDistance = 0;
              spawnPawprint(
                wolfX + (facingRight ? -12 : 12),
                wolfY + 22,
                Math.atan2(vy, vx) + (facingRight ? 0 : Math.PI)
              );
            }
          } else if (speed > 0.8) {
            currentState = 'walking';
            idleTicks = 0;
            stepDistance += speed;
            if (stepDistance > 55) {
              stepDistance = 0;
              spawnPawprint(
                wolfX + (facingRight ? -8 : 8),
                wolfY + 22,
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
        const tilt = Math.max(-12, Math.min(12, vy * 1.4)) * (facingRight ? 1 : -1);
        const flip = facingRight ? 1 : -1;

        wolf.style.transform = `translate3d(${wolfX}px, ${wolfY}px, 0) translate(-50%, -50%) scaleX(${flip}) rotate(${tilt}deg)`;
      }

      requestAnimationFrame(renderWolf);
    };

    requestAnimationFrame(renderWolf);
  }

});


