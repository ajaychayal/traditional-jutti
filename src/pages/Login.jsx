import { SignIn } from '@clerk/react';
import clsx from 'clsx';
import styles from './Auth.module.scss';

export default function Login() {
  return (
    <div className={clsx('container', styles.authContainer)} style={{ display: 'flex', justifyContent: 'center' }}>
      <SignIn routing="path" path="/login" signUpUrl="/register" />
    </div>
  );
}

