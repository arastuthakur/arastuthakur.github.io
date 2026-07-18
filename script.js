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
    'AI/ML Engineer',
    'DevOps & Automation Engineer',
    'Generative AI Specialist',
    '16 Publications & 620+ Citations'
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

});
