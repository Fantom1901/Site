import { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { Table as TableIcon, User, Image as ImageIcon, RotateCcw, HelpCircle } from "lucide-react";
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
  hotelHelper.accessor("price", { header: "Цена за сутки", cell: (info: any) => `${info.getValue()} руб.` })
];
export default function App() {
  const [currentPage, setCurrentPage] = useState<"table" | "resume" | "questions">("table");
  const [bgTarget, setBgTarget] = useState<"none" | "cell" | "table" | "body">("none");
  
  const imgCell = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80";
  const imgTable = "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80";
  const imgBody = "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80";
  const [logoSize, setLogoSize] = useState(120);
  const [logoBorderSize, setLogoBorderSize] = useState(4);
  const [logoAlign, setLogoAlign] = useState<"left" | "right">("left");
  const table = useReactTable({ data: hotelData, columns: hotelColumns, getCoreRowModel: getCoreRowModel() });
  const bodyStyle = bgTarget === "body" ? { backgroundImage: `url(${imgBody})`, backgroundSize: "cover", backgroundAttachment: "fixed" } : {};
  return (
    <div style={bodyStyle} className={`min-h-screen transition-all duration-300 ${bgTarget === "body" ? "" : "bg-slate-50 text-slate-800"} p-6`}>
      <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-slate-200/50">
        
        <header className="flex flex-wrap justify-between items-center border-b border-slate-200 pb-4 mb-6 gap-4">
          <div className="flex gap-3">
            <button title="Перейти к интерактивной таблице гостиниц" onClick={() => setCurrentPage("table")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentPage === "table" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              <TableIcon size={16}/> Таблица_Ветров.html
            </button>
            <button title="Открыть персональное резюме студента" onClick={() => setCurrentPage("resume")} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${currentPage === "resume" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              <User size={16}/> Резюме_Ветров.html
            </button>
          </div>
          <button title="Посмотреть ответы на контрольные вопросы" onClick={() => setCurrentPage("questions")} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all">
            <HelpCircle size={16}/> Контрольные вопросы
          </button>
        </header>
        {currentPage === "table" && (
          <div>
            <div className="mb-6 p-4 bg-slate-100 rounded-2xl">
              <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2"><ImageIcon size={16}/> Интерактор Задания 1</h3>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setBgTarget("none")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${bgTarget === "none" ? "bg-slate-800 text-white" : "bg-white border"}`}>Сбросить фоны</button>
                <button onClick={() => setBgTarget("cell")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${bgTarget === "cell" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Ячейка «Кедр»</button>
                <button onClick={() => setBgTarget("table")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${bgTarget === "table" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Вся таблица</button>
                <button onClick={() => setBgTarget("body")} className={`px-3 py-1.5 rounded-lg text-xs font-medium ${bgTarget === "body" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Весь документ</button>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Характеристики гостиниц</h2>
            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table style={bgTarget === "table" ? { backgroundImage: `url(${imgTable})`, backgroundSize: "cover", color: "white" } : {}} className="w-full border-collapse text-left text-sm">
                <thead className={`font-semibold ${bgTarget === "table" ? "bg-black/40 text-white" : "bg-slate-50 text-slate-700"} border-b border-slate-200`}>
                  {table.getHeaderGroups().map((hg) => (
                    <tr key={hg.id}>
                      {hg.headers.map((h) => <th key={h.id} className="p-4 border-b border-slate-200">{flexRender(h.column.columnDef.header, h.getContext())}</th>)}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className={`border-b border-slate-200 transition-colors ${bgTarget === "table" ? "hover:bg-white/10" : "hover:bg-slate-50/50"}`}>
                      {row.getVisibleCells().map((cell) => {
                        const id = cell.column.id; const orig = row.original;
                        const isTargetCell = id === "name" && orig.name === "«Кедр»" && orig.rowSpanName === 3;
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
          </div>
        )}
        {currentPage === "resume" && (
          <div>
            <div className="mb-6 p-4 bg-slate-100 rounded-2xl space-y-4">
              <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2"><ImageIcon size={16}/> Параметры логотипа</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 mb-1">Размер: {logoSize}px</label>
                  <input type="range" min="60" max="200" value={logoSize} onChange={(e) => setLogoSize(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Рамка: {logoBorderSize}px</label>
                  <input type="range" min="0" max="10" value={logoBorderSize} onChange={(e) => setLogoBorderSize(Number(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1">Обтекание:</label>
                  <div className="flex gap-2">
                    <button onClick={() => setLogoAlign("left")} className={`px-3 py-1 rounded-md ${logoAlign === "left" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Слева</button>
                    <button onClick={() => setLogoAlign("right")} className={`px-3 py-1 rounded-md ${logoAlign === "right" ? "bg-indigo-600 text-white" : "bg-white border"}`}>Справа</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b border-slate-100 pb-6 mb-6">
              <h2 className="text-3xl font-bold text-slate-900 mb-1">Резюме студента</h2>
              <p className="text-sm text-slate-400">Ветров Тимофей Сергеевич | Группа ИСИП-24-01-1</p>
            </div>
            <div className="clearfix text-sm text-slate-600 leading-relaxed space-y-4">
              <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80" alt="Логотип" title="Логотип разработчика" style={{ width: `${logoSize}px`, border: `${logoBorderSize}px solid #334155`, float: logoAlign, marginRight: logoAlign === "left" ? "16px" : "0", marginLeft: logoAlign === "right" ? "16px" : "0", marginBottom: "8px" }} className="rounded-xl shadow-md transition-all duration-200" />
              <p><b>Дата и место рождения:</b> 24 июня 2008 года, г. Красноярск.</p>
              <p><b>Образование:</b> Среднее профессиональное, специальность «Информационные системы и программирование».</p>
              <p><b>Технологический стек:</b> JavaScript (ES6+), TypeScript, React, TailwindCSS, Node.js, Git/GitHub, Linux.</p>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-200">
              <button onClick={() => setCurrentPage("table")} title="Вернуться назад" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"><RotateCcw size={16}/> Вернуться к таблице</button>
            </div>
          </div>
        )}
        {currentPage === "questions" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-800 mb-4 tracking-tight">Ответы на контрольные вопросы</h2>
            {[
              { q: "Как сделать изображение фоном для ячейки таблицы?", a: "Использовать атрибут background в теге ячейки: <td background=\"путь/к/файлу.jpg\">." },
              { q: "Как сделать изображение фоном для всей таблицы?", a: "Добавить этот же атрибут в тег таблицы: <table background=\"путь/к/файлу.jpg\">." },
              { q: "Как сделать изображение фоном для HTML-документа?", a: "Встроить атрибут в тег тела страницы: <body background=\"путь/к/файлу.jpg\">." },
              { q: "Какой тег является тегом-контейнером изображения?", a: "Одиночный тег <img>." },
              { q: "Как изменить размер изображения в HTML-документе?", a: "Через атрибуты width и height либо через CSS." },
              { q: "Какой тег является тегом-контейнером для вставки гиперссылок?", a: "Парный тег-контейнер <a>." },
              { q: "Что означает атрибут TITLE?", a: "Задает всплывающую текстовую подсказку при наведении мыши." }
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
