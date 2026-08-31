import { Link } from 'react-router-dom';
import Button from '../components/ui/Button/Button';
import styles from './Experience.module.scss';
import clsx from 'clsx';

export default function Experience() {
  return (
    <div className={styles.experiencePage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>The Authentic Process</span>
            <h1>The Jutti Experience</h1>
            <p>From the heart of Punjab to your wardrobe. Discover the intricate journey of creating our handcrafted masterpieces.</p>
          </div>
        </div>
      </section>

      {/* Step 1: The Leather */}
      <section className={styles.stepSection}>
        <div className={clsx('container', styles.stepGrid)}>
          <div className={styles.textContent}>
            <span className={styles.stepNumber}>01</span>
            <h2>Pure Leather Selection</h2>
            <p>
              The journey begins with sourcing the finest quality, ethically obtained pure leather. 
              Our artisans handpick hides that offer the perfect balance of durability and softness. 
              This ensures that each Jutti not only lasts for years but also molds perfectly to the unique shape of your feet over time.
            </p>
          </div>
          <div className={styles.imageContent}>
            <img src={`${import.meta.env.BASE_URL}images/prod-4.png`} alt="Premium Leather" className={styles.image} loading="lazy" />
          </div>
        </div>
      </section>

      {/* Step 2: The Embroidery */}
      <section className={clsx(styles.stepSection, styles.altSection)}>
        <div className={clsx('container', styles.stepGrid, styles.reverseGrid)}>
          <div className={styles.textContent}>
            <span className={styles.stepNumber}>02</span>
            <h2>Intricate Hand Embroidery</h2>
            <p>
              Our signature designs are brought to life through hours of painstaking hand embroidery. 
              Using traditional techniques passed down through generations, artisans weave magic with 
              zari (metallic thread), dabka (coiled wire), sequins, and silk threads. 
              Every motif tells a story of royal Punjabi heritage.
            </p>
          </div>
          <div className={styles.imageContent}>
            <img src={`${import.meta.env.BASE_URL}images/prod-5.png`} alt="Hand Embroidery" className={styles.image} loading="lazy" />
          </div>
        </div>
      </section>

      {/* Step 3: The Assembly */}
      <section className={styles.stepSection}>
        <div className={clsx('container', styles.stepGrid)}>
          <div className={styles.textContent}>
            <span className={styles.stepNumber}>03</span>
            <h2>Stitching & Assembly</h2>
            <p>
              Unlike mass-produced footwear, our Juttis feature no left or right foot distinction initially. 
              The embroidered upper is carefully hand-stitched to the pure leather sole using thick cotton threads. 
              We incorporate double-padded memory foam insoles during this stage, marrying traditional aesthetics with modern comfort.
            </p>
          </div>
          <div className={styles.imageContent}>
            <img src={`${import.meta.env.BASE_URL}images/prod-6.png`} alt="Shoe Assembly" className={styles.image} loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Experience the Magic Yourself</h2>
            <p>Step into tradition and feel the comfort of authentic craftsmanship.</p>
            <Link to="/shop">
              <Button variant="primary" size="lg">Explore Collection</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
