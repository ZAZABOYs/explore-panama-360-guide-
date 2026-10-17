import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Clock, Ticket, MapPin, Camera, Lightbulb, Send, ImagePlus, X, Compass, Landmark } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { destinos, categorias, type Destino } from "@/lib/destinos";
import { preguntarAsistente } from "@/lib/asistente.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Explora Panamá — Guía de lugares turísticos, tours y mapas" },
      { name: "description", content: "Destinos turísticos de Panamá con historia, horarios, precios de tours, recomendaciones, ideas de fotos, mapas y un asistente de IA." },
      { property: "og:title", content: "Explora Panamá — Guía turística" },
      { property: "og:description", content: "Canal, Casco Antiguo, San Blas, Bocas del Toro, Boquete y más, con asistente de IA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [filtro, setFiltro] = useState<(typeof categorias)[number]>("Todos");
  const [mapaId, setMapaId] = useState("miraflores");
  const lista = useMemo(() => (filtro === "Todos" ? destinos : destinos.filter((d) => d.categoria === filtro)), [filtro]);
  const mapaDestino = destinos.find((d) => d.id === mapaId)!;

  return (
    <div className="min-h-screen">
      <header className="absolute inset-x-0 top-0 z-20">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 text-jungle-foreground">
          <a href="#" className="flex items-center gap-2 font-display text-xl font-semibold">
            <Compass className="h-5 w-5" /> Explora Panamá
          </a>
          <div className="hidden gap-6 text-sm font-medium md:flex">
            <a href="#destinos" className="hover:text-accent">Destinos</a>
            <a href="#mapa" className="hover:text-accent">Mapa</a>
            <a href="#consejos" className="hover:text-accent">Consejos</a>
            <a href="#asistente" className="hover:text-accent">Asistente IA</a>
          </div>
        </nav>
      </header>

      <section className="relative flex min-h-[88vh] items-end overflow-hidden">
        <img src={hero} alt="Skyline de Ciudad de Panamá desde la Cinta Costera" width={1920} height={1088} className="absolute inset-0 h-full w-full object-cover" />
        <div className="bg-hero-overlay absolute inset-0" />
        <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 text-jungle-foreground">
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-accent">Guía turística</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] md:text-7xl">Dos océanos, un solo país por descubrir.</h1>
          <p className="mt-5 max-w-xl text-lg opacity-90">Historia, horarios, precios de tours, ideas para fotos y cómo llegar a los lugares más bonitos de Panamá.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#destinos" className="rounded-full bg-accent px-6 py-3 font-semibold text-accent-foreground transition hover:brightness-110">Ver destinos</a>
            <a href="#asistente" className="rounded-full border border-jungle-foreground/50 px-6 py-3 font-semibold backdrop-blur transition hover:bg-jungle-foreground/10">Preguntar a la IA</a>
          </div>
        </div>
      </section>

      <section id="destinos" className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-semibold md:text-5xl">Lugares turísticos</h2>
            <p className="mt-2 text-muted-foreground">Toca una tarjeta para ver historia, tours y consejos.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categorias.map((c) => (
              <button key={c} onClick={() => setFiltro(c)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${filtro === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-sand"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {lista.map((d) => (
            <DestinoCard key={d.id} d={d} onMapa={() => { setMapaId(d.id); document.getElementById("mapa")?.scrollIntoView(); }} />
          ))}
        </div>
        <p className="mt-8 rounded-xl bg-sand px-4 py-3 text-sm text-secondary-foreground">
          Precios y horarios son orientativos (USD) y pueden cambiar según temporada y operador. Confírmalos antes de reservar.
        </p>
      </section>

      <section id="mapa" className="bg-jungle py-20 text-jungle-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-4xl font-semibold md:text-5xl">Cómo llegar</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {destinos.map((d) => (
              <button key={d.id} onClick={() => setMapaId(d.id)}
                className={`rounded-full px-4 py-2 text-sm transition ${mapaId === d.id ? "bg-accent text-accent-foreground" : "bg-jungle-foreground/10 hover:bg-jungle-foreground/20"}`}>
                {d.nombre.split(" – ")[0]}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_2fr]">
            <div className="rounded-2xl bg-jungle-foreground/10 p-6">
              <h3 className="text-2xl font-semibold">{mapaDestino.nombre}</h3>
              <p className="mt-1 text-sm opacity-80">{mapaDestino.provincia}</p>
              <p className="mt-4 leading-relaxed">{mapaDestino.comoLlegar}</p>
              <a target="_blank" rel="noreferrer"
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapaDestino.mapa)}`}
                className="mt-6 inline-flex rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground">
                Abrir ruta en Google Maps
              </a>
            </div>
            <iframe title={`Mapa de ${mapaDestino.nombre}`} loading="lazy" className="h-[380px] w-full rounded-2xl border-0"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapaDestino.mapa)}&output=embed`} />
          </div>
        </div>
      </section>

      <section id="consejos" className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-4xl font-semibold md:text-5xl">Antes de viajar</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Moneda", "Se usa el dólar estadounidense (USD) junto al Balboa en monedas."],
            ["Clima", "Seca de diciembre a abril; lluviosa de mayo a noviembre. Siempre hace calor."],
            ["Documentos", "Lleva pasaporte o cédula, sobre todo para San Blas y zonas comarcales."],
            ["Transporte", "Metro, Uber y taxis en la ciudad; buses desde la Terminal de Albrook al interior."],
          ].map(([t, x]) => (
            <div key={t} className="rounded-2xl border bg-card p-6 shadow-card">
              <h3 className="text-xl font-semibold text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{x}</p>
            </div>
          ))}
        </div>
      </section>

      <Asistente />

      <footer className="border-t py-10 text-center text-sm text-muted-foreground">
        Explora Panamá · Información orientativa para planificar tu viaje.
      </footer>
    </div>
  );
}

function DestinoCard({ d, onMapa }: { d: Destino; onMapa: () => void }) {
  const [abierto, setAbierto] = useState(false);
  return (
    <article className="overflow-hidden rounded-2xl border bg-card shadow-card">
      <div className="relative">
        <img src={d.imagen} alt={d.nombre} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover" />
        <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-xs font-semibold text-primary">{d.categoria}</span>
        <div className="bg-hero-overlay absolute inset-x-0 bottom-0 p-5 pt-16 text-jungle-foreground">
          <h3 className="text-2xl font-semibold">{d.nombre}</h3>
          <p className="text-sm opacity-90">{d.provincia}</p>
        </div>
      </div>
      <div className="p-6">
        <p className="text-muted-foreground">{d.resumen}</p>
        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex gap-2"><Clock className="h-4 w-4 shrink-0 text-primary" /><dd>{d.horario}</dd></div>
          <div className="flex gap-2"><Ticket className="h-4 w-4 shrink-0 text-primary" /><dd>{d.entrada}</dd></div>
        </dl>
        {abierto && (
          <div className="mt-6 space-y-5 text-sm">
            <Bloque icon={<Landmark className="h-4 w-4" />} titulo="Historia"><p className="leading-relaxed">{d.historia}</p></Bloque>
            <Bloque icon={<Ticket className="h-4 w-4" />} titulo="Tours y precios">
              <ul className="space-y-1">{d.tours.map((t) => (
                <li key={t.nombre} className="flex justify-between gap-4 border-b border-dashed pb-1"><span>{t.nombre}</span><span className="shrink-0 font-semibold text-primary">{t.precio}</span></li>
              ))}</ul>
            </Bloque>
            <Bloque icon={<Lightbulb className="h-4 w-4" />} titulo="Recomendaciones"><Lista items={d.recomendaciones} /></Bloque>
            <Bloque icon={<Camera className="h-4 w-4" />} titulo="Ideas para fotos"><Lista items={d.fotos} /></Bloque>
          </div>
        )}
        <div className="mt-6 flex flex-wrap gap-2">
          <button onClick={() => setAbierto(!abierto)} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">
            {abierto ? "Ver menos" : "Ver detalles"}
          </button>
          <button onClick={onMapa} className="inline-flex items-center gap-1 rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-secondary-foreground">
            <MapPin className="h-4 w-4" /> Cómo llegar
          </button>
        </div>
      </div>
    </article>
  );
}

function Bloque({ icon, titulo, children }: { icon: React.ReactNode; titulo: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 flex items-center gap-2 font-semibold text-accent-foreground"><span className="text-accent">{icon}</span>{titulo}</h4>
      {children}
    </div>
  );
}
function Lista({ items }: { items: string[] }) {
  return <ul className="list-disc space-y-1 pl-5 text-muted-foreground">{items.map((i) => <li key={i}>{i}</li>)}</ul>;
}

type Msg = { role: "user" | "assistant"; text: string; image?: string | undefined };

function Asistente() {
  const preguntar = useServerFn(preguntarAsistente);
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "assistant", text: "¡Hola! Soy tu guía de Panamá. Pregúntame lo que quieras o sube una foto de un lugar y te cuento sobre él." },
  ]);
  const [texto, setTexto] = useState("");
  const [foto, setFoto] = useState<string>();
  const [cargando, setCargando] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const elegirFoto = (f?: File) => {
    if (!f) return;
    if (f.size > 5_000_000) return alert("La foto debe pesar menos de 5 MB.");
    const r = new FileReader();
    r.onload = () => setFoto(r.result as string);
    r.readAsDataURL(f);
  };

  const enviar = async (preset?: string) => {
    const t = (preset ?? texto).trim();
    if ((!t && !foto) || cargando) return;
    const nuevo: Msg = { role: "user", text: t, image: foto };
    const historial = [...msgs, nuevo];
    setMsgs(historial); setTexto(""); setFoto(undefined); setCargando(true);
    try {
      const payload = historial.slice(1).slice(-10).map((m, i, arr) => ({ ...m, image: i === arr.length - 1 ? m.image : undefined }));
      const { reply } = await preguntar({ data: { messages: payload } });
      setMsgs((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", text: "Hubo un problema. Intenta de nuevo." }]);
    } finally { setCargando(false); }
  };

  return (
    <section id="asistente" className="bg-sand py-20">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="text-4xl font-semibold md:text-5xl">Asistente turístico con IA</h2>
        <p className="mt-2 text-muted-foreground">Pregunta por lugares, precios o qué llevar. También puedes subir una foto.</p>
        <div className="mt-8 overflow-hidden rounded-2xl border bg-card shadow-card">
          <div className="max-h-[460px] space-y-4 overflow-y-auto p-5">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}>
                  {m.image && <img src={m.image} alt="Foto enviada" className="mb-2 max-h-48 rounded-lg" />}
                  {m.text.replace(/\*\*/g, "")}
                </div>
              </div>
            ))}
            {cargando && <div className="text-sm text-muted-foreground">El guía está escribiendo…</div>}
          </div>
          <div className="flex flex-wrap gap-2 border-t px-5 py-3">
            {["¿Qué llevo para San Blas?", "¿Qué fotografiar en Miraflores?", "Itinerario de 3 días"].map((s) => (
              <button key={s} onClick={() => enviar(s)} className="rounded-full bg-secondary px-3 py-1.5 text-xs text-secondary-foreground hover:bg-sand">{s}</button>
            ))}
          </div>
          {foto && (
            <div className="flex items-center gap-3 px-5 pb-2">
              <img src={foto} alt="Vista previa" className="h-14 w-14 rounded-lg object-cover" />
              <button onClick={() => setFoto(undefined)} aria-label="Quitar foto" className="rounded-full bg-muted p-1"><X className="h-4 w-4" /></button>
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); enviar(); }} className="flex items-center gap-2 border-t p-3">
            <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={(e) => { elegirFoto(e.target.files?.[0]); e.target.value = ""; }} />
            <button type="button" onClick={() => fileRef.current?.click()} aria-label="Subir foto" className="rounded-full bg-secondary p-3 text-secondary-foreground"><ImagePlus className="h-5 w-5" /></button>
            <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escribe tu pregunta…" className="flex-1 rounded-full border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <button type="submit" disabled={cargando} aria-label="Enviar" className="rounded-full bg-accent p-3 text-accent-foreground disabled:opacity-50"><Send className="h-5 w-5" /></button>
          </form>
        </div>
      </div>
    </section>
  );
}
