// primitives.jsx — shared starfield, zodiac glyphs, chart svgs

// Deterministic RNG so star positions are stable
function seededRand(seed) {
  let s = seed;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
}

// Zodiac glyphs as inline SVG paths (simple original strokes, not brand)
const ZODIAC = {
  aries:   'M5 18c1-6 4-10 7-10s6 4 7 10 M9 8c0-2 1.2-3 3-3s3 1 3 3',
  taurus:  'M12 13a5 5 0 1 0 0 10 5 5 0 0 0 0-10z M5 5c2 2 4 5 7 5s5-3 7-5',
  gemini:  'M7 5h10 M7 23h10 M9 5v18 M15 5v18',
  cancer:  'M5 9c3-3 7-3 10 0 M19 19c-3 3-7 3-10 0 M7 9a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z M17 19a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z',
  leo:     'M8 21c-3 0-5-2-5-5s2-5 5-5 5 2 5 5c0 4-2 8-2 8 M13 16c1-6 4-9 7-9 M20 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z',
  virgo:   'M5 23V8c0-2 1-3 2-3s2 1 2 3v15 M9 23V8c0-2 1-3 2-3s2 1 2 3v15 M13 23V8c0-2 1-3 2-3s2 1 2 3c0 6-2 10-4 12 1 2 4 3 7 2',
  libra:   'M4 22h18 M7 19h12 M12 19c0-6-5-8-5-12a5 5 0 1 1 10 0c0 4-5 6-5 12z',
  scorpio: 'M3 10v8c0 2 1 3 2 3s2-1 2-3V10 M7 10v8c0 2 1 3 2 3s2-1 2-3V10 M11 10v8c0 2 1 3 2 3s2-1 2-3v-3c0-3 2-5 5-5l-3-2 M20 5l2 3-3 2',
  sagittarius: 'M4 22L20 6 M14 6h6v6 M5 13l4 4',
  capricorn:'M3 8c1 5 3 10 5 12 2-2 2-5 0-7 M8 8v9c0 3 2 5 5 5s5-2 5-5a4 4 0 1 0-4-4',
  aquarius:'M3 10c2-2 4-2 6 0s4 2 6 0 4-2 6 0 M3 16c2-2 4-2 6 0s4 2 6 0 4-2 6 0',
  pisces:  'M5 6c5 3 5 13 0 18 M19 6c-5 3-5 13 0 18 M6 12h12',
};

function ZodiacGlyph({ sign, size = 24, color = 'currentColor', stroke = 1.5 }) {
  const d = ZODIAC[sign] || ZODIAC.leo;
  return (
    <svg width={size} height={size} viewBox="0 0 24 28" style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// Full starfield layer
function Starfield({ count = 80, seed = 1, color = '#fff', twinkle = true }) {
  const rand = React.useMemo(() => {
    const r = seededRand(seed);
    return Array.from({ length: count }, () => ({
      x: r() * 100, y: r() * 100, s: r() * 2 + 0.4,
      o: r() * 0.7 + 0.3, d: r() * 4 + 2, delay: r() * 4,
    }));
  }, [count, seed]);
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {rand.map((st, i) => (
        <div key={i} style={{
          position: 'absolute', left: st.x + '%', top: st.y + '%',
          width: st.s, height: st.s, borderRadius: '50%',
          background: color, opacity: st.o,
          animation: twinkle ? `kz-twinkle ${st.d}s ease-in-out ${st.delay}s infinite` : 'none',
        }}/>
      ))}
    </div>
  );
}

// Shooting star (faint diagonal streak, single decorative element)
function ShootingStar({ top = '20%', left = '10%', angle = 35, length = 80, color = '#fff' }) {
  return (
    <div style={{
      position: 'absolute', top, left, width: length, height: 1,
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      transform: `rotate(${angle}deg)`, opacity: 0.6, pointerEvents: 'none',
    }}/>
  );
}

// Natal chart wheel — houses and zodiac ring
function NatalChart({ size = 260, palette }) {
  const cx = size / 2, cy = size / 2, r = size / 2 - 8;
  const signs = ['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'];
  const { ringBg, ringStroke, houseStroke, planet, glyph, accent } = palette;
  // planet positions (fixed, for visual)
  const planets = [
    { sym: '☉', deg: 24, label: 'Güneş' },
    { sym: '☽', deg: 78, label: 'Ay' },
    { sym: '☿', deg: 112, label: 'Merkür' },
    { sym: '♀', deg: 155, label: 'Venüs' },
    { sym: '♂', deg: 203, label: 'Mars' },
    { sym: '♃', deg: 251, label: 'Jüpiter' },
    { sym: '♄', deg: 298, label: 'Satürn' },
    { sym: '♆', deg: 334, label: 'Neptün' },
  ];
  const polar = (deg, radius) => {
    const a = (deg - 90) * Math.PI / 180;
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius];
  };
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <defs>
        <radialGradient id="chart-bg" cx="50%" cy="50%">
          <stop offset="0%" stopColor={ringBg} stopOpacity="0"/>
          <stop offset="100%" stopColor={ringBg} stopOpacity="0.5"/>
        </radialGradient>
      </defs>
      {/* outer ring */}
      <circle cx={cx} cy={cy} r={r} fill="url(#chart-bg)" stroke={ringStroke} strokeWidth="1"/>
      <circle cx={cx} cy={cy} r={r - 22} fill="none" stroke={ringStroke} strokeWidth="0.5"/>
      <circle cx={cx} cy={cy} r={r - 60} fill="none" stroke={houseStroke} strokeWidth="0.5" strokeDasharray="2 3"/>
      <circle cx={cx} cy={cy} r={8} fill={accent}/>
      <circle cx={cx} cy={cy} r={20} fill="none" stroke={accent} strokeWidth="0.7" strokeOpacity="0.5"/>
      {/* 12 house lines */}
      {Array.from({ length: 12 }).map((_, i) => {
        const [x1, y1] = polar(i * 30, r - 60);
        const [x2, y2] = polar(i * 30, r);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={houseStroke} strokeWidth="0.5"/>;
      })}
      {/* 12 zodiac glyphs on ring */}
      {signs.map((s, i) => {
        const [gx, gy] = polar(i * 30 + 15, r - 11);
        return (
          <g key={s} transform={`translate(${gx - 8} ${gy - 9})`}>
            <svg width="16" height="18" viewBox="0 0 24 28">
              <path d={ZODIAC[s]} fill="none" stroke={glyph} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </g>
        );
      })}
      {/* aspect lines */}
      {[[0,3],[1,5],[2,6],[4,7]].map(([a, b], i) => {
        const [x1, y1] = polar(planets[a].deg, r - 70);
        const [x2, y2] = polar(planets[b].deg, r - 70);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={accent} strokeOpacity="0.35" strokeWidth="0.7"/>;
      })}
      {/* planets */}
      {planets.map((p, i) => {
        const [px, py] = polar(p.deg, r - 70);
        return (
          <g key={i}>
            <circle cx={px} cy={py} r={11} fill={ringBg} stroke={planet} strokeWidth="0.8"/>
            <text x={px} y={py + 4} textAnchor="middle" fontSize="12" fill={planet} fontFamily="system-ui">{p.sym}</text>
          </g>
        );
      })}
    </svg>
  );
}

// Orbit rings - decorative
function OrbitRings({ size = 300, color = 'rgba(255,255,255,.15)', count = 3 }) {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      {Array.from({ length: count }).map((_, i) => {
        const r = (size / 2 - 4) - i * 18;
        return <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="0.6" strokeDasharray={i % 2 ? '2 4' : '0'}/>;
      })}
    </svg>
  );
}

// Tiny "planet chip"
function PlanetChip({ sym, label, deg, color = '#fff' }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '4px 8px', borderRadius: 999,
      background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.1)',
      fontSize: 11, color,
    }}>
      <span style={{ fontSize: 13 }}>{sym}</span>
      <span style={{ opacity: .85 }}>{label}</span>
      <span style={{ opacity: .55, fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{deg}°</span>
    </div>
  );
}

// Typing dots
function TypingDots({ color = '#fff' }) {
  return (
    <div style={{ display: 'inline-flex', gap: 4, alignItems: 'center' }}>
      {[0,1,2].map(i => (
        <div key={i} style={{
          width: 5, height: 5, borderRadius: 99, background: color,
          animation: `kz-pulse 1.2s ease-in-out ${i * 0.18}s infinite`,
        }}/>
      ))}
    </div>
  );
}

Object.assign(window, { Starfield, ShootingStar, NatalChart, OrbitRings, PlanetChip, ZodiacGlyph, TypingDots, seededRand, ZODIAC });
