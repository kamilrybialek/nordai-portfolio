# Diagnoza problemu TinaCMS

## Status aktualny:

### ✅ Co działa:
- Pliki `.tina/config.ts` są w repozytorium
- Pliki `content/` są w repozytorium  
- Projekt TinaCMS Cloud istnieje (Client ID: 33ea147c-51af-4fa0-aed5-70aa57f97e73)
- GitHub repository jest połączony
- Zmienne środowiskowe są ustawione w Vercel

### ❌ Co nie działa:
- Localhost: Działa tylko w "local mode" (nie łączy się z Cloud)
- Production: 404 na `/admin/index.html`
- TinaCMS Cloud: Nie wykrywa schema (prosi o `init`)

## Możliwe przyczyny:

### 1. TinaCMS Cloud wymaga "auditu" projektu
TinaCMS Cloud może wymagać ręcznego zatwierdzenia konfiguracji:
- Wejdź na https://app.tina.io/
- Wybierz projekt "nordai-portfolio"
- Kliknij "Configuration" lub "Settings"
- Sprawdź czy jest opcja "Detect Configuration" lub "Verify Setup"

### 2. Vercel nie buduje admin panelu
Sprawdź build logs na Vercel:
- https://vercel.com/ → Projekt → Deployments → (najnowszy) → Build Logs
- Szukaj linii z "tinacms build"
- Sprawdź czy jest error

### 3. Brakuje pliku w public/admin po deploy
- Folder `public/admin` może nie być wdrażany na Vercel
- Możliwe że Vercel cache jest problem

### 4. Framework preset w Vercel
Vercel może używać złego build commanda:
- Settings → General → Build & Development Settings
- Framework Preset: powinno być "Vite" lub "Other"
- Build Command: `npm run build`
- Output Directory: `dist`

## Rozwiązanie krok po kroku:

### KROK 1: Sprawdź Vercel Build Command
1. Wejdź: https://vercel.com/ → Projekt → Settings → General
2. Sprawdź "Build & Development Settings":
   - Framework Preset: **Vite**
   - Build Command: **`npm run build`** (to uruchomi `tinacms build && vite build`)
   - Output Directory: **`dist`**
   - Install Command: `npm install`

### KROK 2: Sprawdź Vercel Build Logs
1. Deployments → (najnowszy)  
2. Build Logs
3. Szukaj:
   ```
   Starting Tina build
   Tina build complete
   ```
4. Jeśli NIE MA tych linii - build command jest zły

### KROK 3: Wyczyść Vercel Cache
1. Deployments → (najnowszy) → ⋮ (three dots)
2. Redeploy
3. **WAŻNE:** ODZNACZ "Use existing Build Cache"
4. Kliknij Redeploy

### KROK 4: Sprawdź czy admin/index.html jest w dist
Po lokalnym build:
```bash
npm run build
ls -la dist/admin/
```

Powinno być:
```
dist/admin/index.html
dist/admin/assets/
```

### KROK 5: TinaCMS Cloud Configuration
1. https://app.tina.io/ → Twój projekt
2. Jeśli jest "Configuration" tab - wejdź tam
3. Szukaj opcji:
   - "Detect Schema"
   - "Verify Configuration"
   - "Sync Schema"
4. Kliknij wszystkie dostępne opcje synchronizacji

## Szybkie rozwiązanie (obejście):

### Opcja A: Edytuj przez TinaCMS Cloud Dashboard
Zamiast używać `/admin` na stronie:
1. https://app.tina.io/ → Twój projekt → Content
2. Edytuj Portfolio i Blog bezpośrednio tam
3. Zapisz - automatycznie commituje do GitHub
4. Vercel automatycznie wdraża

### Opcja B: Edytuj pliki MDX bezpośrednio
1. https://github.com/kamilrybialek/nordai-portfolio/tree/main/content
2. Edytuj pliki `.mdx` bezpośrednio przez GitHub
3. Commit zmian
4. Vercel automatycznie wdraża

## Co sprawdzić TERAZ:

1. **Vercel Build Command** - to najczęstsza przyczyna
2. **Vercel Build Logs** - zobacz czy TinaCMS build się wykonał
3. **Wyczyść cache** i zrób redeploy
4. **Sprawdź lokalnie** czy `npm run build` tworzy `dist/admin/`

Jeśli po tych krokach nadal nie działa - problem jest w TinaCMS Cloud setupie i trzeba będzie utworzyć nowy projekt.
