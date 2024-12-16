import { IKContext } from 'imagekitio-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAvatar } from '../../context/avatarContext/useAvatar';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import {
  authenticator,
  publicKey,
  urlEndpoint,
} from '../../services/imagekitConfig';
import AvatarPreview from '../../ui/AvatarPreview';
import Button from '../../ui/Button';
import StyledIKUpload from '../../ui/FileInput';
import Heading from '../../ui/Heading';
import Input from '../../ui/Input';
import InputRow from '../../ui/InputRow';
import PasswordCriteriaList from '../../ui/PasswordCriteriaList';
import PasswordInputRow from '../../ui/PasswordInputRow';
import StyledProgress from '../../ui/ProgressBar';
import UpdateForm from '../../ui/UpdateForm';
import UpdateInputGroup from '../../ui/UpdateInputGroup';
import { useUpdateUser } from './useUpdateUser';
import { useUser } from './useUser';
import toast from 'react-hot-toast';

function UpdateUserForm() {
  useDocumentTitle('Account');
  const { user } = useUser();
  const {
    email,
    user_metadata: { fullName: currentFullName },
  } = user;
  const {
    avatarName,
    imagekitUrl,
    setUploadProgress,
    setPreview,
    handleImageUpload,
    handleAvatarOnSuccess,
    handleUploadError,
    preview,
    uploadProgress,
    handleUploadProgress,
    compressedFile,
  } = useAvatar();

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
    const updatedData = { ...data, avatar: imagekitUrl };

    const values = getValues();
    const fieldsToCheck = ['fullName', 'password', 'passwordConfirm', 'avatar'];
    const emptyFields = fieldsToCheck.filter(field => !values[field]);

    if (emptyFields.length === fieldsToCheck.length) return;

    updateUser(updatedData, {
      onSuccess: () => {
        reset();
        setShowPassword(false);
        setUploadProgress(0);
      },
    });
  };

  const handleCancel = event => {
    event.preventDefault();
    reset();
    setUploadProgress(0);
    setPreview(null);
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
          <IKContext
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}>
            <StyledIKUpload
              name="avatar"
              id="avatar"
              folder="avatars"
              fileName={avatarName}
              accept=".jpg,.jpeg,.png,.gif,.webp"
              onError={handleUploadError}
              onUploadProgress={handleUploadProgress}
              onSuccess={handleAvatarOnSuccess}
              validateFile={file => {
                const isValidSize = file.size < 2500000; // 2.5MB
                const isValidType = file.name.match(
                  /\.(jpg|jpeg|png|gif|webp)$/i
                );
                if (!isValidSize) {
                  toast.error('File size should be less than 2.5MB');
                }
                if (!isValidType) {
                  toast.error(
                    'Invalid file type. Only jpg, jpeg, png, gif, and webp are allowed.'
                  );
                }
                return isValidSize && isValidType;
              }}
              checks={`"file.size" < "25mb"`}
              onChange={handleImageUpload}
              file={compressedFile}
              {...register('avatar')}
            />
            {preview && <AvatarPreview />}
            {uploadProgress > 0 && (
              <StyledProgress
                value={uploadProgress}
                max="100">
                {uploadProgress}%
              </StyledProgress>
            )}
          </IKContext>
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
