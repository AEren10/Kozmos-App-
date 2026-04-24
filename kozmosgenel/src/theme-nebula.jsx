// theme-nebula.jsx — Direction 1: organic purple/indigo gradients, soft glow, serif accents

const nebulaTheme = {
  name: 'Nebula',
  font: {
    display: "'Fraunces', 'Instrument Serif', serif",
    body: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  colors: {
    bg: '#0d0820',
    bgGradient: 'radial-gradient(ellipse 120% 80% at 50% -10%, #3a1d6e 0%, #1a0e3d 35%, #0d0820 70%)',
    surface: 'rgba(255,255,255,0.04)',
    surfaceHi: 'rgba(255,255,255,0.08)',
    border: 'rgba(196,170,255,0.18)',
    text: '#f0ebff',
    textDim: 'rgba(240,235,255,0.65)',
    textMuted: 'rgba(240,235,255,0.4)',
    accent: '#c4a4ff',
    accent2: '#ff9ad1',
    glow: 'rgba(196,170,255,.45)',
  },
};

// ══ decorative background ══
function NebulaBg() {
  const c = nebulaTheme.colors;
  return (
    <div style={{ position: 'absolute', inset: 0, background: c.bgGradient, overflow: 'hidden' }}>
      {/* blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '-20%', width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,170,255,.35), transparent 60%)', filter: 'blur(40px)',
      }}/>
      <div style={{
        position: 'absolute', bottom: '-10%', right: '-15%', width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,154,209,.28), transparent 60%)', filter: 'blur(50px)',
      }}/>
      <div style={{
        position: 'absolute', top: '55%', left: '40%', width: 200, height: 200, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(120,180,255,.25), transparent 60%)', filter: 'blur(30px)',
      }}/>
      <Starfield seed={1} count={90} color="#fff"/>
      <ShootingStar top="15%" left="40%" angle={-20} length={60}/>
    </div>
  );
}

// ══ 1. Onboarding / Auth ══
function NebulaAuth() {
  const c = nebulaTheme.colors;
  return (
    <div className="ios-screen" style={{
      position: 'relative', height: '100%', color: c.text,
      fontFamily: nebulaTheme.font.body, overflow: 'hidden',
    }}>
      <NebulaBg/>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', padding: '120px 28px 40px' }}>
        {/* orbital emblem */}
        <div style={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{ position: 'absolute', animation: 'kz-rotate 60s linear infinite' }}>
            <OrbitRings size={200} color="rgba(196,170,255,.22)" count={3}/>
          </div>
          <div style={{
            width: 76, height: 76, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, #fff, #c4a4ff 50%, #7b4fd0 100%)',
            boxShadow: '0 0 60px rgba(196,170,255,.7), inset -8px -12px 24px rgba(50,20,90,.5)',
            animation: 'kz-float 5s ease-in-out infinite',
          }}/>
          {/* orbiting dots */}
          <div style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#ff9ad1',
            '--r': '90px', animation: 'kz-orbit 12s linear infinite' }}/>
          <div style={{ position: 'absolute', width: 3, height: 3, borderRadius: '50%', background: '#c4a4ff',
            '--r': '70px', animation: 'kz-orbit 8s linear infinite reverse' }}/>
        </div>

        <div style={{ fontFamily: nebulaTheme.font.display, fontSize: 44, lineHeight: 1, letterSpacing: -1,
          fontWeight: 300, fontStyle: 'italic', textAlign: 'center', marginBottom: 10 }}>
          kozmos
        </div>
        <div style={{ fontSize: 14, textAlign: 'center', color: c.textDim, marginBottom: 'auto', lineHeight: 1.5, maxWidth: 280, margin: '0 auto auto' }}>
          Yıldızlar sana bir şeyler söylüyor.<br/>Sormayı unutma.
        </div>

        {/* auth buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 'auto' }}>
          <button style={{
            height: 54, borderRadius: 16, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(180deg, #c4a4ff, #8b5cf6)',
            color: '#1a0e3d', fontSize: 16, fontWeight: 600,
            fontFamily: nebulaTheme.font.body,
            boxShadow: '0 10px 30px rgba(139,92,246,.5), inset 0 1px 0 rgba(255,255,255,.5)',
          }}>Doğum haritanı çıkar</button>
          <button style={{
            height: 54, borderRadius: 16, cursor: 'pointer',
            background: 'rgba(255,255,255,.06)', backdropFilter: 'blur(10px)',
            border: '1px solid ' + c.border,
            color: c.text, fontSize: 15, fontWeight: 500,
          }}>Zaten bir yerim var</button>
          <div style={{ fontSize: 11, textAlign: 'center', color: c.textMuted, marginTop: 6, fontFamily: nebulaTheme.font.mono }}>
            devam ederek yıldızlarla anlaşmış olursun
          </div>
        </div>
      </div>
    </div>
  );
}

// ══ 2. Main prompt (blank canvas) ══
function NebulaPrompt({ density = 'havali' }) {
  const c = nebulaTheme.colors;
  const compact = density === 'sıkı';
  const suggestions = [
    { icon: '☽', text: 'bu hafta nasıl geçer?' },
    { icon: '♀', text: 'venüsüm ne diyor aşk hayatıma?' },
    { icon: '♆', text: 'rüyalarımı yorumla' },
    { icon: '☿', text: 'merkür retrosu beni nasıl etkiler?' },
  ];
  return (
    <div className="ios-screen" style={{
      position: 'relative', height: '100%', color: c.text,
      fontFamily: nebulaTheme.font.body, overflow: 'hidden',
    }}>
      <NebulaBg/>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 54 }}>
        {/* top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, #c4a4ff, #ff9ad1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: nebulaTheme.font.display, fontSize: 14, fontStyle: 'italic', color: '#1a0e3d', fontWeight: 600,
            }}>k</div>
            <div style={{ fontSize: 13, fontFamily: nebulaTheme.font.mono, color: c.textDim, letterSpacing: 1 }}>14:32 · sal</div>
          </div>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'linear-gradient(135deg,#ff9ad1,#c4a4ff)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#1a0e3d',
          }}>E</div>
        </div>

        {/* greeting */}
        <div style={{ padding: '0 24px', marginBottom: compact ? 16 : 32 }}>
          <div style={{ fontSize: 13, color: c.accent2, fontFamily: nebulaTheme.font.mono, marginBottom: 8, letterSpacing: 0.5 }}>
            ♌ ASLAN · AY DOLUNAY'DA
          </div>
          <div style={{
            fontFamily: nebulaTheme.font.display, fontSize: 34, lineHeight: 1.05, letterSpacing: -0.5,
            fontWeight: 300,
          }}>
            merhaba Ela,<br/>
            <span style={{ fontStyle: 'italic', color: c.accent }}>bugün içinde bir şey kıpırdıyor.</span>
          </div>
        </div>

        {/* current transit card */}
        <div style={{ margin: '0 20px 20px', padding: 16, borderRadius: 20,
          background: 'linear-gradient(160deg, rgba(196,170,255,.14), rgba(255,154,209,.06))',
          border: '1px solid ' + c.border, backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <div style={{ fontSize: 11, color: c.textMuted, letterSpacing: 1.5, fontFamily: nebulaTheme.font.mono, marginBottom: 6 }}>
                ŞU AN GÖKYÜZÜNDE
              </div>
              <div style={{ fontFamily: nebulaTheme.font.display, fontSize: 20, fontWeight: 400, fontStyle: 'italic', marginBottom: 2 }}>
                Ay · Balık
              </div>
              <div style={{ fontSize: 13, color: c.textDim, lineHeight: 1.5 }}>
                sezgin güçlü. not defterini yanından ayırma.
              </div>
            </div>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #fff, #c4a4ff)',
              boxShadow: '0 0 20px rgba(196,170,255,.6)',
              animation: 'kz-float 4s ease-in-out infinite',
            }}/>
          </div>
        </div>

        {/* suggested prompts */}
        <div style={{ padding: '0 20px', marginBottom: 16 }}>
          <div style={{ fontSize: 11, color: c.textMuted, letterSpacing: 1.5, fontFamily: nebulaTheme.font.mono, marginBottom: 10 }}>
            SORABİLECEKLERİN
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {suggestions.slice(0, compact ? 2 : 3).map((s, i) => (
              <div key={i} style={{
                padding: '12px 14px', borderRadius: 14,
                background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)',
                display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: c.text,
                animation: `kz-fade-up .5s ease both ${i * 0.08}s`,
              }}>
                <span style={{ fontSize: 16, color: c.accent, width: 20, textAlign: 'center' }}>{s.icon}</span>
                <span style={{ fontStyle: 'italic', fontFamily: nebulaTheme.font.display, fontWeight: 400 }}>{s.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: 1 }}/>

        {/* prompt bar */}
        <div style={{ padding: '0 16px 24px' }}>
          <div style={{
            height: 56, borderRadius: 28, padding: '0 8px 0 20px',
            background: 'rgba(13,8,32,.7)', backdropFilter: 'blur(20px)',
            border: '1px solid ' + c.border,
            display: 'flex', alignItems: 'center', gap: 10,
            boxShadow: '0 0 40px rgba(196,170,255,.2)',
          }}>
            <ZodiacGlyph sign="leo" size={18} color={nebulaTheme.colors.accent} stroke={1.2}/>
            <div style={{ flex: 1, color: c.textMuted, fontSize: 15, fontStyle: 'italic',
              fontFamily: nebulaTheme.font.display }}>yıldızlara bir şey sor…</div>
            <button style={{
              width: 42, height: 42, borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: 'linear-gradient(135deg, #c4a4ff, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(139,92,246,.5)',
            }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2v12M2 8l6-6 6 6" stroke="#1a0e3d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ══ 3. Loading state ══
function NebulaLoading() {
  const c = nebulaTheme.colors;
  const steps = [
    'gökyüzü haritası hesaplanıyor',
    'güneşin ve ayın hizalaması alındı',
    'venüs ile konuşuluyor…',
    'cevap mistik dokuya işleniyor',
  ];
  return (
    <div className="ios-screen" style={{
      position: 'relative', height: '100%', color: c.text,
      fontFamily: nebulaTheme.font.body, overflow: 'hidden',
    }}>
      <NebulaBg/>
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>
        {/* central orb w/ rings */}
        <div style={{ position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ position: 'absolute', inset: 0, animation: 'kz-rotate 20s linear infinite' }}>
            <OrbitRings size={240} color="rgba(196,170,255,.3)" count={2}/>
          </div>
          <div style={{ position: 'absolute', inset: 24, animation: 'kz-rotate-rev 14s linear infinite' }}>
            <OrbitRings size={192} color="rgba(255,154,209,.25)" count={2}/>
          </div>
          <div style={{
            width: 110, height: 110, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 25%, #fff, #c4a4ff 40%, #5b2ea6 90%)',
            animation: 'kz-glow 3s ease-in-out infinite',
          }}/>
          {/* orbiting planets */}
          <div style={{ position: 'absolute', width: 10, height: 10, borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #ffd0e7, #ff9ad1)',
            boxShadow: '0 0 10px #ff9ad1',
            '--r': '110px', animation: 'kz-orbit 10s linear infinite' }}/>
          <div style={{ position: 'absolute', width: 7, height: 7, borderRadius: '50%',
            background: '#c4a4ff', boxShadow: '0 0 8px #c4a4ff',
            '--r': '88px', animation: 'kz-orbit 7s linear infinite reverse' }}/>
        </div>

        <div style={{ marginTop: 40, fontFamily: nebulaTheme.font.display, fontSize: 28,
          lineHeight: 1.15, textAlign: 'center', fontWeight: 300 }}>
          <span style={{ fontStyle: 'italic', color: c.accent }}>yıldızlar</span><br/>
          <span style={{ opacity: .95 }}>seni okuyor</span>
        </div>

        <div style={{ marginTop: 28, width: '100%', maxWidth: 280 }}>
          {steps.map((s, i) => {
            const active = i === 2;
            const done = i < 2;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0',
                fontSize: 13, color: done ? c.textDim : active ? c.text : c.textMuted,
                fontFamily: nebulaTheme.font.mono, letterSpacing: 0.3,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: done ? c.accent : active ? c.accent2 : 'rgba(255,255,255,.2)',
                  animation: active ? 'kz-pulse 1.2s ease-in-out infinite' : 'none',
                  boxShadow: done ? `0 0 6px ${c.accent}` : 'none',
                }}/>
                {s}
                {active && <span style={{ marginLeft: 4 }}><TypingDots color={c.accent2}/></span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ══ 4. Profile / Settings ══
function NebulaProfile() {
  const c = nebulaTheme.colors;
  const placements = [
    { label: 'Güneş', sign: 'leo', name: 'Aslan', deg: '12°' },
    { label: 'Ay', sign: 'pisces', name: 'Balık', deg: '4°' },
    { label: 'Yükselen', sign: 'scorpio', name: 'Akrep', deg: '28°' },
  ];
  const settings = [
    { icon: '☾', label: 'Bildirimler', val: 'Günde 1' },
    { icon: '⟟', label: 'Doğum bilgileri', val: 'Düzenle' },
    { icon: '⌘', label: 'Ev sistemi', val: 'Placidus' },
    { icon: '✧', label: 'Tema', val: 'Nebula' },
  ];
  return (
    <div className="ios-screen" style={{
      position: 'relative', height: '100%', color: c.text,
      fontFamily: nebulaTheme.font.body, overflow: 'hidden',
    }}>
      <NebulaBg/>
      <div style={{ position: 'relative', height: '100%', overflowY: 'auto', paddingTop: 54, paddingBottom: 30 }}>
        {/* header */}
        <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 76, height: 76, borderRadius: '50%',
              background: 'linear-gradient(135deg,#ff9ad1,#c4a4ff, #7b4fd0)',
              boxShadow: '0 0 30px rgba(196,170,255,.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: nebulaTheme.font.display, fontSize: 30, fontStyle: 'italic', fontWeight: 400, color: '#1a0e3d',
            }}>E</div>
            <div style={{ position: 'absolute', inset: -6, borderRadius: '50%',
              border: '1px solid ' + c.border, animation: 'kz-rotate 30s linear infinite' }}/>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: nebulaTheme.font.display, fontSize: 24, fontWeight: 400 }}>Ela</div>
            <div style={{ fontSize: 12, fontFamily: nebulaTheme.font.mono, color: c.textDim, marginTop: 2 }}>
              14 oca 1996 · 03:22 · ankara
            </div>
          </div>
        </div>

        {/* natal chart */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0 8px' }}>
          <NatalChart size={240} palette={{
            ringBg: '#1a0e3d', ringStroke: 'rgba(196,170,255,.35)',
            houseStroke: 'rgba(196,170,255,.2)', planet: '#f0ebff', glyph: '#c4a4ff', accent: '#ff9ad1',
          }}/>
        </div>

        {/* placements */}
        <div style={{ display: 'flex', gap: 8, padding: '0 20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {placements.map((p, i) => (
            <div key={i} style={{
              padding: '8px 12px', borderRadius: 14,
              background: 'rgba(255,255,255,.04)', border: '1px solid ' + c.border,
              display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 90,
            }}>
              <div style={{ fontSize: 10, color: c.textMuted, fontFamily: nebulaTheme.font.mono, letterSpacing: 1 }}>
                {p.label.toUpperCase()}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                <ZodiacGlyph sign={p.sign} size={16} color={c.accent} stroke={1.4}/>
                <span style={{ fontFamily: nebulaTheme.font.display, fontSize: 15, fontStyle: 'italic' }}>{p.name}</span>
              </div>
              <div style={{ fontSize: 10, color: c.textDim, fontFamily: nebulaTheme.font.mono, marginTop: 2 }}>{p.deg}</div>
            </div>
          ))}
        </div>

        {/* settings list */}
        <div style={{ padding: '24px 20px 0' }}>
          <div style={{ fontSize: 11, color: c.textMuted, letterSpacing: 1.5, fontFamily: nebulaTheme.font.mono, marginBottom: 10, paddingLeft: 4 }}>
            AYARLAR
          </div>
          <div style={{ background: 'rgba(255,255,255,.03)', border: '1px solid ' + c.border, borderRadius: 18, overflow: 'hidden' }}>
            {settings.map((s, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', padding: '14px 16px',
                borderTop: i ? '1px solid rgba(255,255,255,.05)' : 'none', gap: 12,
              }}>
                <div style={{ width: 28, height: 28, borderRadius: 8,
                  background: 'linear-gradient(135deg, rgba(196,170,255,.25), rgba(255,154,209,.15))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, color: c.accent,
                }}>{s.icon}</div>
                <div style={{ flex: 1, fontSize: 15 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: c.textDim, fontFamily: nebulaTheme.font.mono }}>{s.val}</div>
                <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path d="M1 1l4 4-4 4" stroke={c.textMuted} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { nebulaTheme, NebulaAuth, NebulaPrompt, NebulaLoading, NebulaProfile });
