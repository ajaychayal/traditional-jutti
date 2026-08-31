import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import Button from '../components/ui/Button/Button';
import { toast } from 'react-toastify';
import styles from './Contact.module.scss';
import clsx from 'clsx';

export default function Contact() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you! Your message has been sent successfully.');
    e.target.reset();
  };

  return (
    <div className={styles.contactPage}>
      <div className={styles.heroSection}>
        <div className="container">
          <span className={styles.eyebrow}>Get In Touch</span>
          <h1>We're Here to Help</h1>
          <p>Whether you have a question about sizing, custom orders, or shipping, our team is ready to assist you.</p>
        </div>
      </div>

      <div className={clsx('container', styles.mainSection)}>
        <div className={styles.contactGrid}>
          {/* Contact Information Cards */}
          <div className={styles.infoColumn}>
            <h2>Contact Information</h2>
            <p className={styles.infoDesc}>Fill up the form and our team will get back to you within 24 hours.</p>
            
            <div className={styles.cardsGrid}>
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <MapPin size={24} />
                </div>
                <h3>Visit Us</h3>
                <p>123 Heritage Lane, Patiala<br />Punjab, India 147001</p>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Phone size={24} />
                </div>
                <h3>Call Us</h3>
                <p>+91 98765 43210<br />+91 98765 01234</p>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Mail size={24} />
                </div>
                <h3>Email Us</h3>
                <p>support@juttistyle.com<br />hello@juttistyle.com</p>
              </div>
              
              <div className={styles.infoCard}>
                <div className={styles.iconWrapper}>
                  <Clock size={24} />
                </div>
                <h3>Business Hours</h3>
                <p>Mon - Sat: 10:00 AM - 7:00 PM<br />Sunday: Closed</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className={styles.formColumn}>
            <div className={styles.formContainer}>
              <h2>Send a Message</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                  <input type="text" id="name" required placeholder=" " />
                  <label htmlFor="name">Full Name</label>
                </div>
                
                <div className={styles.inputGroup}>
                  <input type="email" id="email" required placeholder=" " />
                  <label htmlFor="email">Email Address</label>
                </div>
                
                <div className={styles.inputGroup}>
                  <input type="text" id="subject" required placeholder=" " />
                  <label htmlFor="subject">Subject</label>
                </div>
                
                <div className={styles.inputGroup}>
                  <textarea id="message" required placeholder=" " rows="4"></textarea>
                  <label htmlFor="message">Message</label>
                </div>
                
                <Button type="submit" variant="primary" size="lg" className={styles.submitBtn} rightIcon={<Send size={18} />}>
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Map Section (Placeholder) */}
      <div className={styles.mapSection}>
        <div className={styles.mapPlaceholder}>
          <span>Interactive Map Integration</span>
        </div>
      </div>
    </div>
  );
}
