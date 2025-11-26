# POC: Next.js + Three.js - Interaktywny Model 3D

## 🎯 Cel POC

Zweryfikować możliwość:
1. Wczytania modelu 3D (kostka) w Next.js z wykorzystaniem Three.js
2. Osadzenia klikalnych punktów w przestrzeni 3D (wg współrzędnych XYZ)
3. Wyświetlenia tooltipów przy interakcji z punktami
4. Sprawdzenia wydajności i użyteczności rozwiązania

## 📋 Zakres POC

### Faza 1: Setup Projektu (30 min) ✅
- [x] Inicjalizacja projektu Next.js 14 (App Router)
- [x] Instalacja zależności:
  - `three` - biblioteka 3D
  - `@react-three/fiber` - React renderer dla Three.js
  - `@react-three/drei` - pomocnicze komponenty dla R3F
  - `@types/three` - typy TypeScript
- [x] Konfiguracja TypeScript
- [x] Utworzenie podstawowej struktury folderów

### Faza 2: Podstawowa Scena 3D (45 min) ✅
- [x] Utworzenie komponentu `Scene3D`
- [x] Implementacja podstawowej sceny Three.js:
  - Kamera (PerspectiveCamera)
  - Oświetlenie (AmbientLight, DirectionalLight)
  - OrbitControls (możliwość obracania kamerą)
  - Grid helper (siatka pomocnicza)
- [x] Renderowanie w Next.js page

### Faza 3: Model 3D - Kostka (1h) ✅
- [x] Utworzenie geometrii kostki (BoxGeometry)
- [x] Dodanie materiału:
  - Opcja 1: Półprzezroczysty materiał (symulacja szkła) ✅
  - Opcja 2: Standardowy materiał z teksturą
- [x] Dodanie edgesów (krawędzie) dla lepszej widoczności
- [x] Testowanie rotacji i interakcji

### Faza 4: Klikalne Punkty 3D (1.5h) ✅
- [x] Utworzenie komponentu `InteractivePoint`
- [x] Implementacja punktów w przestrzeni 3D:
  - Geometria: małe sfery
  - Pozycjonowanie wg współrzędnych XYZ
  - Event handlers (onClick, onPointerOver, onPointerOut)
- [x] Dodanie efektów wizualnych:
  - Hover effect (subtelne podświetlenie)
  - Click effect (przypięcie tooltipa)
- [x] Testowanie kolizji i raycastingu

### Faza 5: Tooltips (1h) ✅
- [x] Implementacja systemu tooltipów:
  - Przekształcenie współrzędnych 3D → 2D (screen space)
  - Pozycjonowanie HTML tooltipa nad punktem
  - Obsługa pokazywania/ukrywania
- [x] Stylizacja tooltipów (CSS/Tailwind)
- [x] Testowanie na różnych rozdzielczościach
- [x] Obsługa edge cases (tooltip poza ekranem)

### Faza 6: Integracja i Testowanie (45 min)
- [ ] Dodanie przykładowych punktów na kostce:
  - Punkt na środku każdej ściany (6 punktów)
  - Punkt w każdym rogu (8 punktów)
- [ ] Testowanie interakcji:
  - Klikanie w punkty
  - Obrót sceny z aktywnymi tooltipami
  - Wydajność przy wielu punktach
- [ ] Optymalizacja renderowania

## 🏗️ Struktura Projektu

```
cube/
├── app/
│   ├── page.tsx              # Główna strona
│   ├── layout.tsx            # Layout aplikacji
│   └── globals.css           # Style globalne
├── components/
│   ├── Scene3D.tsx           # Główny komponent sceny
│   ├── CubeModel.tsx         # Model kostki
│   ├── InteractivePoint.tsx  # Klikalny punkt 3D
│   └── Tooltip.tsx           # Komponent tooltipu
├── hooks/
│   └── use3DToScreen.ts      # Hook do konwersji współrzędnych
├── types/
│   └── three.d.ts            # Typy TypeScript
├── public/
│   └── models/               # Folder na przyszłe modele 3D
├── package.json
├── tsconfig.json
└── POC_PLAN.md               # Ten plik
```

## 🔧 Stack Technologiczny

| Technologia | Wersja | Cel |
|-------------|--------|-----|
| Next.js | 14.x | Framework aplikacji |
| React | 18.x | UI library |
| Three.js | ^0.160.0 | Silnik 3D |
| @react-three/fiber | ^8.15.0 | React renderer dla Three.js |
| @react-three/drei | ^9.92.0 | Komponenty pomocnicze |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 3.x | Stylizacja |

## 📊 Kluczowe Zagadnienia do Przetestowania

### 1. System Współrzędnych
- **Pytanie:** Jak dokładnie pozycjonować punkty względem modelu?
- **Test:** Umieścić punkty w znanych pozycjach i zweryfikować ich lokalizację
- **Sukces:** Punkty pojawiają się dokładnie tam gdzie oczekiwane (np. środek ściany)

### 2. Raycasting i Klikanie
- **Pytanie:** Czy można niezawodnie wykrywać kliknięcia w małe punkty 3D?
- **Test:** Klikanie w punkty z różnych kątów kamery
- **Sukces:** >95% precyzji kliknięć, intuicyjna interakcja

### 3. Tooltips w Przestrzeni 3D
- **Pytanie:** Jak synchronizować pozycję 2D tooltipa z ruchem 3D sceny?
- **Test:** Obracanie sceny z otwartym tooltipem
- **Sukces:** Tooltip zawsze nad właściwym punktem, bez migotania

### 4. Wydajność
- **Pytanie:** Ile punktów możemy obsłużyć bez spadku wydajności?
- **Test:** Dodać 50-100 punktów i zmierzyć FPS
- **Sukces:** Utrzymanie 60 FPS przy obrocie sceny

### 5. Responsywność
- **Pytanie:** Czy rozwiązanie działa na różnych urządzeniach?
- **Test:**  w POC tylko desktop
- **Sukces:** Płynne działanie na desktop

## 🎨 Wizualizacja - Przykładowe Punkty na Kostce

```
Kostka 2x2x2 (jednostki Three.js)
Centrum w (0, 0, 0)

Punkty na ścianach:
- Przód:  (0, 0, 1)
- Tył:    (0, 0, -1)
- Góra:   (0, 1, 0)
- Dół:    (0, -1, 0)
- Prawo:  (1, 0, 0)
- Lewo:   (-1, 0, 0)

Punkty w rogach:
- ( 1,  1,  1)
- ( 1,  1, -1)
- ( 1, -1,  1)
- ( 1, -1, -1)
- (-1,  1,  1)
- (-1,  1, -1)
- (-1, -1,  1)
- (-1, -1, -1)
```

## ⚠️ Potencjalne Wyzwania

1. **Z-fighting** - Punkty mogą "przenikać" przez ścianę kostki
   - **Rozwiązanie:** Przesunąć punkty minimalnie od powierzchni

2. **Tooltip poza ekranem** - Przy skrajnych kątach kamery
   - **Rozwiązanie:** Wykrywanie brzegów i repozycjonowanie

3. **Performance** - Wiele punktów może obciążyć renderer
   - **Rozwiązanie:** Instanced meshes, LOD, frustum culling

4. **Responsive canvas** - Dopasowanie do różnych ekranów
   - **Rozwiązanie:** useEffect + resize observer

## 📈 Kryteria Sukcesu POC

✅ **Must Have:**
- [ ] Widoczna obracalna kostka 3D
- [ ] Min. 6 klikalnych punktów (po jednym na każdej ścianie)
- [ ] Tooltips wyświetlają się poprawnie przy hover/click
- [ ] Płynna animacja (min. 30 FPS)

✨ **Nice to Have:**
- [ ] Animacje punktów (pulsowanie)
- [ ] Różne typy tooltipów (informacyjne, akcyjne)
- [ ] Mobile touch support
- [ ] Podświetlanie ściany kostki przy hover nad punktem

## 🚀 Next Steps po POC

Po udanym POC, następne kroki to:
1. **Import modelu GLTF/GLB** - Zastąpienie kostki modelem budynku
2. **System warstw** - Grupowanie punktów według pięter/funkcji
3. **Panel sterowania** - UI do zarządzania widocznością punktów
4. **Dane dynamiczne** - Połączenie z API/bazą danych
5. **Zaawansowane tooltips** - Formularze, multimedia w tooltipach

## ⏱️ Szacowany Czas Realizacji

**Całkowity czas:** ~5-6 godzin

- Setup i konfiguracja: 30 min
- Podstawowa scena: 45 min
- Model kostki: 1h
- Klikalne punkty: 1.5h
- Tooltips: 1h
- Integracja i testy: 45 min
- Buffer na problemy: 30-45 min

## 📝 Notatki Implementacyjne

### Konwersja 3D → 2D dla Tooltipów

```typescript
// Pseudokod
function project3DToScreen(position: Vector3, camera: Camera) {
  const vector = position.clone().project(camera);
  const x = (vector.x * 0.5 + 0.5) * canvas.width;
  const y = (-vector.y * 0.5 + 0.5) * canvas.height;
  return { x, y };
}
```

### Event Handling w R3F

```typescript
<mesh onClick={(e) => handleClick(e)} onPointerOver={(e) => setHover(true)}>
  <sphereGeometry args={[0.1, 16, 16]} />
  <meshStandardMaterial color={hover ? "red" : "blue"} />
</mesh>
```

## 🔗 Przydatne Zasoby

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Helpers](https://github.com/pmndrs/drei)
- [Three.js Examples](https://threejs.org/examples/)
- [R3F Examples](https://docs.pmnd.rs/react-three-fiber/getting-started/examples)

---

**Status:** 📋 Plan gotowy do realizacji  
**Ostatnia aktualizacja:** 26 listopada 2025  
**Autor:** POC Planning

