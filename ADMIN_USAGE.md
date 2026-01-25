# 📖 Jak korzystać z Panelu Admin

## 🎯 Dlaczego nowe wpisy nie pokazują się na stronie głównej?

Strona główna pokazuje **TYLKO wpisy z zaznaczonym "Featured on Homepage"**.

### ✅ Jak to naprawić:

1. W panelu admin otwórz wpis (Edit)
2. Przejdź do zakładki **"🔍 SEO & Settings"**
3. Zaznacz checkbox **"⭐ Featured on Homepage"**
4. Kliknij **"💾 Save Changes"**
5. Gotowe! Wpis pojawi się na stronie głównej

**Uwaga:** Strona główna pokazuje maksymalnie 6 ostatnich featured postów.

---

## 📸 Jak uploadować obrazki?

### Metoda 1: Upload bezpośredni (POLECANE)

1. W edytorze przejdź do zakładki **"🖼️ Media & Gallery"**
2. Kliknij na pole **"📤 Click to upload image"**
3. Wybierz plik z dysku (max 5MB)
4. Poczekaj na upload (automatycznie zapisuje do GitHub)
5. Obrazek pojawi się w preview

**Jak to działa:**
- Obrazek jest uploadowany do `/public/images/` w repozytorium
- Automatycznie tworzony commit w GitHub
- URL jest generowany automatycznie (np. `/images/1234567890-nazwa.jpg`)
- Działa zarówno dla featured image jak i galerii

### Metoda 2: URL zewnętrzny

Możesz również użyć URL z zewnętrznego źródła:

1. Wklej URL obrazka w pole "Image URL"
2. Może być URL z Cloudinary, Imgur, itp.
3. Lub relatywny URL jeśli masz obrazek już w repo

---

## 🖼️ Gallery - Jak dodać wiele zdjęć?

1. Przejdź do zakładki **"🖼️ Media & Gallery"**
2. Scrolluj do sekcji **"Gallery"**
3. Kliknij **"📤 Upload image to gallery"** (lub użyj URL)
4. Powtórz dla każdego obrazka
5. Obrazki pojawią się w grid (2-3 kolumny)
6. Hover na obrazek → przycisk **"🗑️ Remove"** aby usunąć

**Galeria wyświetla się:**
- Na końcu każdego artykułu blogowego
- Na końcu każdego projektu portfolio
- W układzie responsive grid

---

## 🔍 SEO - Optymalizacja dla Google

W zakładce **"🔍 SEO & Settings"** możesz ustawić:

### SEO Title (max 60 znaków)
- Jeśli puste = używa głównego tytułu
- To co widać w wynikach Google
- Licznik pokazuje ile zostało znaków

### SEO Description (max 160 znaków)
- Jeśli puste = używa excerpt
- Opis pod tytułem w Google
- Ważne dla CTR (click-through rate)

### Live Preview
Na dole widoczny **"Search Engine Preview"** - dokładnie tak jak w Google!

---

## ✍️ Markdown Editor - Formatowanie tekstu

W zakładce **"📝 Content"** masz toolbar z przyciskami:

- **B** = pogrubienie (`**text**`)
- **I** = italic (`*text*`)
- **H2** = nagłówek 2
- **H3** = nagłówek 3
- **🔗 Link** = link (`[text](url)`)
- **🖼️ Image** = obrazek w tekście
- **• List** = lista punktowana
- **</>** = kod

**Tip:** Zaznacz tekst i kliknij przycisk - automatycznie dodaje formatowanie!

---

## 📝 Blog vs Portfolio - Różnice

### Blog Article:
- Ma datę publikacji
- Ma czas czytania (read time)
- Ma autora
- Sortowane chronologicznie

### Portfolio Project:
- Ma klienta (client)
- Ma tagi (multiple)
- Ma link do projektu
- Sortowane według featured

---

## 🚀 Workflow tworzenia nowego wpisu

1. **Admin panel** → Kliknij **"Create New Article/Project"**

2. **Zakładka Content:**
   - Wpisz tytuł (wymagane)
   - Wpisz excerpt (wymagane)
   - Wybierz kategorię
   - Wypełnij pola specyficzne (data/client/tags)
   - Napisz treść w Markdown

3. **Zakładka Media:**
   - Upload featured image
   - Opcjonalnie: dodaj gallery images

4. **Zakładka SEO:**
   - Ustaw SEO title i description
   - **ZAZNACZ "Featured on Homepage"** (jeśli chcesz na głównej!)
   - Sprawdź preview

5. **Save Changes** → Gotowe!

---

## ⚠️ Ważne informacje

### Limity:
- **Obrazki:** max 5MB każdy
- **Formaty:** JPG, PNG, GIF, WebP
- **Featured posts:** max 6 na stronie głównej

### Bezpieczeństwo:
- Tylko autoryzowani użytkownicy GitHub
- Lista w `/src/pages/Admin.tsx` → `AUTHORIZED_USERS`
- Wszystkie zmiany commitowane do GitHub (audit trail)

### Cache:
- Po zapisaniu może zająć 1-2 minuty rebuild (Vercel/Netlify)
- Po rebuildu wpis pojawi się natychmiast
- GitHub Pages może mieć 5-10 minut cache

---

## 🐛 Troubleshooting

### "Unauthorized user"
→ Twój GitHub username nie jest w `AUTHORIZED_USERS` lista

### Upload obrazka nie działa
→ Sprawdź czy masz token GitHub (zaloguj się ponownie)

### Wpis nie pokazuje się
→ Sprawdź czy "Featured on Homepage" jest zaznaczone

### Gallery nie wyświetla się
→ Upewnij się że dodałeś przynajmniej 1 obrazek

---

## 💡 Pro Tips

1. **Używaj upload obrazków zamiast URL** - wszystko w jednym repo
2. **Zawsze uzupełniaj SEO fields** - lepsze pozycje w Google
3. **Featured posts strategicznie** - tylko najlepsze na główną
4. **Gallery dla case studies** - pokaż proces/rezultaty
5. **Markdown toolbar** - szybsze formatowanie

---

Masz pytania? Zobacz plik `ADMIN_SETUP.md` lub `VERCEL_DEPLOY.md`! 🚀
