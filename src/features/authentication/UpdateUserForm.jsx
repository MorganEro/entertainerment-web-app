import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';
import InputRow from '../../ui/InputRow';
import PasswordCriteriaList from '../../ui/PasswordCriteriaList';
import PasswordInputRow from '../../ui/PasswordInputRow';
import UpdateForm from '../../ui/UpdateForm';
import UpdateInputGroup from '../../ui/UpdateInputGroup';
import { useUpdateUser } from './useUpdateUser';
import { useUser } from './useUser';

function UpdateUserForm() {
  useDocumentTitle('Account');
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user;

  const { updateUser, isPending } = useUpdateUser();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    getValues,
    watch,
  } = useForm({ mode: 'onChange' });
  const [showPassword, setShowPassword] = useState(false);
  const password = watch('password', '');
  const toggleVisibility = () => setShowPassword(!showPassword);
  const isButtonDisabled = isPending || !isValid || isSubmitting;

  const onSubmit = data => {
    const updatedData = {
      ...data,
      avatar: data.avatar && data.avatar.length > 0 ? data.avatar[0] : null,
    };

    const values = getValues();
    const fieldsToCheck = ['fullName', 'password', 'passwordConfirm', 'avatar'];
    const emptyFields = fieldsToCheck.filter(field => !values[field]);

    if (emptyFields.length === fieldsToCheck.length) return;

    updateUser(updatedData, {
      onSuccess: () => {
        reset();
        setShowPassword(false);
      },
    });
  };

  const handleCancel = event => {
    event.preventDefault();
    reset();
  };

  return (
    <UpdateForm onSubmit={handleSubmit(onSubmit)}>
      <Heading
        as="h1"
        className="heading">
        Account
      </Heading>
      <div className="fieldGroup">
        <UpdateInputGroup>
          <label
            htmlFor="currentEmail"
            className="label">
            Email Address
          </label>
          <InputRow>
            <Input
              name="currentEmail"
              type="text"
              id="currentEmail"
              className="firstInputField"
              disabled
              autoComplete="email"
              defaultValue={email}
            />
          </InputRow>
        </UpdateInputGroup>
        <UpdateInputGroup>
          <label
            htmlFor="currentFullName"
            className="label">
            Full Name
          </label>
          {currentFullName && (
            <InputRow>
              <Input
                name="currentFullName"
                type="text"
                id="currentFullName"
                className="firstInputField"
                disabled
                autoComplete="name"
                defaultValue={currentFullName}
              />
            </InputRow>
          )}
          <InputRow>
            <Input
              name="fullName"
              type="text"
              id="fullName"
              className="secondInputField"
              disabled={isPending}
              autoComplete="name"
              placeholder="New Full Name"
              {...register('fullName', {
                maxLength: { value: 30, message: 'Full name is too long' },
              })}
            />
            {errors?.fullName?.message && (
              <span>{errors.fullName.message}</span>
            )}
          </InputRow>
        </UpdateInputGroup>
        <UpdateInputGroup>
          <label
            htmlFor="password"
            className="label">
            New Password (min 8 characters)
          </label>
          <PasswordInputRow
            onToggleVisibility={toggleVisibility}
            $hasError={!!errors.password}
            showPassword={showPassword}>
            <Input
              name="password"
              id="password"
              placeholder="New Password"
              autoComplete="new-password"
              disabled={isPending}
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Invalid password',
                },
              })}
            />
            <PasswordCriteriaList password={password} />
            {errors?.password?.message && (
              <span className="error">{errors.password.message}</span>
            )}
          </PasswordInputRow>
          <PasswordInputRow
            onToggleVisibility={toggleVisibility}
            $hasError={!!errors.password}
            showPassword={showPassword}>
            <Input
              name="passwordConfirm"
              id="passwordConfirm"
              autoComplete="new-password"
              placeholder="Repeat New Password"
              disabled={isPending}
              type={showPassword ? 'text' : 'password'}
              {...register('passwordConfirm', {
                validate: value =>
                  getValues().password === value || 'Passwords need to match',
              })}
            />
            {errors?.passwordConfirm?.message && (
              <span className="error">{errors.passwordConfirm.message}</span>
            )}
          </PasswordInputRow>
        </UpdateInputGroup>
        <UpdateInputGroup>
          <label
            htmlFor="avatar"
            className="label">
            Avatar Image
          </label>
          <FileInput
            name="avatar"
            id="avatar"
            accept="image/*"
            disabled={isPending}
            {...register('avatar')}
          />
        </UpdateInputGroup>
      </div>
      <div className="buttonGroup">
        <Button
          onClick={handleCancel}
          $size="small"
          $variation="cancel"
          disabled={isPending}>
          Cancel
        </Button>
        <Button
          $size="small"
          disabled={isButtonDisabled}>
          Update Profile
        </Button>
      </div>
    </UpdateForm>
  );
}

export default UpdateUserForm;
