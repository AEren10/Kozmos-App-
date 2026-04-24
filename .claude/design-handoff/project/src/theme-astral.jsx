// theme-astral.jsx — Direction 3: warm dark, amber/gold, mystical, serif+hand

const astralTheme = {
  name: 'Astral',
  font: {
    display: "'Cormorant Garamond', serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  colors: {
    bg: '#0c0604',
    bgGradient: 'radial-gradient(ellipse 100% 70% at 50% 0%, #2b1a0c 0%, #170c06 40%, #0c0604 80%)',
    surface: 'rgba(243,204,143,.04)',
    surfaceHi: 'rgba(243,204,143,.08)',
    border: 'rgba(243,204,143,.18)',
    text: '#f7ebd8',
    textDim: 'rgba(247,235,216,.62)',
    textMuted: 'rgba(247,235,216,.38)',
    accent: '#e8b465',
    accent2: '#c65d3c',
    ink: '#1a0e08',
  },
};

function AstralBg() {
  const c = astralTheme.colors;
  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bgGradient, overflow: 'hidden' }}>
      {/* warm glow top */}
      <div style={{ position: 'absolute', top: -60, left: '30%', width: 260, height: 260, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,180,101,.25), transparent 60%)', filter: 'blur(40px)' }}/>
      <div style={{ position: 'absolute', bottom: -100, right: -40, width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(198,93,60,.22), transparent 60%)', filter: 'blur(50px)' }}/>
      {/* parchment noise via gradient dots */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.35, mixBlendMode: 'overlay',
        backgroundImage: `radial-gradient(circle at 20% 30%, rgba(232,180,101,.1), transparent 40%),
                          radial-gradient(circle at 70% 70%, rgba(198,93,60,.1), transparent 40%)`,
      }}/>
      <Starfield seed={3} count={65} color="#f7ebd8"/>
    </div>
  );
}

// Hand-drawn sun emblem
function SunEmblem({ size = 100, color = '#e8b465' }) {
  const rays = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="18" fill="none" stroke={color} strokeWidth="1"/>
      <circle cx="50" cy="50" r="4" fill={color}/>
      {rays.map(a => {
        const rad = a * Math.PI / 180;
        const x1 = 50 + Math.cos(rad) * 24, y1 = 50 + Math.sin(rad) * 24;
        const x2 = 50 + Math.cos(rad) * (a % 60 === 0 ? 44 : 36), y2 = 50 + Math.sin(rad) * (a % 60 === 0 ? 44 : 36);
        return <line key={a} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="1" strokeLinecap="round"/>;
      })}
    </svg>
  );
}

// ══ 1. Auth ══
function AstralAuth() {
  const c = astralTheme.colors;
  return (
    <div className="ios-screen" style={{ position: 'relative', height: '100%', color: c.text,
      fontFamily: astralTheme.font.body, overflow: 'hidden' }}>
      <AstralBg/>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
        padding: '90px 36px 40px', alignItems: 'center' }}>

        {/* ornament */}
        <div style={{ fontFamily: astralTheme.font.display, color: c.accent, letterSpacing: 8, fontSize: 10, marginBottom: 24 }}>
          ✦ &nbsp; &nbsp; ✦ &nbsp; &nbsp; ✦
        </div>

        <div style={{ marginBottom: 24, animation: 'kz-float 6s ease-in-out infinite' }}>
          <SunEmblem size={120} color={c.accent}/>
        </div>

        <div style={{ fontFamily: astralTheme.font.display, fontSize: 56, lineHeight: 1, fontWeight: 400,
          fontStyle: 'italic', letterSpacing: -1, color: c.text, marginBottom: 8 }}>
          Kozmos
        </div>
        <div style={{ fontFamily: astralTheme.font.mono, fontSize: 10, color: c.accent, letterSpacing: 4, marginBottom: 18 }}>
          BIR GÖK REHBERI
        </div>
        <div style={{ fontFamily: astralTheme.font.display, fontSize: 18, lineHeight: 1.4, textAlign: 'center',
          color: c.textDim, fontStyle: 'italic', fontWeight: 300, maxWidth: 300, marginBottom: 'auto' }}>
          "Yukarıdaki gibi,<br/>aşağıda da."
        </div>

        {/* auth */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
          <button style={{
            height: 56, borderRadius: 28, border: 'none', cursor: 'pointer',
            background: c.accent, color: c.ink, fontSize: 15, fontWeight: 500,
            fontFamily: astralTheme.font.body, letterSpacing: 0.5,
            boxShadow: '0 8px 30px rgba(232,180,101,.35), inset 0 1px 0 rgba(255,255,255,.35)',
          }}>
            Haritamı çıkar
          </button>
          <button style={{
            height: 56, borderRadius: 28, cursor: 'pointer',
            background: 'transparent', border: '1px solid ' + c.border,
            color: c.text, fontSize: 15, fontFamily: astralTheme.font.body,
          }}>
            Giriş yap
          </button>
          <div style={{ textAlign: 'center', fontSize: 11, fontFamily: astralTheme.font.mono,
            color: c.textMuted, letterSpacing: 1.5, marginTop: 8 }}>
            ✦ KURDELE · 2026 ·  ✦
          </div>
        </div>
      </div>
    </div>
  );
}

// ══ 2. Prompt ══
function AstralPrompt({ density = 'havali' }) {
  const c = astralTheme.colors;
  const compact = density === 'sıkı';
  const cards = [
    { sign: 'leo',     title: 'Güneşin',      phrase: 'parlamak için doğdun.' },
    { sign: 'pisces',  title: 'Ayın',         phrase: 'rüyalarda konuşuyor.' },
    { sign: 'scorpio', title: 'Yükselenin',   phrase: 'karanlığa dönüşür.' },
  ];
  return (
    <div className="ios-screen" style={{ position: 'relative', height: '100%', color: c.text,
      fontFamily: astralTheme.font.body, overflow: 'hidden' }}>
      <AstralBg/>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 54 }}>

        {/* header */}
        <div style={{ padding: '10px 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: astralTheme.font.mono, fontSize: 10, color: c.accent, letterSpacing: 2 }}>
            14 · OCA · SALI
          </div>
          <div style={{ width: 32, height: 32, borderRadius: '50%',
            border: '1px solid ' + c.border,
            background: 'linear-gradient(135deg, #e8b465, #c65d3c)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: astralTheme.font.display, fontSize: 15, fontStyle: 'italic', color: c.ink, fontWeight: 500,
          }}>E</div>
        </div>

        {/* decorative rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 24px', marginBottom: 16 }}>
          <div style={{ flex: 1, height: 0.5, background: c.border }}/>
          <ZodiacGlyph sign="leo" size={14} color={c.accent} stroke={1.2}/>
          <div style={{ flex: 1, height: 0.5, background: c.border }}/>
        </div>

        {/* hero question */}
        <div style={{ padding: '0 30px', marginBottom: compact ? 16 : 24, textAlign: 'center' }}>
          <div style={{ fontFamily: astralTheme.font.mono, fontSize: 10, color: c.textMuted, letterSpacing: 3, marginBottom: 10 }}>
            BUGÜN GÖKYÜZÜNE
          </div>
          <div style={{ fontFamily: astralTheme.font.display, fontSize: 34, lineHeight: 1.1, fontStyle: 'italic',
            fontWeight: 400, letterSpacing: -0.5, color: c.text }}>
            ne soracaksın,<br/>
            <span style={{ color: c.accent }}>Ela?</span>
          </div>
        </div>

        {/* three pillars — big 3 */}
        <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 20 }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              padding: '14px 10px', borderRadius: 16,
              background: 'linear-gradient(160deg, rgba(232,180,101,.1), rgba(198,93,60,.04))',
              border: '1px solid ' + c.border,
              textAlign: 'center',
              animation: `kz-fade-up .6s ease both ${i * 0.08}s`,
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 6 }}>
                <ZodiacGlyph sign={card.sign} size={22} color={c.accent} stroke={1.3}/>
              </div>
              <div style={{ fontSize: 10, color: c.textMuted, fontFamily: astralTheme.font.mono, letterSpacing: 1, marginBottom: 4 }}>
                {card.title.toUpperCase()}
              </div>
              <div style={{ fontFamily: astralTheme.font.display, fontSize: 13, fontStyle: 'italic',
                lineHeight: 1.2, color: c.text }}>
                {card.phrase}
              </div>
            </div>
          ))}
        </div>

        {/* prompts — elegant list */}
        <div style={{ padding: '0 24px', flex: 1 }}>
          <div style={{ fontFamily: astralTheme.font.mono, fontSize: 10, color: c.textMuted, letterSpacing: 2, marginBottom: 10 }}>
            BUGÜN SORABILECEKLERIN
          </div>
          {[
            'aşk hayatımda ne dönüyor?',
            'kariyerimde hangi dönemden geçiyorum?',
            'dün gece gördüğüm rüya ne anlama gelir?',
          ].slice(0, compact ? 2 : 3).map((s, i) => (
            <div key={i} style={{
              padding: '14px 0',
              borderBottom: '0.5px solid ' + c.border,
              display: 'flex', alignItems: 'center', gap: 12,
              fontFamily: astralTheme.font.display, fontSize: 18, fontStyle: 'italic',
              fontWeight: 400, color: c.text,
            }}>
              <span style={{ color: c.accent, fontSize: 12, fontFamily: astralTheme.font.mono }}>
                0{i+1}
              </span>
              {s}
              <span style={{ marginLeft: 'auto', color: c.textMuted }}>→</span>
            </div>
          ))}
        </div>

        {/* prompt input */}
        <div style={{ padding: '12px 20px 24px' }}>
          <div style={{
            height: 58, borderRadius: 29, padding: '0 6px 0 22px',
            background: 'rgba(247,235,216,.06)', border: '1px solid ' + c.border, backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ flex: 1, fontFamily: astralTheme.font.display, fontSize: 17, fontStyle: 'italic',
              color: c.textMuted }}>gökyüzüne bir mektup yaz…</div>
            <button style={{
              width: 46, height: 46, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: c.accent, color: c.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(232,180,101,.4)',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 8h12M9 3l5 5-5 5" stroke={c.ink} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══ 3. Loading ══
function AstralLoading() {
  const c = astralTheme.colors;
  const poetry = [
    'Ay senin için balıkta dans ediyor.',
    'Venüs kovaya geçti, yeni bir arzu kapıda.',
    'Mars retrosu eskiyi gözden geçiriyor.',
  ];
  return (
    <div className="ios-screen" style={{ position: 'relative', height: '100%', color: c.text,
      fontFamily: astralTheme.font.body, overflow: 'hidden' }}>
      <AstralBg/>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 36px', textAlign: 'center' }}>

        {/* circle with sun */}
        <div style={{ position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, animation: 'kz-rotate 40s linear infinite' }}>
            <svg width="240" height="240" viewBox="0 0 240 240">
              <circle cx="120" cy="120" r="115" fill="none" stroke={c.border} strokeWidth="0.5"/>
              <circle cx="120" cy="120" r="100" fill="none" stroke={c.accent} strokeOpacity=".3" strokeDasharray="2 10"/>
              {/* zodiac glyphs on outer ring */}
              {['aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'].map((s, i) => {
                const a = (i * 30 - 90) * Math.PI / 180;
                const x = 120 + Math.cos(a) * 107, y = 120 + Math.sin(a) * 107;
                return (
                  <g key={s} transform={`translate(${x - 7} ${y - 8})`}>
                    <svg width="14" height="16" viewBox="0 0 24 28"><path d={ZODIAC[s]} fill="none" stroke={c.accent} strokeWidth="1.5" strokeLinecap="round"/></svg>
                  </g>
                );
              })}
            </svg>
          </div>
          <div style={{ animation: 'kz-pulse 2.5s ease-in-out infinite' }}>
            <SunEmblem size={120} color={c.accent}/>
          </div>
        </div>

        <div style={{ marginTop: 36, fontFamily: astralTheme.font.mono, fontSize: 10,
          color: c.accent, letterSpacing: 4 }}>
          GÖKYÜZÜ OKUNUYOR
        </div>

        <div style={{ marginTop: 18, fontFamily: astralTheme.font.display, fontSize: 26,
          lineHeight: 1.3, fontStyle: 'italic', fontWeight: 400, color: c.text, maxWidth: 300 }}>
          "Soru sormakla cevabı<br/>aramak, aynı şey değildir."
        </div>

        <div style={{ marginTop: 30, width: '100%', maxWidth: 300,
          display: 'flex', flexDirection: 'column', gap: 8 }}>
          {poetry.map((p, i) => (
            <div key={i} style={{
              fontFamily: astralTheme.font.display, fontSize: 14, fontStyle: 'italic',
              color: i === 1 ? c.text : c.textDim, lineHeight: 1.4,
              opacity: i === 1 ? 1 : 0.7,
              animation: `kz-fade-up .6s ease both ${i * 1.2}s`,
            }}>
              {i === 1 && <span style={{ color: c.accent, marginRight: 6 }}>✦</span>}
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ══ 4. Profile ══
function AstralProfile() {
  const c = astralTheme.colors;
  const placements = [
    { label: 'Güneş',     sign: 'leo',       name: 'Aslan',  deg: '12°' },
    { label: 'Ay',        sign: 'pisces',    name: 'Balık',  deg: '04°' },
    { label: 'Yükselen',  sign: 'scorpio',   name: 'Akrep',  deg: '28°' },
    { label: 'Merkür',    sign: 'capricorn', name: 'Oğlak',  deg: '14°' },
    { label: 'Venüs',     sign: 'aquarius',  name: 'Kova',   deg: '02°' },
    { label: 'Mars',      sign: 'leo',       name: 'Aslan',  deg: '21° ℞' },
  ];
  const settings = [
    { icon: '☽', label: 'Günlük uyarılar',   val: '09:00' },
    { icon: '⌂', label: 'Doğum bilgileri',   val: 'Ankara' },
    { icon: '◉', label: 'Ev sistemi',        val: 'Placidus' },
    { icon: '☿', label: 'Dil',                val: 'Türkçe' },
  ];
  return (
    <div className="ios-screen" style={{ position: 'relative', height: '100%', color: c.text,
      fontFamily: astralTheme.font.body, overflow: 'hidden' }}>
      <AstralBg/>
      <div style={{ position: 'relative', height: '100%', overflowY: 'auto', paddingTop: 54, paddingBottom: 40 }}>

        {/* header ornament */}
        <div style={{ textAlign: 'center', padding: '16px 0 6px', fontFamily: astralTheme.font.mono,
          fontSize: 9, color: c.accent, letterSpacing: 4 }}>
          ✦ &nbsp; PROFIL &nbsp; ✦
        </div>

        {/* identity */}
        <div style={{ textAlign: 'center', padding: '16px 24px 0' }}>
          <div style={{ display: 'inline-block', position: 'relative', marginBottom: 12 }}>
            <div style={{
              width: 86, height: 86, borderRadius: '50%',
              background: 'linear-gradient(135deg, #e8b465, #c65d3c)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: astralTheme.font.display, fontSize: 36, fontStyle: 'italic', fontWeight: 500, color: c.ink,
              boxShadow: '0 0 30px rgba(232,180,101,.4)',
            }}>E</div>
          </div>
          <div style={{ fontFamily: astralTheme.font.display, fontSize: 30, fontStyle: 'italic', fontWeight: 400 }}>
            Ela
          </div>
          <div style={{ fontFamily: astralTheme.font.mono, fontSize: 10, color: c.textDim, letterSpacing: 2, marginTop: 6 }}>
            14 OCAK 1996 · 03:22 · ANKARA
          </div>
        </div>

        {/* ornament rule */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '24px 40px 16px' }}>
          <div style={{ flex: 1, height: 0.5, background: c.border }}/>
          <span style={{ fontFamily: astralTheme.font.display, color: c.accent, fontSize: 14 }}>✦</span>
          <div style={{ flex: 1, height: 0.5, background: c.border }}/>
        </div>

        {/* natal chart */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <NatalChart size={240} palette={{
            ringBg: '#170c06', ringStroke: 'rgba(232,180,101,.3)',
            houseStroke: 'rgba(232,180,101,.18)', planet: c.text, glyph: c.accent, accent: c.accent2,
          }}/>
        </div>

        {/* placements grid */}
        <div style={{ padding: '0 24px', marginBottom: 24 }}>
          <div style={{ fontFamily: astralTheme.font.mono, fontSize: 10, color: c.textMuted, letterSpacing: 2, marginBottom: 10, textAlign: 'center' }}>
            YERLEŞIMLER
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {placements.map((p, i) => (
              <div key={i} style={{
                padding: '10px 12px', borderRadius: 12,
                background: 'rgba(243,204,143,.04)', border: '1px solid ' + c.border,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <ZodiacGlyph sign={p.sign} size={22} color={c.accent} stroke={1.3}/>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 10, color: c.textMuted, fontFamily: astralTheme.font.mono, letterSpacing: 1 }}>
                    {p.label.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: astralTheme.font.display, fontSize: 17, fontStyle: 'italic', lineHeight: 1.1 }}>
                    {p.name}
                    <span style={{ fontSize: 11, color: c.textDim, fontFamily: astralTheme.font.mono, marginLeft: 4, fontStyle: 'normal' }}>{p.deg}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* settings */}
        <div style={{ padding: '0 24px' }}>
          <div style={{ fontFamily: astralTheme.font.mono, fontSize: 10, color: c.textMuted, letterSpacing: 2, marginBottom: 10, textAlign: 'center' }}>
            TERCIHLER
          </div>
          <div style={{ background: 'rgba(243,204,143,.03)', borderRadius: 20, overflow: 'hidden',
            border: '1px solid ' + c.border }}>
            {settings.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', padding: '14px 16px',
                borderTop: i ? '0.5px solid ' + c.border : 'none', gap: 14,
              }}>
                <span style={{ fontSize: 16, color: c.accent, width: 22, textAlign: 'center' }}>{s.icon}</span>
                <span style={{ flex: 1, fontFamily: astralTheme.font.display, fontSize: 17, fontStyle: 'italic' }}>{s.label}</span>
                <span style={{ fontFamily: astralTheme.font.mono, fontSize: 11, color: c.textDim, letterSpacing: 1 }}>{s.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { astralTheme, AstralAuth, AstralPrompt, AstralLoading, AstralProfile });
