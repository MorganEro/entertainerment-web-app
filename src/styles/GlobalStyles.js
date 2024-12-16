import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

@font-face {
  font-family: 'Outfit';
  src: url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
  font-display: swap;
}

:root {
&, &.dark-mode {
      
--color-red: #fc4747;
--color-red-disabled: #b33a3a;


--color-grey-blue: #5a698f;
--color-grey-blue-75: #5a698fBF;
--color-semi-dark-blue: #161d2f;
--color-dark-blue: #10141e;
--color-dark-blue-50: #10141e80;

--color-white: #ffffff;
--color-white-25: #ffffff40;
--color-white-50: #ffffff80;
--color-white-75: #ffffffbf;


--border-radius-xs: 6px;
--border-radius-sm: 8px;
--border-radius-md: 10px;
--border-radius-lg: 20px;
--border-radius-xl: 28.5px;

--font-size-xxs: 1.1rem;
--font-size-xs: 1.2rem;
--font-size-sm: 1.3rem;
--font-size-md: 1.5rem;
--font-size-lg: 1.6rem;
--font-size-xl: 2.4rem;

--font-weight-light: 300;
--font-weight-medium: 500;
}
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  /* outline: 1px solid orange; */
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Outfit", sans-serif;
  color: var(--color-white);
  min-height: 100vh;
  line-height: 1.5;
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-light);
  background-color: var(--color-dark-blue);

}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-blue-75);
  color: var(--color-white-50);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-white);
  outline-offset: -1px;
}

button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

p a{
  margin-left: 1rem;
  color: var(--color-red);
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}

img {
  max-width: 100%;
}

`;

export default GlobalStyles;
