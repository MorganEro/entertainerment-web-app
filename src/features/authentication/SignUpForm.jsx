import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';
import InputGroup from '../../ui/InputGroup';
import InputRow from '../../ui/InputRow';
import PasswordCriteriaList from '../../ui/PasswordCriteriaList';
import PasswordInputRow from '../../ui/PasswordInputRow';
import { useSignUp } from './useSignUp';

function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isPending } = useSignUp();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    getValues,
    watch,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  });

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const watchedFields = watch(['email', 'password', 'passwordConfirm']);
  const isFormEmpty = !watchedFields.some(field => field);

  const isButtonDisabled = isFormEmpty || isPending || !isValid;

  function onSubmit({ email, password }) {
    signUp({ email, password }, { onSettled: () => reset() });
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Heading as="h1">Sign Up</Heading>
        {/* Hidden username field for accessibility */}
        <input
          type="text"
          name="username"
          id="username"
          autoComplete="username"
          disabled={isPending}
          style={{ display: 'none' }}
          {...register('username')}
        />
        <InputGroup>
          <InputRow $hasError={!!errors.email}>
            <Input
              id="email"
              placeholder="Email address"
              autoComplete="email"
              disabled={isPending}
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
              autoComplete="new-password"
              disabled={isPending}
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: "Password can't be empty",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Invalid password',
                },
              })}
            />
            <PasswordCriteriaList password={watch('password')} />
            {errors?.password?.message && (
              <span className="error">{errors.password.message}</span>
            )}
          </PasswordInputRow>
          <PasswordInputRow
            onToggleVisibility={toggleVisibility}
            $hasError={!!errors.password}
            showPassword={showPassword}>
            <Input
              id="passwordConfirm"
              autoComplete="new-password"
              placeholder="Repeat Password"
              disabled={isPending}
              type={showPassword ? 'text' : 'password'}
              {...register('passwordConfirm', {
                required: 'This field is required',
                validate: value =>
                  getValues().password === value || 'Passwords need to match',
              })}
            />
            {errors?.passwordConfirm?.message && (
              <span className="error">{errors.passwordConfirm.message}</span>
            )}
          </PasswordInputRow>
        </InputGroup>
        <Button disabled={isButtonDisabled}>Create an account</Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </>
  );
}

export default SignUpForm;
