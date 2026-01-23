# Decap CMS - Instrukcja Użycia

✅ **Decap CMS został pomyślnie zainstalowany!**

## Jak używać admin panelu

### Dostęp do panelu

Admin panel jest dostępny pod adresem:
```
https://twoja-domena.vercel.app/admin/
```

### Konfiguracja GitHub OAuth

Aby móc edytować zawartość, musisz skonfigurować GitHub OAuth:

#### Opcja 1: Netlify (Zalecane - Najłatwiejsze)

1. Wdróż stronę również na Netlify (za darmo):
   - Wejdź na https://app.netlify.com/
   - Kliknij "Add new site" → "Import an existing project"
   - Połącz z GitHub i wybierz repo `kamilrybialek/nordai-portfolio`
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Deploy

2. Netlify automatycznie obsługuje OAuth dla Decap CMS - nic więcej nie musisz robić!

3. Dostęp do admin:
   ```
   https://twoja-strona.netlify.app/admin/
   ```

#### Opcja 2: GitHub OAuth App (dla Vercel)

Jeśli chcesz używać Vercel:

1. Utwórz GitHub OAuth App:
   - Wejdź: https://github.com/settings/developers
   - Kliknij "OAuth Apps" → "New OAuth App"
   - Application name: `nordai-portfolio CMS`
   - Homepage URL: `https://twoja-domena.vercel.app`
   - Authorization callback URL: `https://api.netlify.com/auth/done`

2. Skopiuj **Client ID** i **Client Secret**

3. Utwórz Netlify OAuth Gateway:
   - Wejdź: https://app.netlify.com/
   - Site settings → Access control → OAuth
   - Dodaj GitHub jako provider z Client ID i Secret

4. Zaktualizuj `public/admin/config.yml`:
   ```yaml
   backend:
     name: github
     repo: kamilrybialek/nordai-portfolio
     branch: main
     base_url: https://api.netlify.com
     auth_endpoint: auth
   ```

## Funkcjonalność

### Edycja Blog Articles

1. Wejdź na `/admin/`
2. Zaloguj się przez GitHub
3. Wybierz "Blog Articles"
4. Możesz:
   - ✏️ Edytować istniejące artykuły
   - ➕ Tworzyć nowe artykuły
   - 🗑️ Usuwać artykuły
   - ⭐ Zaznaczyć jako "Featured on Homepage" (max 6 będzie pokazanych)

### Edycja Portfolio Projects

1. Wejdź na `/admin/`
2. Zaloguj się przez GitHub
3. Wybierz "Portfolio Projects"
4. Możesz:
   - ✏️ Edytować istniejące projekty
   - ➕ Tworzyć nowe projekty
   - 🗑️ Usuwać projekty
   - ⭐ Zaznaczyć jako "Featured on Homepage" (max 6 będzie pokazanych)

## Jak to działa

1. **Edytujesz w admin panelu** → Zapisujesz zmiany
2. **Decap CMS tworzy commit** → Automatycznie commituje do GitHub
3. **Vercel wykrywa zmianę** → Automatycznie wdraża nową wersję
4. **Strona zaktualizowana** → Po 1-2 minutach zmiany są live!

## Pola w Blog Articles

- **Title** - Tytuł artykułu
- **Excerpt** - Krótki opis (wyświetlany na liście)
- **Category** - Kategoria (ai, automation, design, insights, trends)
- **Date** - Data publikacji
- **Read Time** - Czas czytania w minutach
- **Author** - Autor (domyślnie: nordAi Team)
- **Featured on Homepage** - ✅ Zaznacz aby pokazać na stronie głównej (max 6)
- **Image** - Obrazek główny
- **SEO Title** - Tytuł dla SEO (opcjonalnie)
- **SEO Description** - Opis dla SEO (opcjonalnie)
- **Body** - Treść artykułu (Markdown)

## Pola w Portfolio Projects

- **Title** - Nazwa projektu
- **Client** - Nazwa klienta
- **Category** - Kategoria (ai, web, branding, design)
- **Tags** - Tagi (lista, np. "AI", "Automation")
- **Excerpt** - Krótki opis
- **Featured on Homepage** - ✅ Zaznacz aby pokazać na stronie głównej (max 6)
- **Image** - Obrazek projektu
- **Project Link** - Link do live projektu (opcjonalnie)
- **SEO Title** - Tytuł dla SEO (opcjonalnie)
- **SEO Description** - Opis dla SEO (opcjonalnie)
- **Body** - Pełny opis projektu (Markdown)

## Markdown w Body

W polu "Body" możesz używać Markdown:

```markdown
## Nagłówek 2
### Nagłówek 3

**Pogrubiony tekst**
*Kursywa*

- Lista
- Nienumerowana

1. Lista
2. Numerowana

[Link](https://example.com)

![Obrazek](https://example.com/image.jpg)
```

## Troubleshooting

### Problem: "Error loading user"
**Rozwiązanie:** Skonfiguruj GitHub OAuth (patrz wyżej)

### Problem: Nie widzę zmian na stronie
**Rozwiązanie:** Poczekaj 1-2 minuty na deployment Vercel

### Problem: 404 na /admin/
**Rozwiązanie:** Sprawdź czy pliki są w repozytorium:
```bash
git pull
ls public/admin/
# Powinny być: config.yml i index.html
```

## Różnice vs TinaCMS

| Feature | TinaCMS | Decap CMS |
|---------|---------|-----------|
| Setup | Skomplikowany | Prosty (15 min) |
| OAuth | TinaCMS Cloud | GitHub OAuth |
| Edycja | Cloud dashboard | /admin/ na Twojej stronie |
| Backend | Wymaga Cloud | Nie wymaga backendu |
| Zapis | Git | Git |
| UI | Nowoczesny | Prosty, funkcjonalny |

## Wsparcie

Jeśli masz pytania lub problemy:
1. Sprawdź dokumentację: https://decapcms.org/docs/intro/
2. Zobacz przykłady: https://decapcms.org/docs/examples/

---

**Status:** ✅ Gotowe do użycia!
