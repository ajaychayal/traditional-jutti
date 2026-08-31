import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import Button from '../components/ui/Button/Button';
import clsx from 'clsx';
import styles from './Auth.module.scss'; // Will create shared auth styles

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Generate a realistic name from email for the mock login
    const nameParts = data.email.split('@')[0].split(/[._-]/);
    const mockName = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

    // Mock login
    dispatch(login({
      user: { name: mockName || 'User', email: data.email },
      token: 'fake-jwt-token'
    }));
    navigate('/account');
  };

  return (
    <div className={clsx('container', styles.authContainer)}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Please enter your details to sign in.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email address</label>
            <input 
              id="email" 
              type="email" 
              className={clsx(styles.input, { [styles.inputError]: errors.email })}
              {...register('email', { required: 'Email is required' })} 
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <div className={styles.passwordHeader}>
              <label htmlFor="password">Password</label>
              <Link to="/forgot-password" className={styles.forgotLink}>Forgot password?</Link>
            </div>
            <input 
              id="password" 
              type="password" 
              className={clsx(styles.input, { [styles.inputError]: errors.password })}
              {...register('password', { required: 'Password is required' })} 
            />
            {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
          </div>
          
          <div className={styles.checkboxGroup}>
            <input type="checkbox" id="remember" {...register('remember')} />
            <label htmlFor="remember">Remember me</label>
          </div>
          
          <Button type="submit" variant="primary" fullWidth size="lg" className={styles.submitBtn}>
            Sign In
          </Button>
        </form>
        
        <div className={styles.footer}>
          Don't have an account? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </div>
  );
}
