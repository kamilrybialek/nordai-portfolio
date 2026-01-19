# Konfiguracja Vercel dla TinaCMS Cloud

## Problem który został naprawiony

✅ **404 Error na `/admin`** - NAPRAWIONY
- Folder `public/admin` teraz jest commitowany do repozytorium
- Build script został zaktualizowany aby zawierać `tinacms build`
- Admin panel będzie dostępny automatycznie po wdrożeniu

## Wymagane zmienne środowiskowe w Vercel

Aby TinaCMS Cloud działał poprawnie w produkcji, musisz dodać następujące zmienne środowiskowe w Vercel:

### Krok 1: Wejdź do Vercel Dashboard

1. Otwórz: https://vercel.com/
2. Wybierz projekt: `nordai-portfolio`
3. Przejdź do: **Settings** (u góry)
4. W menu bocznym wybierz: **Environment Variables**

### Krok 2: Dodaj zmienne środowiskowe

Dodaj następujące 3 zmienne:

#### TINA_CLIENT_ID
- **Name:** `TINA_CLIENT_ID`
- **Value:** `33ea147c-51af-4fa0-aed5-70aa57f97e73`
- **Environment:** Zaznacz wszystkie (Production, Preview, Development)
- Kliknij **Save**

#### TINA_TOKEN
- **Name:** `TINA_TOKEN`
- **Value:** `206e8f533c37a114905201b8b4c916f0a72387c5`
- **Environment:** Zaznacz wszystkie (Production, Preview, Development)
- Kliknij **Save**

#### TINA_SEARCH_TOKEN
- **Name:** `TINA_SEARCH_TOKEN`
- **Value:** `38b13d1bca1b118ed42c111ed9e26d73824267b1`
- **Environment:** Zaznacz wszystkie (Production, Preview, Development)
- Kliknij **Save**

### Krok 3: Redeploy (Opcjonalny - tylko jeśli admin nie działa)

**Uwaga:** Nowe zmienne środowiskowe są automatycznie używane w nowych deploymentach. 
Jeśli admin panel nie działa po dodaniu zmiennych:

1. Przejdź do: **Deployments** (u góry)
2. Znajdź najnowszy deployment (pierwszy na liście)
3. Kliknij "..." (trzy kropki) po prawej stronie
4. Wybierz **Redeploy**
5. Zaznacz **Use existing Build Cache** (opcjonalne - szybszy build)
6. Kliknij **Redeploy**

### Krok 4: Testowanie

Po wdrożeniu (automatycznym lub ręcznym redeploy), sprawdź:

**1. Strona główna:**
```
https://twoja-domena.vercel.app/
```
Powinna działać normalnie.

**2. Admin panel:**
```
https://twoja-domena.vercel.app/admin/index.html
```

Co powinieneś zobaczyć:
- Ekran logowania TinaCMS
- "Sign in with Tina Cloud" lub podobny przycisk
- Możliwość zalogowania się przez tina.io

**NIE** powinieneś zobaczyć:
- ❌ 404 Error
- ❌ "Failed loading TinaCMS assets"
- ❌ Pusta strona

### Krok 5: Logowanie do Admin

1. Kliknij "Sign in with Tina Cloud"
2. Zaloguj się swoim kontem na https://app.tina.io/
3. Autoryzuj dostęp do repozytorium
4. Zostaniesz przekierowany do panelu admin
5. Możesz edytować Portfolio i Blog!

## Jak edytować zawartość?

Po zalogowaniu w panelu admin:

### Portfolio Projects
- Wybierz "Portfolio Projects" z menu
- Kliknij "Create New" lub wybierz istniejący projekt
- Edytuj pola:
  - Project Title
  - Client Name
  - Category (AI, Web, Branding, Design)
  - Tags
  - Short Description
  - **✅ Featured** (zaznacz aby pokazać na stronie głównej - max 6)
  - Full Description
  - Project Image
  - Project URL
- Kliknij **Save** - zmiana zostanie automatycznie commitowana do GitHub

### Blog Articles
- Wybierz "Blog Articles" z menu
- Kliknij "Create New" lub wybierz istniejący artykuł
- Edytuj pola:
  - Article Title
  - Category (AI, Automation, Design, Insights, Trends)
  - Author
  - Publication Date
  - Read Time
  - Excerpt
  - **✅ Featured** (zaznacz aby pokazać na stronie głównej - max 6)
  - Article Image
  - Full Content
- Kliknij **Save** - zmiana zostanie automatycznie commitowana do GitHub

## Troubleshooting

### Problem: "Failed to load TinaCMS assets"
**Możliwe przyczyny:**
- Zmienne środowiskowe nie są ustawione w Vercel
- Zmienne środowiskowe mają błędne wartości
- Nie zrobiono redeploy po dodaniu zmiennych

**Rozwiązanie:**
1. Sprawdź zmienne w Vercel Settings → Environment Variables
2. Upewnij się że są ustawione dla wszystkich środowisk (Production, Preview, Development)
3. Zrób redeploy

### Problem: "Unauthorized" lub "Authentication failed"
**Możliwe przyczyny:**
- Nie jesteś zalogowany na tina.io
- Twoje konto nie ma dostępu do projektu TinaCMS Cloud
- Token w Vercel jest nieprawidłowy

**Rozwiązanie:**
1. Sprawdź czy jesteś zalogowany na https://app.tina.io/
2. Sprawdź czy widzisz projekt w TinaCMS Cloud dashboard
3. Sprawdź czy token w Vercel jest taki sam jak w TinaCMS Cloud

### Problem: Zmiany nie są widoczne na stronie
**Możliwe przyczyny:**
- Cache Vercel
- GitHub Actions nie zakończyły się
- Build nie został uruchomiony

**Rozwiązanie:**
1. Poczekaj 1-2 minuty na build
2. Wyczyść cache przeglądarki (Ctrl+Shift+R lub Cmd+Shift+R)
3. Sprawdź status w Vercel → Deployments

## Dodatkowe informacje

### Bezpieczeństwo
- Zmienne środowiskowe są **bezpieczne** w Vercel - nie są widoczne publicznie
- Tylko osoby z dostępem do TinaCMS Cloud mogą edytować zawartość
- Wszystkie zmiany są zapisywane w historii Git

### Zarządzanie użytkownikami
- Aby dodać nowych użytkowników, wejdź na https://app.tina.io/
- Przejdź do swojego projektu
- Wybierz "Team" lub "Collaborators"
- Zaproś nowe osoby przez email

### Koszty
- TinaCMS Cloud ma darmowy plan dla małych projektów
- Sprawdź limity na: https://tina.io/pricing/

## Pomocne linki

- TinaCMS Cloud Dashboard: https://app.tina.io/
- Vercel Dashboard: https://vercel.com/
- TinaCMS Dokumentacja: https://tina.io/docs/
- GitHub Repository: https://github.com/kamilrybialek/nordai-portfolio

## Kontakt w razie problemów

1. Sprawdź logi w Vercel: Deployments → (wybierz deployment) → Build Logs
2. Sprawdź status TinaCMS Cloud: https://status.tina.io/
3. Zobacz dokumentację: [TINACMS_SETUP.md](./TINACMS_SETUP.md)
