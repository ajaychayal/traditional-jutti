import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  className,
  type = 'button',
  as: Component = 'button',
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      type={Component === 'button' ? type : undefined}
      className={clsx(
        styles.btn,
        styles[`btn--${variant}`],
        styles[`btn--${size}`],
        {
          [styles['btn--full-width']]: fullWidth,
          [styles['is-loading']]: loading,
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className={clsx(styles.spinner, 'lucide')} size={18} />}
      {!loading && leftIcon && <span className={styles.icon}>{leftIcon}</span>}
      <span className={styles.content}>{children}</span>
      {!loading && rightIcon && <span className={styles.icon}>{rightIcon}</span>}
    </Component>
  );
});

Button.displayName = 'Button';

export default Button;
