import { DevTool } from '@hookform/devtools';
import { IKContext } from 'imagekitio-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import useDocumentTitle from '../../hooks/useDocumentTitle';
import {
  authenticators,
  publicKey,
  urlEndpoint,
} from '../../services/imagekitConfig';
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
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const [showPassword, setShowPassword] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const { updateUser, isPending } = useUpdateUser();
  const [preview, setPreview] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    control,
    getValues,
    watch,
  } = useForm({
    mode: 'onChange',
  });

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const password = watch('password', '');

  const isButtonDisabled = isPending || !isValid || isSubmitting;

  function onSubmit(data) {
    const updatedData = { ...data, avatar: thumbnailUrl };

    const values = getValues();
    const fieldsToCheck = ['fullName', 'password', 'passwordConfirm', 'avatar'];
    const emptyFields = fieldsToCheck.filter(field => {
      if (field === 'avatar') {
        return !values.avatar || values.avatar.length === 0;
      }
      return !values[field];
    });

    if (emptyFields.length === fieldsToCheck.length) {
      return;
    }

    updateUser(updatedData, {
      onSuccess: () => {
        reset();
        setShowPassword(false);
        setUploadProgress(0);
        console.log('supabase updated data: ', updatedData);
      },
    });
  }

  const handleUploadProgress = progressEvent => {
    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  const handleAvatarOnSuccess = async res => {
    setThumbnailUrl(res.thumbnailUrl);
  };

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Invalid file type. Please upload an image file.');
        return;
      }
      const img = new Image();
      img.onload = () => {
        const resolution = img.width * img.height;
        const maxResolution = 25 * 1024 * 1024; // 25.0 MP in pixels
        if (resolution > maxResolution) {
          setUploadError(
            'Image resolution exceeds the limit of 25.0 megapixels. Please upload a smaller image.'
          );
          return;
        }
        // Preview the image
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      };
    }
  };
  return (
    <IKContext
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticators}>
      <UpdateForm onSubmit={handleSubmit(onSubmit)}>
        <Heading
          as="h1"
          className="heading">
          Account
        </Heading>
        {/* Hidden username field for accessibility */}
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
                {...register('email', {
                  value: email,
                })}
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
                  {...register('CurrentFullName', {
                    value: currentFullName,
                  })}
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
              fileName="avatar"
              useUniqueFileName={true}
              onError={err => console.log('Error', err)}
              onSuccess={handleAvatarOnSuccess}
              name="avatar"
              id="avatar"
              type="file"
              accept="image/*"
              disabled={isPending}
              {...register('avatar')}
              onUploadProgress={handleUploadProgress}
              onChange={handleImageUpload}
            />
            {preview && (
              <div className="imageContainer">
                <img
                  className="previewImage"
                  src={preview}
                  alt="Image Preview"
                />
              </div>
            )}
            {uploadError && <p>{uploadError}</p>}
            {uploadProgress > 0 && (
              <progress
                value={uploadProgress}
                max="100">
                {uploadProgress}%
              </progress>
            )}
          </UpdateInputGroup>
        </div>
        <div className="buttonGroup">
          <Button
            onClick={event => {
              event.preventDefault();
              reset();
              setUploadProgress(0);
            }}
            $size="small"
            // className="submit"
            $variation="cancel"
            disabled={isPending}>
            Cancel
          </Button>
          <Button
            $size="small"
            // className="submit"
            disabled={isButtonDisabled}>
            Update Profile
          </Button>
        </div>
      </UpdateForm>
      <DevTool control={control} />
    </IKContext>
  );
}

export default UpdateUserForm;
