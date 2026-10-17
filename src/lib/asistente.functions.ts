import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        text: z.string().max(4000),
        image: z.string().max(8_000_000).optional(),
      }),
    )
    .min(1)
    .max(20),
});

const SYSTEM = `Eres "Guía Panamá", un asistente turístico experto en Panamá. Responde en español, de forma breve, cálida y práctica (máx. 180 palabras, usa viñetas cuando ayude).
- Si el usuario envía una foto, identifica el lugar o elementos visibles, cuenta datos e historia, y da recomendaciones e ideas de fotos.
- Precios, horarios y requisitos son orientativos: indica siempre que se confirmen con operadores u oficinas oficiales. No inventes datos exactos si no estás seguro.
- Si la pregunta no es sobre turismo o viajes, redirige amablemente.`;

export const preguntarAsistente = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("El asistente no está configurado.");

    const messages = [
      { role: "system", content: SYSTEM },
      ...data.messages.map((m) =>
        m.image && m.role === "user"
          ? {
              role: "user",
              content: [
                { type: "text", text: m.text || "¿Qué lugar es este y qué me recomiendas?" },
                { type: "image_url", image_url: { url: m.image } },
              ],
            }
          : { role: m.role, content: m.text },
      ),
    ];

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages }),
    });
    if (res.status === 429) return { reply: "Hay muchas consultas ahora mismo. Intenta en un momento." };
    if (res.status === 402) return { reply: "El asistente se quedó sin créditos temporalmente." };
    if (!res.ok) {
      console.error("AI error", res.status, await res.text());
      return { reply: "No pude responder ahora. Intenta de nuevo." };
    }
    const json = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    return { reply: json.choices?.[0]?.message?.content ?? "Sin respuesta." };
  });
