// src/imagekitConfig.js
export const urlEndpoint = 'https://ik.imagekit.io/3wvmuwil3';
export const publicKey = 'public_DgWwF8YshX9teeO0xVkHbPuvaxA=';
export const authenticationEndpoint = 'http://localhost:3001/auth';

// src/services/imagekitAuthenticator.js
export const authenticator = async () => {
  try {
    const response = await fetch('http://localhost:3001/auth');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};
