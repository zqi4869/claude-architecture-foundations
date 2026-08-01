# GitHub Pages Deployment

## 1. Create the repository

Create a public GitHub repository, for example:

```text
claude-architecture-foundations
```

Do not add a README, license, or `.gitignore` during repository creation; this package already contains them.

## 2. Push the project

From the project directory:

```bash
git init
git add .
git commit -m "Publish independent Claude architecture study guide"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## 3. Enable Pages

In the repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **GitHub Actions**.
3. Open the **Actions** tab.
4. Wait for **Deploy VitePress site to GitHub Pages** to finish.

For a normal project repository, the site URL will be:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

The workflow calculates the correct VitePress base path automatically.

## 4. Check before sharing

- Open the deployed site on desktop and mobile.
- Confirm search and navigation work.
- Confirm the social preview image appears when the URL is shared.
- Review the disclaimer and attribution name.
- Keep `Private_Coverage_Audit_96Q.md` outside the repository.

## 5. Future updates

Edit Markdown files under `docs/`, commit, and push to `main`. GitHub Actions will rebuild and redeploy the site automatically.
