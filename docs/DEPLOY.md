# Deployment Guide

This project is configured to deploy automatically to GitHub Pages. The deployment includes both the main application and the Storybook documentation.

## Deployment Structure

- **Main Application**: Deployed to the root (`/`).
  - URL: `https://wkylin.github.io/pro-react-admin/`
- **Storybook**: Deployed to a subdirectory (`/storybook/`).
  - URL: `https://wkylin.github.io/pro-react-admin/storybook/`

## How to Deploy

We have a unified script to handle the build and deployment process.

### Command

```bash
npm run deploy
```

### What this command does

The `npm run deploy` command executes `scripts/deploy-gh.js`, which performs the following steps:

1.  **Build Main App**: Runs `npm run build:production` to generate the production build in the `dist` directory.
2.  **Build Storybook**: Runs `npm run build-storybook` with `STORYBOOK_BASE_HREF=/pro-react-admin/storybook/`.
    - This ensures that Storybook assets are loaded correctly from the subdirectory.
    - The output is generated in `storybook-static`.
3.  **Merge Builds**:
    - Moves the `storybook-static` directory into `dist/storybook`.
4.  **Deploy**:
    - Uses `gh-pages` to push the contents of the `dist` directory to the `gh-pages` branch of the repository.

## Configuration Details

### Storybook Base Path

The Storybook build uses a custom script `scripts/add-storybook-base.js` (triggered via `postbuild-storybook`) to inject the `<base>` tag into `index.html`.

- **Environment Variable**: `STORYBOOK_BASE_HREF`
- **Value for GitHub Pages**: `/pro-react-admin/storybook/`

If you are deploying to a different path or domain, you may need to adjust this variable in `scripts/deploy-gh.js`.

### GitHub Pages Branch

The deployment uses the `gh-pages` branch. Ensure your repository settings on GitHub are configured to serve from this branch.
