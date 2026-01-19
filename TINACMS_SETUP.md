# TinaCMS Cloud Setup Guide

## Przegląd

TinaCMS Cloud zapewnia bezpieczny panel administracyjny z autentykacją OAuth. Nie ma żadnych haseł w kodzie - wszystko jest zarządzane przez tina.io.

## Krok 1: Konto TinaCMS Cloud

1. Wejdź na https://app.tina.io/
2. Zaloguj się lub utwórz konto (możesz użyć GitHub)
3. Kliknij "Create New Project" lub wybierz istniejący projekt

## Krok 2: Połącz z GitHub

1. W TinaCMS Cloud dashboard, wybierz "Connect Repository"
2. Autoryzuj TinaCMS do dostępu do Twojego GitHub
3. Wybierz repository: `kamilrybialek/nordai-portfolio`
4. Ustaw branch: `main`

## Krok 3: Uzyskaj Credentials

1. W TinaCMS Cloud, przejdź do Project Settings
2. Skopiuj następujące wartości:
   - **Client ID** (np. 33ea147c-51af-4fa0-aed5-70aa57f97e73)
   - **Token** (długi string)
   - **Search Token** (opcjonalny)

## Krok 4: Skonfiguruj Vercel

### Opcja A: Przez Vercel Dashboard (Zalecane)

1. Wejdź na https://vercel.com/
2. Wybierz projekt `nordai-portfolio`
3. Przejdź do: **Settings** → **Environment Variables**
4. Dodaj następujące zmienne:

| Name | Value | Environment |
|------|-------|-------------|
| `TINA_CLIENT_ID` | [Twój Client ID] | Production, Preview, Development |
| `TINA_TOKEN` | [Twój Token] | Production, Preview, Development |
| `TINA_SEARCH_TOKEN` | [Twój Search Token] | Production, Preview, Development |

5. Kliknij **Save**

### Opcja B: Przez Vercel CLI

```bash
# Zainstaluj Vercel CLI jeśli nie masz
npm i -g vercel

# Zaloguj się
vercel login

# Dodaj zmienne środowiskowe
vercel env add TINA_CLIENT_ID production
# Wklej wartość i naciśnij Enter

vercel env add TINA_TOKEN production
# Wklej wartość i naciśnij Enter

vercel env add TINA_SEARCH_TOKEN production
# Wklej wartość i naciśnij Enter
```

## Krok 5: Redeploy

Po dodaniu zmiennych środowiskowych, musisz zrobić redeploy:

### Opcja A: Przez Vercel Dashboard
1. Przejdź do **Deployments**
2. Kliknij na najnowszy deployment
3. Kliknij **Redeploy**

### Opcja B: Przez Git Push
```bash
git commit --allow-empty -m "Trigger redeploy for TinaCMS Cloud"
git push
```

## Krok 6: Testowanie

### Development (Lokalnie)
```bash
npm run dev
```
Następnie wejdź na: http://localhost:5173/admin/index.html

### Production
1. Wejdź na: https://your-domain.vercel.app/admin/index.html
2. Zostaniesz poproszony o zalogowanie przez tina.io
3. Zaloguj się swoim kontem TinaCMS Cloud
4. Po autoryzacji, zobaczysz panel admin

## Panel Admin - Co możesz edytować?

### Portfolio Projects (`content/portfolio/*.mdx`)
- Project Title
- Client Name
- Category (AI, Web, Branding, Design)
- Tags
- Short Description
- **Featured** (zaznacz aby pokazać na stronie głównej - max 6)
- Full Description (Rich Text)
- Project Image
- Project URL
- SEO Title & Description

### Blog Articles (`content/blog/*.mdx`)
- Article Title
- Category (AI, Automation, Design, Insights, Trends)
- Author
- Publication Date
- Read Time (minutes)
- Excerpt
- **Featured** (zaznacz aby pokazać na stronie głównej - max 6)
- Article Image
- Full Content (Rich Text)
- SEO Title & Description

## Bezpieczeństwo

✅ **Zalety TinaCMS Cloud:**
- Bezpieczna autentykacja OAuth przez tina.io
- Brak haseł w kodzie źródłowym
- Zarządzanie użytkownikami przez TinaCMS Cloud
- Wszystkie zmiany są commitowane do GitHub
- Audit log wszystkich zmian
- Możliwość cofnięcia zmian przez Git

✅ **Kto ma dostęp:**
- Tylko osoby dodane jako członkowie projektu w TinaCMS Cloud
- Możesz zapraszać członków zespołu przez TinaCMS dashboard
- Każdy członek musi mieć konto na tina.io

## Troubleshooting

### Problem: "Failed loading TinaCMS assets"
**Rozwiązanie:**
- Sprawdź czy zmienne środowiskowe są poprawnie ustawione w Vercel
- Sprawdź czy zrobiłeś redeploy po dodaniu zmiennych
- Sprawdź logi w Vercel: Settings → Logs

### Problem: "Authentication failed"
**Rozwiązanie:**
- Upewnij się że jesteś zalogowany na tina.io
- Sprawdź czy Twoje konto ma dostęp do projektu
- Wyloguj się i zaloguj ponownie

### Problem: Admin panel nie ładuje się w production
**Rozwiązanie:**
- Sprawdź czy folder `public/admin` jest w repozytorium
- Sprawdź czy `TINA_CLIENT_ID` i `TINA_TOKEN` są ustawione w Vercel
- Sprawdź czy build się powiódł (Vercel → Deployments → Build Logs)

### Problem: Nie widzę moich postów/projektów
**Rozwiązanie:**
- Sprawdź czy foldery `content/blog` i `content/portfolio` istnieją
- Sprawdź czy pliki `.mdx` mają poprawną strukturę
- Sprawdź GraphQL API: http://localhost:4001/graphql (w development)

## Pomocne Linki

- TinaCMS Cloud Dashboard: https://app.tina.io/
- TinaCMS Dokumentacja: https://tina.io/docs/
- Vercel Dashboard: https://vercel.com/
- GitHub Repository: https://github.com/kamilrybialek/nordai-portfolio

## Kontakt

W razie problemów:
1. Sprawdź logi w Vercel
2. Sprawdź TinaCMS Cloud status
3. Zobacz dokumentację TinaCMS
