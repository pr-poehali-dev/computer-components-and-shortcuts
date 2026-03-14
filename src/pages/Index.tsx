import { useState, useEffect, useCallback } from "react";

const CPU_IMG = "https://cdn.poehali.dev/projects/44eb744f-66d7-43d2-8039-dbf40eca5562/files/f35418f8-159a-43b6-94b1-866eb61a5068.jpg";
const GPU_IMG = "https://cdn.poehali.dev/projects/44eb744f-66d7-43d2-8039-dbf40eca5562/files/4f3c50ee-f85b-48c9-92eb-5b3a2f106855.jpg";
const MOBO_IMG = "https://cdn.poehali.dev/projects/44eb744f-66d7-43d2-8039-dbf40eca5562/files/6f8ebf31-f8fc-4b40-afec-f449ee0b7618.jpg";

const slides = [
  {
    id: 1,
    title: "Комплектующие компьютера",
    subtitle: "Из чего состоит современный ПК",
    type: "cover",
  },
  {
    id: 2,
    title: "Что такое компьютер?",
    type: "text",
    body: "Компьютер — это электронное устройство, которое обрабатывает информацию. Он состоит из нескольких основных частей, каждая из которых выполняет свою задачу.\n\nВсе эти части вместе называются комплектующими или «железом» (hardware).",
    bullets: [
      "Процессор (CPU) — вычисления",
      "Видеокарта (GPU) — графика",
      "Оперативная память (RAM) — временное хранение",
      "Накопитель (HDD/SSD) — постоянное хранение",
      "Материнская плата — связь между всеми деталями",
      "Блок питания (PSU) — питание",
    ],
  },
  {
    id: 3,
    title: "Как всё устроено внутри",
    type: "scheme",
  },
  {
    id: 4,
    title: "Процессор (CPU)",
    subtitle: "Central Processing Unit — центральный процессор",
    type: "component",
    image: CPU_IMG,
    body: "Процессор — это главная микросхема компьютера. Он выполняет все вычисления: запускает программы, считает числа, обрабатывает команды пользователя.",
    bullets: [
      "Количество ядер: от 4 до 24 (и больше)",
      "Тактовая частота: до 6 ГГц",
      "Производители: Intel и AMD",
      "Устанавливается в сокет на материнской плате",
    ],
    note: "Чем больше ядер и частота — тем быстрее работает компьютер",
  },
  {
    id: 5,
    title: "Видеокарта (GPU)",
    subtitle: "Graphics Processing Unit — графический процессор",
    type: "component",
    image: GPU_IMG,
    body: "Видеокарта обрабатывает изображение и выводит картинку на монитор. Особенно важна для игр, работы с видео и трёхмерной графикой.",
    bullets: [
      "Объём видеопамяти: от 4 до 24 ГБ",
      "Производители: NVIDIA и AMD",
      "Подключается через разъём PCIe x16",
      "Потребляет от 75 до 450 Вт",
    ],
    note: "Без видеокарты изображение на экране не появится",
  },
  {
    id: 6,
    title: "Материнская плата",
    subtitle: "Motherboard — основа системы",
    type: "component",
    image: MOBO_IMG,
    body: "Материнская плата — это главная плата, к которой подключаются все остальные компоненты. Она обеспечивает их взаимодействие между собой.",
    bullets: [
      "Форм-факторы: ATX, mATX, mini-ITX",
      "Содержит сокет для процессора",
      "Имеет 2–4 слота для оперативной памяти",
      "Разъёмы: USB, M.2, PCIe, SATA",
    ],
    note: "Совместимость материнской платы и процессора очень важна",
  },
  {
    id: 7,
    title: "Оперативная память (RAM)",
    subtitle: "Random Access Memory — память с произвольным доступом",
    type: "component",
    body: "Оперативная память хранит данные программ, которые работают прямо сейчас. Когда компьютер выключают — всё из RAM стирается.",
    bullets: [
      "Объём: от 8 до 128 ГБ",
      "Современный тип: DDR4 и DDR5",
      "Тактовая частота: 3200–7200 МГц",
      "Работает парами для большей скорости",
    ],
    note: "8 ГБ — минимум для работы, 16 ГБ — комфортно для игр",
    emoji: "🟩",
  },
  {
    id: 8,
    title: "Накопители",
    subtitle: "HDD и SSD — где хранятся все файлы",
    type: "component",
    body: "Накопитель хранит операционную систему, программы и все файлы пользователя. В отличие от RAM, данные не удаляются при выключении.",
    bullets: [
      "HDD (жёсткий диск): дешевле, медленнее, громче",
      "SSD SATA: быстрее HDD в 3–5 раз",
      "SSD NVMe: до 7000 МБ/с — самый быстрый",
      "Объём: от 256 ГБ до нескольких ТБ",
    ],
    note: "Сегодня рекомендуется SSD — Windows запускается за 10–15 секунд",
    emoji: "💿",
  },
  {
    id: 9,
    title: "Блок питания (PSU)",
    subtitle: "Power Supply Unit — источник питания",
    type: "component",
    body: "Блок питания преобразует переменный ток из розетки (220В) в постоянный ток нужного напряжения для каждого компонента.",
    bullets: [
      "Мощность: от 450 до 1200 Вт",
      "Сертификат эффективности: 80+ Bronze, Gold, Platinum",
      "Бывает модульным (отстёгиваются лишние провода)",
      "От него зависит стабильность всей системы",
    ],
    note: "Экономить на блоке питания опасно — может сжечь другие компоненты",
    emoji: "🔌",
  },
  {
    id: 10,
    title: "Сравнение комплектующих",
    type: "table",
  },
  {
    id: 11,
    title: "Горячие клавиши компьютера",
    subtitle: "Полезные сочетания клавиш в Windows",
    type: "hotkeys",
  },
  {
    id: 12,
    title: "Интересные факты",
    type: "facts",
    facts: [
      "Первый процессор Intel 4004 (1971) работал на частоте 740 кГц — в 8 000 раз медленнее современного",
      "В одном GPU может быть более 16 000 вычислительных ядер, а в CPU — максимум 24",
      "SSD NVMe быстрее обычного жёсткого диска примерно в 100 раз",
      "После 2004 года частота процессоров почти не растёт — перешли на многоядерность",
      "Первый жёсткий диск IBM (1956) весил около тонны и хранил всего 5 МБ",
      "Суперкомпьютер Frontier работает на 37 000 графических процессорах AMD",
    ],
  },
  {
    id: 13,
    title: "Вывод",
    type: "final",
    body: "Компьютер — это сложная система, где каждый компонент выполняет свою роль. Все части работают вместе: процессор думает, видеокарта рисует, оперативная память запоминает, накопитель хранит, а блок питания даёт энергию всем.",
    bullets: [
      "Без процессора компьютер не может работать",
      "Без видеокарты — нет изображения",
      "Без RAM — программы не запустятся",
      "Без накопителя — некуда установить ОС",
      "Без блока питания — ничего не включится",
    ],
  },
];

const TOTAL = slides.length;

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slideKey, setSlideKey] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      if (animating || index === current) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setSlideKey((k) => k + 1);
        setAnimating(false);
      }, 200);
    },
    [animating, current]
  );

  const next = useCallback(() => { if (current < TOTAL - 1) goTo(current + 1); }, [current, goTo]);
  const prev = useCallback(() => { if (current > 0) goTo(current - 1); }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
      }
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= 9) goTo(num - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, goTo]);

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Слайд */}
      <div
        key={slideKey}
        className="bg-white w-full max-w-4xl rounded shadow-md overflow-hidden"
        style={{
          opacity: animating ? 0 : 1,
          transition: "opacity 0.2s ease",
          minHeight: 520,
        }}
      >
        {/* Фиолетовая шапка слайда */}
        <div className="bg-purple-700 px-10 py-6">
          <div className="text-white/60 text-xs mb-1 font-sans">
            Слайд {current + 1} из {TOTAL} · Комплектующие компьютера
          </div>
          <h1 className="text-white text-2xl font-bold leading-tight">{slide.title}</h1>
          {"subtitle" in slide && slide.subtitle && (
            <p className="text-purple-200 text-sm mt-1">{slide.subtitle as string}</p>
          )}
        </div>

        {/* Тело слайда */}
        <div className="px-10 py-8">
          {slide.type === "cover" && <CoverBody />}
          {slide.type === "text" && <TextBody slide={slide as { body: string; bullets: string[] }} />}
          {slide.type === "scheme" && <SchemeBody />}
          {slide.type === "component" && <ComponentBody slide={slide as { image?: string; body: string; bullets: string[]; note?: string; emoji?: string }} />}
          {slide.type === "table" && <TableBody />}
          {slide.type === "hotkeys" && <HotkeysBody />}
          {slide.type === "facts" && <FactsBody slide={slide as { facts: string[] }} />}
          {slide.type === "final" && <FinalBody slide={slide as { body: string; bullets: string[] }} />}
        </div>
      </div>

      {/* Навигация */}
      <div className="flex items-center gap-4 mt-5">
        <button
          onClick={prev}
          disabled={current === 0}
          className="px-5 py-2 bg-white border border-gray-300 rounded text-gray-700 text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          ← Назад
        </button>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-purple-700 w-5" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="px-5 py-2 bg-purple-700 text-white rounded text-sm hover:bg-purple-800 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
        >
          Вперёд →
        </button>
      </div>
      <p className="text-gray-400 text-xs mt-2">← → для навигации · F для полного экрана</p>
    </div>
  );
}

function CoverBody() {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center gap-6">
      <div className="text-6xl">💻</div>
      <div>
        <p className="text-gray-600 text-lg">Ученик 9 класса</p>
        <p className="text-gray-400 text-sm mt-1">Годовой проект по информатике · 2026 год</p>
      </div>
      <div className="border-t border-gray-100 pt-6 w-full max-w-md">
        <p className="text-gray-500 text-sm">В этой презентации рассматриваются основные комплектующие персонального компьютера, их назначение и характеристики.</p>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {["CPU", "GPU", "RAM", "SSD", "Материнская плата", "Блок питания"].map((t) => (
          <span key={t} className="px-3 py-1 bg-purple-50 border border-purple-200 text-purple-700 rounded text-sm">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function TextBody({ slide }: { slide: { body: string; bullets: string[] } }) {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-4">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">{slide.body}</p>
        <div>
          <p className="font-semibold text-gray-800 mb-2">Основные компоненты:</p>
          <ul className="space-y-2">
            {slide.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function SchemeBody() {
  const components = [
    { name: "Процессор\n(CPU)", color: "bg-purple-100 border-purple-400", pos: "col-start-2 row-start-1" },
    { name: "Видеокарта\n(GPU)", color: "bg-blue-100 border-blue-400", pos: "col-start-3 row-start-2" },
    { name: "Материнская\nплата", color: "bg-yellow-100 border-yellow-500", pos: "col-start-2 row-start-2", center: true },
    { name: "Оперативная\nпамять (RAM)", color: "bg-green-100 border-green-400", pos: "col-start-1 row-start-2" },
    { name: "Накопитель\n(SSD/HDD)", color: "bg-orange-100 border-orange-400", pos: "col-start-1 row-start-3" },
    { name: "Блок питания\n(PSU)", color: "bg-red-100 border-red-400", pos: "col-start-3 row-start-3" },
    { name: "Монитор", color: "bg-gray-100 border-gray-400", pos: "col-start-2 row-start-3" },
  ];

  return (
    <div>
      <p className="text-gray-600 text-sm mb-4">Все компоненты подключаются к материнской плате и взаимодействуют через неё:</p>
      <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: "repeat(3, auto)" }}>
        {components.map((c) => (
          <div
            key={c.name}
            className={`${c.pos} ${c.color} border-2 rounded p-3 text-center text-xs font-semibold text-gray-800 whitespace-pre-line ${c.center ? "ring-2 ring-yellow-400 ring-offset-1" : ""}`}
          >
            {c.name}
            {c.center && <div className="text-yellow-600 text-[10px] mt-1">← центральная →</div>}
          </div>
        ))}
      </div>
      <p className="text-gray-400 text-xs mt-3">* Стрелки символизируют соединения через разъёмы материнской платы</p>
    </div>
  );
}

function ComponentBody({ slide }: { slide: { image?: string; body: string; bullets: string[]; note?: string; emoji?: string } }) {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-4">
        <p className="text-gray-700 leading-relaxed">{slide.body}</p>
        <div>
          <p className="font-semibold text-gray-800 mb-2">Характеристики:</p>
          <ul className="space-y-1.5">
            {slide.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-purple-600 font-bold mt-0.5">•</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        {slide.note && (
          <div className="bg-purple-50 border-l-4 border-purple-500 px-4 py-2 rounded-r">
            <p className="text-purple-800 text-sm">💡 {slide.note}</p>
          </div>
        )}
      </div>
      {slide.image && (
        <div className="w-52 flex-shrink-0">
          <img src={slide.image} alt="" className="w-full h-40 object-cover rounded border border-gray-200" />
          <p className="text-gray-400 text-xs text-center mt-1">Фото компонента</p>
        </div>
      )}
      {!slide.image && slide.emoji && (
        <div className="w-40 flex-shrink-0 flex items-center justify-center text-7xl bg-gray-50 rounded border border-gray-200">
          {slide.emoji}
        </div>
      )}
    </div>
  );
}

function TableBody() {
  const rows = [
    { name: "Процессор (CPU)", role: "Вычисления", speed: "Очень высокая", price: "От 5 000 ₽" },
    { name: "Видеокарта (GPU)", role: "Графика", speed: "Высокая", price: "От 15 000 ₽" },
    { name: "Оперативная память", role: "Временное хранение", speed: "Очень высокая", price: "От 3 000 ₽" },
    { name: "SSD накопитель", role: "Постоянное хранение", speed: "Высокая", price: "От 2 500 ₽" },
    { name: "HDD накопитель", role: "Постоянное хранение", speed: "Низкая", price: "От 3 000 ₽" },
    { name: "Материнская плата", role: "Соединение деталей", speed: "—", price: "От 6 000 ₽" },
    { name: "Блок питания", role: "Питание компонентов", speed: "—", price: "От 3 000 ₽" },
  ];

  return (
    <div>
      <p className="text-gray-600 text-sm mb-4">Сравнение основных компонентов компьютера:</p>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-purple-700 text-white">
            <th className="text-left px-3 py-2 font-semibold">Компонент</th>
            <th className="text-left px-3 py-2 font-semibold">Роль</th>
            <th className="text-left px-3 py-2 font-semibold">Скорость</th>
            <th className="text-left px-3 py-2 font-semibold">Цена</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-3 py-2 font-medium text-gray-800 border-b border-gray-100">{r.name}</td>
              <td className="px-3 py-2 text-gray-600 border-b border-gray-100">{r.role}</td>
              <td className="px-3 py-2 text-gray-600 border-b border-gray-100">{r.speed}</td>
              <td className="px-3 py-2 text-gray-600 border-b border-gray-100">{r.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-gray-400 text-xs mt-2">* Цены ориентировочные, актуальны на начало 2026 года</p>
    </div>
  );
}

function HotkeysBody() {
  const groups = [
    {
      title: "Общие системные",
      keys: [
        { combo: "Ctrl + C", desc: "Копировать выделенное" },
        { combo: "Ctrl + V", desc: "Вставить" },
        { combo: "Ctrl + X", desc: "Вырезать" },
        { combo: "Ctrl + Z", desc: "Отменить действие" },
        { combo: "Ctrl + A", desc: "Выделить всё" },
        { combo: "Alt + F4", desc: "Закрыть программу" },
      ],
    },
    {
      title: "Windows и рабочий стол",
      keys: [
        { combo: "Win + D", desc: "Показать рабочий стол" },
        { combo: "Win + E", desc: "Открыть проводник" },
        { combo: "Win + L", desc: "Заблокировать экран" },
        { combo: "Win + R", desc: "Диалог «Выполнить»" },
        { combo: "Alt + Tab", desc: "Переключение окон" },
        { combo: "Ctrl + Shift + Esc", desc: "Диспетчер задач" },
      ],
    },
    {
      title: "Текст и документы",
      keys: [
        { combo: "Ctrl + S", desc: "Сохранить файл" },
        { combo: "Ctrl + P", desc: "Печать" },
        { combo: "Ctrl + F", desc: "Найти текст" },
        { combo: "Ctrl + B", desc: "Жирный текст" },
        { combo: "Ctrl + Home", desc: "В начало документа" },
        { combo: "F2", desc: "Переименовать файл" },
      ],
    },
  ];

  return (
    <div>
      <p className="text-gray-600 text-sm mb-4">Знание горячих клавиш ускоряет работу за компьютером в несколько раз:</p>
      <div className="grid grid-cols-3 gap-4">
        {groups.map((g) => (
          <div key={g.title}>
            <p className="font-semibold text-gray-800 text-xs mb-2 uppercase tracking-wide border-b border-purple-200 pb-1">
              {g.title}
            </p>
            <div className="space-y-1.5">
              {g.keys.map((k) => (
                <div key={k.combo} className="flex items-start gap-2">
                  <kbd className="bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5 text-xs font-mono text-gray-800 whitespace-nowrap flex-shrink-0">
                    {k.combo}
                  </kbd>
                  <span className="text-gray-600 text-xs leading-tight">{k.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FactsBody({ slide }: { slide: { facts: string[] } }) {
  return (
    <div className="space-y-3">
      <p className="text-gray-600 text-sm mb-2">Несколько удивительных фактов о компьютерах и их комплектующих:</p>
      {slide.facts.map((f, i) => (
        <div key={i} className="flex gap-3 bg-gray-50 border border-gray-200 rounded p-3">
          <span className="w-6 h-6 bg-purple-700 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
            {i + 1}
          </span>
          <p className="text-gray-700 text-sm leading-relaxed">{f}</p>
        </div>
      ))}
    </div>
  );
}

function FinalBody({ slide }: { slide: { body: string; bullets: string[] } }) {
  return (
    <div className="flex gap-8">
      <div className="flex-1 space-y-4">
        <p className="text-gray-700 leading-relaxed">{slide.body}</p>
        <div>
          <p className="font-semibold text-gray-800 mb-2">Главное, что нужно запомнить:</p>
          <ul className="space-y-1.5">
            {slide.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                <span className="text-purple-600 font-bold mt-0.5">✓</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded p-4 mt-4 text-center">
          <p className="font-bold text-purple-800 text-lg">Спасибо за внимание!</p>
          <p className="text-purple-600 text-sm mt-1">Годовой проект по информатике · 2026</p>
        </div>
      </div>
      <div className="flex-shrink-0 flex items-center justify-center w-32">
        <div className="text-6xl">🎓</div>
      </div>
    </div>
  );
}