import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: 'public_DgWwF8YshX9teeO0xVkHbPuvaxA=',
  privateKey: 'private_DZ7GdX7pJV9b4X4z9mngYmEkNvU=',
  urlEndpoint: 'https://ik.imagekit.io/3wvmuwil3',
});

export const handler = async () => {
  const authenticationParameters = imagekit.getAuthenticationParameters();
  return {
    statusCode: 200,
    body: JSON.stringify(authenticationParameters),
  };
};
