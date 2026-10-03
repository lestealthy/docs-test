# Deployment Documentation

## Project Overview
- **Local project**: `C:\Users\Stealthy\Desktop\WattLab\_docs_TEST`
- **Repository**: https://github.com/lestealthy/docs-test
- **Production URL**: https://lestealthy.github.io/docs-test/

## Architecture

```
Source Markdown (docs/)
       ↓
    MkDocs + Material Theme
       ↓
Static site (site/)
       ↓
GitHub Actions (actions/configure-pages → upload-pages-artifact → deploy-pages)
       ↓
GitHub Pages artifact deployment
       ↓
https://lestealthy.github.io/docs-test/
```

## Local Development

```powershell
cd C:\Users\Stealthy\Desktop\WattLab\_docs_TEST
mkdocs serve -a 127.0.0.1:8081
```

Open http://localhost:8081 in browser.

## Local Production Build

```powershell
cd C:\Users\Stealthy\Desktop\WattLab\_docs_TEST
mkdocs build --strict
```

Output goes to `./site/` directory.

## Git Workflow

```text
edit Markdown (docs/)
    ↓
git add .
    ↓
git commit -m "Description of changes"
    ↓
git push origin main
    ↓
GitHub Actions triggers automatically
    ↓
MkDocs build in CI
    ↓
GitHub Pages artifact deployment
    ↓
Live at https://lestealthy.github.io/docs-test/
```

## Key Configuration (mkdocs.yml)

Critical settings that prevent redirect loops on GitHub Pages subdirectory deployments:

```yaml
site_url: https://lestealthy.github.io/docs-test/
repo_url: https://github.com/lestealthy/docs-test
repo_name: docs-test
use_directory_urls: false
```

**Why `use_directory_urls: false`?**
- With `true` (default), MkDocs generates `site/index.html` as a redirect page pointing to `./`
- On GitHub Pages at `/docs-test/`, this redirect points to itself → infinite loop
- With `false`, all pages are flat `.html` files, no redirect pages generated

## GitHub Pages Configuration

**Required setting**: GitHub Pages must be configured as **"GitHub Actions"** (not "Deploy from a branch")

1. Go to Repository → Settings → Pages
2. Under "Build and deployment" → Source: **GitHub Actions**
3. The workflow at `.github/workflows/deploy.yml` handles the rest

## Workflow (`.github/workflows/deploy.yml`)

Uses official GitHub Pages actions:
- `actions/checkout@v4`
- `actions/setup-python@v5`
- `actions/configure-pages@v4`
- `actions/upload-pages-artifact@v3`
- `actions/deploy-pages@v4`

Permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

## Troubleshooting

### Infinite redirect loop on production
**Symptom**: Page refreshes continuously, URL shows redirect script:
```html
<script>var anchor=window.location.hash.substr(1);location.href="./"+(anchor?"#"+anchor:"")</script>
```

**Root cause**: 
1. Missing `site_url` in mkdocs.yml
2. `use_directory_urls: true` (default) generating redirect page at `site/index.html`
3. GitHub Pages configured as "Deploy from a branch" instead of "GitHub Actions"

**Fix**: Ensure mkdocs.yml has all four critical settings above, and GitHub Pages source is "GitHub Actions".

### CSS/JS not loading
**Symptom**: Unstyled page, search/navigation broken

**Root cause**: Incorrect `site_url` or `base` URL in generated HTML

**Fix**: Verify `site_url` matches production URL exactly (including trailing slash).

### Search not working
**Symptom**: Search returns no results or fails to initialize

**Root cause**: Search index path incorrect due to wrong base URL

**Fix**: Check `site_url` and ensure `use_directory_urls: false` for consistent paths.

### How to inspect Actions
1. Go to https://github.com/lestealthy/docs-test/actions
2. Click latest workflow run
3. Check each job: `checkout` → `python setup` → `dependencies` → `mkdocs build` → `artifact` → `Pages deploy`

### How to inspect Pages settings
1. Go to https://github.com/lestealthy/docs-test/settings/pages
2. Verify "Source" = "GitHub Actions"
3. Check "Custom domain" if using one

### How to reproduce local build
```powershell
cd C:\Users\Stealthy\Desktop\WattLab\_docs_TEST
mkdocs build --strict
# Check ./site/index.html - should be full content, NOT a redirect page
```

### How to detect redirect loops
```powershell
# Local check
Get-Content site/index.html | Select-String "location.href"

# Production check (PowerShell)
Invoke-WebRequest https://lestealthy.github.io/docs-test/ -MaximumRedirection 0 -ErrorAction Ignore
# Should return 200, not 301/302 to same URL
```

### How to verify generated URLs
```powershell
# Check canonical URL in generated HTML
Get-Content site/index.html | Select-String "canonical"
# Should show: https://lestealthy.github.io/docs-test/index.html
```

## Files Changed to Fix Deployment

1. **mkdocs.yml** - Added `site_url`, corrected `repo_url`/`repo_name`, set `use_directory_urls: false`, removed self-referencing redirect plugin

## Remaining Manual GitHub Settings

- [x] GitHub Pages Source: "GitHub Actions" (already configured)
- [ ] Custom domain (optional, not configured)
- [ ] Branch protection rules (optional)

---

**Last verified**: 2026-10-03  
**Status**: ✅ Production site loads correctly at https://lestealthy.github.io/docs-test/