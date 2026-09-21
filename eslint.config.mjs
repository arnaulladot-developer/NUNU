import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Configuració nativa "flat config" d'ESLint 9, sense el pont
 * `@eslint/eslintrc` (FlatCompat): amb Next.js 16 + ESLint 9, aquest pont
 * falla amb "Converting circular structure to JSON" en carregar
 * `eslint-plugin-react` a través de `next/core-web-vitals` en format
 * antic. `eslint-config-next` ja distribueix les mateixes regles com a
 * configuració plana pròpia — s'importa directament.
 */
const eslintConfig = [...nextCoreWebVitals, ...nextTypescript];

export default eslintConfig;
