import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import styles from './FindRange.module.scss';
import clsx from 'clsx';

const ranges = [
  {
    id: 'bridal',
    title: 'The Bridal Edit',
    subtitle: 'For your special day',
    description: 'Heavily embellished with zari, dabka, and beads. Designed to make you feel like royalty on your wedding day.',
    image: '/images/prod-7.png',
    link: '/shop?category=bridal'
  },
  {
    id: 'festive',
    title: 'Festive & Party',
    subtitle: 'Stand out in the crowd',
    description: 'Vibrant colors, sequin work, and elegant motifs perfect for Diwali, Eid, or any joyous celebration.',
    image: '/images/prod-8.png',
    link: '/shop?collection=featured'
  },
  {
    id: 'everyday',
    title: 'Everyday Classic',
    subtitle: 'Comfort meets style',
    description: 'Subtle embroidery, printed fabrics, and solid leathers designed for all-day comfort at work or casual outings.',
    image: '/images/prod-9.png',
    link: '/shop?category=womens'
  },
  {
    id: 'mens',
    title: 'Men\'s Heritage',
    subtitle: 'Classic masculinity',
    description: 'Traditional Tilla work and sophisticated leather finishes for the modern gentleman.',
    image: '/images/prod-10.png',
    link: '/shop?category=mens'
  }
];

export default function FindRange() {
  return (
    <div className={styles.rangePage}>
      <div className={styles.heroSection}>
        <div className="container">
          <span className={styles.eyebrow}>Curated Collections</span>
          <h1>Find Your Perfect Range</h1>
          <p>Whether you're walking down the aisle or heading to work, we have a meticulously crafted Jutti for every occasion.</p>
        </div>
      </div>

      <div className={clsx('container', styles.rangesContainer)}>
        {ranges.map((range, index) => (
          <div key={range.id} className={clsx(styles.rangeCard, { [styles.reverse]: index % 2 !== 0 })}>
            <div className={styles.imageCol}>
              <img src={range.image} alt={range.title} loading="lazy" />
            </div>
            <div className={styles.contentCol}>
              <span className={styles.subtitle}>{range.subtitle}</span>
              <h2>{range.title}</h2>
              <p>{range.description}</p>
              <Link to={range.link} className={styles.exploreLink}>
                Explore Collection <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
