import { SignUp } from '@clerk/react';
import clsx from 'clsx';
import styles from './Auth.module.scss';

export default function Register() {
  return (
    <div className={clsx('container', styles.authContainer)} style={{ display: 'flex', justifyContent: 'center' }}>
      <SignUp routing="path" path="/register" signInUrl="/login" />
    </div>
  );
}

