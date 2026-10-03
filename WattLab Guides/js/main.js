/* WattLab Guides - Enhanced Navigation System */

class WattLabGuides {
    constructor() {
        this.currentSection = null;
        this.searchIndex = [];
        this.sections = [];
        this.bookmarks = JSON.parse(localStorage.getItem('wattlab_bookmarks') || '[]');
        this.notes = JSON.parse(localStorage.getItem('wattlab_notes') || '{}');
        this.progress = JSON.parse(localStorage.getItem('wattlab_progress') || '{}');
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadEnhancedNavigation();
        this.setupAdvancedSearch();
        this.setupEmbeddedCalculators();
        this.setupCodeCopyButtons();
        this.setupBackToTop();
        this.setupBreadcrumbs();
        this.setupBookmarks();
        this.setupNotes();
        this.setupProgressTracking();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => this.toggleMobileNav());
        }

        // Search functionality
        const searchInput = document.querySelector('.search-input');
        const searchBtn = document.querySelector('.search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch(e.target.value);
                }
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const searchTerm = document.querySelector('.search-input').value;
                this.performSearch(searchTerm);
            });
        }

        // Navigation clicks - use more specific selectors
        document.addEventListener('click', (e) => {
            // Handle all navigation links
            if (e.target.matches('a[data-section]')) {
                e.preventDefault();
                this.handleNavigation(e.target);
            }
            
            // Handle section titles (expand/collapse)
            if (e.target.matches('.nav-section-title')) {
                this.toggleSection(e.target);
            }
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            const nav = document.getElementById('navSidebar');
            const menuBtn = document.querySelector('.mobile-menu-btn');
            
            if (window.innerWidth <= 768 && 
                !nav.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                nav.classList.remove('open');
            }
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }

    loadEnhancedNavigation() {
        // Enhanced navigation structure with icons and metadata
        const navStructure = {
            "🔧 Hardware": {
                icon: "🔧",
                color: "#ff6600",
                file: "hardware.html",
                subsections: {
                    "Electronic Fundamentals": {
                        icon: "⚡",
                        topics: ["Circuit Analysis & Design", "Passive Components", "Active Components", "Power Electronics"],
                        difficulty: "Beginner"
                    },
                    "Microprocessors & Microcontrollers": {
                        icon: "🖥️",
                        topics: ["Processor Architecture", "Memory Systems", "I/O Systems", "Interrupt Controllers"],
                        difficulty: "Intermediate"
                    },
                    "Embedded Hardware Design": {
                        icon: "🔌",
                        topics: ["Board Design", "PCB Layout", "Power Management", "Hardware Debugging"],
                        difficulty: "Advanced"
                    }
                }
            },
            "💻 Software": {
                icon: "💻",
                color: "#0088ff",
                file: "software.html",
                subsections: {
                    "Embedded Programming": {
                        icon: "⚙️",
                        topics: ["C Programming", "Memory Management", "Interrupt Service Routines", "Programming Paradigms"],
                        difficulty: "Beginner"
                    },
                    "Real-Time Systems & RTOS": {
                        icon: "⏱️",
                        topics: ["Real-Time Design Patterns", "Zephyr RTOS", "Task Scheduling", "Task Management"],
                        difficulty: "Intermediate"
                    },
                    "Design Patterns & Architecture": {
                        icon: "🏗️",
                        topics: ["Embedded Design Patterns", "System Architecture", "HAL", "Component Design"],
                        difficulty: "Advanced"
                    },
                    "Embedded Linux": {
                        icon: "🐧",
                        topics: ["Yocto Project", "Cross-Compilation", "Driver Development", "Kernel Development"],
                        difficulty: "Advanced"
                    }
                }
            },
            "☁️ Cloud & IoT": {
                icon: "☁️",
                color: "#8844ff",
                file: "cloud.html",
                subsections: {
                    "Embedded Linux & Cloud": {
                        icon: "🐧",
                        topics: ["Yocto Project", "BitBake Recipes", "Custom Layers", "Build Systems"],
                        difficulty: "Advanced"
                    },
                    "IoT Architecture": {
                        icon: "🌐",
                        topics: ["IoT Device Design", "Wireless Communication", "Sensor Networks", "Edge Computing"],
                        difficulty: "Intermediate"
                    },
                    "Cloud Integration": {
                        icon: "☁️",
                        topics: ["Cloud Connectivity", "Data Management", "API Design", "Protocols"],
                        difficulty: "Intermediate"
                    }
                }
            },
            "🔒 Security": {
                icon: "🔒",
                color: "#ff0066",
                file: "security.html",
                subsections: {
                    "Cryptography Fundamentals": {
                        icon: "🔐",
                        topics: ["Symmetric Encryption", "Hash Functions", "Data Authentication", "Kerckhoff's Principle"],
                        difficulty: "Intermediate"
                    },
                    "Hardware Security": {
                        icon: "🛡️",
                        topics: ["Hardware Attacks", "Fault Injection", "Side-Channel Analysis", "Power Analysis"],
                        difficulty: "Advanced"
                    },
                    "Defensive Measures": {
                        icon: "🔧",
                        topics: ["Countermeasures", "Secure Boot", "Memory Protection", "Anti-Tamper"],
                        difficulty: "Advanced"
                    }
                }
            },
            "🤖 Robotics": {
                icon: "🤖",
                color: "#00ff88",
                file: "robotics.html",
                subsections: {
                    "Robotics Fundamentals": {
                        icon: "🎯",
                        topics: ["Robot Kinematics", "Sensor Fusion", "Control Systems", "Path Planning"],
                        difficulty: "Intermediate"
                    },
                    "Cyber-Physical Systems": {
                        icon: "🌐",
                        topics: ["Real-Time Control", "Networked Control", "System Integration", "Performance Analysis"],
                        difficulty: "Advanced"
                    },
                    "Machine Learning at Edge": {
                        icon: "🧠",
                        topics: ["Neural Networks", "Edge AI", "Model Optimization", "Reinforcement Learning"],
                        difficulty: "Advanced"
                    }
                }
            },
            "🧪 Testing": {
                icon: "🧪",
                color: "#ffaa00",
                file: "testing.html",
                subsections: {
                    "Unit Testing": {
                        icon: "🔬",
                        topics: ["Test Framework", "Mock Objects", "Test Automation", "Coverage Analysis"],
                        difficulty: "Intermediate"
                    },
                    "Integration Testing": {
                        icon: "🔗",
                        topics: ["HIL Testing", "System Integration", "Performance Testing", "Stress Testing"],
                        difficulty: "Advanced"
                    },
                    "Debugging Tools": {
                        icon: "🐛",
                        topics: ["Debug Framework", "Memory Debugging", "Real-Time Debugging", "Profiling"],
                        difficulty: "Intermediate"
                    }
                }
            },
            "📚 Resources": {
                icon: "📚",
                color: "#666666",
                file: "resources.html",
                subsections: {
                    "Books & References": {
                        icon: "📖",
                        topics: ["Core Electronics", "System Architecture", "Real-Time Patterns", "Security & Crypto"],
                        difficulty: "All"
                    },
                    "Development Tools": {
                        icon: "🛠️",
                        topics: ["Hardware Tools", "Software Tools", "Simulation", "Testing Equipment"],
                        difficulty: "All"
                    },
                    "Learning Paths": {
                        icon: "🎓",
                        topics: ["Beginner Path", "Intermediate Path", "Advanced Path", "Specialization"],
                        difficulty: "All"
                    }
                }
            }
        };

        this.renderEnhancedNavigation(navStructure);
    }

    renderEnhancedNavigation(structure) {
        const navSidebar = document.getElementById('navSidebar');
        if (!navSidebar) return;

        let navHTML = `
            <!-- Enhanced Search Bar -->
            <div class="nav-search-container">
                <div class="nav-search">
                    <input type="text" class="nav-search-input" placeholder="🔍 Search handbook..." />
                    <button class="nav-search-btn">Search</button>
                </div>
                <div class="search-suggestions" id="nav-search-suggestions"></div>
            </div>

            <!-- Quick Actions -->
            <div class="nav-quick-actions">
                <button class="nav-action-btn bookmark-btn" title="Bookmarks">
                    <span class="nav-icon">⭐</span>
                    <span class="nav-label">Bookmarks</span>
                </button>
                <button class="nav-action-btn notes-btn" title="Notes">
                    <span class="nav-icon">📝</span>
                    <span class="nav-label">Notes</span>
                </button>
                <button class="nav-action-btn calculator-btn" title="Calculators">
                    <span class="nav-icon">🧮</span>
                    <span class="nav-label">Tools</span>
                </button>
            </div>

            <!-- Main Navigation -->
            <div class="nav-sections-container">
                <h2 class="nav-title">🏗️ WattLab Guides</h2>
        `;

        Object.entries(structure).forEach(([sectionName, sectionData]) => {
            const cleanSectionName = sectionName.replace(/[🔧💻☁️🔒🤖🧪📚]/g, '').trim();
            navHTML += `
                <div class="nav-section" data-section="${cleanSectionName}">
                    <div class="nav-section-header" style="--section-color: ${sectionData.color}">
                        <h3 class="nav-section-title">
                            <span class="nav-section-icon">${sectionData.icon}</span>
                            <span class="nav-section-text">${cleanSectionName}</span>
                            <span class="nav-section-toggle">▶</span>
                        </h3>
                        <div class="nav-progress-indicator">
                            <div class="nav-progress-bar" data-section="${cleanSectionName}"></div>
                        </div>
                    </div>
                    <div class="nav-subsections">
            `;

            Object.entries(sectionData.subsections).forEach(([subsectionName, subsectionData]) => {
                const subsectionId = `${cleanSectionName}-${subsectionName}`.toLowerCase().replace(/\s+/g, '-');
                navHTML += `
                    <div class="nav-subsection">
                        <div class="nav-subsection-header">
                            <a href="sections/${sectionData.file}#${subsectionId}" 
                               class="nav-subsection-link"
                               data-section="${cleanSectionName}" 
                               data-subsection="${subsectionName}">
                                <span class="nav-subsection-icon">${subsectionData.icon}</span>
                                <span class="nav-subsection-text">${subsectionName}</span>
                                <span class="nav-difficulty ${subsectionData.difficulty.toLowerCase()}">${subsectionData.difficulty}</span>
                            </a>
                            <button class="nav-subsection-toggle">▼</button>
                        </div>
                        <div class="nav-topics">
                `;

                subsectionData.topics.forEach(topic => {
                    const topicId = topic.toLowerCase().replace(/\s+/g, '-');
                    navHTML += `
                        <a href="sections/${sectionData.file}#${topicId}" 
                           class="nav-topic-link"
                           data-section="${cleanSectionName}" 
                           data-subsection="${subsectionName}"
                           data-topic="${topic}">
                            <span class="nav-topic-icon">•</span>
                            <span class="nav-topic-text">${topic}</span>
                        </a>
                    `;
                });

                navHTML += '</div></div>';
            });

            navHTML += '</div></div>';
        });

        navHTML += `
                </div>
            </div>

            <!-- Progress Section -->
            <div class="nav-progress-section">
                <div class="nav-progress-header">
                    <span class="nav-icon">📊</span>
                    <span class="nav-label">Reading Progress</span>
                </div>
                <div class="nav-progress-overall">
                    <div class="nav-progress-bar-overall" id="overall-progress"></div>
                    <span class="nav-progress-text" id="overall-progress-text">0% Complete</span>
                </div>
            </div>

            <!-- Recent Sections -->
            <div class="nav-recent-section">
                <div class="nav-recent-header">
                    <span class="nav-icon">🕒</span>
                    <span class="nav-label">Recent</span>
                </div>
                <div class="nav-recent-list" id="recent-sections"></div>
            </div>
        `;

        navSidebar.innerHTML = navHTML;
        this.setupEnhancedNavigationEvents();
    }

    toggleSection(sectionTitle) {
        const section = sectionTitle.closest('.nav-section');
        const subsections = section.querySelector('.nav-subsections');
        
        sectionTitle.classList.toggle('expanded');
        subsections.classList.toggle('expanded');
    }

    handleNavigation(link) {
        // Remove active class from all links
        document.querySelectorAll('a[data-section]').forEach(l => l.classList.remove('active'));
        
        // Add active class to clicked link
        link.classList.add('active');
        
        // Close mobile nav if open
        if (window.innerWidth <= 768) {
            document.getElementById('navSidebar').classList.remove('open');
        }

        // Get section and subsection from the link
        const section = link.dataset.section;
        const subsection = link.dataset.subsection;
        const topic = link.dataset.topic;
        const href = link.getAttribute('href');

        // Navigate to the section file
        if (href && href.startsWith('sections/')) {
            // Use a small delay to ensure the active state is applied
            setTimeout(() => {
                window.location.href = href;
            }, 100);
        } else if (section && subsection) {
            // Fallback: try to load content dynamically
            this.loadSectionContent(section, subsection, topic);
        }
    }

    async loadSectionContent(section, subsection, topic) {
        try {
            // Show loading state
            this.showLoading();

            // Load content from appropriate file
            const fileName = this.getFileName(section, subsection);
            const response = await fetch(`sections/${fileName}`);
            
            if (!response.ok) {
                throw new Error(`Failed to load ${fileName}`);
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract content
            const content = doc.querySelector('.content');
            if (content) {
                document.querySelector('.content-area').innerHTML = content.outerHTML;
                
                // Update breadcrumbs
                this.updateBreadcrumbs(section, subsection, topic);
                
                // Scroll to top
                window.scrollTo(0, 0);
            }

        } catch (error) {
            console.error('Error loading content:', error);
            this.showError(`Failed to load ${section} - ${subsection}`);
        } finally {
            this.hideLoading();
        }
    }

    getFileName(section, subsection) {
        const sectionMap = {
            'Hardware': 'hardware',
            'Software': 'software', 
            'Cloud & IoT': 'cloud',
            'Security': 'security',
            'Robotics & CPS': 'robotics',
            'Testing & Debugging': 'testing',
            'Resources': 'resources'
        };
        
        return `${sectionMap[section] || 'index'}.html`;
    }

    setupEnhancedNavigationEvents() {
        // Section toggle events
        document.querySelectorAll('.nav-section-title').forEach(title => {
            title.addEventListener('click', () => this.toggleSection(title));
        });

        // Subsection toggle events
        document.querySelectorAll('.nav-subsection-toggle').forEach(toggle => {
            toggle.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleSubsection(toggle);
            });
        });

        // Navigation link events
        document.querySelectorAll('.nav-subsection-link, .nav-topic-link').forEach(link => {
            link.addEventListener('click', (e) => {
                this.handleEnhancedNavigation(link, e);
            });
        });

        // Quick action events
        document.querySelectorAll('.nav-action-btn').forEach(btn => {
            btn.addEventListener('click', () => this.handleQuickAction(btn));
        });

        // Search events
        const searchInput = document.querySelector('.nav-search-input');
        const searchBtn = document.querySelector('.nav-search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleEnhancedSearch(e.target.value));
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.performEnhancedSearch(e.target.value);
            });
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                const query = document.querySelector('.nav-search-input').value;
                this.performEnhancedSearch(query);
            });
        }
    }

    setupAdvancedSearch() {
        this.buildEnhancedSearchIndex();
    }

    setupEmbeddedCalculators() {
        // Initialize embedded calculators
        this.calculators = {
            resistor: new ResistorCalculator(),
            timing: new TimingCalculator(),
            power: new PowerCalculator()
        };
    }

    async buildSearchIndex() {
        // This would typically load from all section files
        // For now, we'll use a basic implementation
        this.searchIndex = [
            { title: "Circuit Analysis", content: "Ohm's Law, Kirchhoff's Laws, AC/DC analysis", section: "Hardware", subsection: "Electronic Fundamentals" },
            { title: "Microcontrollers", content: "ARM Cortex-M, AVR, PIC, embedded programming", section: "Hardware", subsection: "Microprocessors & Microcontrollers" },
            { title: "Real-Time Systems", content: "RTOS, task scheduling, real-time constraints", section: "Software", subsection: "Real-Time Systems & RTOS" },
            { title: "Design Patterns", content: "Observer, State, Strategy patterns for embedded systems", section: "Software", subsection: "Design Patterns & Software Architecture" },
            { title: "IoT Security", content: "Device security, network protocols, penetration testing", section: "Security", subsection: "IoT Security & Practical Hacking" },
            { title: "Cryptography", content: "AES, RSA, ECC, hardware security modules", section: "Security", subsection: "Real-World Cryptography Implementation" },
            { title: "Robot Kinematics", content: "Forward kinematics, inverse kinematics, DH parameters", section: "Robotics & CPS", subsection: "Robotics Fundamentals" },
            { title: "Sensor Fusion", content: "Kalman filters, IMU integration, GPS fusion", section: "Robotics & CPS", subsection: "Robotics Fundamentals" },
            { title: "Machine Learning", content: "Neural networks, edge AI, model optimization", section: "Robotics & CPS", subsection: "Machine Learning at Edge" },
            { title: "SLAM", content: "Simultaneous localization and mapping, EKF-SLAM", section: "Robotics & CPS", subsection: "Autonomous Systems" },
            { title: "Unit Testing", content: "Embedded testing, mock objects, test automation", section: "Testing & Debugging", subsection: "Unit Testing" },
            { title: "HIL Testing", content: "Hardware-in-the-loop, integration testing", section: "Testing & Debugging", subsection: "Integration Testing" },
            { title: "Performance Testing", content: "Real-time analysis, profiling, optimization", section: "Testing & Debugging", subsection: "Performance Testing" },
            { title: "Debugging Tools", content: "Debug frameworks, memory debugging, profiling", section: "Testing & Debugging", subsection: "Debugging Tools" }
        ];
    }

    handleSearch(query) {
        if (query.length < 2) {
            this.hideSearchSuggestions();
            return;
        }
        
        const results = this.searchIndex.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
        );

        this.displaySearchSuggestions(results, query);
    }

    performSearch(query) {
        if (!query.trim()) return;
        
        const results = this.searchIndex.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length > 0) {
            // Navigate to first result
            const firstResult = results[0];
            this.loadSectionContent(firstResult.section, firstResult.subsection);
        } else {
            this.showMessage('No results found for: ' + query);
        }
    }

    displaySearchSuggestions(results, query) {
        // Remove existing suggestions
        this.hideSearchSuggestions();
        
        if (results.length === 0) return;
        
        // Create suggestions dropdown
        const suggestionsContainer = document.createElement('div');
        suggestionsContainer.className = 'search-suggestions';
        suggestionsContainer.id = 'search-suggestions';
        
        let suggestionsHTML = '';
        results.slice(0, 5).forEach(result => {
            suggestionsHTML += `
                <div class="search-suggestion" onclick="wattLab.navigateToSearchResult('${result.section}', '${result.subsection}')">
                    <strong>${this.highlightText(result.title, query)}</strong>
                    <p>${this.highlightText(result.content.substring(0, 80), query)}...</p>
                    <small>${result.section} > ${result.subsection}</small>
                </div>
            `;
        });
        
        suggestionsContainer.innerHTML = suggestionsHTML;
        
        // Position suggestions below search input
        const searchInput = document.querySelector('.search-input');
        const searchContainer = document.querySelector('.search-container');
        searchContainer.style.position = 'relative';
        searchContainer.appendChild(suggestionsContainer);
    }
    
    hideSearchSuggestions() {
        const existing = document.getElementById('search-suggestions');
        if (existing) {
            existing.remove();
        }
    }
    
    navigateToSearchResult(section, subsection) {
        this.hideSearchSuggestions();
        
        // Navigate to the section file
        const fileName = this.getFileName(section, subsection);
        const href = `sections/${fileName}`;
        
        window.location.href = href;
    }
    
    displaySearchResults(results, query) {
        // Create search results modal
        const modal = document.createElement('div');
        modal.className = 'search-results-modal';
        modal.innerHTML = `
            <div class="search-results-content">
                <div class="search-results-header">
                    <h3>Search Results for "${query}"</h3>
                    <button class="close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
                </div>
                <div class="search-results-list">
                    ${results.slice(0, 10).map(result => `
                        <div class="search-result-item" onclick="wattLab.navigateToSearchResult('${result.section}', '${result.subsection}')">
                            <div class="result-type">${result.section}</div>
                            <div class="result-title">${this.highlightText(result.title, query)}</div>
                            <div class="result-content">${this.highlightText(result.content, query)}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span class="search-highlight">$1</span>');
    }

    setupCodeCopyButtons() {
        // Add copy buttons and syntax highlighting to all code blocks
        const processCodeBlocks = () => {
            const codeBlocks = document.querySelectorAll('.code-block pre code');
            codeBlocks.forEach(block => {
                // Check if copy button already exists
                if (block.closest('.code-block').querySelector('.copy-btn')) return;
                
                // Add syntax highlighting
                this.highlightSyntax(block);
                
                // Add copy button to the code block container
                const codeBlock = block.closest('.code-block');
                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.textContent = 'Copy';
                copyBtn.onclick = () => this.copyToClipboard(block.textContent, copyBtn);
                
                codeBlock.style.position = 'relative';
                codeBlock.appendChild(copyBtn);
            });
        };
        
        // Process code blocks immediately and on content changes
        processCodeBlocks();
        
        // Watch for content changes
        const observer = new MutationObserver(processCodeBlocks);
        observer.observe(document.body, { childList: true, subtree: true });
    }
    
    highlightSyntax(codeElement) {
        let code = codeElement.textContent;
        const language = codeElement.className.match(/language-(\w+)/)?.[1] || 'c';
        
        // Language-specific highlighting
        switch(language) {
            case 'c':
            case 'cpp':
                code = this.highlightC(code);
                break;
            case 'python':
                code = this.highlightPython(code);
                break;
            case 'javascript':
                code = this.highlightJavaScript(code);
                break;
            case 'bash':
            case 'shell':
                code = this.highlightBash(code);
                break;
            case 'html':
                code = this.highlightHTML(code);
                break;
            case 'css':
                code = this.highlightCSS(code);
                break;
            case 'json':
                code = this.highlightJSON(code);
                break;
            default:
                code = this.highlightGeneric(code);
        }
        
        codeElement.innerHTML = code;
    }
    
    highlightC(code) {
        return code
            .replace(/\b(int|char|float|double|void|if|else|for|while|do|switch|case|break|continue|return|struct|typedef|enum|union|const|static|extern|volatile|register|signed|unsigned|long|short|auto|inline|restrict|_Bool|_Complex|_Imaginary)\b/g, '<span class="keyword">$1</span>')
            .replace(/"([^"\\]|\\.)*"/g, '<span class="string">$&</span>')
            .replace(/'([^'\\]|\\.)*'/g, '<span class="string">$&</span>')
            .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
            .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
            .replace(/\b\d+\.?\d*[fF]?\b/g, '<span class="number">$&</span>')
            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(')
            .replace(/\b(uint8_t|uint16_t|uint32_t|uint64_t|int8_t|int16_t|int32_t|int64_t|size_t|ssize_t|off_t|pid_t|uid_t|gid_t|mode_t|dev_t|ino_t|nlink_t|blksize_t|blkcnt_t|time_t|clock_t|clockid_t|timer_t|suseconds_t|useconds_t|key_t|id_t)\b/g, '<span class="type">$1</span>')
            .replace(/([+\-*/%=<>!&|^~])/g, '<span class="operator">$1</span>')
            .replace(/([{}();,])/g, '<span class="punctuation">$1</span>');
    }
    
    highlightPython(code) {
        return code
            .replace(/\b(def|class|if|elif|else|for|while|try|except|finally|with|as|import|from|return|yield|lambda|and|or|not|in|is|True|False|None)\b/g, '<span class="keyword">$1</span>')
            .replace(/"([^"\\]|\\.)*"/g, '<span class="string">$&</span>')
            .replace(/'([^'\\]|\\.)*'/g, '<span class="string">$&</span>')
            .replace(/#.*$/gm, '<span class="comment">$&</span>')
            .replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>')
            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(')
            .replace(/([+\-*/%=<>!&|^~])/g, '<span class="operator">$1</span>');
    }
    
    highlightJavaScript(code) {
        return code
            .replace(/\b(function|var|let|const|if|else|for|while|do|switch|case|break|continue|return|try|catch|finally|throw|new|this|class|extends|import|export|default|async|await)\b/g, '<span class="keyword">$1</span>')
            .replace(/"([^"\\]|\\.)*"/g, '<span class="string">$&</span>')
            .replace(/'([^'\\]|\\.)*'/g, '<span class="string">$&</span>')
            .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
            .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
            .replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>')
            .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g, '<span class="function">$1</span>(')
            .replace(/([+\-*/%=<>!&|^~])/g, '<span class="operator">$1</span>');
    }
    
    highlightBash(code) {
        return code
            .replace(/\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|echo|printf|read|cd|ls|grep|awk|sed|cut|sort|uniq|head|tail|wc|find|grep|awk|sed|cut|sort|uniq|head|tail|wc|find)\b/g, '<span class="keyword">$1</span>')
            .replace(/"([^"\\]|\\.)*"/g, '<span class="string">$&</span>')
            .replace(/'([^'\\]|\\.)*'/g, '<span class="string">$&</span>')
            .replace(/#.*$/gm, '<span class="comment">$&</span>')
            .replace(/\$[a-zA-Z_][a-zA-Z0-9_]*/g, '<span class="variable">$&</span>')
            .replace(/([+\-*/%=<>!&|^~])/g, '<span class="operator">$1</span>');
    }
    
    highlightHTML(code) {
        return code
            .replace(/&lt;([^&]+)&gt;/g, '<span class="tag">&lt;$1&gt;</span>')
            .replace(/&lt;\/?([a-zA-Z][a-zA-Z0-9]*)/g, '<span class="tag">&lt;/$1</span>')
            .replace(/([a-zA-Z-]+)=/g, '<span class="attribute">$1</span>=')
            .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
    }
    
    highlightCSS(code) {
        return code
            .replace(/([a-zA-Z-]+)\s*:/g, '<span class="property">$1</span>:')
            .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
            .replace(/#[a-fA-F0-9]{3,6}/g, '<span class="color">$&</span>')
            .replace(/\b\d+\.?\d*[a-zA-Z%]*\b/g, '<span class="number">$&</span>');
    }
    
    highlightJSON(code) {
        return code
            .replace(/"([^"]*)":/g, '<span class="property">"$1"</span>:')
            .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
            .replace(/\b(true|false|null)\b/g, '<span class="keyword">$1</span>')
            .replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');
    }
    
    highlightGeneric(code) {
        return code
            .replace(/"([^"\\]|\\.)*"/g, '<span class="string">$&</span>')
            .replace(/'([^'\\]|\\.)*'/g, '<span class="string">$&</span>')
            .replace(/\/\/.*$/gm, '<span class="comment">$&</span>')
            .replace(/\/\*[\s\S]*?\*\//g, '<span class="comment">$&</span>')
            .replace(/#.*$/gm, '<span class="comment">$&</span>')
            .replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');
    }

    async copyToClipboard(text, button) {
        try {
            await navigator.clipboard.writeText(text);
            button.textContent = 'Copied!';
            button.classList.add('copied');
            
            setTimeout(() => {
                button.textContent = 'Copy';
                button.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            button.textContent = 'Failed';
        }
    }

    setupBackToTop() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
        
        document.body.appendChild(backToTopBtn);
    }

    handleScroll() {
        const backToTopBtn = document.querySelector('.back-to-top');
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }
    }

    setupBreadcrumbs() {
        // Breadcrumb functionality will be implemented when content is loaded
    }

    updateBreadcrumbs(section, subsection, topic) {
        const breadcrumb = document.querySelector('.breadcrumb');
        if (breadcrumb) {
            let breadcrumbHTML = '<a href="#home">Home</a>';
            breadcrumbHTML += `<a href="#${section.toLowerCase()}">${section}</a>`;
            breadcrumbHTML += `<a href="#${subsection.toLowerCase()}">${subsection}</a>`;
            if (topic) {
                breadcrumbHTML += `<a href="#${topic.toLowerCase()}">${topic}</a>`;
            }
            breadcrumb.innerHTML = breadcrumbHTML;
        }
    }

    toggleMobileNav() {
        const nav = document.getElementById('navSidebar');
        nav.classList.toggle('open');
    }

    showLoading() {
        // Show loading indicator
        const loading = document.createElement('div');
        loading.className = 'loading';
        loading.id = 'loading-indicator';
        document.body.appendChild(loading);
    }

    hideLoading() {
        const loading = document.getElementById('loading-indicator');
        if (loading) {
            loading.remove();
        }
    }

    showError(message) {
        console.error(message);
        // Could show a toast notification or modal
    }

    showMessage(message) {
        console.log(message);
        // Could show a toast notification
    }

    // Enhanced Navigation Methods
    toggleSection(sectionTitle) {
        const section = sectionTitle.closest('.nav-section');
        const subsections = section.querySelector('.nav-subsections');
        const toggle = sectionTitle.querySelector('.nav-section-toggle');
        
        section.classList.toggle('expanded');
        subsections.classList.toggle('expanded');
        toggle.textContent = section.classList.contains('expanded') ? '▼' : '▶';
    }

    toggleSubsection(toggleBtn) {
        const subsection = toggleBtn.closest('.nav-subsection');
        const topics = subsection.querySelector('.nav-topics');
        
        subsection.classList.toggle('expanded');
        topics.classList.toggle('expanded');
        toggleBtn.textContent = subsection.classList.contains('expanded') ? '▲' : '▼';
    }

    handleEnhancedNavigation(link, event) {
        event.preventDefault();
        
        // Update active states
        document.querySelectorAll('.nav-subsection-link, .nav-topic-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Track navigation
        this.trackNavigation(link);
        
        // Navigate to content
        const href = link.getAttribute('href');
        if (href) {
            window.location.href = href;
        }
    }

    handleQuickAction(btn) {
        const action = btn.classList[1]; // bookmark-btn, notes-btn, calculator-btn
        
        switch(action) {
            case 'bookmark-btn':
                this.showBookmarks();
                break;
            case 'notes-btn':
                this.showNotes();
                break;
            case 'calculator-btn':
                this.showCalculators();
                break;
        }
    }

    handleEnhancedSearch(query) {
        if (query.length < 2) {
            this.hideSearchSuggestions();
            return;
        }
        
        const results = this.searchIndex.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        this.displaySearchSuggestions(results, query);
    }

    performEnhancedSearch(query) {
        if (!query.trim()) return;
        
        const results = this.searchIndex.filter(item => 
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.content.toLowerCase().includes(query.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );

        if (results.length > 0) {
            this.displaySearchResults(results, query);
        } else {
            this.showMessage('No results found for: ' + query);
        }
    }

    buildEnhancedSearchIndex() {
        // Enhanced search index with more metadata
        this.searchIndex = [
            // Hardware
            { title: "Ohm's Law", content: "Fundamental relationship between voltage, current, and resistance", section: "Hardware", subsection: "Electronic Fundamentals", tags: ["electronics", "circuit", "basics"], difficulty: "Beginner" },
            { title: "Operational Amplifiers", content: "Op-amps for signal conditioning, amplification, and filtering", section: "Hardware", subsection: "Electronic Fundamentals", tags: ["analog", "amplifier", "signal"], difficulty: "Intermediate" },
            { title: "Power Electronics", content: "Linear and switching regulators, buck/boost converters", section: "Hardware", subsection: "Electronic Fundamentals", tags: ["power", "regulator", "converter"], difficulty: "Advanced" },
            
            // Software
            { title: "RTOS Fundamentals", content: "Real-time operating systems, task scheduling, and timing", section: "Software", subsection: "Real-Time Systems & RTOS", tags: ["rtos", "real-time", "scheduling"], difficulty: "Intermediate" },
            { title: "Design Patterns", content: "Observer, State, Strategy patterns for embedded systems", section: "Software", subsection: "Design Patterns & Architecture", tags: ["patterns", "architecture", "design"], difficulty: "Advanced" },
            
            // Security
            { title: "Cryptography Fundamentals", content: "Symmetric encryption, hash functions, and authentication", section: "Security", subsection: "Cryptography Fundamentals", tags: ["crypto", "encryption", "security"], difficulty: "Intermediate" },
            { title: "Hardware Attacks", content: "Fault injection, side-channel analysis, and power analysis", section: "Security", subsection: "Hardware Security", tags: ["attacks", "fault-injection", "side-channel"], difficulty: "Advanced" },
            
            // Cloud & IoT
            { title: "Yocto Project", content: "Embedded Linux development using Yocto Project and BitBake", section: "Cloud & IoT", subsection: "Embedded Linux & Cloud", tags: ["linux", "yocto", "embedded"], difficulty: "Advanced" },
            { title: "IoT Architecture", content: "Device design, wireless communication, and sensor networks", section: "Cloud & IoT", subsection: "IoT Architecture", tags: ["iot", "wireless", "sensors"], difficulty: "Intermediate" }
        ];
    }

    // Bookmark System
    setupBookmarks() {
        this.updateBookmarksDisplay();
    }

    toggleBookmark(link) {
        const bookmarkId = `${link.dataset.section}-${link.dataset.subsection}`;
        const index = this.bookmarks.indexOf(bookmarkId);
        
        if (index > -1) {
            this.bookmarks.splice(index, 1);
        } else {
            this.bookmarks.push(bookmarkId);
        }
        
        localStorage.setItem('wattlab_bookmarks', JSON.stringify(this.bookmarks));
        this.updateBookmarksDisplay();
    }

    showBookmarks() {
        const modal = document.createElement('div');
        modal.className = 'modal bookmark-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>⭐ Bookmarks</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    ${this.bookmarks.length > 0 ? 
                        this.bookmarks.map(bookmark => `
                            <div class="bookmark-item">
                                <a href="#" class="bookmark-link">${bookmark}</a>
                                <button class="remove-bookmark" onclick="wattLab.removeBookmark('${bookmark}')">×</button>
                            </div>
                        `).join('') :
                        '<p>No bookmarks yet. Click the ⭐ icon on any section to bookmark it.</p>'
                    }
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // Notes System
    setupNotes() {
        this.updateNotesDisplay();
    }

    showNotes() {
        const modal = document.createElement('div');
        modal.className = 'modal notes-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>📝 Notes</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <textarea class="notes-textarea" placeholder="Add your notes here..."></textarea>
                    <button class="save-notes-btn" onclick="wattLab.saveNotes()">Save Notes</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    saveNotes() {
        const textarea = document.querySelector('.notes-textarea');
        const notes = textarea.value;
        this.notes[this.currentSection] = notes;
        localStorage.setItem('wattlab_notes', JSON.stringify(this.notes));
        this.showMessage('Notes saved!');
    }

    // Progress Tracking
    setupProgressTracking() {
        this.updateProgressDisplay();
    }

    trackNavigation(link) {
        const section = link.dataset.section;
        const subsection = link.dataset.subsection;
        const topic = link.dataset.topic;
        
        // Update progress
        if (!this.progress[section]) {
            this.progress[section] = { subsections: {}, visited: [] };
        }
        
        if (!this.progress[section].subsections[subsection]) {
            this.progress[section].subsections[subsection] = { topics: [], visited: false };
        }
        
        if (topic && !this.progress[section].subsections[subsection].topics.includes(topic)) {
            this.progress[section].subsections[subsection].topics.push(topic);
        }
        
        this.progress[section].subsections[subsection].visited = true;
        localStorage.setItem('wattlab_progress', JSON.stringify(this.progress));
        
        // Update recent sections
        this.updateRecentSections(section, subsection);
        
        // Update progress display
        this.updateProgressDisplay();
    }

    updateProgressDisplay() {
        // Calculate overall progress
        let totalSections = 0;
        let completedSections = 0;
        
        Object.values(this.progress).forEach(sectionProgress => {
            totalSections += Object.keys(sectionProgress.subsections).length;
            completedSections += Object.values(sectionProgress.subsections).filter(sub => sub.visited).length;
        });
        
        const overallProgress = totalSections > 0 ? (completedSections / totalSections) * 100 : 0;
        
        // Update progress bar
        const progressBar = document.getElementById('overall-progress');
        const progressText = document.getElementById('overall-progress-text');
        
        if (progressBar) {
            progressBar.style.width = `${overallProgress}%`;
        }
        
        if (progressText) {
            progressText.textContent = `${Math.round(overallProgress)}% Complete`;
        }
    }

    updateRecentSections(section, subsection) {
        const recentList = document.getElementById('recent-sections');
        if (!recentList) return;
        
        const recentKey = `${section}-${subsection}`;
        let recent = JSON.parse(localStorage.getItem('wattlab_recent') || '[]');
        
        // Remove if already exists
        recent = recent.filter(item => item !== recentKey);
        
        // Add to beginning
        recent.unshift(recentKey);
        
        // Keep only last 5
        recent = recent.slice(0, 5);
        
        localStorage.setItem('wattlab_recent', JSON.stringify(recent));
        
        // Update display
        recentList.innerHTML = recent.map(item => {
            const [s, ss] = item.split('-');
            return `<a href="#" class="recent-item" onclick="wattLab.navigateToRecent('${s}', '${ss}')">${s} > ${ss}</a>`;
        }).join('');
    }

    // Calculator System
    showCalculators() {
        const modal = document.createElement('div');
        modal.className = 'modal calculator-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🧮 Embedded Calculators</h3>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">×</button>
                </div>
                <div class="modal-body">
                    <div class="calculator-tabs">
                        <button class="calc-tab active" onclick="wattLab.showCalculator('resistor')">Resistor</button>
                        <button class="calc-tab" onclick="wattLab.showCalculator('timing')">Timing</button>
                        <button class="calc-tab" onclick="wattLab.showCalculator('power')">Power</button>
                    </div>
                    <div class="calculator-content" id="calculator-content">
                        ${this.renderResistorCalculator()}
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    renderResistorCalculator() {
        return `
            <div class="calculator" id="resistor-calc">
                <h4>Resistor Value Calculator</h4>
                <div class="calc-inputs">
                    <label>Band 1 (1st digit):</label>
                    <select id="band1">
                        <option value="0">Black (0)</option>
                        <option value="1">Brown (1)</option>
                        <option value="2">Red (2)</option>
                        <option value="3">Orange (3)</option>
                        <option value="4">Yellow (4)</option>
                        <option value="5">Green (5)</option>
                        <option value="6">Blue (6)</option>
                        <option value="7">Violet (7)</option>
                        <option value="8">Gray (8)</option>
                        <option value="9">White (9)</option>
                    </select>
                    
                    <label>Band 2 (2nd digit):</label>
                    <select id="band2">
                        <option value="0">Black (0)</option>
                        <option value="1">Brown (1)</option>
                        <option value="2">Red (2)</option>
                        <option value="3">Orange (3)</option>
                        <option value="4">Yellow (4)</option>
                        <option value="5">Green (5)</option>
                        <option value="6">Blue (6)</option>
                        <option value="7">Violet (7)</option>
                        <option value="8">Gray (8)</option>
                        <option value="9">White (9)</option>
                    </select>
                    
                    <label>Multiplier:</label>
                    <select id="multiplier">
                        <option value="1">Black (×1)</option>
                        <option value="10">Brown (×10)</option>
                        <option value="100" selected>Red (×100)</option>
                        <option value="1000">Orange (×1K)</option>
                        <option value="10000">Yellow (×10K)</option>
                        <option value="100000">Green (×100K)</option>
                        <option value="1000000">Blue (×1M)</option>
                        <option value="10000000">Violet (×10M)</option>
                    </select>
                    
                    <label>Tolerance:</label>
                    <select id="tolerance">
                        <option value="1">Brown (±1%)</option>
                        <option value="2">Red (±2%)</option>
                        <option value="5" selected>Gold (±5%)</option>
                        <option value="10">Silver (±10%)</option>
                    </select>
                </div>
                
                <button onclick="wattLab.calculateResistor()" class="calc-btn">Calculate</button>
                
                <div class="calc-result" id="resistor-result">
                    <h5>Result:</h5>
                    <div id="resistor-value">2200 Ω ±5%</div>
                    <div id="resistor-colors">🟫🟫🟥🟨</div>
                </div>
            </div>
        `;
    }

    calculateResistor() {
        const band1 = document.getElementById('band1').value;
        const band2 = document.getElementById('band2').value;
        const multiplier = document.getElementById('multiplier').value;
        const tolerance = document.getElementById('tolerance').value;
        
        const value = parseInt(band1 + band2) * parseInt(multiplier);
        const toleranceText = tolerance === '1' ? '±1%' : tolerance === '2' ? '±2%' : tolerance === '5' ? '±5%' : '±10%';
        
        document.getElementById('resistor-value').textContent = `${value} Ω ${toleranceText}`;
    }
}

// Calculator Classes
class ResistorCalculator {
    constructor() {
        this.bandColors = {
            0: { name: 'Black', color: '⚫', rgb: '#000000' },
            1: { name: 'Brown', color: '🟫', rgb: '#8B4513' },
            2: { name: 'Red', color: '🔴', rgb: '#FF0000' },
            3: { name: 'Orange', color: '🟠', rgb: '#FFA500' },
            4: { name: 'Yellow', color: '🟡', rgb: '#FFFF00' },
            5: { name: 'Green', color: '🟢', rgb: '#00FF00' },
            6: { name: 'Blue', color: '🔵', rgb: '#0000FF' },
            7: { name: 'Violet', color: '🟣', rgb: '#800080' },
            8: { name: 'Gray', color: '⚪', rgb: '#808080' },
            9: { name: 'White', color: '⚪', rgb: '#FFFFFF' }
        };
    }
}

class TimingCalculator {
    constructor() {
        // Timing calculation methods
    }
}

class PowerCalculator {
    constructor() {
        // Power calculation methods
    }
}

// Initialize WattLab Guides when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.wattLab = new WattLabGuides();
});

// Export for global access
window.WattLabGuides = WattLabGuides;

