import { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import styles from './FAQ.module.scss';
import clsx from 'clsx';
import Button from '../components/ui/Button/Button';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    title: 'Sizing & Fit',
    items: [
      {
        question: 'How do I know my true size?',
        answer: 'Juttis typically follow standard European sizing. If you have wider feet, we recommend sizing up by one size. Our juttis are made of pure leather and will expand slightly to take the shape of your feet within a few hours of wearing.'
      },
      {
        question: 'Are the juttis comfortable for daily wear?',
        answer: 'Absolutely. All our juttis feature double-padded memory foam insoles, making them extremely comfortable for long hours of wear, whether it\'s a wedding or a casual day out.'
      }
    ]
  },
  {
    title: 'Shipping & Returns',
    items: [
      {
        question: 'How long does shipping take?',
        answer: 'Standard shipping within India takes 3-5 business days. Express shipping takes 1-2 business days. International shipping generally takes 7-14 business days depending on the destination.'
      },
      {
        question: 'Do you offer returns or exchanges?',
        answer: 'We offer a seamless 7-day exchange policy for size issues. Returns are accepted for defective items. Please ensure the juttis are unworn and in their original packaging.'
      }
    ]
  },
  {
    title: 'Product Care',
    items: [
      {
        question: 'How do I care for my juttis?',
        answer: 'Keep them away from moisture. If they get wet, dry them in the shade. Store them in the provided muslin dust bag. For embellished juttis, handle them with care to avoid snagging delicate threads.'
      },
      {
        question: 'Can I clean the embroidery?',
        answer: 'For minor dirt, gently wipe with a dry or very slightly damp muslin cloth. Do not use harsh chemicals or brush vigorously over the embroidery.'
      }
    ]
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState('0-0'); // CategoryIndex-ItemIndex

  const toggleFaq = (categoryId, itemId) => {
    const id = `${categoryId}-${itemId}`;
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className={styles.faqPage}>
      <div className={styles.heroSection}>
        <div className="container">
          <HelpCircle size={48} className={styles.heroIcon} />
          <h1>How Can We Help?</h1>
          <p>Everything you need to know about our Juttis, shipping, and more.</p>
        </div>
      </div>

      <div className={clsx('container', styles.mainSection)}>
        <div className={styles.faqContainer}>
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className={styles.categoryBlock}>
              <h2 className={styles.categoryTitle}>{category.title}</h2>
              
              <div className={styles.accordionList}>
                {category.items.map((faq, itemIndex) => {
                  const isOpen = openIndex === `${catIndex}-${itemIndex}`;
                  return (
                    <div 
                      key={itemIndex} 
                      className={clsx(styles.accordionItem, { [styles.open]: isOpen })}
                    >
                      <button 
                        className={styles.accordionHeader} 
                        onClick={() => toggleFaq(catIndex, itemIndex)}
                        aria-expanded={isOpen}
                      >
                        <span className={styles.questionText}>{faq.question}</span>
                        <div className={styles.iconWrapper}>
                          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                        </div>
                      </button>
                      <div 
                        className={styles.accordionContent}
                        style={{ height: isOpen ? 'auto' : 0, overflow: 'hidden' }}
                      >
                        <div className={styles.answerWrapper}>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.supportBox}>
          <h3>Still have questions?</h3>
          <p>Can't find the answer you're looking for? Please chat to our friendly team.</p>
          <Link to="/contact">
            <Button variant="primary">Contact Support</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
