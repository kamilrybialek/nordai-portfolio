# Alternatywne rozwiązania CMS zamiast TinaCMS

## TL;DR - Co polecam:

🥇 **Decap CMS** - Najprostszy, działa od razu, zero backendu
🥈 **Sanity.io** - Bardziej profesjonalny, wymaga przepisania contentu
🥉 **Własny admin z GitHub API** - Pełna kontrola, ale trzeba napisać

---

## 1. 🌟 Decap CMS (Netlify CMS)

### Zalety:
- ✅ Najprostszy setup (dosłownie 10 minut)
- ✅ Działa z istniejącymi plikami MDX
- ✅ Zapisuje bezpośrednio do Git
- ✅ Nie wymaga backendu
- ✅ Free i open source
- ✅ Działa z Vercel/Netlify
- ✅ UI podobny do WordPress

### Wady:
- ❌ Starszy projekt (mniej aktywny rozwój)
- ❌ UI nie jest najładniejsze
- ❌ Wymaga OAuth przez GitHub

### Jak wdrożyć:

#### Krok 1: Zainstaluj
```bash
npm install netlify-cms-app
```

#### Krok 2: Utwórz `/public/admin/config.yml`
```yaml
backend:
  name: github
  repo: kamilrybialek/nordai-portfolio
  branch: main

media_folder: "public/images"
public_folder: "/images"

collections:
  - name: "blog"
    label: "Blog"
    folder: "content/blog"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Excerpt", name: "excerpt", widget: "text"}
      - {label: "Category", name: "category", widget: "select", options: ["ai", "automation", "design", "insights", "trends"]}
      - {label: "Date", name: "date", widget: "datetime"}
      - {label: "Read Time", name: "readTime", widget: "number"}
      - {label: "Author", name: "author", widget: "string", default: "nordAi Team"}
      - {label: "Featured", name: "featured", widget: "boolean", default: false}
      - {label: "Image", name: "image", widget: "image", required: false}
      - {label: "Body", name: "body", widget: "markdown"}

  - name: "portfolio"
    label: "Portfolio"
    folder: "content/portfolio"
    create: true
    slug: "{{slug}}"
    fields:
      - {label: "Title", name: "title", widget: "string"}
      - {label: "Client", name: "client", widget: "string"}
      - {label: "Category", name: "category", widget: "select", options: ["ai", "web", "branding", "design"]}
      - {label: "Tags", name: "tags", widget: "list"}
      - {label: "Excerpt", name: "excerpt", widget: "text"}
      - {label: "Featured", name: "featured", widget: "boolean", default: false}
      - {label: "Body", name: "body", widget: "markdown"}
      - {label: "Image", name: "image", widget: "image", required: false}
      - {label: "Link", name: "link", widget: "string", required: false}
```

#### Krok 3: Utwórz `/public/admin/index.html`
```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Content Manager</title>
</head>
<body>
  <script src="https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js"></script>
</body>
</html>
```

#### Krok 4: GitHub OAuth (wybierz jedną opcję)

**Opcja A: Przez Netlify (łatwiejsze)**
1. Wdróż na Netlify (za darmo)
2. Netlify automatycznie obsługuje OAuth

**Opcja B: Przez własny OAuth App**
1. GitHub → Settings → Developer settings → OAuth Apps → New
2. Homepage URL: `https://twoja-domena.vercel.app`
3. Callback URL: `https://api.netlify.com/auth/done`
4. Dodaj Client ID i Secret do Vercel env

#### Krok 5: Użyj
```
https://twoja-domena.vercel.app/admin/
```

**Czas: 15 minut**

---

## 2. 🎨 Sanity.io

### Zalety:
- ✅ Nowoczesny, piękny UI
- ✅ Real-time collaboration
- ✅ Świetne API
- ✅ Darmowy plan (hojny)
- ✅ Excellent dokumentacja

### Wady:
- ❌ Wymaga przepisania contentu z MDX do Sanity
- ❌ Wymaga zmian w kodzie (fetch z Sanity API)
- ❌ Cloud-based (nie Git)

### Kiedy wybrać:
- Chcesz profesjonalny CMS
- OK z przepisaniem contentu
- Potrzebujesz real-time updates

### Szacowany czas wdrożenia: 4-6 godzin

---

## 3. 🔧 Własny prosty admin z GitHub API

### Zalety:
- ✅ Pełna kontrola
- ✅ Minimalistyczny
- ✅ Żadnych zewnętrznych zależności
- ✅ Zapisuje do Git

### Wady:
- ❌ Trzeba napisać (2-3 godziny)
- ❌ Podstawowy UI

### Stack:
- React
- GitHub API (Octokit)
- React Hook Form
- Zapisuje bezpośrednio do repo

### Jak działa:
1. Logowanie przez GitHub OAuth
2. Lista plików z `content/`
3. Edycja w formularzu
4. Zapis = commit do GitHub
5. Vercel automatycznie wdraża

### Szacowany czas: 3-4 godziny

---

## 4. 📝 Bezpośrednia edycja (bez CMS)

### Opcja A: GitHub Web Editor
```
https://github.com/kamilrybialek/nordai-portfolio/tree/main/content
```
- Edytuj pliki .mdx
- Commit
- Vercel automatycznie wdraża

### Opcja B: VS Code na GitHub
```
github.dev/kamilrybialek/nordai-portfolio
```
- Pełny edytor w przeglądarce
- Podgląd MDX
- Commit i push

### Opcja C: Lokalnie
```bash
code content/blog/
# Edytuj pliki
git add . && git commit -m "Update content" && git push
```

---

## Porównanie rozwiązań

| Rozwiązanie | Czas setupu | Łatwość | UI | Cost |
|-------------|-------------|---------|-------|------|
| **Decap CMS** | 15 min | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | Free |
| **Sanity** | 4-6h | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | Free tier |
| **Własny admin** | 3-4h | ⭐⭐⭐ | ⭐⭐⭐ | Free |
| **GitHub Editor** | 0 min | ⭐⭐⭐⭐⭐ | ⭐⭐ | Free |

---

## Moja rekomendacja:

### Jeśli chcesz CMS TERAZ (15 minut):
→ **Decap CMS**

### Jeśli możesz poświęcić weekend:
→ **Sanity.io** (najlepszy długoterminowo)

### Jeśli chcesz pełną kontrolę:
→ **Własny admin** (mogę pomóc napisać)

### Jeśli nie potrzebujesz fancy UI:
→ **GitHub Web Editor** (działa od razu)

---

## Co powinienem teraz zrobić?

**Opcja 1: Decap CMS (polecam)**
```
Powiedz: "Zróbmy Decap CMS"
```

**Opcja 2: Usuń TinaCMS całkowicie**
```
Powiedz: "Usuń TinaCMS z projektu"
```

**Opcja 3: Prosty własny admin**
```
Powiedz: "Stwórz prosty admin z GitHub API"
```

**Opcja 4: Na razie edytuj przez GitHub**
```
Powiedz: "Pokażę jak edytować przez GitHub"
```

---

## Dlaczego TinaCMS nie zadziałał?

TinaCMS ma problemy z:
- Skomplikowana konfiguracja Cloud
- Wymaga perfekcyjnego setupu projektu
- Słaba dokumentacja dla custom setupów
- Problemy z routingiem i buildami
- Wymaga precyzyjnego setupu w ich Cloud dashboard

**To nie Twoja wina - TinaCMS jest po prostu trudny.**

