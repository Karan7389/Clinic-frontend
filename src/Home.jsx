import React, { useEffect, useState } from "react";
import LeadForm from "./LeadForm";
import Hero from "./Hero";
import "./Home.css"; 
import { Link } from "react-router-dom";
import API from "./api";

const Home = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use stagger delay from data attribute if present
            const delay = entry.target.dataset.revealDelay || 0;
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, Number(delay));
            // Stop observing after reveal to save resources
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal-on-scroll").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  
  const [leadOpen, setLeadOpen] = useState(false);
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedDoctor, setExpandedDoctor] = useState({ anand: false, swati: false });

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        setLoading(true);
        const response = await API.get("/treatments");
        
        // Get first 6 treatments for homepage
        const treatmentData = response.data.slice(0, 6);
        setTreatments(treatmentData);
      } catch (error) {
        console.error("Error fetching treatments:", error);
        setTreatments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchTreatments();
  }, []);

  return (
    <main>
      <Hero />

      {/* =========================================================
          MEET SENIOR DOCTORS
      ========================================================== */}
      <section className="core-doctors-section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2>Meet Our Senior Doctors</h2>
            <p style={{ maxWidth: "760px", margin: "0 auto" }}>
              Our clinical leadership brings decades of experience and compassionate care.
            </p>
          </div>
          <div className="core-doctors-grid">
            <article className="core-doctor-card reveal-on-scroll">
              <div className="core-doctor-photo">
                <img src="/Images/Maledocter.webp" alt="Dr Anand" loading="lazy" />
              </div>
              <div className="core-doctor-body">
                <h3>Dr. Anand Chaudhary</h3>
                <p className="doctor-qualification">
                  Founder, Crown Dental | Dental Surgeon | Implant & Smile Design Specialist
                </p>
                <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                  Renowned for precision-driven dentistry and aesthetic excellence, Dr. Anand Chaudhary leads Crown Dental with a vision of delivering advanced, patient-centric care.
                  {!expandedDoctor.anand && (
                    <>
                      {" "}
                      <button 
                        className="doc-btn-read-more-inline" 
                        onClick={() => setExpandedDoctor(prev => ({ ...prev, anand: !prev.anand }))}
                      >
                        Read More →
                      </button>
                    </>
                  )}
                </p>
                {expandedDoctor.anand && (
                  <>
                    <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                      Holding a BDS and MBA in Hospital Administration, he combines clinical expertise with strategic leadership to create a modern, technology-driven dental practice.
                    </p>
                    <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                      With specialized expertise in implantology, smile design, and laser dentistry, he focuses on minimally invasive, result-oriented treatments tailored to each patient. His approach blends science with artistry—enhancing not just oral health, but overall confidence.
                    </p>
                    <p style={{ fontWeight: "600", marginBottom: "16px", color: "#6f6048" }}>
                      Signature Expertise: Advanced Implants | Smile Makeovers | Laser Dentistry | Full Mouth Rehabilitation
                    </p>
                    <button 
                      className="doc-btn-read-more-inline" 
                      onClick={() => setExpandedDoctor(prev => ({ ...prev, anand: !prev.anand }))}
                    >
                      Read Less ↑
                    </button>
                  </>
                )}
                <div className="doc-btn-container">
                  <button className="doc-btn" onClick={() => setLeadOpen(true)}>Book a Consultation</button>
                </div>
              </div>
            </article>

            <article className="core-doctor-card reveal-on-scroll">
              <div className="core-doctor-photo">
                <img src="/Images/Femaledocter.webp" alt="Dr Swati" loading="lazy" />
              </div>
              <div className="core-doctor-body">
                <h3>Dr. Swati Chaudhary</h3>
                <p className="doctor-qualification">
                  Executive Director, AngelLife Cosmetology & Wellness | Aesthetic Physician & Dental Surgeon
                </p>
                <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                  Known for her refined aesthetic sense and clinical precision, Dr. Swati Chaudhary brings a sophisticated approach to modern cosmetology and wellness.
                  {!expandedDoctor.swati && (
                    <>
                      {" "}
                      <button 
                        className="doc-btn-read-more-inline" 
                        onClick={() => setExpandedDoctor(prev => ({ ...prev, swati: !prev.swati }))}
                      >
                        Read More →
                      </button>
                    </>
                  )}
                </p>
                {expandedDoctor.swati && (
                  <>
                    <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                      Holding a BDS, MBA in Hospital Administration, and MSc in Cosmetology, she seamlessly blends medical expertise with strategic leadership.
                    </p>
                    <p style={{ marginBottom: "16px", lineHeight: "1.6" }}>
                      With advanced proficiency in skin rejuvenation, anti-aging therapies, laser treatments, and facial aesthetics, she delivers personalized, result-oriented solutions focused on natural enhancement. Her philosophy combines science with artistry—enhancing beauty while maintaining individuality.
                    </p>
                    <p style={{ fontWeight: "600", marginBottom: "16px", color: "#6f6048" }}>
                      Signature Expertise: Skin Rejuvenation | Anti-Aging Treatments | Laser Aesthetics | Facial Contouring
                    </p>
                    <button 
                      className="doc-btn-read-more-inline" 
                      onClick={() => setExpandedDoctor(prev => ({ ...prev, swati: !prev.swati }))}
                    >
                      Read Less ↑
                    </button>
                  </>
                )}
                <div className="doc-btn-container">
                  <button className="doc-btn" onClick={() => setLeadOpen(true)}>Book a Consultation</button>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY CHOOSE US
      ========================================================== */}
      <section className="why-choose-section" id="why-us">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2>Why Choose Crown Dental</h2>
            <p style={{ maxWidth: "680px", margin: "0 auto" }}>
              Your health and comfort are our top priorities — backed by advanced technology and compassionate care.
            </p>
          </div>

          <div className="highlights-grid">

  <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="0">
    <div className="why-img-wrapper">
      <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=380&fit=crop&q=80" alt="Advanced Sterilization" loading="lazy" />
    </div>
    <div className="why-card-body">
      <h3>Advanced Sterilization</h3>
      <p>International safety protocols and strict infection control standards.</p>
    </div>
  </article>

  <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="80">
    <div className="why-img-wrapper">
      <img src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=380&fit=crop&q=80" alt="Expert Medical Team" loading="lazy" />
    </div>
    <div className="why-card-body">
      <h3>Expert Medical Team</h3>
      <p>Experienced specialists delivering reliable, precision-based treatments.</p>
    </div>
  </article>

  <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="160">
    <div className="why-img-wrapper">
      <img src="https://images.unsplash.com/photo-1609840112990-4265448268d1?w=600&h=380&fit=crop&q=80" alt="Modern Diagnostic Technology" loading="lazy" />
    </div>
    <div className="why-card-body">
      <h3>Modern Diagnostic Technology</h3>
      <p>Advanced imaging and precision-based diagnosis for accurate results.</p>
    </div>
  </article>

  <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="240">
    <div className="why-img-wrapper">
      <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=380&fit=crop&q=80" alt="Comfortable Treatment Experience" loading="lazy" />
    </div>
    <div className="why-card-body">
      <h3>Comfortable Treatment Experience</h3>
      <p>Designed to ensure patient comfort and confidence at every step.</p>
    </div>
  </article>

  <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="320">
    <div className="why-img-wrapper">
      <img src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=380&fit=crop&q=80" alt="Transparent Consultation" loading="lazy" />
    </div>
    <div className="why-card-body">
      <h3>Transparent Consultation</h3>
      <p>Clear treatment plans and honest, upfront pricing — no surprises.</p>
    </div>
  </article>

  <article className="highlight-card highlight-card--img reveal-on-scroll" data-reveal-delay="400">
    <div className="why-img-wrapper">
      <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=380&fit=crop&q=80" alt="Comprehensive Care Under One Roof" loading="lazy" />
    </div>
    <div className="why-card-body">
      <h3>Comprehensive Care Under One Roof</h3>
      <p>Multiple healthcare specialists available in a single, convenient location.</p>
    </div>
  </article>

</div>

        </div>
      </section>

      {/* =========================================================
          SERVICES SECTION
      ========================================================== */}
      <section className="services-section" id="services">
  <div className="section-inner">
    <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
      <h2>Our Services</h2>
      <p style={{ maxWidth: "680px", margin: "0 auto" }}>
        Comprehensive dental care tailored to your unique needs, delivered by experienced professionals using state-of-the-art technology.
      </p>
    </div>

    <div className="services-grid">
      {(() => {
        if (loading) {
          return Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="service-card" style={{ opacity: 0.5 }}>
              <div style={{ width: "100%", height: "180px", background: "#e0e0e0", marginBottom: "12px" }}></div>
              <div>
                <h3>Loading...</h3>
                <p>Please wait...</p>
              </div>
            </div>
          ));
        }
        
        if (treatments.length > 0) {
          return treatments.map((treatment) => {
            
            // Get description from available fields
            const description = treatment.metaDescription || 
                              (treatment.seoCopy ? treatment.seoCopy.substring(0, 100) : '') || 
                              'Explore our professional dental treatment options.';
            
            return (
              <Link 
                key={treatment._id}
                to={`/treatments/${treatment.slug}`} 
                className="service-card"
              >
                <img 
                  src={treatment.heroImage || `https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=300&fit=crop&q=80`} 
                  alt={treatment.title} 
                  className="service-image"
                  loading="lazy"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=300&fit=crop&q=80"; }}
                />
                <div>
                  <h3>{treatment.title}</h3>
                  <p>
                    {description.length > 100 ? description.substring(0, 100) + '...' : description}
                  </p>
                </div>
              </Link>
            );
          });
        }
        
        return (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "40px" }}>
            <p style={{ fontSize: "18px", color: "#6f6048" }}>
              No treatments available at the moment.
            </p>
          </div>
        );
      })()}
    </div>

    <div style={{ textAlign: "center", marginTop: "48px" }}>
     <Link to="/treatments" className="btn-secondary">
  View All Services
</Link>
    </div>
  </div>
</section>


      {/* =========================================================
          MEET OUR EXPERT DENTAL TEAM
      ========================================================== */}
      <section className="doctors-section">
        <div className="section-inner">

          <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2>Meet Our Medical Experts</h2>
            <p style={{ maxWidth: "760px", margin: "0 auto" }}>
              Our experienced specialists are dedicated to providing you with exceptional care
              and lasting results.
            </p>
          </div>

          <div className="doctors-grid">
            
            <article className="doctor-card reveal-on-scroll" data-reveal-delay="0">
              <div className="doctor-image-placeholder">
                <img
                  src="/Images/Dr-Astitva-Agarwal.jpg"
                  alt="Dr. Astitva Agarwal"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
              </div>
              <h3>Dr. Astitva Agarwal</h3>
              <p className="doctor-qualification">BDS, MDS (Orthodontics)</p>
              <p className="doctor-specialization">Oral Cancer Specialist & Maxillofacial Surgeon</p>
              <span className="doctor-experience">Full Mouth Rehab Specialist</span>
            </article>

            <article className="doctor-card reveal-on-scroll" data-reveal-delay="100">
              <div className="doctor-image-placeholder">
                <img
                  src="/Images/Dr-Rahul-Seth.jpg"
                  alt="Dr. Rahul Seth"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
              </div>
              <h3>Dr. Rahul Seth</h3>
              <p className="doctor-qualification">BDS, MDS (Gold Medallist)</p>
              <p className="doctor-specialization">Oral & Maxillofacial Surgeon | Certified Implantologist</p>
              <span className="doctor-experience">Advanced Trauma Specialist</span>
            </article>

            <article className="doctor-card reveal-on-scroll" data-reveal-delay="200">
              <div className="doctor-image-placeholder">
                <img
                  src="/Images/Dr-Satyam-Singh.jpg"
                  alt="Dr. (Col) Satyam Singh"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
              </div>
              <h3>Dr. (Col) Satyam Singh</h3>
              <p className="doctor-qualification">Senior Dental Consultant</p>
              <p className="doctor-specialization">Military Dental Specialist</p>
              <span className="doctor-experience">Veteran & Expert Clinician</span>
            </article>

            <article className="doctor-card reveal-on-scroll" data-reveal-delay="300">
              <div className="doctor-image-placeholder">
                <img
                  src="/Images/Dr-Prashashta-Mishra.jpg"
                  alt="Dr. Prashashta Mishra"
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                />
              </div>
              <h3>Dr. Prashashta Mishra</h3>
              <p className="doctor-qualification">BDS, MDS (Orthodontics)</p>
              <p className="doctor-specialization">Orthodontist & Smile Specialist</p>
              <span className="doctor-experience">Certified Orthodontic Expert</span>
            </article>

          </div>

          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <a href="/doctors" className="btn-secondary">View All Doctors</a>
          </div>

        </div>
      </section>


      {/* =========================================================
          TESTIMONIALS - GOOGLE REVIEWS (FULL WIDTH)
      ========================================================== */}
     <section className="testimonials-section">
    <div className="section-header" style={{ textAlign: "center", marginBottom: "48px", padding: "0 20px" }}>
      <h2>What Our Patients Say</h2>
      <p style={{ maxWidth: "700px", margin: "0 auto" }}>
        Real experiences from people who trust us with their smiles.
      </p>
    </div>

    <div className="testimonials-scroll-container">
      <div className="testimonials-scroll-track">
        {/* CARD 1 - Mohit Shrivastava */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#4285f4" }}>M</div>
            <div>
              <p className="author-name">Mohit Shrivastava</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Staff behaviour is very nice, doctor treatment also good and reasonable price. Thank you 😊😊😊
          </p>
        </article>

        {/* CARD 2 - Laxmi Jaiswal */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#5f6368" }}>L</div>
            <div>
              <p className="author-name">Laxmi Jaiswal</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            The best dental clinic in prayagraj Dr Anand Chaudhary highly skilled and profound dental surgeon
          </p>
        </article>

        {/* CARD 3 - Indal Yadav */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#fbbc04" }}>I</div>
            <div>
              <p className="author-name">Indal Yadav</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Here, I would like to talk a very good dentist who is Dr Nandan gupta. He is an expert of dental problems. I made him treatment of my RCT in 2020 but till now there has been no problem with my RCT. So I would recommend anybody who is facing dental problems, contact dr Nandan gupta. He is not only a good doctor but also a very good human being.
          </p>
        </article>

        {/* CARD 4 - Sadhna */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#e91e63" }}>S</div>
            <div>
              <p className="author-name">Sadhna</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Good quality of dental services available here and behaviour of Dr. Anand Chaudhary is also nice. Clinic is very hygienic. Staff are too much supportive, really I satisfied with their all things.
          </p>
        </article>

        {/* CARD 5 - Kumar Amit */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#795548" }}>K</div>
            <div>
              <p className="author-name">Kumar Amit</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Your work has made a remarkable difference, and your passion is evident in everything you do.
          </p>
        </article>

        {/* CARD 6 - Pratap Singh */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#673ab7" }}>P</div>
            <div>
              <p className="author-name">Pratap Singh</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Excellent team work with minimum reaction time.
          </p>
        </article>

        {/* CARD 7 - Rajesh Kumar */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#34a853" }}>R</div>
            <div>
              <p className="author-name">Rajesh Kumar</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Amazing experience! Dr. Anand's expertise in dental implants is outstanding. The entire procedure was painless and the results exceeded my expectations.
          </p>
        </article>

        {/* CARD 8 - Priya Sharma */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#ff6d00" }}>P</div>
            <div>
              <p className="author-name">Priya Sharma</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Best dental clinic in the city! The staff is incredibly professional and caring. My smile makeover turned out perfect. Highly recommended!
          </p>
        </article>

        {/* CARD 9 - Amit Verma */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#9c27b0" }}>A</div>
            <div>
              <p className="author-name">Amit Verma</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Crown Dental has state-of-the-art equipment and maintains excellent hygiene standards. Dr. Swati's cosmetic dentistry work is exceptional.
          </p>
        </article>

        {/* CARD 10 - Neha Patel */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#00acc1" }}>N</div>
            <div>
              <p className="author-name">Neha Patel</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            My family has been coming here for years. The doctors are highly skilled and always take time to explain procedures. Truly a five-star experience!
          </p>
        </article>

        {/* CARD 11 - Vikram Singh */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#d32f2f" }}>V</div>
            <div>
              <p className="author-name">Vikram Singh</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Professional service from start to finish. The laser dentistry treatment was quick and completely painless. Very impressed with the technology they use.
          </p>
        </article>

        {/* CARD 12 - Anjali Gupta */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#f57c00" }}>A</div>
            <div>
              <p className="author-name">Anjali Gupta</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            I was nervous about my root canal but the team made me feel so comfortable. The procedure was painless and the follow-up care was excellent.
          </p>
        </article>

        {/* CARD 13 - Rahul Mishra */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#1976d2" }}>R</div>
            <div>
              <p className="author-name">Rahul Mishra</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Outstanding dental care! The clinic is spotless, staff is friendly, and Dr. Anand's attention to detail is remarkable. Worth every penny!
          </p>
        </article>

        {/* CARD 14 - Deepika Rao */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#7b1fa2" }}>D</div>
            <div>
              <p className="author-name">Deepika Rao</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            My teeth whitening results are amazing! The team is professional, the clinic is modern, and the prices are very reasonable. Highly satisfied!
          </p>
        </article>

        {/* CARD 15 - Sanjay Tiwari */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#388e3c" }}>S</div>
            <div>
              <p className="author-name">Sanjay Tiwari</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Best decision to choose Crown Dental for my dental implants. The entire process was smooth, and the results look completely natural. Thank you team!
          </p>
        </article>

        {/* Duplicate cards for seamless loop */}
        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#4285f4" }}>M</div>
            <div>
              <p className="author-name">Mohit Shrivastava</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Staff behaviour is very nice, doctor treatment also good and reasonable price. Thank you 😊😊😊
          </p>
        </article>

        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#5f6368" }}>L</div>
            <div>
              <p className="author-name">Laxmi Jaiswal</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            The best dental clinic in prayagraj Dr Anand Chaudhary highly skilled and profound dental surgeon
          </p>
        </article>

        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#fbbc04" }}>I</div>
            <div>
              <p className="author-name">Indal Yadav</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Here, I would like to talk a very good dentist who is Dr Nandan gupta. He is an expert of dental problems. I made him treatment of my RCT in 2020 but till now there has been no problem with my RCT. So I would recommend anybody who is facing dental problems, contact dr Nandan gupta. He is not only a good doctor but also a very good human being.
          </p>
        </article>

        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#e91e63" }}>S</div>
            <div>
              <p className="author-name">Sadhna</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Good quality of dental services available here and behaviour of Dr. Anand Chaudhary is also nice. Clinic is very hygienic. Staff are too much supportive, really I satisfied with their all things.
          </p>
        </article>

        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#795548" }}>K</div>
            <div>
              <p className="author-name">Kumar Amit</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Your work has made a remarkable difference, and your passion is evident in everything you do.
          </p>
        </article>

        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#673ab7" }}>P</div>
            <div>
              <p className="author-name">Pratap Singh</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Excellent team work with minimum reaction time.
          </p>
        </article>

        <article className="testimonial-card">
          <div className="author">
            <div className="author-avatar" style={{ background: "#34a853" }}>R</div>
            <div>
              <p className="author-name">Rajesh Kumar</p>
              <div className="author-rating">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
          <p className="testimonial-text">
            Amazing experience! Dr. Anand's expertise in dental implants is outstanding. The entire procedure was painless and the results exceeded my expectations.
          </p>
        </article>
      </div>
    </div>
</section>

      {/* =========================================================
          MODERN TECHNOLOGY
      ========================================================== */}
       <section className="facility-section">
  <div className="section-inner">
    <div className="section-header" style={{ textAlign: "center", marginBottom: "48px" }}>
      <h2>Our Modern Facility</h2>
      <p style={{ maxWidth: "700px", margin: "0 auto" }}>
        Take a virtual tour of our state-of-the-art clinic designed for your comfort and safety.
      </p>
    </div>

    <div className="facility-grid facility-grid--images">
      <a href="/gallery" className="facility-card facility-card--img reveal-on-scroll" data-reveal-delay="0">
        <div className="facility-img-wrapper">
          <img src="https://images.unsplash.com/photo-1629909615184-74f495363b67?w=600&h=400&fit=crop&q=80" alt="Reception Area" loading="lazy" />
        </div>
        <p className="facility-title">Reception Area</p>
      </a>

      <a href="/gallery" className="facility-card facility-card--img reveal-on-scroll" data-reveal-delay="70">
        <div className="facility-img-wrapper">
          <img src="https://images.unsplash.com/photo-1667752264069-e88e8f5b57dd?w=600&h=400&fit=crop&q=80" alt="Waiting Lounge" loading="lazy" />
        </div>
        <p className="facility-title">Waiting Lounge</p>
      </a>

      <a href="/gallery" className="facility-card facility-card--img reveal-on-scroll" data-reveal-delay="140">
        <div className="facility-img-wrapper">
          <img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop&q=80" alt="Treatment Room" loading="lazy" />
        </div>
        <p className="facility-title">Treatment Room</p>
      </a>

      <a href="/gallery" className="facility-card facility-card--img reveal-on-scroll" data-reveal-delay="210">
        <div className="facility-img-wrapper">
          <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop&q=80" alt="Digital X-Ray Room" loading="lazy" />
        </div>
        <p className="facility-title">Digital X-Ray Room</p>
      </a>

      <a href="/gallery" className="facility-card facility-card--img reveal-on-scroll" data-reveal-delay="280">
        <div className="facility-img-wrapper">
          <img src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop&q=80" alt="Sterilization Area" loading="lazy" />
        </div>
        <p className="facility-title">Sterilization Area</p>
      </a>

      <a href="/gallery" className="facility-card facility-card--img reveal-on-scroll" data-reveal-delay="350">
        <div className="facility-img-wrapper">
          <img src="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=600&h=400&fit=crop&q=80" alt="Consultation Room" loading="lazy" />
        </div>
        <p className="facility-title">Consultation Room</p>
      </a>
    </div>
  </div>
</section>

      {/* =========================================================
          TECHNOLOGY
      ========================================================== */}
    <section className="technology-section">
    <div className="tech-header">
      <h2>Advanced Technology We Use</h2>
      <p>
        State-of-the-art equipment ensuring precision, safety, and comfort in every procedure.
      </p>
    </div>

    <div className="technology-grid">
      
      <article className="tech-card reveal-on-scroll" data-reveal-delay="0">
        <div className="tech-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=300&fit=crop&q=80" 
            alt="Digital X-Rays" 
            className="tech-image"
            loading="lazy"
          />
        </div>
        <h3>Digital X-Rays</h3>
        <p>90% less radiation exposure with instant high-resolution imaging for accurate diagnosis.</p>
      </article>

      <article className="tech-card reveal-on-scroll" data-reveal-delay="100">
        <div className="tech-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=400&h=300&fit=crop&q=80" 
            alt="Laser Dentistry" 
            className="tech-image"
            loading="lazy"
          />
        </div>
        <h3>Laser Dentistry</h3>
        <p>Minimally invasive procedures with faster healing and reduced discomfort.</p>
      </article>

      <article className="tech-card reveal-on-scroll" data-reveal-delay="200">
        <div className="tech-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop&q=80" 
            alt="Intraoral Scanner" 
            className="tech-image"
            loading="lazy"
          />
        </div>
        <h3>Intraoral Scanner</h3>
        <p>3D digital impressions eliminating messy traditional molds for precise results.</p>
      </article>

      <article className="tech-card reveal-on-scroll" data-reveal-delay="300">
        <div className="tech-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=400&h=300&fit=crop&q=80" 
            alt="Autoclave Sterilization" 
            className="tech-image"
            loading="lazy"
          />
        </div>
        <h3>Autoclave Sterilization</h3>
        <p>Hospital-grade sterilization ensuring complete elimination of pathogens.</p>
      </article>

    </div>
</section>

{leadOpen && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "white",
        padding: 30,
        borderRadius: 14,
        width: "90%",
        maxWidth: 420,
        position: "relative",
      }}
    >
      <button
        onClick={() => setLeadOpen(false)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          fontSize: 20,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        ×
      </button>

      <h2 style={{ marginBottom: 16 }}>Book a Consultation</h2>

      <LeadForm
        source="Home Page - Consultation"
        onSuccess={() => setLeadOpen(false)}
      />
    </div>
  </div>
)}

    </main>
  );
}


export default Home;
