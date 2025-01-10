# React Effector MUI

This codebase is frontend for [JSON placeholder](https://jsonplaceholder.typicode.com/).

Features:
- type safe with zod
- mui with dark mode and interface color picker
- navigating with react router
- form validation with formik
- type safe internationalization
- advanced eslint and prettier config
- e2e testing with cypress

## Libraries and Frameworks

| Name                                          |                      |
|-----------------------------------------------|----------------------|
| [TypeScript](https://www.typescriptlang.org/) | 5.7.x                |
| [React](https://react.dev/)                   | 19.x                 |
| [Vite](https://vite.dev/)                     | 6.x                  |
| [React Router](https://reactrouter.com/)      | 7.x                  |
| [Effector](https://effector.dev/)             | state manager        |
| [MUI](https://mui.com/)                       | ui components        |
| [Zod](https://zod.dev/)                       | schema validation    |
| [Formik](https://formik.org/)                 | managing form state  |
| [Cypress](https://www.cypress.io/)            | e2e testing          |
| [i18next](https://www.i18next.com/)           | internationalization |

## Getting Started

Demo app is running on <https://react-redux-mui.vercel.app/> .

Alternatively, you can try it locally.

```bash
# copy env
cp .env.example .env.local

# run app
npm run dev
```

## Directory structure

```plaintext
.
├── api/                  # api schema
├── public/               # static assets
└── src/
    ├── app/              # web routes
    ├── config/           # global configuration and constants
    ├── generated/        # automatically generated codes
    ├── modules/
    │   ├── common/       # common (feature-independent) components
    │   └── features/     # feature-specific components
    ├── styles/           # global style sheets
    └── utils/            # utilities
```