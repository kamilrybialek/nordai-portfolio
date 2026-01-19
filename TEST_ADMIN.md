# Test Admin Panel - Troubleshooting

## Problem
Admin panel nie działa ani lokalnie ani na Vercel mimo dodanych zmiennych środowiskowych.

## Możliwe przyczyny:

### 1. Projekt TinaCMS Cloud nie jest połączony z repozytorium
**Sprawdź:**
- Wejdź na https://app.tina.io/
- Zaloguj się
- Czy widzisz projekt "nordai-portfolio"?
- Czy jest połączony z repo `kamilrybialek/nordai-portfolio`?

**Jeśli NIE:**
- Kliknij "Create New Project"
- Wybierz "Connect to existing repository"
- Wybierz `kamilrybialek/nordai-portfolio`
- Branch: `main`

### 2. Bezpośrednia edycja przez TinaCMS Cloud (ZALECANE)

Zamiast używać `/admin` na swojej stronie, możesz edytować zawartość bezpośrednio przez TinaCMS Cloud:

**Krok 1: Wejdź na TinaCMS Cloud**
```
https://app.tina.io/
```

**Krok 2: Wybierz swój projekt**
- Znajdź "nordai-portfolio" lub utwórz nowy projekt
- Połącz z GitHub repository

**Krok 3: Edytuj zawartość**
- Wybierz "Content" z menu
- Wybierz "Portfolio Projects" lub "Blog Articles"
- Edytuj bezpośrednio
- Zapisz - automatycznie commituje do GitHub

### 3. Alternatywnie - Edycja przez pliki MDX w GitHub

Jeśli TinaCMS Cloud nie działa, możesz edytować pliki bezpośrednio:

**Portfolio:**
```
https://github.com/kamilrybialek/nordai-portfolio/tree/main/content/portfolio
```

**Blog:**
```
https://github.com/kamilrybialek/nordai-portfolio/tree/main/content/blog
```

**Format plików MDX:**
```mdx
---
title: "Project Title"
client: "Client Name"
category: "ai"
tags: ["AI", "Automation"]
excerpt: "Short description"
featured: true
---

Full description content here...
```

## Debugging lokalnie:

### Uruchom dev server:
```bash
npm run dev
```

### Sprawdź na jakim porcie się uruchomił:
Szukaj linii:
```
Local:   http://localhost:XXXX/
```

### Admin będzie dostępny na:
```
http://localhost:XXXX/admin/index.html
```
(Gdzie XXXX to port z poprzedniego kroku)

## Debugging na Vercel:

### Sprawdź build logs:
1. Wejdź na https://vercel.com/
2. Wybierz projekt
3. Deployments → (najnowszy) → Build Logs
4. Szukaj błędów związanych z TinaCMS

### Sprawdź czy zmienne są ustawione:
1. Settings → Environment Variables
2. Upewnij się że są dla Production, Preview, Development

## Najlepsze rozwiązanie:

**Użyj bezpośrednio TinaCMS Cloud Dashboard:**

1. https://app.tina.io/ → Zaloguj się
2. Wybierz/Utwórz projekt
3. Połącz z GitHub
4. Edytuj zawartość tam

**Zalety:**
- Działa zawsze
- Nie wymaga buildu admin panelu
- Profesjonalny interfejs
- Automatyczne commity do GitHub
- Vercel automatycznie wdraża zmiany

## Co zrobić teraz:

1. **Najpierw spróbuj:** https://app.tina.io/
   - Zaloguj się
   - Sprawdź czy projekt istnieje
   - Jeśli nie, utwórz nowy i połącz z repozytorium

2. **Jeśli TinaCMS Cloud nie działa:** Edytuj pliki MDX bezpośrednio na GitHub

3. **Jeśli chcesz naprawić lokalny admin:**
   - Poczekaj aż sprawdzę co dokładnie nie działa
   - Możliwe że trzeba będzie przebudować projekt TinaCMS Cloud
