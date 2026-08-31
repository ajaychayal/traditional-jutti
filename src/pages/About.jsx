import styles from './About.module.scss';
import clsx from 'clsx';
import { Heart, Scissors, ShieldCheck, Leaf } from 'lucide-react';

export default function About() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero */}
      <section className={styles.heroSection}>
        <div className={styles.heroOverlay}></div>
        <div className={clsx('container', styles.heroContent)}>
          <span className={styles.eyebrow}>Our Heritage</span>
          <h1>A Tale of Royal Tradition</h1>
          <p>Preserving the rich cultural tapestry of Punjab, one step at a time.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className={clsx('container', styles.storySection)}>
        <div className={styles.storyGrid}>
          <div className={styles.storyText}>
            <h2>The Legacy</h2>
            <p>
              Rooted in the royal traditions of Punjab, the art of making juttis dates back centuries. 
              Historically worn by kings and queens, the jutti is a symbol of unparalleled craftsmanship 
              and regal elegance.
            </p>
            <p>
              Our journey began with a simple, yet profound vision: to rescue this timeless art form 
              from the shadows of modern fast fashion and bring its elegance to the contemporary wardrobe, 
              while staying uncompromisingly true to its authentic roots.
            </p>
          </div>
          <div className={styles.storyImage}>
            <img src={`${import.meta.env.BASE_URL}images/prod-11.png`} alt="Artisan making Jutti" className={styles.placeholderImg} loading="lazy" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className={styles.sectionHeaderCentered}>
            <h2>Why JuttiStyle?</h2>
            <p>Our commitment to quality, comfort, and culture.</p>
          </div>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <Scissors size={40} className={styles.valueIcon} />
              <h3>Master Craftsmanship</h3>
              <p>Meticulously handcrafted by skilled artisans whose families have been perfecting this craft for generations.</p>
            </div>
            <div className={styles.valueCard}>
              <ShieldCheck size={40} className={styles.valueIcon} />
              <h3>Premium Quality</h3>
              <p>We use only the finest pure leather, ensuring longevity and a fit that molds to your feet.</p>
            </div>
            <div className={styles.valueCard}>
              <Heart size={40} className={styles.valueIcon} />
              <h3>Ultimate Comfort</h3>
              <p>Innovatively designed with double-padded insoles so you can dance the night away in comfort.</p>
            </div>
            <div className={styles.valueCard}>
              <Leaf size={40} className={styles.valueIcon} />
              <h3>Sustainable Art</h3>
              <p>Handcrafted processes with minimal environmental impact, supporting fair wages and community growth.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className={clsx('container', styles.missionSection)}>
        <div className={styles.missionCard}>
          <h2>Our Mission</h2>
          <p>
            We strive to empower local artisans by providing them a global platform. 
            When you wear our juttis, you're not just wearing footwear; you're carrying a piece of history, 
            sustaining a beautiful art form, and supporting a community of creators.
          </p>
        </div>
      </section>
    </div>
  );
}
