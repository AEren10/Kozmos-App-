// theme-orbital.jsx — Direction 2: precise lines, black bg, technical/modern, mono heavy

const orbitalTheme = {
  name: 'Orbital',
  font: {
    display: "'Space Grotesk', system-ui, sans-serif",
    body: "'Space Grotesk', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  colors: {
    bg: '#060608',
    surface: '#0d0d10',
    surfaceHi: '#17171c',
    border: 'rgba(255,255,255,.09)',
    borderHi: 'rgba(255,255,255,.18)',
    text: '#f5f5f7',
    textDim: 'rgba(245,245,247,.58)',
    textMuted: 'rgba(245,245,247,.35)',
    accent: '#8cf0bb',    // green/mint — like CRT/terminal
    accent2: '#f5f5f7',
    danger: '#ff6a6a',
  },
};

function OrbitalBg() {
  return (
    <div style={{ position: 'absolute', inset: 0, background: '#060608', overflow: 'hidden' }}>
      <Starfield seed={2} count={45} color="#fff" twinkle={false}/>
      {/* grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.3,
        backgroundImage:
          'linear-gradient(rgba(140,240,187,.05) 1px, transparent 1px),' +
          'linear-gradient(90deg, rgba(140,240,187,.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}/>
    </div>
  );
}

// tiny SVG border-corner brackets for terminal feel
function CornerBrackets({ color }) {
  const s = { position: 'absolute', width: 10, height: 10, borderColor: color, borderStyle: 'solid' };
  return (
    <>
      <div style={{ ...s, top: 0, left: 0, borderWidth: '1px 0 0 1px' }}/>
      <div style={{ ...s, top: 0, right: 0, borderWidth: '1px 1px 0 0' }}/>
      <div style={{ ...s, bottom: 0, left: 0, borderWidth: '0 0 1px 1px' }}/>
      <div style={{ ...s, bottom: 0, right: 0, borderWidth: '0 1px 1px 0' }}/>
    </>
  );
}

// ══ 1. Auth ══
function OrbitalAuth() {
  const c = orbitalTheme.colors;
  return (
    <div className="ios-screen" style={{ position: 'relative', height: '100%', color: c.text,
      fontFamily: orbitalTheme.font.body, overflow: 'hidden' }}>
      <OrbitalBg/>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', padding: '70px 24px 32px' }}>

        {/* top meta */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: orbitalTheme.font.mono, fontSize: 10, color: c.textMuted, letterSpacing: 1.5, marginBottom: 'auto' }}>
          <span>KOZMOS/v0.3.1</span>
          <span>◉ 41.01°N · 28.97°E</span>
        </div>

        {/* orbital emblem */}
        <div style={{ position: 'relative', width: 240, height: 240, margin: '0 auto 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="240" height="240" viewBox="0 0 240 240">
            <circle cx="120" cy="120" r="118" fill="none" stroke={c.border} strokeWidth="0.5"/>
            <circle cx="120" cy="120" r="90" fill="none" stroke={c.border} strokeWidth="0.5"/>
            <ellipse cx="120" cy="120" rx="118" ry="38" fill="none" stroke={c.accent} strokeOpacity=".5" strokeWidth="0.7"/>
            <ellipse cx="120" cy="120" rx="38" ry="118" fill="none" stroke={c.accent} strokeOpacity=".3" strokeWidth="0.7"/>
            {/* crosshair */}
            <line x1="120" y1="0" x2="120" y2="240" stroke={c.border} strokeWidth="0.5" strokeDasharray="2 4"/>
            <line x1="0" y1="120" x2="240" y2="120" stroke={c.border} strokeWidth="0.5" strokeDasharray="2 4"/>
            {/* marker dots */}
            <circle cx="120" cy="120" r="4" fill={c.accent}/>
            <circle cx="200" cy="90" r="2.5" fill={c.text}/>
            <circle cx="70" cy="160" r="2" fill={c.accent} opacity=".7"/>
          </svg>
          <div style={{ position: 'absolute', inset: 0, animation: 'kz-rotate 60s linear infinite' }}>
            <svg width="240" height="240" viewBox="0 0 240 240">
              <circle cx="120" cy="10" r="3" fill={c.accent}/>
            </svg>
          </div>
        </div>

        <div style={{ fontFamily: orbitalTheme.font.mono, fontSize: 10, letterSpacing: 3, color: c.accent, marginBottom: 14 }}>
          [ NAVIGATION SYSTEM ]
        </div>
        <div style={{ fontSize: 40, lineHeight: .95, fontWeight: 400, letterSpacing: -1.5, marginBottom: 10 }}>
          KOZMOS
        </div>
        <div style={{ fontSize: 13, color: c.textDim, marginBottom: 32, lineHeight: 1.55, maxWidth: 280, fontFamily: orbitalTheme.font.mono }}>
          gökyüzü bir arayüz. sen de içinde bir nokta. hizalayalım.
        </div>

        {/* auth buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button style={{
            height: 50, borderRadius: 2, border: `1px solid ${c.accent}`, cursor: 'pointer',
            background: c.accent, color: '#060608', fontSize: 13, fontWeight: 600,
            fontFamily: orbitalTheme.font.mono, letterSpacing: 1.5,
          }}>
            ▸ BAŞLAT · NEW CHART
          </button>
          <button style={{
            height: 50, borderRadius: 2, cursor: 'pointer',
            background: 'transparent', border: '1px solid ' + c.border,
            color: c.text, fontSize: 13, fontFamily: orbitalTheme.font.mono, letterSpacing: 1.5,
          }}>
            ↻ RESUME SESSION
          </button>
        </div>
      </div>
    </div>
  );
}

// ══ 2. Prompt ══
function OrbitalPrompt({ density = 'havali' }) {
  const c = orbitalTheme.colors;
  return (
    <div className="ios-screen" style={{ position: 'relative', height: '100%', color: c.text,
      fontFamily: orbitalTheme.font.body, overflow: 'hidden' }}>
      <OrbitalBg/>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 54 }}>
        {/* header */}
        <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', fontFamily: orbitalTheme.font.mono, fontSize: 10, color: c.textMuted, letterSpacing: 1.5,
          borderBottom: '1px solid ' + c.border }}>
          <span>● LIVE · TUE 14:32</span>
          <span>ELA_01.96</span>
        </div>

        {/* sky snapshot */}
        <div style={{ padding: '16px 16px 12px', display: 'flex', gap: 10, alignItems: 'stretch' }}>
          <div style={{
            width: 96, height: 96, border: '1px solid ' + c.border, position: 'relative', flexShrink: 0,
          }}>
            <CornerBrackets color={c.accent}/>
            <svg width="96" height="96" viewBox="0 0 96 96" style={{ display: 'block' }}>
              <circle cx="48" cy="48" r="38" fill="none" stroke={c.border}/>
              <circle cx="48" cy="48" r="22" fill="none" stroke={c.border} strokeDasharray="1 2"/>
              {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
                const rad = a * Math.PI / 180;
                const x1 = 48 + Math.cos(rad) * 22, y1 = 48 + Math.sin(rad) * 22;
                const x2 = 48 + Math.cos(rad) * 38, y2 = 48 + Math.sin(rad) * 38;
                return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.border}/>;
              })}
              <circle cx="78" cy="36" r="2" fill={c.accent}/>
              <circle cx="35" cy="70" r="2" fill={c.text}/>
              <circle cx="58" cy="22" r="1.5" fill={c.accent} opacity=".6"/>
              <circle cx="48" cy="48" r="2" fill={c.accent}/>
            </svg>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: orbitalTheme.font.mono, fontSize: 10, color: c.textMuted, letterSpacing: 1.5 }}>
                SKY_NOW
              </div>
              <div style={{ fontSize: 22, marginTop: 4, fontWeight: 500, letterSpacing: -0.5 }}>
                Ay <span style={{ color: c.accent }}>→</span> Balık
              </div>
            </div>
            <div style={{ fontFamily: orbitalTheme.font.mono, fontSize: 10, color: c.textDim, lineHeight: 1.7 }}>
              ☿ <span style={{ color: c.text }}>oğlak 14°</span><br/>
              ♀ <span style={{ color: c.text }}>kova 02°</span><br/>
              ♂ <span style={{ color: c.accent }}>aslan 21°R</span>
            </div>
          </div>
        </div>

        {/* main query label */}
        <div style={{ padding: '0 16px', marginTop: 20 }}>
          <div style={{ fontFamily: orbitalTheme.font.mono, fontSize: 10, color: c.textMuted, letterSpacing: 1.5, marginBottom: 10 }}>
            [ QUERY ]
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.1, letterSpacing: -0.5, fontWeight: 400 }}>
            Bu hafta<br/>
            <span style={{ color: c.accent }}>neye dikkat</span><br/>
            etmeliyim?
          </div>
        </div>

        {/* context chips */}
        <div style={{ padding: '20px 16px 0', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {['+ transitler', '+ doğum haritası', '+ son ay', '+ venüs'].map((t, i) => (
            <div key={i} style={{
              padding: '6px 10px', border: '1px solid ' + c.border,
              fontSize: 11, fontFamily: orbitalTheme.font.mono, letterSpacing: 0.5,
              color: i === 0 ? c.accent : c.textDim,
              background: i === 0 ? 'rgba(140,240,187,.08)' : 'transparent',
            }}>{t}</div>
          ))}
        </div>

        <div style={{ flex: 1 }}/>

        {/* suggestions */}
        <div style={{ padding: '0 16px 14px', borderTop: '1px solid ' + c.border, paddingTop: 14 }}>
          <div style={{ fontFamily: orbitalTheme.font.mono, fontSize: 10, color: c.textMuted, letterSpacing: 1.5, marginBottom: 8 }}>
            SUGGEST ▸
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
            {['haftalık özet', 'dün ne oldu', 'venüs aşkım', 'satürn öğretisi'].map((s, i) => (
              <div key={i} style={{
                padding: '8px 12px', border: '1px solid ' + c.border,
                whiteSpace: 'nowrap', fontSize: 12, fontFamily: orbitalTheme.font.mono, color: c.textDim,
              }}>{s}</div>
            ))}
          </div>
        </div>

        {/* prompt bar */}
        <div style={{ padding: '0 16px 24px', display: 'flex', gap: 8 }}>
          <div style={{
            flex: 1, height: 48, border: '1px solid ' + c.borderHi,
            background: c.surface, display: 'flex', alignItems: 'center', padding: '0 14px',
            fontFamily: orbitalTheme.font.mono, fontSize: 13, color: c.textMuted,
          }}>
            <span style={{ color: c.accent, marginRight: 8 }}>▸</span>
            ask_the_sky_
            <span style={{ width: 1.5, height: 14, background: c.accent, marginLeft: 2, animation: 'kz-pulse 1s step-end infinite' }}/>
          </div>
          <button style={{
            width: 48, height: 48, border: '1px solid ' + c.accent, background: c.accent, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#060608', fontSize: 18, fontWeight: 700,
          }}>↑</button>
        </div>
      </div>
    </div>
  );
}

// ══ 3. Loading ══
function OrbitalLoading() {
  const c = orbitalTheme.colors;
  const log = [
    { t: '14:32:08', msg: 'chart.parse(birth=1996-01-14T03:22)', ok: true },
    { t: '14:32:09', msg: 'ephemeris.lookup(date=now)', ok: true },
    { t: '14:32:10', msg: 'transit.calc(natal, now) · 8 aspects', ok: true },
    { t: '14:32:11', msg: 'moon.sign=pisces · orb=0.4°', ok: true },
    { t: '14:32:12', msg: 'narrative.compose()', ok: false },
  ];
  return (
    <div className="ios-screen" style={{ position: 'relative', height: '100%', color: c.text,
      fontFamily: orbitalTheme.font.mono, overflow: 'hidden' }}>
      <OrbitalBg/>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 54 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid ' + c.border,
          fontSize: 10, color: c.textMuted, letterSpacing: 1.5, display: 'flex', justifyContent: 'space-between' }}>
          <span>● COMPUTING</span><span>[ STAGE 4/5 ]</span>
        </div>

        {/* central viz */}
        <div style={{ padding: '40px 16px 20px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 220, height: 220 }}>
            {/* rotating target */}
            <div style={{ position: 'absolute', inset: 0, animation: 'kz-rotate 8s linear infinite' }}>
              <svg width="220" height="220" viewBox="0 0 220 220">
                <circle cx="110" cy="110" r="100" fill="none" stroke={c.accent} strokeOpacity=".3" strokeWidth="1"/>
                <circle cx="110" cy="110" r="80" fill="none" stroke={c.accent} strokeOpacity=".5" strokeWidth="0.6" strokeDasharray="4 8"/>
                <circle cx="110" cy="110" r="60" fill="none" stroke={c.accent} strokeOpacity=".7" strokeWidth="0.6"/>
                <circle cx="210" cy="110" r="4" fill={c.accent}/>
                <circle cx="30" cy="110" r="3" fill={c.text}/>
              </svg>
            </div>
            <div style={{ position: 'absolute', inset: 40, animation: 'kz-rotate-rev 12s linear infinite' }}>
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle cx="70" cy="70" r="68" fill="none" stroke={c.text} strokeOpacity=".5" strokeWidth="0.6" strokeDasharray="2 6"/>
                <circle cx="138" cy="70" r="3" fill={c.accent}/>
              </svg>
            </div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 36, height: 36, border: '1px solid ' + c.accent, position: 'relative' }}>
                <CornerBrackets color={c.accent}/>
                <div style={{ position: 'absolute', inset: 6, background: c.accent, animation: 'kz-pulse 1.5s ease-in-out infinite' }}/>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 16px', fontSize: 22, letterSpacing: -0.5, fontFamily: orbitalTheme.font.display,
          fontWeight: 500, marginBottom: 20 }}>
          hesaplıyorum<span style={{ color: c.accent, animation: 'kz-pulse 1s infinite' }}>_</span>
        </div>

        {/* log */}
        <div style={{ margin: '0 16px', padding: 12, border: '1px solid ' + c.border, background: c.surface,
          fontSize: 10.5, lineHeight: 1.7, letterSpacing: 0.3, position: 'relative' }}>
          <CornerBrackets color={c.border}/>
          {log.map((l, i) => (
            <div key={i} style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: c.textMuted }}>{l.t}</span>
              <span style={{ color: l.ok ? c.accent : c.text }}>{l.ok ? '✓' : '…'}</span>
              <span style={{ color: l.ok ? c.textDim : c.text, flex: 1 }}>
                {l.msg}
                {!l.ok && <span style={{ marginLeft: 4, color: c.accent, animation: 'kz-pulse 1s infinite' }}>▋</span>}
              </span>
            </div>
          ))}
        </div>

        {/* progress */}
        <div style={{ flex: 1 }}/>
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{ fontSize: 10, color: c.textMuted, letterSpacing: 1.5, marginBottom: 6, display: 'flex', justifyContent: 'space-between' }}>
            <span>PROGRESS</span><span>72%</span>
          </div>
          <div style={{ height: 4, background: c.surface, position: 'relative', overflow: 'hidden' }}>
            <div style={{ width: '72%', height: '100%', background: c.accent }}/>
            <div style={{ position: 'absolute', inset: 0,
              background: `linear-gradient(90deg, transparent, rgba(140,240,187,.6), transparent)`,
              backgroundSize: '50% 100%',
              animation: 'kz-shimmer 1.5s linear infinite',
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══ 4. Profile ══
function OrbitalProfile() {
  const c = orbitalTheme.colors;
  const rows = [
    { k: 'SUN',    v: 'CAPRICORN 24°', sub: 'house 3' },
    { k: 'MOON',   v: 'PISCES 04°',    sub: 'house 5' },
    { k: 'ASC',    v: 'SCORPIO 28°',   sub: 'rising' },
    { k: 'MERCURY',v: 'CAPRICORN 14°', sub: 'house 2' },
    { k: 'VENUS',  v: 'AQUARIUS 02°',  sub: 'house 4' },
    { k: 'MARS',   v: 'LEO 21°℞',      sub: 'house 9' },
  ];
  const settings = [
    { k: 'DAILY_PUSH',    v: 'ON / 09:00' },
    { k: 'HOUSE_SYSTEM',  v: 'PLACIDUS' },
    { k: 'TIMEZONE',      v: 'AUTO · GMT+3' },
    { k: 'DATA.EXPORT',   v: 'JSON ▸' },
  ];
  return (
    <div className="ios-screen" style={{ position: 'relative', height: '100%', color: c.text,
      fontFamily: orbitalTheme.font.mono, overflow: 'hidden' }}>
      <OrbitalBg/>
      <div style={{ position: 'relative', height: '100%', overflowY: 'auto', paddingTop: 54, paddingBottom: 30 }}>
        <div style={{ padding: '14px 16px', borderBottom: '1px solid ' + c.border,
          display: 'flex', justifyContent: 'space-between', fontSize: 10, letterSpacing: 1.5, color: c.textMuted }}>
          <span>◉ PROFILE</span><span>ID: ELA.01.96</span>
        </div>

        {/* identity block */}
        <div style={{ padding: '20px 16px', display: 'flex', gap: 14 }}>
          <div style={{
            width: 60, height: 60, border: '1px solid ' + c.accent, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: c.accent, fontSize: 22, fontWeight: 600,
          }}>
            <CornerBrackets color={c.accent}/>
            E
          </div>
          <div style={{ flex: 1, fontFamily: orbitalTheme.font.body }}>
            <div style={{ fontSize: 20, fontWeight: 500 }}>Ela Demir</div>
            <div style={{ fontSize: 10, color: c.textDim, marginTop: 4, fontFamily: orbitalTheme.font.mono, lineHeight: 1.6 }}>
              1996-01-14 · 03:22 · ankara<br/>
              39.93°N / 32.85°E
            </div>
          </div>
        </div>

        {/* natal chart block */}
        <div style={{ margin: '0 16px 16px', border: '1px solid ' + c.border, padding: 12, position: 'relative',
          background: c.surface }}>
          <CornerBrackets color={c.border}/>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10,
            fontSize: 10, color: c.textMuted, letterSpacing: 1.5 }}>
            <span>NATAL_CHART</span><span>TROPICAL</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <NatalChart size={200} palette={{
              ringBg: c.surface, ringStroke: 'rgba(255,255,255,.3)',
              houseStroke: 'rgba(255,255,255,.18)', planet: c.text, glyph: c.accent, accent: c.accent,
            }}/>
          </div>
        </div>

        {/* placements table */}
        <div style={{ margin: '0 16px 16px' }}>
          <div style={{ fontSize: 10, color: c.textMuted, letterSpacing: 1.5, marginBottom: 8, padding: '0 2px' }}>
            PLACEMENTS
          </div>
          <div style={{ border: '1px solid ' + c.border }}>
            {rows.map((r, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 1.2fr 0.7fr', fontSize: 11,
                padding: '9px 12px', borderTop: i ? '1px solid ' + c.border : 'none',
                alignItems: 'center',
              }}>
                <span style={{ color: c.textMuted }}>{r.k}</span>
                <span style={{ color: c.text }}>{r.v}</span>
                <span style={{ color: c.textDim, textAlign: 'right' }}>{r.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* settings */}
        <div style={{ margin: '0 16px' }}>
          <div style={{ fontSize: 10, color: c.textMuted, letterSpacing: 1.5, marginBottom: 8, padding: '0 2px' }}>
            CONFIG
          </div>
          <div style={{ border: '1px solid ' + c.border }}>
            {settings.map((s, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '12px', borderTop: i ? '1px solid ' + c.border : 'none', fontSize: 11,
              }}>
                <span style={{ color: c.textDim }}>{s.k}</span>
                <span style={{ color: c.accent }}>{s.v}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

Object.assign(window, { orbitalTheme, OrbitalAuth, OrbitalPrompt, OrbitalLoading, OrbitalProfile });
