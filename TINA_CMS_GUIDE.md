# Tina CMS Guide - nordAi Portfolio

## 🎉 Co to jest Tina CMS?

Tina CMS to wizualne narzędzie do zarządzania treścią na Twojej stronie, podobne do WordPressa, ale lepsze dla stron statycznych. Możesz edytować projekty portfolio i artykuły blogowe bez znajomości kodu!

---

## 🚀 Jak zacząć?

### 1. Uruchom serwer developerski

```bash
npm run dev
```

To polecenie uruchomi:
- Vite dev server na http://localhost:5173 (lub innym porcie)
- Tina CMS backend

### 2. Otwórz Panel Administracyjny

Przejdź do:
```
http://localhost:5173/admin
```

Zobaczysz interfejs Tina CMS z dostępem do Portfolio i Blog.

---

## 📝 Jak edytować Portfolio?

### Krok 1: Wejdź do panelu admin
1. Otwórz `http://localhost:5173/admin`
2. Z lewego menu wybierz **"Portfolio Projects"**

### Krok 2: Edytuj istniejący projekt
1. Kliknij na projekt z listy
2. Edytuj pola:
   - **Project Title** - Tytuł projektu
   - **Client Name** - Nazwa klienta
   - **Category** - Kategoria (AI, Web, Branding, Design)
   - **Tags** - Tagi (możesz dodać wiele)
   - **Short Description** - Krótki opis (1-2 zdania)
   - **Full Description** - Pełny opis projektu (rich text editor)
   - **Project Image** - Zdjęcie projektu
   - **Project URL** - Link do projektu
   - **SEO Title** - Tytuł dla Google (50-60 znaków)
   - **SEO Description** - Opis dla Google (150-160 znaków)
3. Kliknij **"Save"**

### Krok 3: Dodaj nowy projekt
1. Kliknij **"Create New"** w górnym prawym rogu
2. Wypełnij wszystkie pola
3. Kliknij **"Save"**

### Krok 4: Usuń projekt
1. Otwórz projekt
2. Kliknij **"Delete"** (ikona kosza)
3. Potwierdź usunięcie

---

## ✍️ Jak edytować Blog?

### Krok 1: Wejdź do panelu admin
1. Otwórz `http://localhost:5173/admin`
2. Z lewego menu wybierz **"Blog Articles"**

### Krok 2: Edytuj istniejący artykuł
1. Kliknij na artykuł z listy
2. Edytuj pola:
   - **Article Title** - Tytuł artykułu
   - **Short Description** - Krótki opis (1-2 zdania)
   - **Category** - Kategoria (AI, Automation, Design, Insights, Trends)
   - **Publication Date** - Data publikacji
   - **Reading Time** - Czas czytania w minutach
   - **Author** - Autor (domyślnie "nordAi Team")
   - **Article Image** - Zdjęcie artykułu
   - **Article Content** - Pełna treść (rich text editor z formatowaniem)
   - **SEO Title** - Tytuł dla Google
   - **SEO Description** - Opis dla Google
3. Kliknij **"Save"**

### Krok 3: Dodaj nowy artykuł
1. Kliknij **"Create New"**
2. Wypełnij wszystkie pola
3. Kliknij **"Save"**

### Krok 4: Usuń artykuł
1. Otwórz artykuł
2. Kliknij **"Delete"**
3. Potwierdź usunięcie

---

## 📸 Jak dodawać obrazy?

### Sposób 1: Przez Tina CMS (zalecany)
1. W polu "Image" kliknij **"Upload Image"**
2. Wybierz plik ze swojego komputera
3. Obraz zostanie automatycznie przesłany do `public/images/`

### Sposób 2: Manualnie
1. Skopiuj obraz do `public/images/`
2. W polu "Image" wpisz `/images/nazwa-pliku.jpg`

### Zalecane rozmiary obrazów:
- **Portfolio**: 1200x800px (16:9)
- **Blog**: 1200x750px (16:10)
- **Format**: JPG lub PNG
- **Rozmiar**: poniżej 500KB

---

## 🎨 Rich Text Editor - Formatowanie treści

Tina CMS ma wbudowany edytor WYSIWYG (What You See Is What You Get):

### Dostępne opcje:
- **Bold** - Pogrubienie (Ctrl+B)
- **Italic** - Kursywa (Ctrl+I)
- **Headings** - Nagłówki (H1, H2, H3)
- **Lists** - Listy punktowane i numerowane
- **Links** - Linki do innych stron
- **Images** - Wstawianie obrazów
- **Quotes** - Cytaty
- **Code blocks** - Bloki kodu

### Przykład użycia:
```
## Główny nagłówek

Paragraf tekstu z **pogrubieniem** i *kursywą*.

- Lista punkt 1
- Lista punkt 2

[Link do strony](https://example.com)
```

---

## 🔄 Jak to działa pod maską?

### Struktura plików:
```
content/
├── portfolio/          → Pliki projektów portfolio (MDX)
│   ├── fintech-automation.mdx
│   ├── ecommerce-redesign.mdx
│   └── ...
└── blog/              → Pliki artykułów blog (MDX)
    ├── future-of-ai-automation.mdx
    ├── design-systems-scale.mdx
    └── ...
```

### Co to jest MDX?
- MDX = Markdown + JSX
- Pliki tekstowe z metadanymi (frontmatter) na górze
- Łatwe do edycji przez Tina CMS
- Automatycznie parsowane przez stronę

### Przykład pliku MDX:
```mdx
---
title: Tytuł projektu
client: Nazwa klienta
category: ai
tags:
  - AI
  - Automation
excerpt: Krótki opis projektu
---

Tutaj jest pełna treść projektu w formacie Markdown.

## Nagłówek

Paragraf z **pogrubieniem**.
```

---

## ⚡ Najlepsze praktyki

### 1. SEO (optymalizacja dla Google)
- Zawsze wypełnij pola SEO Title i SEO Description
- SEO Title: 50-60 znaków
- SEO Description: 150-160 znaków
- Używaj słów kluczowych, ale naturalnie

### 2. Obrazy
- Kompresuj obrazy przed uploade (TinyPNG.com)
- Używaj opisowych nazw plików (np. `ai-automation-project.jpg`)
- Optymalne rozmiary: poniżej 500KB

### 3. Treść
- Krótkie paragrafy (2-3 zdania)
- Używaj nagłówków do struktury
- Dodawaj listy punktowe
- Wstawiaj linki do zewnętrznych źródeł

### 4. Tags (tagi)
- Używaj max 3-4 tagów na projekt
- Konsekwentne nazwy (np. zawsze "AI" zamiast "AI" i "Artificial Intelligence")

---

## 🐛 Rozwiązywanie problemów

### Problem: "Cannot connect to Tina CMS"
**Rozwiązanie:**
1. Upewnij się że serwer działa: `npm run dev`
2. Sprawdź czy port jest wolny
3. Odśwież stronę (Ctrl+R)

### Problem: "Changes not visible on website"
**Rozwiązanie:**
1. Sprawdź czy zapisałeś zmiany (przycisk "Save")
2. Odśwież stronę główną (Ctrl+Shift+R - hard refresh)
3. Sprawdź czy plik MDX został zaktualizowany w `content/`

### Problem: "Image not showing"
**Rozwiązanie:**
1. Sprawdź ścieżkę do obrazu (musi zaczynać się od `/`)
2. Upewnij się że obraz jest w `public/images/`
3. Sprawdź nazwę pliku (wielkość liter ma znaczenie!)

---

## 📚 Dodatkowe zasoby

### Dokumentacja Tina CMS:
- https://tina.io/docs/

### Markdown syntax:
- https://www.markdownguide.org/basic-syntax/

### Optymalizacja obrazów:
- https://tinypng.com/

---

## 🎯 Szybki Start (TL;DR)

1. **Uruchom**: `npm run dev`
2. **Otwórz admin**: http://localhost:5173/admin
3. **Wybierz**: Portfolio lub Blog z menu
4. **Edytuj**: Kliknij na element lub "Create New"
5. **Zapisz**: Kliknij "Save"
6. **Gotowe**: Zmiany widoczne od razu!

---

## 💡 Wskazówki

- **Auto-save**: Tina CMS automatycznie zapisuje wersje robocze
- **Preview**: Możesz zobaczyć podgląd przed zapisaniem
- **Undo/Redo**: Ctrl+Z / Ctrl+Shift+Z
- **Keyboard shortcuts**: Ctrl+S = Save

---

**Powodzenia z edycją! 🚀**

Jeśli masz pytania, sprawdź dokumentację Tina CMS lub skontaktuj się z developerem.
