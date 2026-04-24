import Svg, {
  Circle,
  Line,
  Path,
  Defs,
  RadialGradient,
  Stop,
  G,
  Text as SvgText,
} from "react-native-svg";
import { ZODIAC_PATHS } from "./ZodiacGlyph";

type Palette = {
  ringBg: string;
  ringStroke: string;
  houseStroke: string;
  planet: string;
  glyph: string;
  accent: string;
};

const SIGNS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

const DEFAULT_PLANETS = [
  { sym: "☉", deg: 24 },
  { sym: "☽", deg: 78 },
  { sym: "☿", deg: 112 },
  { sym: "♀", deg: 155 },
  { sym: "♂", deg: 203 },
  { sym: "♃", deg: 251 },
  { sym: "♄", deg: 298 },
  { sym: "♆", deg: 334 },
];

export function NatalChart({
  size = 240,
  palette,
  planets = DEFAULT_PLANETS,
}: {
  size?: number;
  palette: Palette;
  planets?: { sym: string; deg: number }[];
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 8;

  const polar = (deg: number, radius: number): [number, number] => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius];
  };

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient id="chart-bg" cx="50%" cy="50%">
          <Stop offset="0%" stopColor={palette.ringBg} stopOpacity="0" />
          <Stop offset="100%" stopColor={palette.ringBg} stopOpacity="0.5" />
        </RadialGradient>
      </Defs>

      <Circle cx={cx} cy={cy} r={r} fill="url(#chart-bg)" stroke={palette.ringStroke} strokeWidth={1} />
      <Circle cx={cx} cy={cy} r={r - 22} fill="none" stroke={palette.ringStroke} strokeWidth={0.5} />
      <Circle cx={cx} cy={cy} r={r - 60} fill="none" stroke={palette.houseStroke} strokeWidth={0.5} strokeDasharray="2 3" />
      <Circle cx={cx} cy={cy} r={8} fill={palette.accent} />
      <Circle cx={cx} cy={cy} r={20} fill="none" stroke={palette.accent} strokeWidth={0.7} strokeOpacity={0.5} />

      {Array.from({ length: 12 }).map((_, i) => {
        const [x1, y1] = polar(i * 30, r - 60);
        const [x2, y2] = polar(i * 30, r);
        return <Line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={palette.houseStroke} strokeWidth={0.5} />;
      })}

      {SIGNS.map((s, i) => {
        const [gx, gy] = polar(i * 30 + 15, r - 11);
        return (
          <G key={s} transform={`translate(${gx - 8} ${gy - 9})`}>
            <Svg width={16} height={18} viewBox="0 0 24 28">
              <Path
                d={ZODIAC_PATHS[s]}
                fill="none"
                stroke={palette.glyph}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </G>
        );
      })}

      {[
        [0, 3],
        [1, 5],
        [2, 6],
        [4, 7],
      ].map(([a, b], i) => {
        if (!planets[a] || !planets[b]) return null;
        const [x1, y1] = polar(planets[a].deg, r - 70);
        const [x2, y2] = polar(planets[b].deg, r - 70);
        return (
          <Line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={palette.accent}
            strokeOpacity={0.35}
            strokeWidth={0.7}
          />
        );
      })}

      {planets.map((p, i) => {
        const [px, py] = polar(p.deg, r - 70);
        return (
          <G key={i}>
            <Circle cx={px} cy={py} r={11} fill={palette.ringBg} stroke={palette.planet} strokeWidth={0.8} />
            <SvgText x={px} y={py + 4} textAnchor="middle" fontSize={12} fill={palette.planet}>
              {p.sym}
            </SvgText>
          </G>
        );
      })}
    </Svg>
  );
}
