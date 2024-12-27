export const nna = "ンナﾝﾅ";
export const getNnannaSyllabary = (): string[] => {
  const array = nna.split("").flatMap((c) => [c, c + c]);
  return Array.from({ length: 1 << array.length }, (_, n) =>
    array.map((c, i) => ((n & (1 << i)) === 0 ? c : "")).join("")
  );
};

export const nnannaSyllabary: string[] = getNnannaSyllabary();
export const annannSyllabary: Map<string, number> = new Map(
  nnannaSyllabary.map((n, i) => [n, i])
);

export function nnanna(input: string): string {
  const enc = new TextEncoder();
  return [...input]
    .map((c) => {
      return [...enc.encode(c)].map((n) => nnannaSyllabary[n]).join("ｯ");
    })
    .join("!");
}

export function annann(input: string): string {
  const dec = new TextDecoder();
  const chars = input.split("!");
  return chars
    .map((ch) =>
      dec.decode(
        new Uint8Array(ch.split("ｯ").map((c) => annannSyllabary.get(c)!))
      )
    )
    .join("");
}
