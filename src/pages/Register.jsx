import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';
import Button from '../components/ui/Button/Button';
import clsx from 'clsx';
import styles from './Auth.module.scss';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  
  const password = watch("password");

  const onSubmit = (data) => {
    // Mock registration -> login
    dispatch(login({
      user: { name: data.fullName, email: data.email },
      token: 'fake-jwt-token'
    }));
    navigate('/account');
  };

  return (
    <div className={clsx('container', styles.authContainer)}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Create Account</h1>
        <p className={styles.subtitle}>Join us to start shopping for authentic juttis.</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullName">Full Name</label>
            <input 
              id="fullName" 
              type="text" 
              className={clsx(styles.input, { [styles.inputError]: errors.fullName })}
              {...register('fullName', { required: 'Full name is required' })} 
            />
            {errors.fullName && <span className={styles.errorText}>{errors.fullName.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email address</label>
            <input 
              id="email" 
              type="email" 
              className={clsx(styles.input, { [styles.inputError]: errors.email })}
              {...register('email', { 
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
              })} 
            />
            {errors.email && <span className={styles.errorText}>{errors.email.message}</span>}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input 
              id="password" 
              type="password" 
              className={clsx(styles.input, { [styles.inputError]: errors.password })}
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: "Password must be at least 6 characters" }
              })} 
            />
            {errors.password && <span className={styles.errorText}>{errors.password.message}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input 
              id="confirmPassword" 
              type="password" 
              className={clsx(styles.input, { [styles.inputError]: errors.confirmPassword })}
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || "The passwords do not match"
              })} 
            />
            {errors.confirmPassword && <span className={styles.errorText}>{errors.confirmPassword.message}</span>}
          </div>
          
          <div className={styles.checkboxGroup}>
            <input 
              type="checkbox" 
              id="terms" 
              {...register('terms', { required: 'You must accept the terms and conditions' })} 
            />
            <label htmlFor="terms">I agree to the Terms & Conditions</label>
          </div>
          {errors.terms && <span className={styles.errorText} style={{marginTop: '-0.5rem'}}>{errors.terms.message}</span>}
          
          <Button type="submit" variant="primary" fullWidth size="lg" className={styles.submitBtn}>
            Create Account
          </Button>
        </form>
        
        <div className={styles.footer}>
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
