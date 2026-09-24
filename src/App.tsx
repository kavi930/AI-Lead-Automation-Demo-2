import React, { useState, useEffect } from 'react';

// Industry preset templates for quick demo and workflow inspection
interface IndustryPreset {
  id: string;
  name: string;
  businessType: string;
  service: string;
  message: string;
  leadStatus: 'HOT' | 'WARM' | 'NURTURE';
  priority: 'HIGH' | 'MEDIUM';
  humanRequired: 'YES' | 'NO';
  replyTemplate: string;
  workflowHighlights: string[];
}

const PRESETS: Record<string, IndustryPreset> = {
  clinic: {
    id: 'clinic',
    name: 'Rahul Mehta',
    businessType: 'Dental Clinic',
    service: 'Dental Consultation',
    message: 'I want an appointment next Tuesday at 11 AM for dental cleaning and checkup.',
    leadStatus: 'HOT',
    priority: 'HIGH',
    humanRequired: 'YES',
    replyTemplate: 'Hi Rahul! Thanks for reaching out to SmileCare Dental. We have received your appointment request for Tuesday at 11:00 AM. Our care coordinator is locking your slot and will confirm in 2 minutes.',
    workflowHighlights: [
      'Patient triage & dental emergency urgency detection',
      'Dr. appointment calendar slot reservation',
      'WhatsApp intake confirmation with clinic location & instructions',
      'SMS/WhatsApp reminder 2 hours prior to scheduled visit'
    ]
  },
  gym: {
    id: 'gym',
    name: 'Priya Sharma',
    businessType: 'Fitness Centre',
    service: 'Trial Session',
    message: 'Looking to join your fitness program. Can I book a free personal training trial session this Saturday morning?',
    leadStatus: 'HOT',
    priority: 'HIGH',
    humanRequired: 'NO',
    replyTemplate: 'Hey Priya! Welcome to Apex Fitness. We’d love to host you for a 1-on-1 trial session this Saturday! Tap below to pick your 9:00 AM or 10:30 AM trainer slot.',
    workflowHighlights: [
      'Instant membership tier & personal training brochure dispatch',
      'Automated trial session guest pass generation',
      'Trainer assignment based on morning shift roster',
      '48-hour post-trial conversion nurture sequence'
    ]
  },
  coaching: {
    id: 'coaching',
    name: 'Amit Verma',
    businessType: 'Coaching Centre',
    service: 'Course Enquiry',
    message: 'Interested in the advanced batch starting next month. Is a free demo lecture available this Sunday?',
    leadStatus: 'HOT',
    priority: 'HIGH',
    humanRequired: 'YES',
    replyTemplate: 'Hello Amit! Thank you for inquiring about our Advanced Program. We have reserved your seat for the free live demo lecture this Sunday at 10 AM. Syllabus details have been sent to your email.',
    workflowHighlights: [
      'Curriculum PDF & fee breakdown automatically emailed',
      'Seat reservation in upcoming Sunday demo masterclass',
      'Academic counsellor assigned to lead record in CRM',
      'Parent/Student follow-up call scheduled 24 hours after demo'
    ]
  }
};

export default function App() {
  // Mobile Nav State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Live Demo State
  const [formData, setFormData] = useState({
    fullName: 'Rahul Mehta',
    phone: '+91 98765 43210',
    email: 'rahul.mehta@example.com',
    businessType: 'Dental Clinic',
    service: 'Dental Consultation',
    message: 'I want an appointment next Tuesday at 11 AM.'
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [demoResult, setDemoResult] = useState<IndustryPreset | null>(null);

  // Book a Demo Modal State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookSubmitted, setBookSubmitted] = useState(false);
  const [bookForm, setBookForm] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: 'Clinic',
    preferredTime: 'Morning (10:00 AM - 1:00 PM)'
  });

  // Industry Workflow Modal State
  const [selectedWorkflowIndustry, setSelectedWorkflowIndustry] = useState<string | null>(null);

  // Animated Hero Pipeline Pulse
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStageIndex((prev) => (prev + 1) % 5);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Quick preset loader
  const handleLoadPreset = (presetKey: string) => {
    const preset = PRESETS[presetKey];
    if (!preset) return;
    setFormData({
      fullName: preset.name,
      phone: presetKey === 'clinic' ? '+91 98765 43210' : presetKey === 'gym' ? '+91 98111 22334' : '+91 99200 44556',
      email: `${preset.name.toLowerCase().replace(' ', '.')}@example.com`,
      businessType: preset.businessType,
      service: preset.service,
      message: preset.message
    });
    setFormErrors({});
  };

  // Run Automation Simulation
  const handleRunAutomation = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const errors: Record<string, string> = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.email.trim()) errors.email = 'Email address is required';
    if (!formData.message.trim()) errors.message = 'Please provide an enquiry message';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsProcessing(true);
    setProcessingStep(1);
    setDemoResult(null);

    // Multi-stage simulated intelligence sequence
    setTimeout(() => {
      setProcessingStep(2); // AI Analyzing
    }, 550);

    setTimeout(() => {
      setProcessingStep(3); // Lead Qualified
    }, 1150);

    setTimeout(() => {
      setProcessingStep(4); // Automation Selected
    }, 1750);

    setTimeout(() => {
      setIsProcessing(false);
      // Construct dynamic lead result
      const isUrgent = formData.message.toLowerCase().includes('appointment') ||
                       formData.message.toLowerCase().includes('tomorrow') ||
                       formData.message.toLowerCase().includes('urgent') ||
                       formData.service === 'Appointment';

      const personalizedResult: IndustryPreset = {
        id: 'custom',
        name: formData.fullName,
        businessType: formData.businessType,
        service: formData.service,
        message: formData.message,
        leadStatus: isUrgent ? 'HOT' : 'WARM',
        priority: isUrgent ? 'HIGH' : 'MEDIUM',
        humanRequired: formData.service.includes('Enquiry') || formData.service.includes('Question') ? 'YES' : 'YES',
        replyTemplate: `Hi ${formData.fullName.split(' ')[0]}! Thanks for reaching out regarding our ${formData.service}. We have safely received your enquiry. Our team is reviewing availability and will confirm the details with you shortly.`,
        workflowHighlights: [
          `Lead verified and created under ${formData.businessType} CRM pipeline`,
          `High-priority alert dispatched to duty manager`,
          `Instant 2-way WhatsApp channel open for ${formData.fullName}`,
          `Follow-up timer initiated (Auto-escalation if untouched in 15 mins)`
        ]
      };

      setDemoResult(personalizedResult);
    }, 2350);
  };

  // Handle Book Demo submit
  const handleBookDemoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookForm.name || !bookForm.email) return;
    setBookSubmitted(true);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWorkflowModal = (industryKey: string) => {
    setSelectedWorkflowIndustry(industryKey);
  };

  return (
    <div className="leadflow-app">
      {/* -------------------------------------------------------------
          STICKY HEADER
          ------------------------------------------------------------- */}
      <header className="header-nav">
        <div className="container">
          <div className="header-inner">
            <div className="brand-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="brand-icon-box" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <div className="brand-text">
                <span className="brand-title">
                  LEADFLOW <span>AI</span>
                </span>
                <span className="brand-subtitle">AI AUTOMATION</span>
              </div>
            </div>

            <nav>
              <ul className="nav-links">
                <li className="nav-item">
                  <a href="#solutions" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>Solutions</a>
                </li>
                <li className="nav-item">
                  <a href="#how-it-works" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How It Works</a>
                </li>
                <li className="nav-item">
                  <a href="#live-demo" onClick={(e) => { e.preventDefault(); scrollToSection('live-demo'); }}>Live Demo</a>
                </li>
                <li className="nav-item">
                  <a href="#industries" onClick={(e) => { e.preventDefault(); scrollToSection('industries'); }}>Industries</a>
                </li>
              </ul>
            </nav>

            <div className="header-actions">
              <button className="btn-header-cta" onClick={() => { setIsBookModalOpen(true); setBookSubmitted(false); }}>
                BOOK A DEMO
              </button>
              <button 
                className="mobile-menu-btn" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div style={{ background: '#0e1526', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '16px 24px' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <li>
                <a href="#solutions" style={{ color: '#fff', fontSize: '0.95rem' }} onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>Solutions</a>
              </li>
              <li>
                <a href="#how-it-works" style={{ color: '#fff', fontSize: '0.95rem' }} onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How It Works</a>
              </li>
              <li>
                <a href="#live-demo" style={{ color: '#fff', fontSize: '0.95rem' }} onClick={(e) => { e.preventDefault(); scrollToSection('live-demo'); }}>Live Demo</a>
              </li>
              <li>
                <a href="#industries" style={{ color: '#fff', fontSize: '0.95rem' }} onClick={(e) => { e.preventDefault(); scrollToSection('industries'); }}>Industries</a>
              </li>
              <li style={{ paddingTop: '8px' }}>
                <button 
                  className="btn-header-cta" 
                  style={{ width: '100%', justifyContent: 'center' }} 
                  onClick={() => { setIsBookModalOpen(true); setMobileMenuOpen(false); setBookSubmitted(false); }}
                >
                  BOOK A DEMO
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* -------------------------------------------------------------
          HERO SECTION (Dark Navy)
          ------------------------------------------------------------- */}
      <section className="hero-section">
        <div className="hero-glow-bg" />
        <div className="container">
          <div className="hero-grid">
            {/* Left Column */}
            <div className="hero-left">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                AI-POWERED BUSINESS AUTOMATION
              </div>

              <h1 className="hero-headline">
                Turn Every Enquiry Into a Followed-Up Lead.
                <span className="hero-highlight">Automatically.</span>
              </h1>

              <p className="hero-supporting-text">
                Capture enquiries, qualify leads with AI, respond through WhatsApp and email, and automate appointment follow-ups — all from one connected workflow.
              </p>

              <div className="hero-cta-group">
                <button className="btn-primary-hero" onClick={() => scrollToSection('live-demo')}>
                  SEE LIVE DEMO
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <button className="btn-secondary-hero" onClick={() => scrollToSection('how-it-works')}>
                  HOW IT WORKS
                </button>
              </div>

              <div className="hero-feature-pills">
                <div className="hero-pill-item">
                  <span className="hero-pill-check">✓</span>
                  AI Lead Qualification
                </div>
                <div className="hero-pill-item">
                  <span className="hero-pill-check">✓</span>
                  WhatsApp Follow-up
                </div>
                <div className="hero-pill-item">
                  <span className="hero-pill-check">✓</span>
                  Email Notifications
                </div>
                <div className="hero-pill-item">
                  <span className="hero-pill-check">✓</span>
                  Appointment Automation
                </div>
              </div>
            </div>

            {/* Right Column: Realistic Animated Automation Dashboard */}
            <div className="hero-dashboard-container">
              <div className="hero-dashboard-glass">
                {/* Dashboard Header Bar */}
                <div className="dashboard-header-bar">
                  <div className="dashboard-live-indicator">
                    <span className="dashboard-pulsing-node" />
                    WORKFLOW ENGINE ACTIVE
                  </div>
                  <span className="dashboard-system-time">LATENCY &lt; 250ms</span>
                </div>

                {/* Top Card: New Enquiry */}
                <div className="dashboard-enquiry-card">
                  <div className="dashboard-enquiry-meta">
                    <span className="enquiry-badge-tag">NEW ENQUIRY</span>
                    <span className="enquiry-timestamp">JUST NOW</span>
                  </div>
                  <div className="enquiry-customer-name">Rahul Mehta</div>
                  <div className="enquiry-service-type">Dental Consultation</div>
                  <div className="enquiry-quote">
                    "I want an appointment next week."
                  </div>
                </div>

                {/* Animated Connection Pipeline */}
                <div className="pipeline-flow">
                  {/* Step 1: New Enquiry */}
                  <div className={`pipeline-node ${activeStageIndex === 0 ? 'active-stage' : ''}`}>
                    <div className="node-left">
                      <div className="node-icon-box">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="node-title">NEW ENQUIRY</div>
                        <div className="node-sub">Captured from web form</div>
                      </div>
                    </div>
                    <div className="node-status-indicator">
                      <span>✓ Ingested</span>
                    </div>
                  </div>

                  {/* Step 2: AI Analysis */}
                  <div className={`pipeline-node ${activeStageIndex === 1 ? 'active-stage' : ''}`}>
                    <div className="node-left">
                      <div className="node-icon-box">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
                        </svg>
                      </div>
                      <div>
                        <div className="node-title">AI ANALYSIS</div>
                        <div className="node-sub">Intent: Booking · Sentiment: High</div>
                      </div>
                    </div>
                    <div className="node-status-indicator">
                      <span>✓ 98.4% Match</span>
                    </div>
                  </div>

                  {/* Step 3: Hot Lead */}
                  <div className={`pipeline-node ${activeStageIndex === 2 ? 'active-stage' : ''}`}>
                    <div className="node-left">
                      <div className="node-icon-box">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                        </svg>
                      </div>
                      <div>
                        <div className="node-title">HOT LEAD</div>
                        <div className="node-sub">Priority 1 · Immediate routing</div>
                      </div>
                    </div>
                    <div className="node-status-indicator">
                      <span style={{ color: '#fb7185' }}>● HOT</span>
                    </div>
                  </div>

                  {/* Step 4: WhatsApp */}
                  <div className={`pipeline-node ${activeStageIndex === 3 ? 'active-stage' : ''}`}>
                    <div className="node-left">
                      <div className="node-icon-box">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="node-title">WHATSAPP</div>
                        <div className="node-sub">Instant response sent in 4s</div>
                      </div>
                    </div>
                    <div className="node-status-indicator">
                      <span>✓ Delivered</span>
                    </div>
                  </div>

                  {/* Step 5: Appointment */}
                  <div className={`pipeline-node ${activeStageIndex === 4 ? 'active-stage' : ''}`}>
                    <div className="node-left">
                      <div className="node-icon-box">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="node-title">APPOINTMENT</div>
                        <div className="node-sub">Calendar sync & staff alert</div>
                      </div>
                    </div>
                    <div className="node-status-indicator">
                      <span>✓ Hold Slot</span>
                    </div>
                  </div>
                </div>

                {/* Status Labels */}
                <div className="dashboard-tags-row">
                  <span className="dash-tag tag-hot">HOT LEAD</span>
                  <span className="dash-tag tag-priority">HIGH PRIORITY</span>
                  <span className="dash-tag tag-appoint">APPOINTMENT</span>
                  <span className="dash-tag tag-human">HUMAN REQUIRED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          TRUST BAR
          ------------------------------------------------------------- */}
      <section className="trust-bar-section">
        <div className="container">
          <div className="trust-bar-label">
            BUILT FOR ENQUIRY-DRIVEN BUSINESSES
          </div>
          <div className="trust-pills-row">
            <div className="trust-item">
              <span className="trust-bullet" /> CLINICS
            </div>
            <div className="trust-item">
              <span className="trust-bullet" /> DENTAL CLINICS
            </div>
            <div className="trust-item">
              <span className="trust-bullet" /> GYMS &amp; FITNESS
            </div>
            <div className="trust-item">
              <span className="trust-bullet" /> COACHING CENTRES
            </div>
            <div className="trust-item">
              <span className="trust-bullet" /> EDUCATION
            </div>
            <div className="trust-item">
              <span className="trust-bullet" /> LOCAL SERVICES
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          PROBLEM SECTION (Clean White Background)
          ------------------------------------------------------------- */}
      <section className="problem-section" id="problem">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">THE FOLLOW-UP GAP</span>
            <h2 className="section-title-dark">
              Your Leads Are Coming In.<br />Who Is Following Up?
            </h2>
            <p className="section-subtitle-dark">
              Most businesses don't lose leads because customers aren't interested. They lose leads because enquiries are missed, delayed or forgotten.
            </p>
          </div>

          <div className="problem-cards-grid">
            {/* Card 1 */}
            <div className="problem-card">
              <div className="problem-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
              </div>
              <h3 className="problem-card-title">MISSED ENQUIRIES</h3>
              <p className="problem-card-desc">
                Website and form enquiries sit unanswered in email inboxes after office hours and on busy weekends.
              </p>
              <div className="problem-card-stat">
                ⚠️ 42% of weekend leads go unread
              </div>
            </div>

            {/* Card 2 */}
            <div className="problem-card">
              <div className="problem-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="problem-card-title">SLOW RESPONSE</h3>
              <p className="problem-card-desc">
                Customers move on when responses take too long. Prospective clients inquire with 3 competitors simultaneously.
              </p>
              <div className="problem-card-stat">
                ⚠️ 78% buy from the first respondent
              </div>
            </div>

            {/* Card 3 */}
            <div className="problem-card">
              <div className="problem-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="problem-card-title">MANUAL FOLLOW-UP</h3>
              <p className="problem-card-desc">
                Front-desk staff spend hours manually copying phone numbers, calling unanswered dials, and pasting messages.
              </p>
              <div className="problem-card-stat">
                ⚠️ 15+ hours lost weekly per staff member
              </div>
            </div>

            {/* Card 4 */}
            <div className="problem-card">
              <div className="problem-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <line x1="10" y1="14" x2="14" y2="18"></line>
                  <line x1="14" y1="14" x2="10" y2="18"></line>
                </svg>
              </div>
              <h3 className="problem-card-title">MISSED APPOINTMENTS</h3>
              <p className="problem-card-desc">
                Appointment requests require manual coordination, back-and-forth messaging, and fall through the cracks.
              </p>
              <div className="problem-card-stat">
                ⚠️ 31% no-show rate without automation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          SOLUTION WORKFLOW SECTION (Dark Background)
          ------------------------------------------------------------- */}
      <section className="solution-section" id="solutions">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">CONNECTED ARCHITECTURE</span>
            <h2 className="section-title-light">
              One Enquiry.<br />An Entire Automated Workflow.
            </h2>
            <p className="section-subtitle-light">
              Every incoming lead triggers an intelligent chain reaction. From the moment they click submit to confirmed booking.
            </p>
          </div>

          <div className="workflow-steps-track">
            {/* Step 1 */}
            <div className="workflow-card">
              <div className="step-num-kicker">STEP 01</div>
              <div className="step-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <h3 className="step-role-title">CUSTOMER</h3>
              <p className="step-role-desc">Website enquiry, Google ad lead, or direct form submission.</p>
              <div className="workflow-connector-line" />
            </div>

            {/* Step 2 */}
            <div className="workflow-card">
              <div className="step-num-kicker">STEP 02</div>
              <div className="step-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
              </div>
              <h3 className="step-role-title">AI</h3>
              <p className="step-role-desc">Understands intent, timing, budget signals, and specific service needs.</p>
              <div className="workflow-connector-line" />
            </div>

            {/* Step 3 */}
            <div className="workflow-card">
              <div className="step-num-kicker">STEP 03</div>
              <div className="step-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="step-role-title">QUALIFY</h3>
              <p className="step-role-desc">Assigns lead score: HOT / WARM / COLD with priority flags.</p>
              <div className="workflow-connector-line" />
            </div>

            {/* Step 4 */}
            <div className="workflow-card">
              <div className="step-num-kicker">STEP 04</div>
              <div className="step-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <h3 className="step-role-title">RESPOND</h3>
              <p className="step-role-desc">Instant personalized reply via WhatsApp + Staff Email notification.</p>
              <div className="workflow-connector-line" />
            </div>

            {/* Step 5 */}
            <div className="workflow-card">
              <div className="step-num-kicker">STEP 05</div>
              <div className="step-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="step-role-title">APPOINT</h3>
              <p className="step-role-desc">Direct calendar sync, provisional booking, and doctor/coach roster check.</p>
              <div className="workflow-connector-line" />
            </div>

            {/* Step 6 */}
            <div className="workflow-card">
              <div className="step-num-kicker">STEP 06</div>
              <div className="step-icon-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
              </div>
              <h3 className="step-role-title">FOLLOW-UP</h3>
              <p className="step-role-desc">Timed WhatsApp reminders ensure zero no-shows and complete conversion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          LIVE DEMO SECTION (Distinctive Background)
          ------------------------------------------------------------- */}
      <section className="demo-section" id="live-demo">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">INTERACTIVE DEMO</span>
            <h2 className="section-title-light">
              See What Happens When a Lead Enquires.
            </h2>
            <p className="section-subtitle-light">
              Enter a sample customer enquiry. The demo will show how the automation qualifies the lead and decides the next action.
            </p>
          </div>

          <div className="demo-grid-frame">
            {/* Left: Input Form Card */}
            <div className="demo-card-form">
              <div className="form-group-title">
                <span className="form-title-text">Sample Customer Enquiry</span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Simulator Input</span>
              </div>

              {/* Quick Fill Presets */}
              <div className="quick-fill-presets">
                <span className="quick-fill-label">Quick Test:</span>
                <button 
                  type="button" 
                  className="btn-preset" 
                  onClick={() => handleLoadPreset('clinic')}
                >
                  Dental Clinic
                </button>
                <button 
                  type="button" 
                  className="btn-preset" 
                  onClick={() => handleLoadPreset('gym')}
                >
                  Gym Trial
                </button>
                <button 
                  type="button" 
                  className="btn-preset" 
                  onClick={() => handleLoadPreset('coaching')}
                >
                  Coaching Class
                </button>
              </div>

              <form onSubmit={handleRunAutomation}>
                <div className="form-fields-grid">
                  <div>
                    <label className="field-label" htmlFor="fullName">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="field-input"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Mehta"
                    />
                    {formErrors.fullName && <div className="field-error-msg">{formErrors.fullName}</div>}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      className="field-input"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                    />
                    {formErrors.phone && <div className="field-error-msg">{formErrors.phone}</div>}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="field-input"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul@example.com"
                    />
                    {formErrors.email && <div className="field-error-msg">{formErrors.email}</div>}
                  </div>

                  <div>
                    <label className="field-label" htmlFor="businessType">Business Type</label>
                    <select
                      id="businessType"
                      name="businessType"
                      className="field-select"
                      value={formData.businessType}
                      onChange={handleInputChange}
                    >
                      <option value="Clinic">Clinic</option>
                      <option value="Dental Clinic">Dental Clinic</option>
                      <option value="Gym">Gym</option>
                      <option value="Fitness Centre">Fitness Centre</option>
                      <option value="Coaching Centre">Coaching Centre</option>
                      <option value="Educational Institute">Educational Institute</option>
                    </select>
                  </div>

                  <div className="form-field-full">
                    <label className="field-label" htmlFor="service">Service Requested</label>
                    <select
                      id="service"
                      name="service"
                      className="field-select"
                      value={formData.service}
                      onChange={handleInputChange}
                    >
                      <option value="Appointment">Appointment</option>
                      <option value="Price Enquiry">Price Enquiry</option>
                      <option value="Service Enquiry">Service Enquiry</option>
                      <option value="Trial Session">Trial Session</option>
                      <option value="Course Enquiry">Course Enquiry</option>
                      <option value="Demo Class">Demo Class</option>
                      <option value="General Question">General Question</option>
                    </select>
                  </div>

                  <div className="form-field-full">
                    <label className="field-label" htmlFor="message">Customer Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className="field-textarea"
                      rows={3}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="e.g. I want to book a consultation next Tuesday at 11 AM."
                    />
                    {formErrors.message && <div className="field-error-msg">{formErrors.message}</div>}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="btn-run-automation"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'PROCESSING AUTOMATION...' : 'RUN AUTOMATION →'}
                </button>
              </form>
            </div>

            {/* Right: Interactive Result & Simulation Box */}
            <div>
              {/* Processing View */}
              {isProcessing && (
                <div className="processing-card">
                  <div className="processing-spinner" />
                  <div className="processing-steps-list">
                    <div className={`processing-step-row ${processingStep >= 1 ? (processingStep > 1 ? 'completed' : 'active') : ''}`}>
                      <span>{processingStep > 1 ? '✓' : '●'}</span> STEP 1: ENQUIRY RECEIVED
                    </div>
                    <div className={`processing-step-row ${processingStep >= 2 ? (processingStep > 2 ? 'completed' : 'active') : ''}`}>
                      <span>{processingStep > 2 ? '✓' : (processingStep === 2 ? '●' : '○')}</span> STEP 2: AI ANALYZING
                    </div>
                    <div className={`processing-step-row ${processingStep >= 3 ? (processingStep > 3 ? 'completed' : 'active') : ''}`}>
                      <span>{processingStep > 3 ? '✓' : (processingStep === 3 ? '●' : '○')}</span> STEP 3: LEAD QUALIFIED
                    </div>
                    <div className={`processing-step-row ${processingStep >= 4 ? 'completed' : (processingStep === 4 ? 'active' : '')}`}>
                      <span>{processingStep === 4 ? '✓' : '○'}</span> STEP 4: AUTOMATION SELECTED
                    </div>
                  </div>
                </div>
              )}

              {/* Ready / Initial State */}
              {!isProcessing && !demoResult && (
                <div className="demo-idle-placeholder">
                  <div className="idle-icon-wrap">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <h3 className="idle-title">Ready to Test Lead Qualification</h3>
                  <p className="idle-desc">
                    Click <strong>RUN AUTOMATION →</strong> to see the AI evaluate customer intent, assign lead score, and trigger the WhatsApp response.
                  </p>
                </div>
              )}

              {/* Result State */}
              {!isProcessing && demoResult && (
                <div className="demo-result-panel">
                  <div className="result-top-banner">
                    <div className="result-badge-heading">
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34d399' }} />
                      AI LEAD ANALYSIS
                    </div>
                    <button 
                      style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.15)', color: '#94a3b8', fontSize: '0.72rem', padding: '4px 10px', borderRadius: 4, cursor: 'pointer' }}
                      onClick={() => setDemoResult(null)}
                    >
                      Reset View
                    </button>
                  </div>

                  <div className="result-customer-info">
                    <div className="result-person-name">{demoResult.name}</div>
                    <div className="result-service-name">
                      {demoResult.businessType} · {demoResult.service}
                    </div>
                  </div>

                  {/* 3 Metric Cards */}
                  <div className="result-metrics-grid">
                    <div className="result-metric-card">
                      <div className="metric-card-kicker">INTENT</div>
                      <div className="metric-card-val" style={{ color: '#60a5fa' }}>{demoResult.service}</div>
                    </div>
                    <div className="result-metric-card">
                      <div className="metric-card-kicker">LEAD STATUS</div>
                      <div className="metric-card-val" style={{ color: demoResult.leadStatus === 'HOT' ? '#fb7185' : '#fbbf24' }}>
                        ● {demoResult.leadStatus}
                      </div>
                    </div>
                    <div className="result-metric-card">
                      <div className="metric-card-kicker">PRIORITY</div>
                      <div className="metric-card-val" style={{ color: '#34d399' }}>{demoResult.priority}</div>
                    </div>
                    <div className="result-metric-card">
                      <div className="metric-card-kicker">HUMAN REQUIRED</div>
                      <div className="metric-card-val">{demoResult.humanRequired}</div>
                    </div>
                    <div className="result-metric-card">
                      <div className="metric-card-kicker">AI CONFIDENCE</div>
                      <div className="metric-card-val" style={{ color: '#a5b4fc' }}>98.2%</div>
                    </div>
                    <div className="result-metric-card">
                      <div className="metric-card-kicker">RESPONSE TIME</div>
                      <div className="metric-card-val" style={{ color: '#38bdf8' }}>&lt; 6 SECONDS</div>
                    </div>
                  </div>

                  {/* Automation Actions */}
                  <div className="actions-box">
                    <div className="actions-box-title">AUTOMATION ACTIONS TRIGGERED</div>
                    <ul className="actions-list">
                      <li className="action-item">
                        <span className="action-check">✓</span> Lead saved to CRM / Google Sheets
                      </li>
                      <li className="action-item">
                        <span className="action-check">✓</span> Staff notification prepared
                      </li>
                      <li className="action-item">
                        <span className="action-check">✓</span> WhatsApp response prepared
                      </li>
                      <li className="action-item">
                        <span className="action-check">✓</span> Appointment availability requested
                      </li>
                      <li className="action-item">
                        <span className="action-check">✓</span> Follow-up scheduled
                      </li>
                    </ul>
                  </div>

                  {/* WhatsApp Simulation Bubble */}
                  <div className="whatsapp-preview-box">
                    <div className="whatsapp-preview-header">
                      <div className="wa-avatar">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="wa-sender-name">{demoResult.businessType} Support</div>
                        <div className="wa-status-label">Online · Verified Business API</div>
                      </div>
                    </div>

                    <div className="wa-chat-bubble">
                      <p>"{demoResult.replyTemplate}"</p>
                      <span className="wa-chat-bubble-time">Just now · Delivered ✓✓</span>
                    </div>
                  </div>

                  {/* Clean Disclaimer */}
                  <div className="simulation-disclaimer">
                    <strong>DEMO SIMULATION:</strong> This is an interactive frontend demonstration. In production, this instantly triggers your real WhatsApp Business API, CRM/Google Sheets sync, and staff calendar notifications.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          INDUSTRY SOLUTIONS SECTION
          ------------------------------------------------------------- */}
      <section className="industries-section" id="industries">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">INDUSTRY SOLUTIONS</span>
            <h2 className="section-title-dark">
              One Automation System.<br />Different Business Use Cases.
            </h2>
            <p className="section-subtitle-dark">
              Tailored enquiry routing, customized response templates, and calendar integration built specifically for your sector.
            </p>
          </div>

          <div className="industry-cards-grid">
            {/* Card 1: Clinics */}
            <div className="industry-card">
              <div className="industry-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                </svg>
              </div>
              <h3 className="industry-card-title">CLINICS</h3>
              <ul className="industry-items-list">
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Patient enquiries
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Appointment requests
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Test availability
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Doctor enquiries
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Follow-ups
                </li>
              </ul>
              <button className="btn-view-workflow" onClick={() => openWorkflowModal('clinic')}>
                VIEW CLINIC WORKFLOW →
              </button>
            </div>

            {/* Card 2: Gyms */}
            <div className="industry-card">
              <div className="industry-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 16.326V18a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.674"></path>
                  <path d="M4 11V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2"></path>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <h3 className="industry-card-title">GYMS</h3>
              <ul className="industry-items-list">
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Membership enquiries
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Trial sessions
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Pricing enquiries
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Personal training
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Follow-ups
                </li>
              </ul>
              <button className="btn-view-workflow" onClick={() => openWorkflowModal('gym')}>
                VIEW GYM WORKFLOW →
              </button>
            </div>

            {/* Card 3: Coaching Centres */}
            <div className="industry-card">
              <div className="industry-card-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                </svg>
              </div>
              <h3 className="industry-card-title">COACHING CENTRES</h3>
              <ul className="industry-items-list">
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Course enquiries
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Demo classes
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Admission enquiries
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Fee enquiries
                </li>
                <li className="industry-list-item">
                  <span className="industry-check-bullet">✓</span> Counsellor follow-up
                </li>
              </ul>
              <button className="btn-view-workflow" onClick={() => openWorkflowModal('coaching')}>
                VIEW COACHING WORKFLOW →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          BEFORE / AFTER COMPARISON
          ------------------------------------------------------------- */}
      <section className="comparison-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">PROVEN OPERATIONAL UPGRADE</span>
            <h2 className="section-title-light">
              From Manual Follow-Up<br />To Automated Lead Management.
            </h2>
            <p className="section-subtitle-light">
              See the dramatic contrast in customer experience and staff productivity when automation replaces manual chasing.
            </p>
          </div>

          <div className="comparison-grid">
            {/* Left: BEFORE */}
            <div className="comparison-card-before">
              <h3 className="comparison-title" style={{ color: '#94a3b8' }}>BEFORE</h3>
              <div className="comparison-steps-list">
                <div className="comp-step-row manual">1. New enquiry arrives</div>
                <div className="comp-arrow">↓</div>
                <div className="comp-step-row manual">2. Staff checks form whenever free</div>
                <div className="comp-arrow">↓</div>
                <div className="comp-step-row manual">3. Copies information manually</div>
                <div className="comp-arrow">↓</div>
                <div className="comp-step-row manual">4. Calls customer (frequently unanswered)</div>
                <div className="comp-arrow">↓</div>
                <div className="comp-step-row manual">5. Sends manual WhatsApp message</div>
                <div className="comp-arrow">↓</div>
                <div className="comp-step-row manual">6. Checks calendar for open doctor/coach slot</div>
                <div className="comp-arrow">↓</div>
                <div className="comp-step-row manual">7. Updates spreadsheet</div>
              </div>
              <div className="comp-footer-stat stat-manual-bad">
                ⚠️ Result: 4–12 hour average response time · 35% dropped leads
              </div>
            </div>

            {/* Right: WITH LEADFLOW AI */}
            <div className="comparison-card-after">
              <span className="after-featured-tag">THE MODERN STANDARD</span>
              <h3 className="comparison-title" style={{ color: '#ffffff' }}>WITH LEADFLOW AI</h3>
              <div className="comparison-steps-list">
                <div className="comp-step-row automated">1. New enquiry received</div>
                <div className="comp-arrow" style={{ color: '#60a5fa' }}>↓</div>
                <div className="comp-step-row automated">2. AI qualification (Hot/Warm intent)</div>
                <div className="comp-arrow" style={{ color: '#60a5fa' }}>↓</div>
                <div className="comp-step-row automated">3. Lead captured in CRM automatically</div>
                <div className="comp-arrow" style={{ color: '#60a5fa' }}>↓</div>
                <div className="comp-step-row automated">4. Instant WhatsApp &amp; Email dispatched</div>
                <div className="comp-arrow" style={{ color: '#60a5fa' }}>↓</div>
                <div className="comp-step-row automated">5. Real-time calendar slot booked</div>
                <div className="comp-arrow" style={{ color: '#60a5fa' }}>↓</div>
                <div className="comp-step-row automated">6. Automated pre-appointment follow-up</div>
              </div>
              <div className="comp-footer-stat stat-auto-good">
                ✓ Result: &lt;15 second response · 100% lead capture · 3.2x higher conversion
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FEATURES SECTION
          ------------------------------------------------------------- */}
      <section className="features-section">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">ENTERPRISE AUTOMATION SUITE</span>
            <h2 className="section-title-dark">
              Everything Your Team Needs<br />To Stop Losing Enquiries.
            </h2>
            <p className="section-subtitle-dark">
              Built specifically for business owners who want reliable operations without hiring additional front-desk shifts.
            </p>
          </div>

          <div className="features-grid">
            {/* Feature 1 */}
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="12 6 15 11 20 11 16 14 18 19 12 16 6 19 8 14 4 11 9 11 12 6"></polygon>
                </svg>
              </div>
              <h3 className="feature-card-title">AI LEAD QUALIFICATION</h3>
              <p className="feature-card-desc">
                Understand intent and prioritize enquiries based on booking urgency, service value, and customer questions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </div>
              <h3 className="feature-card-title">WHATSAPP AUTOMATION</h3>
              <p className="feature-card-desc">
                Send timely customer responses via official WhatsApp API. Answer common questions and send slot booking links in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3 className="feature-card-title">EMAIL ALERTS</h3>
              <p className="feature-card-desc">
                Notify staff instantly when high-priority leads arrive or when human attention and consultation is required.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3 className="feature-card-title">LEAD MANAGEMENT</h3>
              <p className="feature-card-desc">
                Automatically organize enquiries cleanly into your CRM or Google Sheets with contact data and timestamp logs.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="feature-card-title">APPOINTMENT WORKFLOW</h3>
              <p className="feature-card-desc">
                Connect enquiries directly with doctor, trainer, or counsellor calendar availability to avoid double-bookings.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="feature-card">
              <div className="feature-icon-box">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
              </div>
              <h3 className="feature-card-title">FOLLOW-UP AUTOMATION</h3>
              <p className="feature-card-desc">
                Keep leads moving without manual reminders. Gently nudge unconfirmed enquiries before slots fill up.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          HOW IT WORKS SECTION
          ------------------------------------------------------------- */}
      <section className="how-it-works-section" id="how-it-works">
        <div className="container">
          <div className="section-header-center">
            <span className="section-kicker">STEP-BY-STEP PROCESS</span>
            <h2 className="section-title-dark">How It Works</h2>
            <p className="section-subtitle-dark">
              Simple 4-stage deployment designed to slot seamlessly into your existing operations.
            </p>
          </div>

          <div className="how-steps-grid">
            {/* Step 1 */}
            <div className="how-step-card">
              <div className="how-step-number">01</div>
              <h3 className="how-step-title">CAPTURE</h3>
              <p className="how-step-desc">
                Customer submits an enquiry via your website, ad landing page, or WhatsApp link.
              </p>
            </div>

            {/* Step 2 */}
            <div className="how-step-card">
              <div className="how-step-number">02</div>
              <h3 className="how-step-title">UNDERSTAND</h3>
              <p className="how-step-desc">
                AI analyzes the request, extracts key details, and scores the customer’s intent.
              </p>
            </div>

            {/* Step 3 */}
            <div className="how-step-card">
              <div className="how-step-number">03</div>
              <h3 className="how-step-title">AUTOMATE</h3>
              <p className="how-step-desc">
                The right action is triggered: instant WhatsApp response, CRM sync, and calendar coordination.
              </p>
            </div>

            {/* Step 4 */}
            <div className="how-step-card">
              <div className="how-step-number">04</div>
              <h3 className="how-step-title">CONVERT</h3>
              <p className="how-step-desc">
                Staff focuses on qualified opportunities and attending clients instead of cold chasing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FINAL CTA SECTION
          ------------------------------------------------------------- */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-box-inner">
            <h2 className="cta-title">Ready to Automate Your Enquiries?</h2>
            <p className="cta-desc">
              Let's build an enquiry-to-appointment workflow designed around your business. Stop losing leads to slow response times.
            </p>
            <div className="cta-actions-row">
              <button className="btn-primary-hero" onClick={() => { setIsBookModalOpen(true); setBookSubmitted(false); }}>
                BOOK A FREE DEMO →
              </button>
              <button className="btn-secondary-hero" onClick={() => scrollToSection('live-demo')}>
                TRY THE LIVE DEMO →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          FOOTER
          ------------------------------------------------------------- */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top-row">
            <div className="footer-brand">
              <div className="footer-logo">LEADFLOW AI</div>
              <div className="footer-tagline">
                AI Lead Automation for Enquiry-Driven Businesses
              </div>
            </div>

            <ul className="footer-nav-links">
              <li><a href="#solutions" className="footer-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('solutions'); }}>Solutions</a></li>
              <li><a href="#how-it-works" className="footer-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('how-it-works'); }}>How It Works</a></li>
              <li><a href="#live-demo" className="footer-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('live-demo'); }}>Live Demo</a></li>
              <li><a href="#industries" className="footer-nav-link" onClick={(e) => { e.preventDefault(); scrollToSection('industries'); }}>Industries</a></li>
              <li>
                <a 
                  href="#contact" 
                  className="footer-nav-link" 
                  onClick={(e) => { e.preventDefault(); setIsBookModalOpen(true); setBookSubmitted(false); }}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-bottom-row">
            <div>© 2026 LeadFlow AI. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span>Privacy Policy</span>
              <span>·</span>
              <span>Terms of Service</span>
              <span>·</span>
              <span>Security</span>
            </div>
          </div>
        </div>
      </footer>

      {/* -------------------------------------------------------------
          MODAL: BOOK A DEMO CONSULTATION
          ------------------------------------------------------------- */}
      {isBookModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsBookModalOpen(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setIsBookModalOpen(false)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            {!bookSubmitted ? (
              <>
                <h3 className="modal-title">Book a Free Strategy Demo</h3>
                <p className="modal-subtitle">
                  We will map out your current lead flow and demonstrate a customized automation for your clinic, gym, or institute.
                </p>

                <form onSubmit={handleBookDemoSubmit}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div>
                      <label className="field-label">Your Name</label>
                      <input 
                        type="text" 
                        required 
                        className="field-input" 
                        placeholder="Dr. S. Roy / Rajesh Sharma"
                        value={bookForm.name}
                        onChange={(e) => setBookForm({ ...bookForm, name: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <label className="field-label">Email</label>
                        <input 
                          type="email" 
                          required 
                          className="field-input" 
                          placeholder="doctor@clinic.com"
                          value={bookForm.email}
                          onChange={(e) => setBookForm({ ...bookForm, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="field-label">Phone</label>
                        <input 
                          type="tel" 
                          required 
                          className="field-input" 
                          placeholder="+91 98000 00000"
                          value={bookForm.phone}
                          onChange={(e) => setBookForm({ ...bookForm, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="field-label">Business Type</label>
                      <select 
                        className="field-select"
                        value={bookForm.businessType}
                        onChange={(e) => setBookForm({ ...bookForm, businessType: e.target.value })}
                      >
                        <option value="Clinic">Medical / Dental Clinic</option>
                        <option value="Gym">Gym or Fitness Studio</option>
                        <option value="Coaching">Coaching or Training Institute</option>
                        <option value="Other">Other Local Service Business</option>
                      </select>
                    </div>

                    <div>
                      <label className="field-label">Preferred Time Window</label>
                      <select 
                        className="field-select"
                        value={bookForm.preferredTime}
                        onChange={(e) => setBookForm({ ...bookForm, preferredTime: e.target.value })}
                      >
                        <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM - 1:00 PM)</option>
                        <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                        <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                      </select>
                    </div>

                    <button 
                      type="submit" 
                      className="btn-run-automation"
                      style={{ marginTop: 8 }}
                    >
                      CONFIRM FREE DEMO REQUEST →
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <div className="modal-success-box">
                <div className="success-icon-wrap">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h3 className="modal-title" style={{ color: '#34d399' }}>Demo Request Scheduled!</h3>
                <p style={{ color: '#cbd5e1', fontSize: '0.92rem', margin: '12px 0 20px 0', lineHeight: 1.6 }}>
                  Thank you, <strong>{bookForm.name}</strong>. Our automation specialist has received your request for <strong>{bookForm.businessType}</strong>. A calendar invite and WhatsApp confirmation has been simulated.
                </p>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: 8, fontSize: '0.82rem', color: '#94a3b8', marginBottom: 20 }}>
                  Estimated Demo Slot: Tomorrow during {bookForm.preferredTime}
                </div>
                <button 
                  className="btn-header-cta" 
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setIsBookModalOpen(false)}
                >
                  CLOSE
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          MODAL: INDUSTRY WORKFLOW BLUEPRINT
          ------------------------------------------------------------- */}
      {selectedWorkflowIndustry && PRESETS[selectedWorkflowIndustry] && (
        <div className="modal-backdrop" onClick={() => setSelectedWorkflowIndustry(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close-btn" 
              onClick={() => setSelectedWorkflowIndustry(null)}
              aria-label="Close dialog"
            >
              ✕
            </button>

            <span className="section-kicker">AUTOMATION BLUEPRINT</span>
            <h3 className="modal-title" style={{ textTransform: 'uppercase' }}>
              {PRESETS[selectedWorkflowIndustry].businessType} Workflow
            </h3>
            <p className="modal-subtitle">
              Here is how LeadFlow AI manages patient/member interactions end-to-end for this industry.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {PRESETS[selectedWorkflowIndustry].workflowHighlights.map((hl, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(255,255,255,0.03)', padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ color: '#38bdf8', fontWeight: 800 }}>{idx + 1}.</span>
                  <span style={{ fontSize: '0.88rem', color: '#e2e8f0' }}>{hl}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#0b141a', padding: 14, borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)', marginBottom: 24 }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#00a884', textTransform: 'uppercase', marginBottom: 6 }}>
                Simulated WhatsApp Template
              </div>
              <div style={{ fontSize: '0.84rem', color: '#e9edef', fontStyle: 'italic', lineHeight: 1.45 }}>
                "{PRESETS[selectedWorkflowIndustry].replyTemplate}"
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button 
                className="btn-primary-hero" 
                style={{ flex: 1, justifyContent: 'center' }}
                onClick={() => {
                  handleLoadPreset(selectedWorkflowIndustry);
                  setSelectedWorkflowIndustry(null);
                  scrollToSection('live-demo');
                }}
              >
                TEST THIS IN DEMO →
              </button>
              <button 
                className="btn-secondary-hero" 
                onClick={() => setSelectedWorkflowIndustry(null)}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
