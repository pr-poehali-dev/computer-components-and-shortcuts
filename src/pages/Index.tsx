import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const CPU_IMG = "https://cdn.poehali.dev/projects/44eb744f-66d7-43d2-8039-dbf40eca5562/files/f35418f8-159a-43b6-94b1-866eb61a5068.jpg";
const GPU_IMG = "https://cdn.poehali.dev/projects/44eb744f-66d7-43d2-8039-dbf40eca5562/files/4f3c50ee-f85b-48c9-92eb-5b3a2f106855.jpg";
const MOBO_IMG = "https://cdn.poehali.dev/projects/44eb744f-66d7-43d2-8039-dbf40eca5562/files/6f8ebf31-f8fc-4b40-afec-f449ee0b7618.jpg";

interface Slide {
  id: number;
  title: string;
  subtitle?: string;
  type: "cover" | "component" | "facts" | "final";
  emoji?: string;
  image?: string;
  content?: string;
  specs?: { label: string; value: string }[];
  facts?: string[];
  color?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    type: "cover",
    title: "Комплектующие компьютера",
    subtitle: "Из чего состоит современный ПК?",
    emoji: "💻",
    color: "from-purple-900 via-violet-900 to-indigo-950",
  },
  {
    id: 2,
    type: "component",
    title: "Процессор (CPU)",
    subtitle: "Мозг компьютера",
    emoji: "🧠",
    image: CPU_IMG,
    content:
      "Процессор выполняет все вычисления — от запуска программ до игр. Чем быстрее процессор, тем быстрее работает компьютер.",
    specs: [
      { label: "Ядра", value: "4–24 ядра" },
      { label: "Частота", value: "до 6 ГГц" },
      { label: "Производители", value: "Intel, AMD" },
      { label: "Разъём", value: "LGA / AM5" },
    ],
    color: "from-violet-950 via-purple-900 to-indigo-950",
  },
  {
    id: 3,
    type: "component",
    title: "Видеокарта (GPU)",
    subtitle: "Отвечает за графику",
    emoji: "🎮",
    image: GPU_IMG,
    content:
      "Видеокарта обрабатывает изображение и выводит его на монитор. Нужна для игр, 3D-рендеринга и работы с видео.",
    specs: [
      { label: "Видеопамять", value: "4–24 ГБ" },
      { label: "Производители", value: "NVIDIA, AMD" },
      { label: "Разъём", value: "PCIe x16" },
      { label: "Потребление", value: "75–450 Вт" },
    ],
    color: "from-indigo-950 via-violet-900 to-purple-950",
  },
  {
    id: 4,
    type: "component",
    title: "Материнская плата",
    subtitle: "Основа системы",
    emoji: "🔌",
    image: MOBO_IMG,
    content:
      "Материнская плата объединяет все компоненты. Через неё процессор, память и все устройства общаются друг с другом.",
    specs: [
      { label: "Форм-фактор", value: "ATX / mATX / ITX" },
      { label: "Сокет", value: "LGA1700 / AM5" },
      { label: "Слоты RAM", value: "2–4 слота" },
      { label: "Разъёмы", value: "USB, M.2, PCIe" },
    ],
    color: "from-purple-950 via-violet-950 to-fuchsia-950",
  },
  {
    id: 5,
    type: "component",
    title: "Оперативная память (RAM)",
    subtitle: "Кратковременная память",
    emoji: "⚡",
    content:
      "RAM хранит данные программ, которые работают прямо сейчас. Больше RAM — больше приложений можно открыть одновременно.",
    specs: [
      { label: "Объём", value: "8–128 ГБ" },
      { label: "Тип", value: "DDR4 / DDR5" },
      { label: "Частота", value: "3200–7200 МГц" },
      { label: "Каналы", value: "2-канальная" },
    ],
    color: "from-violet-950 via-indigo-900 to-purple-950",
  },
  {
    id: 6,
    type: "component",
    title: "Накопители",
    subtitle: "Долговременное хранилище",
    emoji: "💾",
    content:
      "На накопителе хранятся файлы, операционная система и программы. SSD намного быстрее обычного жёсткого диска.",
    specs: [
      { label: "HDD", value: "медленный, дешёвый" },
      { label: "SSD SATA", value: "500 МБ/с" },
      { label: "SSD NVMe", value: "до 7000 МБ/с" },
      { label: "Объём", value: "256 ГБ — 4 ТБ" },
    ],
    color: "from-fuchsia-950 via-purple-900 to-violet-950",
  },
  {
    id: 7,
    type: "component",
    title: "Блок питания (PSU)",
    subtitle: "Сердце системы",
    emoji: "🔋",
    content:
      "Блок питания преобразует электричество из розетки в нужное для компонентов напряжение. От него зависит стабильность всего ПК.",
    specs: [
      { label: "Мощность", value: "450–1200 Вт" },
      { label: "Сертификат", value: "80+ Bronze/Gold" },
      { label: "Модульность", value: "модульный / нет" },
      { label: "Производители", value: "Seasonic, be quiet!" },
    ],
    color: "from-indigo-950 via-purple-950 to-violet-900",
  },
  {
    id: 8,
    type: "facts",
    title: "Интересные факты",
    subtitle: "Знаете ли вы?",
    emoji: "🚀",
    facts: [
      "Первый коммерческий процессор Intel 4004 (1971) работал на частоте 740 кГц — в 8000 раз медленнее современного смартфона",
      "В современном GPU может быть более 16 000 вычислительных ядер против 24 у лучших CPU",
      "SSD NVMe быстрее обычного HDD в 100 раз по скорости случайного чтения",
      "Тактовая частота процессоров перестала расти после 2004 года — производители перешли на многоядерность",
      "Самый мощный суперкомпьютер Frontier использует 9 408 процессоров AMD и 37 632 GPU",
    ],
    color: "from-purple-950 via-violet-900 to-indigo-950",
  },
  {
    id: 9,
    type: "final",
    title: "Спасибо за внимание!",
    subtitle: "Вопросы?",
    emoji: "🎓",
    color: "from-violet-900 via-purple-900 to-indigo-950",
  },
];

const TOTAL = slides.length;

export default function Index() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [slideKey, setSlideKey] = useState(0);

  const goTo = useCallback(
    (index: number, dir: "next" | "prev" = "next") => {
      if (animating || index === current) return;
      setDirection(dir);
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setSlideKey((k) => k + 1);
        setAnimating(false);
      }, 380);
    },
    [animating, current]
  );

  const next = useCallback(() => {
    if (current < TOTAL - 1) goTo(current + 1, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    if (current > 0) goTo(current - 1, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); next(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
      }
      if (e.key === "?" || e.key === "h" || e.key === "H") setShowHelp((v) => !v);
      if (e.key === "Escape") setShowHelp(false);
      const num = parseInt(e.key);
      if (!isNaN(num) && num >= 1 && num <= TOTAL) goTo(num - 1, num - 1 > current ? "next" : "prev");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev, goTo, current]);

  const slide = slides[current];
  const enterClass = direction === "next" ? "slide-enter" : "slide-enter-left";

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${slide.color} bg-mesh flex flex-col relative overflow-hidden`}
      style={{ transition: "background 0.7s ease" }}
    >
      {/* Декоративные блобы */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-violet-600/10 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Хедер */}
      <header className="relative z-10 flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-violet-600/30 border border-violet-500/40 flex items-center justify-center text-sm">
            💻
          </div>
          <span className="font-montserrat text-xs font-semibold text-violet-300/70 uppercase tracking-widest">
            Комплектующие ПК
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowHelp((v) => !v)}
            className="w-7 h-7 rounded-full border border-violet-500/30 bg-violet-900/30 flex items-center justify-center text-violet-400 hover:border-violet-400/60 hover:text-violet-200 transition-all text-xs font-bold"
            title="Горячие клавиши (H)"
          >
            ?
          </button>
          <span className="font-montserrat text-xs text-violet-400/60 tabular-nums">
            {current + 1} / {TOTAL}
          </span>
        </div>
      </header>

      {/* Прогресс-бар */}
      <div className="relative z-10 px-8">
        <div className="h-0.5 bg-violet-900/50 rounded-full overflow-hidden">
          <div
            className="h-full progress-bar rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((current + 1) / TOTAL) * 100}%` }}
          />
        </div>
        <div className="flex mt-1.5 gap-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              className={`flex-1 h-1 rounded-full transition-all duration-300 cursor-pointer ${
                i === current ? "bg-violet-400" : i < current ? "bg-violet-600/50" : "bg-violet-900/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Основной контент */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-8 py-6">
        <div key={slideKey} className={`w-full max-w-5xl ${animating ? "opacity-0" : enterClass}`}>
          {slide.type === "cover" && <CoverSlide slide={slide} />}
          {slide.type === "component" && <ComponentSlide slide={slide} />}
          {slide.type === "facts" && <FactsSlide slide={slide} />}
          {slide.type === "final" && <FinalSlide slide={slide} />}
        </div>
      </main>

      {/* Нижняя навигация */}
      <footer className="relative z-10 flex items-center justify-between px-8 py-4">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-500/30 bg-violet-900/20 text-violet-300 text-sm font-medium hover:border-violet-400/60 hover:bg-violet-800/30 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Icon name="ChevronLeft" size={16} />
          Назад
        </button>
        <div className="flex gap-1.5 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-6 h-2.5 bg-violet-400" : "w-2.5 h-2.5 bg-violet-700/50 hover:bg-violet-500/60"
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-violet-500/40 bg-violet-600/25 text-violet-200 text-sm font-medium hover:border-violet-400 hover:bg-violet-700/40 hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Вперёд
          <Icon name="ChevronRight" size={16} />
        </button>
      </footer>

      {/* Модалка горячих клавиш */}
      {showHelp && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowHelp(false)}
        >
          <div
            className="bg-violet-950/95 border border-violet-500/40 rounded-2xl p-8 max-w-sm w-full mx-4 shadow-2xl glow-violet"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-montserrat font-bold text-white text-lg">Горячие клавиши</h3>
              <button onClick={() => setShowHelp(false)} className="text-violet-400 hover:text-white transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { key: "→ / Пробел", desc: "Следующий слайд" },
                { key: "←", desc: "Предыдущий слайд" },
                { key: "1 — 9", desc: "Перейти на слайд" },
                { key: "F", desc: "Полный экран" },
                { key: "H / ?", desc: "Эта подсказка" },
                { key: "Esc", desc: "Закрыть" },
              ].map(({ key: k, desc }) => (
                <div key={k} className="flex items-center justify-between gap-4">
                  <kbd className="px-2.5 py-1 bg-violet-800/60 border border-violet-600/40 rounded-lg text-violet-200 text-xs font-mono whitespace-nowrap">
                    {k}
                  </kbd>
                  <span className="text-violet-300/80 text-sm">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CoverSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-8">
      <div className="animate-fade-up">
        <div className="text-8xl mb-6">{slide.emoji}</div>
        <h1 className="font-montserrat font-black text-5xl md:text-7xl text-white leading-tight glow-text">
          {slide.title}
        </h1>
      </div>
      <p className="animate-fade-up-delay-2 font-ibm text-xl md:text-2xl text-violet-300/80 max-w-xl">
        {slide.subtitle}
      </p>
      <div className="animate-fade-up-delay-3 flex flex-wrap gap-3 justify-center mt-4">
        {["CPU", "GPU", "RAM", "SSD", "PSU", "Материнская плата"].map((tag) => (
          <span
            key={tag}
            className="px-4 py-1.5 bg-violet-800/30 border border-violet-500/30 rounded-full text-violet-300 text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="animate-fade-up-delay-4 text-violet-500/40 text-xs mt-2">
        Нажмите → или Пробел для продолжения · H для горячих клавиш
      </p>
    </div>
  );
}

function ComponentSlide({ slide }: { slide: Slide }) {
  return (
    <div className="grid md:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <div className="animate-fade-up">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">{slide.emoji}</span>
            <span className="text-violet-400/60 text-sm font-medium uppercase tracking-widest font-ibm">
              {slide.subtitle}
            </span>
          </div>
          <h2 className="font-montserrat font-black text-4xl md:text-5xl text-white leading-tight glow-text">
            {slide.title}
          </h2>
        </div>
        <p className="animate-fade-up-delay-1 font-ibm text-violet-200/80 text-lg leading-relaxed">
          {slide.content}
        </p>
        {slide.specs && (
          <div className="animate-fade-up-delay-2 grid grid-cols-2 gap-3">
            {slide.specs.map((spec, i) => (
              <div
                key={i}
                className="bg-violet-900/30 border border-violet-500/20 rounded-xl p-3 hover:border-violet-400/40 transition-all"
              >
                <div className="text-violet-400/60 text-xs uppercase tracking-wide mb-1 font-ibm">{spec.label}</div>
                <div className="text-white font-semibold text-sm font-montserrat">{spec.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {slide.image ? (
        <div className="animate-fade-up-delay-1 relative">
          <div className="absolute inset-0 bg-violet-600/20 rounded-2xl blur-xl scale-90" />
          <img
            src={slide.image}
            alt={slide.title}
            className="relative w-full h-72 object-cover rounded-2xl border border-violet-500/30 glow-violet"
          />
        </div>
      ) : (
        <div className="animate-fade-up-delay-1 flex items-center justify-center">
          <div className="text-[9rem] opacity-80">{slide.emoji}</div>
        </div>
      )}
    </div>
  );
}

function FactsSlide({ slide }: { slide: Slide }) {
  return (
    <div className="space-y-6">
      <div className="animate-fade-up text-center mb-8">
        <span className="text-5xl">{slide.emoji}</span>
        <h2 className="font-montserrat font-black text-4xl text-white mt-3 glow-text">{slide.title}</h2>
        <p className="text-violet-400/70 mt-1 font-ibm">{slide.subtitle}</p>
      </div>
      <div className="space-y-3">
        {slide.facts?.map((fact, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 0.1}s` }}
            className="animate-fade-up flex gap-4 bg-violet-900/25 border border-violet-500/20 rounded-xl p-4 hover:border-violet-400/40 hover:bg-violet-900/35 transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-violet-600/40 border border-violet-500/40 flex items-center justify-center text-violet-300 text-sm font-bold font-montserrat flex-shrink-0 mt-0.5">
              {i + 1}
            </div>
            <p className="text-violet-100/90 text-sm leading-relaxed font-ibm">{fact}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FinalSlide({ slide }: { slide: Slide }) {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[60vh] gap-8">
      <div className="animate-fade-up">
        <div className="text-8xl mb-6">{slide.emoji}</div>
        <h2 className="font-montserrat font-black text-5xl md:text-7xl text-white leading-tight glow-text">
          {slide.title}
        </h2>
        <p className="text-violet-300/70 text-2xl mt-4 font-ibm">{slide.subtitle}</p>
      </div>
      <div className="animate-fade-up-delay-2 bg-violet-900/30 border border-violet-500/30 rounded-2xl p-6 max-w-lg glow-violet">
        <p className="text-violet-200/80 leading-relaxed font-ibm">
          Компьютер — это команда: каждый компонент важен. CPU думает, GPU рисует, RAM запоминает, накопитель хранит, а блок питания даёт всем энергию.
        </p>
      </div>
      <div className="animate-fade-up-delay-3 flex gap-3 flex-wrap justify-center">
        <span className="px-4 py-2 bg-violet-700/30 border border-violet-500/30 rounded-full text-violet-300 text-sm">Информатика</span>
        <span className="px-4 py-2 bg-violet-700/30 border border-violet-500/30 rounded-full text-violet-300 text-sm">Годовой проект</span>
        <span className="px-4 py-2 bg-violet-700/30 border border-violet-500/30 rounded-full text-violet-300 text-sm">2026 год</span>
      </div>
    </div>
  );
}
