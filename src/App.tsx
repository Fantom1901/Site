import { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { Table, User, Link2, Mail, Image as ImageIcon, RotateCcw, HelpCircle, FileText } from "lucide-react";

// Данные таблицы гостиниц (из ЛР 8)
type HotelRow = { name: string; address: string; roomType: string; price: number; rowSpanName?: number; rowSpanAddress?: number; };
const hotelData: HotelRow[] = [
  { name: "«Кедр»", address: "ул. 60 лет ВЛКСМ, 5", roomType: "Одноместный", price: 300, rowSpanName: 3, rowSpanAddress: 3 },
  { name: "«Кедр»", address: "ул. 60 лет ВЛКСМ, 5", roomType: "Люкс одноместный", price: 400 },
  { name: "«Кедр»", address: "ул. 60 лет ВЛКСМ, 5", roomType: "Двухместный", price: 500 },
  { name: "«Созвездие медведицы»", address: "ул. Магистральная, 50", roomType: "Одноместный", price: 250, rowSpanName: 2, rowSpanAddress: 2 },
  { name: "«Созвездие медведицы»", address: "ул. Магистральная, 50", roomType: "Двухместный", price: 450 },
  { name: "«Виталина»", address: "5 микрорайон, 1 А", roomType: "Четырехместный", price: 600, rowSpanName: 1, rowSpanAddress: 1 }
];

const hotelHelper = createColumnHelper<HotelRow>();
const hotelColumns = [
  hotelHelper.accessor("name", { header: "Название" }),
  hotelHelper.accessor("address", { header: "Адрес" }),
  hotelHelper.accessor("roomType", { header: "Тип номера" }),
  hotelHelper.accessor("price", { header: "Цена за сутки", cell: info => `${info.getValue()} руб.` })
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<"table" | "resume" | "questions">("table");
  
  // Состояния для демонстрации Задания 1 (Фоны из папки Рисунки_сайт)
  const [bgTarget, setBgTarget] = useState<"none" | "cell" | "table" | "body">("none");
  
  // Ссылки на реальные качественные пейзажи (имитируем файлы в папке)
  const imgCell = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80"; // Море
  const imgTable = "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80"; // Лес
  const imgBody = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"; // Горы

  // Параметры для Задания 2 (Логотип и рамка)
  const [logoSize, setLogoSize] = useState(120);
  const [logoBorderSize, setLogoBorderSize] = useState(4);
  const [logoAlign, setLogoAlign] = useState<"left" | "right">("left");

  const table = useReactTable({ data: hotelData, columns: hotelColumns, getCoreRowModel: getCoreRowModel() });

  // Динамические стили для Body в зависимости от Задания 1
  const bodyStyle = bgTarget === "body" ? { backgroundImage: `url(${imgBody})`, backgroundSize: "cover", backgroundAttachment: "fixed" } : {};

  return (
    <div style={bodyStyle} className={`min-h-screen transition-all duration-300 ${bgTarget === "body" ? "" : "bg-slate-50 text-slate-800"} p-6`}>
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-200/50">
        
        {/* Шапка/Переключатель страниц (Задание 3 - Эмуляция гиперссылок) */}
        <header className="flex flex-wrap justify-between items-center border-b border-slate-200 pb-4 mb-6 gap-4">
          <div className="flex gap-3">
            <button 
              title="Перейти к интерактивной таблице гостиниц"
              onClick={() => setCurrentPage("table")} 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentPage === "table" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              <Table size={16}/> Таблица_Ветров.html
            </button>
            <button 
              title="Открыть персональное резюме студента"
              onClick={() => setCurrentPage("resume")} 
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentPage === "resume" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              <User size={16}/> Резюме_Ветров.html
            </button>
          </div>
          <button 
            title="Посмотреть ответы на контрольные вопросы"
            onClick={() => setCurrentPage("questions")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all`}
          >
            <HelpCircle size={16}/> Контрольные вопросы
          </button>
        </header>

        {/* СТРАНИЦА 1: ТАБЛИЦА ГОСТИНИЦ (Задание 1 и Часть Задания 3) */}
        {currentPage === "table" && (
          <div>
            <div className="mb-6 p-4 bg-slate-100 rounded-2xl">
              <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <ImageIcon size={16}/> Интерактор Задания 1: Управление атрибутом background
              </h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setBgTarget("none")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${bgTarget === "none" ? "bg-slate-800 text-white" : "bg-white border"}`}>Сбросить фоны</button>
                <button onClick={() => setBgTarget("cell")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${bgTarget === "cell" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Фон на ячейку «Кедр» (background="Рисунки_сайт/море.jpg")</button>
                <button onClick={() => setBgTarget("table")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${bgTarget === "table" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Фон на всю таблицу (background="Рисунки_сайт/лес.jpg")</button>
                <button onClick={() => setBgTarget("body")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${bgTarget === "body" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Фон на весь документ (background="Рисунки_сайт/горы.jpg")</button>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Характеристики гостиниц</h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table 
                style={bgTarget === "table" ? { backgroundImage: `url(${imgTable})`, backgroundSize: "cover", color: "white" } : {}}
                className="w-full border-collapse text-left text-sm"
              >
                <thead className={`font-semibold ${bgTarget === "table" ? "bg-black/40 text-white" : "bg-slate-50 text-slate-700"} border-b border-slate-200`}>
                  {table.getHeaderGroups().map(hg => (
                    <tr key={hg.id}>
                      {hg.headers.map(h => <th key={h.id} className="p-4 border-b border-slate-200">{flexRender(h.column.columnDef.header, h.getContext())}</th>)}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} className={`border-b border-slate-200 transition-colors ${bgTarget === "table" ? "hover:bg-white/10" : "hover:bg-slate-50/50"}`}>
                      {row.getVisibleCells().map(cell => {
                        const id = cell.column.id; const orig = row.original;
                        const isTargetCell = id === "name" && orig.name === "«Кедр»" && orig.rowSpanName === 3;

                        // Рендерим ячейку с фоном, если выбран режим "cell"
                        const cellStyle = (isTargetCell && bgTarget === "cell") ? { backgroundImage: `url(${imgCell})`, backgroundSize: "cover", color: "white" } : {};

                        if (id === "name") return orig.rowSpanName ? <td key={cell.id} rowSpan={orig.rowSpanName} style={cellStyle} className="p-4 font-bold align-top border-r border-slate-200">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td> : null;
                        if (id === "address") return orig.rowSpanAddress ? <td key={cell.id} rowSpan={orig.rowSpanAddress} className="p-4 align-top border-r border-slate-200">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td> : null;
                        return <td key={cell.id} className="p-4 border-r border-slate-200 last:border-r-0">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Задание 3: Блок под таблицей */}
            <div className="mt-8 pt-6 border-t border-slate-200 space-y-3">
              <p className="text-sm text-slate-600 flex items-center gap-2">
                Ответственный за размещение участников и гостей конференции: 
                <button 
                  onClick={() => setCurrentPage("resume")}
                  title="Посмотреть резюме ответственного лица Ветрова Т. А."
                  className="text-indigo-600 font-semibold underline hover:text-indigo-800 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  Ветров Тимофей <Link2 size={14}/>
                </button>
              </p>
              <p className="text-sm text-slate-600 flex items-center gap-2">
                Сообщите нам о нужном Вам номере по 
                <a 
                  href="mailto:adm@mail.ru" 
                  title="Написать письмо администратору системы бронирования"
                  className="text-emerald-600 font-semibold underline hover:text-emerald-800 transition-colors inline-flex items-center gap-1"
                >
                  e-mail <Mail size={14}/>
                </a>
              </p>
            </div>
          </div>
        )}

        {/* СТРАНИЦА 2: РЕЗЮМЕ СТУДЕНТА (Задание 2 и Самостоятельная работа) */}
        {currentPage === "resume" && (
          <div>
            {/* Панель управления параметрами логотипа для Задания 2 */}
            <div className="mb-6 p-4 bg-slate-100 rounded-2xl space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <ImageIcon size={16}/> Интерактор Задания 2: Свойства тега &lt;IMG&gt; (Логотип)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1">Размер логотипа: {logoSize}px</label>
                  <input type="range" min="60" max="200" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Толщина рамки: {logoBorderSize}px</label>
                  <input type="range" min="0" max="10" value={logoBorderSize} onChange={(e) => setLogoBorderSize(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Обтекание текста (Выравнивание):</label>
                  <div className="flex gap-2">
                    <button onClick={() => setLogoAlign("left")} className={`px-3 py-1 rounded-md ${logoAlign === "left" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Слева (align="left")</button>
                    <button onClick={() => setLogoAlign("right")} className={`px-3 py-1 rounded-md ${logoAlign === "right" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Справа (align="right")</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-slate-100 pb-6 mb-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-1">Резюме студента</h2>
              <p className="text-sm text-slate-400">Ветров Тимофей Алексеевич | Группа ИСИП-24-01-1</p>
            </div>

            {/* Контент резюме с логотипом */}
            <div className="clearfix text-sm text-slate-600 leading-relaxed space-y-4">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80" 
                alt="Логотип"
                title="Логотип разработчика / Атрибут TITLE"
                style={{ 
                  width: `${logoSize}px`, 
                  border: `${logoBorderSize}px solid #334155`,
                  float: logoAlign,
                  marginRight: logoAlign === "left" ? "16px" : "0",
                  marginLeft: logoAlign === "right" ? "16px" : "0",
                  marginBottom: "8px"
                }}
                className="rounded-xl shadow-md transition-all duration-200"
              />
              <p><b>Дата и место рождения:</b> 14 января 2006 года, г. Сургут.</p>
              <p><b>Образование:</b> Среднее профессиональное, специальность «Информационные системы и программирование». Углубленно изучаю архитектуру современных клиент-серверных веб-приложений, работу с реляционными базами данных, автоматизацию сборки через Webpack/Vite и тонкости декларативного UI-моделирования на базе стейт-менеджеров.</p>
              <p><b>Технологический стек:</b> JavaScript (ES6+), TypeScript, React, TailwindCSS, Node.js, Git/GitHub, утилиты контейнеризации и автоматического деплоя инфраструктуры.</p>
            </div>

            {/* Самостоятельная работа: Мои достижения */}
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/60 clear-both">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-indigo-500"/> Мои достижения (Самостоятельная работа)
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  📁 <a href="/docs/certificate_tanstack.docx" download title="Скачать документ Word: Сертификат об окончании курса TanStack Академии" className="text-indigo-600 font-medium hover:underline">
                    Сертификат_TanStack_Table.docx
                  </a> <span className="text-xs text-slate-400">(Документ Word)</span>
                </li>
                <li>
                  📊 <a href="/presentations/architecture_vite.pptx" download title="Скачать презентацию PowerPoint: Доклад о сборщиках фронтенда" className="text-indigo-600 font-medium hover:underline">
                    Презентация_Архитектура_Vite.pptx
                  </a> <span className="text-xs text-slate-400">(Презентация PowerPoint)</span>
                </li>
                <li>
                  🖼️ <a href="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80" target="_blank" title="Открыть скриншот архитектуры базы данных в высоком разрешении" className="text-indigo-600 font-medium hover:underline">
                    Схема_БД_Инфраструктуры_Отеля.png
                  </a> <span className="text-xs text-slate-400">(Изображение высокого разрешения)</span>
                </li>
              </ul>
            </div>

            {/* Кнопка возврата из Задания 3 */}
            <div className="mt-8 pt-4 border-t border-slate-200">
              <button 
                onClick={() => setCurrentPage("table")}
                title="Вернуться назад к просмотру таблицы гостиниц"
                className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
              >
                <RotateCcw size={16}/> Вернуться к таблице
              </button>
            </div>
          </div>
        )}

        {/* СТРАНИЦА 3: КОНТРОЛЬНЫЕ ВОПРОСЫ */}
        {currentPage === "questions" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Ответы на контрольные вопросы ЛР 9</h2>
            {[
              { q: "Как сделать изображение фоном для ячейки таблицы?", a: "Использовать атрибут background в теге ячейки: <td background=\"путь/к/файлу.jpg\">. В CSS: background-image: url(...)." },
              { q: "Как сделать изображение фоном для всей таблицы?", a: "Добавить этот же атрибут в тег таблицы: <table background=\"путь/к/файлу.jpg\">." },
              { q: "Как сделать изображение фоном для HTML-документа?", a: "Встроить атрибут в тег тела страницы: <body background=\"путь/к/файлу.jpg\">." },
              { q: "Какой тег является тегом-контейнером изображения?", a: "Тег <img> (он одиночный, не требует закрывающего тега)." },
              { q: "Как изменить размер изображения в HTML-документе?", a: "Через старые атрибуты width и height (в пикселях или процентах) либо через CSS-свойства (например, style=\"width: 150px;\")." },
              { q: "Какой тег является тегом-контейнером для вставки гиперссылок?", a: "Парный тег-контейнер <a> ... </a> (anchor)." },
              { q: "Что означает атрибут TITLE?", a: "Он задает всплывающую текстовую подсказку, которая отображается пользователю при наведении курсора мыши на данный элемент." }
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/40">
                <h4 className="font-semibold text-slate-900 mb-1">❓ {item.q}</h4>
                <p className="text-slate-600 text-sm ml-6">{item.a}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
