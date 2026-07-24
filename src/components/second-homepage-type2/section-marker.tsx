type Props = {
  index: string;
  label: string;
  coords?: string;
};

export function SectionMarker({ index, label, coords }: Props) {
  return (
    <div className="shp-marker shp-mono" aria-hidden>
      <span className="shp-marker-num">{index}</span>
      <span>{label}</span>
      {coords ? <span className="text-[var(--shp-line-strong)]">· {coords}</span> : null}
    </div>
  );
}
