import { Flower } from "@/data/flowers";

interface FlowerSVGProps {
  flower: Flower;
  size?: number;
  className?: string;
}

export default function FlowerSVG({ flower, size = 80, className = "" }: FlowerSVGProps) {
  const c = flower.petals;
  const darken = (hex: string) => hex; // keep simple

  // Each flower gets a unique SVG shape based on id
  const renderPetals = () => {
    switch (flower.id) {
      case "red-rose":
        return (
          <>
            <circle cx="40" cy="32" r="12" fill={c} opacity="0.9" />
            <ellipse cx="30" cy="36" rx="10" ry="8" fill={c} opacity="0.8" />
            <ellipse cx="50" cy="36" rx="10" ry="8" fill={c} opacity="0.8" />
            <ellipse cx="36" cy="26" rx="8" ry="10" fill={c} opacity="0.7" />
            <ellipse cx="44" cy="26" rx="8" ry="10" fill={c} opacity="0.7" />
            <circle cx="40" cy="34" r="6" fill={c} />
          </>
        );
      case "pink-tulip":
        return (
          <>
            <ellipse cx="40" cy="30" rx="10" ry="16" fill={c} opacity="0.9" />
            <ellipse cx="34" cy="32" rx="8" ry="14" fill={c} opacity="0.7" />
            <ellipse cx="46" cy="32" rx="8" ry="14" fill={c} opacity="0.7" />
          </>
        );
      case "white-lily":
        return (
          <>
            {[0, 60, 120, 180, 240, 300].map((r) => (
              <ellipse key={r} cx="40" cy="24" rx="5" ry="14" fill="#FAFAF5" opacity="0.85"
                transform={`rotate(${r} 40 35)`} />
            ))}
            <circle cx="40" cy="35" r="4" fill="#FFD700" opacity="0.7" />
          </>
        );
      case "sunflower":
        return (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse key={i} cx="40" cy="22" rx="4" ry="11" fill="#FFD700" opacity="0.85"
                transform={`rotate(${i * 30} 40 35)`} />
            ))}
            <circle cx="40" cy="35" r="8" fill="#8B4513" />
          </>
        );
      case "lavender":
        return (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i}>
                <ellipse cx={37} cy={20 + i * 4} rx="4" ry="3" fill={c} opacity={0.9 - i * 0.07} />
                <ellipse cx={43} cy={22 + i * 4} rx="4" ry="3" fill={c} opacity={0.85 - i * 0.07} />
              </g>
            ))}
          </>
        );
      case "peony":
        return (
          <>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((r) => (
              <ellipse key={r} cx="40" cy="26" rx="7" ry="11" fill={c} opacity="0.7"
                transform={`rotate(${r} 40 35)`} />
            ))}
            <circle cx="40" cy="35" r="7" fill={c} />
          </>
        );
      case "daisy":
        return (
          <>
            {Array.from({ length: 10 }).map((_, i) => (
              <ellipse key={i} cx="40" cy="24" rx="4" ry="11" fill="white" opacity="0.9"
                transform={`rotate(${i * 36} 40 35)`} />
            ))}
            <circle cx="40" cy="35" r="6" fill="#FFD700" />
          </>
        );
      case "orchid":
        return (
          <>
            <ellipse cx="40" cy="28" rx="12" ry="8" fill={c} opacity="0.8" />
            <ellipse cx="35" cy="36" rx="8" ry="10" fill={c} opacity="0.7" />
            <ellipse cx="45" cy="36" rx="8" ry="10" fill={c} opacity="0.7" />
            <ellipse cx="40" cy="30" rx="5" ry="4" fill="white" opacity="0.5" />
          </>
        );
      case "chrysanthemum":
        return (
          <>
            {Array.from({ length: 16 }).map((_, i) => (
              <ellipse key={i} cx="40" cy="25" rx="3" ry="10" fill={c} opacity={0.8 - (i % 3) * 0.1}
                transform={`rotate(${i * 22.5} 40 35)`} />
            ))}
            <circle cx="40" cy="35" r="5" fill={c} />
          </>
        );
      case "carnation":
        return (
          <>
            {Array.from({ length: 12 }).map((_, i) => (
              <ellipse key={i} cx="40" cy="28" rx="6" ry="8" fill={c}
                opacity={0.6 + (i % 3) * 0.1}
                transform={`rotate(${i * 30} 40 34)`} />
            ))}
          </>
        );
      case "hydrangea":
        return (
          <>
            {[
              [32, 28], [40, 26], [48, 28],
              [28, 35], [36, 33], [44, 33], [52, 35],
              [32, 40], [40, 38], [48, 40],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="5" fill={c} opacity={0.7 + (i % 3) * 0.1} />
            ))}
          </>
        );
      case "cherry-blossom":
        return (
          <>
            {[0, 72, 144, 216, 288].map((r) => (
              <ellipse key={r} cx="40" cy="25" rx="6" ry="10" fill={c} opacity="0.8"
                transform={`rotate(${r} 40 35)`} />
            ))}
            <circle cx="40" cy="35" r="4" fill="#FFE4E1" />
            <circle cx="40" cy="35" r="2" fill="#FF69B4" opacity="0.6" />
          </>
        );
      default:
        return <circle cx="40" cy="35" r="12" fill={c} />;
    }
  };

  return (
    <svg
      viewBox="0 0 80 80"
      width={size}
      height={size}
      className={className}
      fill="none"
    >
      {/* Stem */}
      <line x1="40" y1="44" x2="40" y2="75" stroke="#2D5016" strokeWidth="2.5" strokeLinecap="round" />
      {/* Leaves */}
      <ellipse cx="34" cy="58" rx="6" ry="3" fill="#3A7D1E" opacity="0.7" transform="rotate(-30 34 58)" />
      <ellipse cx="46" cy="64" rx="6" ry="3" fill="#3A7D1E" opacity="0.7" transform="rotate(25 46 64)" />
      {/* Petals */}
      {renderPetals()}
    </svg>
  );
}
