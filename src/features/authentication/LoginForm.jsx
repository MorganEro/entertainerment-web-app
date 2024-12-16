import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';
import InputGroup from '../../ui/InputGroup';
import InputRow from '../../ui/InputRow';
import PasswordInputRow from '../../ui/PasswordInputRow';
import SpinnerMini from '../../ui/SpinnerMini';

import { useLogin } from './useLogin';

function LoginForm() {
  const { login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  function onSubmit({ email, password }) {
    login({ email, password });
    reset();
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h1">Login</Heading>
        {/* Hidden username field for accessibility */}
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          style={{ display: 'none' }}
          {...register('username')}
        />
        <InputGroup>
          <InputRow $hasError={!!errors.email}>
            <Input
              id="email"
              placeholder="Email address"
              autoComplete="email"
              disabled={isSubmitting || isPending}
              type="email"
              {...register('email', {
                required: "Email can't be empty",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid email address',
                },
              })}
            />
            {errors?.email?.message && (
              <span className="error">{errors.email.message}</span>
            )}
          </InputRow>
          <PasswordInputRow
            onToggleVisibility={toggleVisibility}
            $hasError={!!errors.password}
            showPassword={showPassword}>
            <Input
              id="password"
              placeholder="Password"
              autoComplete="current-password"
              disabled={isSubmitting || isPending}
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: "Password can't be empty",
              })}
            />
            {errors?.password?.message && (
              <span className="error">{errors.password.message}</span>
            )}
          </PasswordInputRow>
        </InputGroup>
        <Button disabled={isSubmitting || !isValid || isPending}>
          {!isSubmitting || !isPending ? (
            ' Login to your account'
          ) : (
            <SpinnerMini />
          )}
        </Button>
        <p>
          Don&apos;t have an account? <Link to="/signUp">Sign Up</Link>
        </p>
      </Form>
    </>
  );
}

export default LoginForm;
