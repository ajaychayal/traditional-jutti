import clsx from 'clsx';
import styles from './Badge.module.scss';

export default function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  icon,
  dot = false,
  pill = true,
  className
}) {
  return (
    <span className={clsx(
      styles.badge,
      styles[`badge--${variant}`],
      styles[`badge--${size}`],
      {
        [styles['badge--pill']]: pill,
        [styles['badge--dot']]: dot,
      },
      className
    )}>
      {dot && <span className={styles.dotIndicator} />}
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </span>
  );
}
