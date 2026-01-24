# 🚀 Deploy na Vercel - Instrukcja

## Dlaczego Vercel?
- ✅ Bez limitów buildów
- ✅ Szybszy routing (lepsze edge network)
- ✅ Łatwiejsze serverless functions
- ✅ Zero problemów z cache
- ✅ Lepszy DX

## Krok po kroku:

### 1. Push zmian do GitHub

```bash
cd /path/to/nordai-portfolio
git add -A
git commit -m "Add Vercel support and fix admin routing"
git push origin main
```

Jeśli push nie działa - zrób to przez GitHub Desktop lub przeglądarkę.

### 2. Zaloguj się na Vercel

Idź na: https://vercel.com/login
Zaloguj się przez GitHub

### 3. Import projektu

1. Kliknij **"Add New..." → "Project"**
2. Wybierz repo **"kamilrybialek/nordai-portfolio"**
3. Kliknij **"Import"**

### 4. Konfiguracja projektu

#### Build Settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

✅ Zostaw domyślne - Vercel wykryje automatycznie!

#### Environment Variables:

Dodaj te zmienne w sekcji **"Environment Variables"**:

```
VITE_GITHUB_CLIENT_ID=twój_github_client_id
GITHUB_CLIENT_ID=twój_github_client_id
GITHUB_CLIENT_SECRET=twój_github_client_secret
```

**Ważne**: Ustaw dla **"Production", "Preview", i "Development"**

### 5. Deploy!

Kliknij **"Deploy"**

Vercel automatycznie:
- Zrobi npm install
- Zbuildu je aplikację
- Wdroży na globalny CDN
- Utworzy URL (np. nordai-portfolio.vercel.app)

⏱️ Zajmie to 2-3 minuty.

### 6. Dodaj własną domenę

1. W projekcie Vercel idź do **"Settings" → "Domains"**
2. Dodaj **"nordai.studio"**
3. Vercel pokaże jak skonfigurować DNS:
   - A record: `76.76.21.21`
   - CNAME www: `cname.vercel-dns.com`
4. Poczekaj 5-10 minut na propagację DNS

### 7. Zaktualizuj GitHub OAuth App

Zmień callback URL w GitHub OAuth App:

https://github.com/settings/developers

**Authorization callback URL**:
```
https://nordai.studio/admin
```

(lub tymczasowo: `https://nordai-portfolio.vercel.app/admin`)

### 8. Gotowe! 🎉

Idź na:
- **https://nordai.studio/admin** (po DNS)
- **https://nordai-portfolio.vercel.app/admin** (natychmiast)

Kliknij **"Login with GitHub"** i ciesz się działającym panelem!

---

## Co jest już przygotowane:

✅ `vercel.json` - konfiguracja routingu
✅ `/api/github-oauth.ts` - Vercel serverless function
✅ SPA routing dla React Router
✅ Cache headers dla assets
✅ Admin panel gotowy
✅ Gallery support
✅ SEO optimization

## Automatyczne deploye:

Vercel automatycznie wdroży:
- **Push do main** → Deploy na produkcję (nordai.studio)
- **Push do brancha** → Preview deploy (unique URL)
- **Pull Request** → Preview dla każdego PR

## Troubleshooting:

### Build fails?
Sprawdź logi w Vercel Dashboard → Deployments → [kliknij deploy] → "Building"

### 404 na /admin?
- Sprawdź czy `vercel.json` jest w repozytorium
- Trigger redeploy w Vercel (Deployments → ... → Redeploy)

### OAuth nie działa?
- Sprawdź czy zmienne środowiskowe są ustawione
- Sprawdź callback URL w GitHub OAuth App

---

## Koszt:

**Hobby plan (FREE):**
- Unlimited deploys
- Unlimited bandwidth
- 100GB storage
- Serverless functions

Więcej niż wystarczające dla Twojego projektu! 🚀
