export const HERO_SEQUENCE_FRAMES = 97;
export const HERO_SEQUENCE_DURATION = 4.09;
/** Native aspect ratio of the cropped DaVinci hero reel. */
export const HERO_SEQUENCE_ASPECT_RATIO = "744 / 580";

const frameCache = new Map<number, HTMLImageElement>();
const loadingFrames = new Set<number>();

export function getFrameSrc(index: number) {
  const clamped = Math.min(
    HERO_SEQUENCE_FRAMES - 1,
    Math.max(0, Math.round(index)),
  );
  return `/hero-sequence/frame_${String(clamped + 1).padStart(4, "0")}.webp`;
}

export function getCachedFrame(index: number) {
  return frameCache.get(index);
}

export function loadSequenceFrame(index: number): Promise<HTMLImageElement | null> {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (index < 0 || index >= HERO_SEQUENCE_FRAMES) return Promise.resolve(null);

  const cached = frameCache.get(index);
  if (cached) return Promise.resolve(cached);

  if (loadingFrames.has(index)) {
    return new Promise((resolve) => {
      const poll = () => {
        const ready = frameCache.get(index);
        if (ready) {
          resolve(ready);
          return;
        }
        if (!loadingFrames.has(index)) {
          resolve(null);
          return;
        }
        requestAnimationFrame(poll);
      };
      poll();
    });
  }

  loadingFrames.add(index);

  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.src = getFrameSrc(index);
    image.onload = () => {
      loadingFrames.delete(index);
      frameCache.set(index, image);
      resolve(image);
    };
    image.onerror = () => {
      loadingFrames.delete(index);
      resolve(null);
    };
  });
}

export function preloadSequenceRange(from = 0, to = HERO_SEQUENCE_FRAMES - 1) {
  for (let index = from; index <= to; index += 1) {
    void loadSequenceFrame(index);
  }
}

export function progressToFrame(progress: number) {
  return Math.min(
    HERO_SEQUENCE_FRAMES - 1,
    Math.max(0, Math.round(progress * (HERO_SEQUENCE_FRAMES - 1))),
  );
}
