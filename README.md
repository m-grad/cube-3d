# 3D Cube POC - Next.js + Three.js

Proof of Concept: Interaktywny model 3D z klikalnymi punktami w przestrzeni XYZ.

## 🚀 Start

Najpierw zainstaluj zależności:

```bash
npm install
```

Następnie uruchom serwer deweloperski:

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## 📋 Plan Implementacji

Zobacz szczegółowy plan w pliku [POC_PLAN.md](./POC_PLAN.md).

## 🔧 Stack Technologiczny

- **Next.js 14** - Framework aplikacji (App Router)
- **React 18** - UI library
- **Three.js** - Silnik 3D
- **React Three Fiber** - React renderer dla Three.js
- **Drei** - Komponenty pomocnicze dla R3F
- **TypeScript** - Type safety
- **Tailwind CSS** - Stylizacja

## 📁 Struktura Projektu

```
cube/
├── app/                 # Next.js App Router
│   ├── page.tsx         # Główna strona
│   ├── layout.tsx       # Layout aplikacji
│   └── globals.css      # Style globalne
├── components/          # Komponenty React
├── hooks/              # Custom React hooks
├── types/              # Definicje typów TypeScript
├── public/
│   └── models/         # Modele 3D
└── POC_PLAN.md         # Szczegółowy plan POC
```

## 📝 Status Implementacji

- [x] **Faza 1:** Setup Projektu ✅
- [x] **Faza 2:** Podstawowa Scena 3D ✅
- [x] **Faza 3:** Model 3D - Kostka ✅
- [x] **Faza 4:** Klikalne Punkty 3D ✅
- [x] **Faza 5:** Tooltips ✅
- [x] **Faza 6:** Integracja i Testowanie ✅

## 🎯 Co zostało zaimplementowane

### Model 3D Kostki
- Szklana kostka **8×8×8** jednostek
- Półprzezroczysta (95% transmission)
- Realistyczne odbicia światła (IOR 1.5)
- Centrum w pozycji [0, 4, 0]

### Interaktywne Punkty
- **10 punktów** wewnątrz budynku na różnych poziomach
- Rozmiar: 0.1 jednostki
- Jednolity niebieski kolor (#3b82f6)
- Subtelny hover effect (podświetlenie emissive)
- Klikalne z możliwością przypięcia tooltipa (2 sekundy)
- Rozmieszczone na 3 poziomach: parteru (Y=0-2), głównym (Y=4), górnym (Y=6-7)

### System Tooltipów
- HTML overlay poza Canvas 3D
- Konwersja współrzędnych 3D → 2D w czasie rzeczywistym
- Automatyczne unikanie brzegów ekranu
- Pokazują: nazwę, opis, pozycję XYZ, status przypięcia
- Śledzą punkty podczas obrotu sceny

### Interakcja
- **LPM + przeciągnięcie:** Obrót sceny
- **PPM + przeciągnięcie:** Przesunięcie (pan)
- **Scroll:** Zoom (2-20 jednostek)
- **Hover nad punktem:** Tooltip pojawia się automatycznie
- **Klik na punkt:** Przypina tooltip na 2 sekundy

