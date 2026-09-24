# WorkAttend

Applicazione web Next.js App Router, React e TypeScript progettata per sostituire il sito WordPress e crescere verso una futura piattaforma full-stack.

## Architettura

- `src/app`: routing Next.js App Router e pagine.
- `src/components`: componenti React tipizzati e riutilizzabili.
- `src/core/types`: tipi condivisi e contratti del dominio UI.
- `src/mocks`: contenuti statici della prima versione.
- `src/repositories`: livello di accesso ai dati, oggi basato su mock.
- `src/services`: use-case applicativi consumati dalle pagine.

## Script

- `pnpm dev`: avvia Next.js in sviluppo.
- `pnpm build`: genera la build di produzione.
- `pnpm lint`: esegue ESLint.
