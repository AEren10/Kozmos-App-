// screens-main.jsx — screens 7-10: Bugün, Natal, Compat, Settings
// Shared bottom tab bar, full Nebula theme

// ─── bottom tab bar ───
const TABS = [
  { id: 'today', label: 'Bugün', sym: '☉' },
  { id: 'natal', label: 'Natal', sym: '◎' },
  { id: 'compat', label: 'Uyum', sym: '♀' },
  { id: 'settings', label: 'Profil', sym: '⊕' },
];

function TabBar({ active, onChange }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 50, height: 78,
      background: 'rgba(13,8,32,.85)', backdropFilter: 'blur(24px)',
      borderTop: '1px solid rgba(196,170,255,.15)',
      display: 'flex', alignItems: 'flex-start', justifyContent: 'space-around',
      paddingTop: 10, paddingBottom: 0,
    }}>
      {TABS.map(t => {
        const on = t.id === active;
        return (
          <div key={t.id} onClick={() => onChange(t.id)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
            cursor: 'pointer', minWidth: 56, paddingTop: 2,
            position: 'relative',
          }}>
            {on && (
              <div style={{
                position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                width: 32, height: 3, borderRadius: 99,
                background: 'linear-gradient(90deg,#c4a4ff,#ff9ad1)',
                boxShadow: '0 0 10px rgba(196,170,255,.8)',
              }}/>
            )}
            <div style={{
              width: 38, height: 38, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: on ? 'linear-gradient(135deg,rgba(196,170,255,.25),rgba(139,92,246,.2))' : 'transparent',
              border: on ? '1px solid rgba(196,170,255,.3)' : '1px solid transparent',
              fontSize: 18, color: on ? '#c4a4ff' : 'rgba(240,235,255,.45)',
              transition: 'all .25s',
              boxShadow: on ? '0 4px 16px rgba(139,92,246,.3)' : 'none',
            }}>{t.sym}</div>
            <div style={{ fontSize: 10, color: on ? '#c4a4ff' : 'rgba(240,235,255,.4)',
              fontFamily: 'JetBrains Mono,monospace', letterSpacing: 0.5, transition: 'color .25s' }}>
              {t.label}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 7 — BUGÜN (daily horoscope)
// ═══════════════════════════════════════════
function ScreenToday({ onTab }) {
  const transits = [
    { sym: '☽', from: 'Balık', arrow: '→', to: 'Koç', time: 'bugün 22:14', accent: '#b0dcff' },
    { sym: '☿', from: 'Oğlak', arrow: '□', to: '♃ Koç', time: '3 gün kaldı', accent: '#c4a4ff' },
    { sym: '♀', from: 'Kova', arrow: '✦', to: 'Satürn', time: 'aktif', accent: '#ff9ad1' },
  ];
  const [meterAnim, setMeterAnim] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setMeterAnim(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff', fontFamily: "'Inter',sans-serif" }}>
      <NebulaBgFull seed={17}/>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 54, paddingBottom: 78 }}>
        
        {/* header */}
        <div style={{ padding: '12px 22px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          animation: 'kz-fade-up .4s ease both' }}>
          <div>
            <div style={{ fontSize: 12, color: '#c4a4ff', fontFamily: 'JetBrains Mono,monospace',
              letterSpacing: 2, marginBottom: 3 }}>SALI · 22 NİSAN</div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 26, fontStyle: 'italic', fontWeight: 300 }}>
              iyi günler, <span style={{ color: '#c4a4ff' }}>Ela.</span>
            </div>
          </div>
          <div style={{ position: 'relative', animation: 'kz-float 4s ease-in-out infinite' }}>
            <div style={{ width: 44, height: 44, borderRadius: '50%',
              background: 'radial-gradient(circle at 33% 28%, #fff, #c4a4ff 50%, #5b2ea6)',
              boxShadow: '0 0 24px rgba(196,170,255,.7)' }}/>
            <div style={{ position: 'absolute', inset: -6, animation: 'kz-rotate 20s linear infinite' }}>
              <svg width="56" height="56" viewBox="0 0 56 56">
                <circle cx="28" cy="28" r="26" fill="none" stroke="rgba(196,170,255,.3)" strokeWidth="0.8" strokeDasharray="2 4"/>
              </svg>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px 0' }}>
          {/* daily energy card */}
          <div style={{ position: 'relative', marginBottom: 14, animation: 'kz-fade-up .5s ease both .1s' }}>
            <GlassCard style={{ padding: '18px 18px 16px' }}>
              <div style={{ fontSize: 10, color: 'rgba(196,170,255,.7)', letterSpacing: 2,
                fontFamily: 'JetBrains Mono,monospace', marginBottom: 10 }}>GÜNLÜK ENERJİ</div>
              {/* energy meters */}
              {[
                { label: 'Aşk', val: 78, color: '#ff9ad1' },
                { label: 'İş', val: 55, color: '#c4a4ff' },
                { label: 'Yaratıcılık', val: 91, color: '#ffd77a' },
              ].map((e, i) => (
                <div key={i} style={{ marginBottom: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5,
                    fontSize: 12, color: 'rgba(240,235,255,.7)' }}>
                    <span>{e.label}</span>
                    <span style={{ color: e.color, fontFamily: 'JetBrains Mono,monospace' }}>{e.val}%</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,.07)', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 3,
                      width: meterAnim ? e.val + '%' : '0%',
                      background: `linear-gradient(90deg, ${e.color}88, ${e.color})`,
                      boxShadow: `0 0 8px ${e.color}66`,
                      transition: `width .9s cubic-bezier(.4,0,.2,1) ${0.1 + i * 0.15}s`,
                    }}/>
                  </div>
                </div>
              ))}
            </GlassCard>
            {/* big number badge overlapping top-right */}
            <div style={{
              position: 'absolute', top: -12, right: 16,
              width: 42, height: 42, borderRadius: '50%',
              background: 'linear-gradient(135deg,#ffd77a,#ff9ad1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Fraunces',serif", fontSize: 18, fontStyle: 'italic', fontWeight: 600, color: '#1a0e3d',
              boxShadow: '0 6px 18px rgba(255,215,122,.5)', border: '2px solid rgba(255,255,255,.3)',
              animation: 'kz-pulse 3s ease-in-out infinite',
            }}>☉</div>
          </div>

          {/* today's message */}
          <div style={{ position: 'relative', marginBottom: 14, animation: 'kz-fade-up .5s ease both .18s' }}>
            <GlassCard style={{ padding: '18px 18px 18px' }}>
              <div style={{ fontSize: 10, color: 'rgba(196,170,255,.7)', letterSpacing: 2,
                fontFamily: 'JetBrains Mono,monospace', marginBottom: 8 }}>BUGÜN SANA</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, fontStyle: 'italic',
                lineHeight: 1.5, color: '#f0ebff' }}>
                "Balık Ayı seni rüya ve hayal dünyasına çekiyor. Bugün sezgin keskin — not defterini yanından ayırma. Venüs ile Satürn arasındaki gerilim ilişkilerde sınır koymayı hatırlatıyor."
              </div>
            </GlassCard>
            {/* moon phase badge — overlaps left edge */}
            <div style={{
              position: 'absolute', left: -8, top: '50%', transform: 'translateY(-50%)',
              width: 32, height: 32, borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #fff, #b0dcff)',
              boxShadow: '0 0 16px rgba(176,220,255,.8)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, animation: 'kz-float 5s ease-in-out infinite',
            }}>☽</div>
          </div>

          {/* transits */}
          <div style={{ animation: 'kz-fade-up .5s ease both .26s' }}>
            <div style={{ fontSize: 10, color: 'rgba(196,170,255,.6)', letterSpacing: 2,
              fontFamily: 'JetBrains Mono,monospace', marginBottom: 8, paddingLeft: 2 }}>AKTİF TRANSİTLER</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {transits.map((tr, i) => (
                <div key={i} style={{
                  padding: '12px 14px', borderRadius: 16,
                  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(196,170,255,.1)',
                  display: 'flex', alignItems: 'center', gap: 12,
                  animation: `kz-fade-up .5s ease both ${0.3 + i * 0.08}s`,
                }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: `${tr.accent}22`, border: `1px solid ${tr.accent}44`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 16, color: tr.accent }}>{tr.sym}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 500 }}>{tr.from} {tr.arrow} {tr.to}</div>
                    <div style={{ fontSize: 11, color: 'rgba(240,235,255,.5)', fontFamily: 'JetBrains Mono,monospace', marginTop: 2 }}>{tr.time}</div>
                  </div>
                  <div style={{ width: 6, height: 6, borderRadius: '50%',
                    background: tr.accent, boxShadow: `0 0 8px ${tr.accent}`,
                    animation: 'kz-pulse 2s ease-in-out infinite',
                  }}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TabBar active="today" onChange={onTab}/>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 8 — NATAL (birth chart)
// ═══════════════════════════════════════════
function ScreenNatal({ onTab }) {
  const [chartVisible, setChartVisible] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setChartVisible(true), 400); return () => clearTimeout(t); }, []);
  const placements = [
    { sym: '☉', label: 'Güneş', sign: 'Aslan', deg: '12°', color: '#ffd77a', glyph: 'leo' },
    { sym: '☽', label: 'Ay', sign: 'Balık', deg: '4°', color: '#b0dcff', glyph: 'pisces' },
    { sym: '↑', label: 'Yükselen', sign: 'Akrep', deg: '28°', color: '#c4a4ff', glyph: 'scorpio' },
    { sym: '☿', label: 'Merkür', sign: 'Oğlak', deg: '14°', color: '#d0f0c0', glyph: 'capricorn' },
    { sym: '♀', label: 'Venüs', sign: 'Kova', deg: '2°', color: '#ff9ad1', glyph: 'aquarius' },
    { sym: '♂', label: 'Mars', sign: 'Aslan', deg: '21° ℞', color: '#ff8f6b', glyph: 'leo' },
  ];

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff', fontFamily: "'Inter',sans-serif" }}>
      <NebulaBgFull seed={21}/>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 54, paddingBottom: 78 }}>

        <div style={{ padding: '12px 22px 0', animation: 'kz-fade-up .4s ease both' }}>
          <div style={{ fontSize: 10, color: '#c4a4ff', letterSpacing: 2, fontFamily: 'JetBrains Mono,monospace', marginBottom: 4 }}>
            DOĞUM HARİTASI
          </div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontStyle: 'italic', fontWeight: 300 }}>
            Ela Demir · <span style={{ color: '#c4a4ff' }}>14 Ocak 1996</span>
          </div>
        </div>

        {/* chart centered — with planet chips bleeding around it */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '16px 0 8px',
          animation: 'kz-fade-up .6s ease both .1s' }}>
          <div style={{
            opacity: chartVisible ? 1 : 0,
            transform: chartVisible ? 'scale(1) rotate(0deg)' : 'scale(.8) rotate(-10deg)',
            transition: 'all 1s cubic-bezier(.2,.8,.3,1)',
          }}>
            <NatalChart size={240} palette={{
              ringBg: '#1a0e3d', ringStroke: 'rgba(196,170,255,.35)',
              houseStroke: 'rgba(196,170,255,.18)', planet: '#f0ebff', glyph: '#c4a4ff', accent: '#ff9ad1',
            }}/>
          </div>
          {/* overlapping planet badges */}
          {[
            { top: 10, right: 16, item: placements[0] },
            { top: 10, left: 16, item: placements[1] },
            { bottom: 10, left: 16, item: placements[4] },
          ].map(({ top, right, left, bottom, item }, i) => (
            <div key={i} style={{
              position: 'absolute', top, right, left, bottom,
              padding: '6px 10px', borderRadius: 10,
              background: 'rgba(13,8,32,.75)', border: `1px solid ${item.color}55`,
              backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', gap: 7,
              opacity: chartVisible ? 1 : 0,
              transition: `opacity .5s ease ${0.6 + i * 0.15}s`,
              boxShadow: `0 4px 14px ${item.color}22`,
            }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                background: `radial-gradient(circle at 35% 30%, #fff, ${item.color})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10 }}>
                <ZodiacGlyph sign={item.glyph} size={14} color="#1a0e3d" stroke={1.6}/>
              </div>
              <div>
                <div style={{ fontSize: 9, color: item.color, fontFamily: 'JetBrains Mono,monospace', letterSpacing: 1 }}>{item.label.toUpperCase()}</div>
                <div style={{ fontSize: 12, fontFamily: "'Fraunces',serif", fontStyle: 'italic' }}>{item.sign}</div>
              </div>
            </div>
          ))}
        </div>

        {/* placement grid */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {placements.map((p, i) => (
              <div key={i} style={{
                padding: '11px 12px', borderRadius: 16,
                background: 'rgba(255,255,255,.04)',
                border: `1px solid ${p.color}33`,
                display: 'flex', alignItems: 'center', gap: 10,
                animation: `kz-fade-up .5s ease both ${0.2 + i * 0.08}s`,
                transition: 'transform .2s',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: `radial-gradient(circle at 35% 30%, #fff, ${p.color} 55%, ${p.color}88)`,
                  boxShadow: `0 0 12px ${p.color}66`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ZodiacGlyph sign={p.glyph} size={18} color="#1a0e3d" stroke={1.6}/>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 9, color: p.color, fontFamily: 'JetBrains Mono,monospace', letterSpacing: 1 }}>{p.label.toUpperCase()}</div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: 14, fontStyle: 'italic', lineHeight: 1.2 }}>
                    {p.sign}<span style={{ fontSize: 10, color: 'rgba(240,235,255,.45)', marginLeft: 4,
                      fontStyle: 'normal', fontFamily: 'JetBrains Mono,monospace' }}>{p.deg}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabBar active="natal" onChange={onTab}/>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 9 — COMPAT (synastry)
// ═══════════════════════════════════════════
function ScreenCompat({ onTab }) {
  const [score, setScore] = React.useState(0);
  React.useEffect(() => {
    let v = 0;
    const t = setInterval(() => {
      v += 2;
      if (v >= 87) { clearInterval(t); setScore(87); }
      else setScore(v);
    }, 18);
    return () => clearInterval(t);
  }, []);
  const aspects = [
    { label: 'Güneş ☌ Ay', score: 92, color: '#ffd77a', desc: 'derin duygusal bağ' },
    { label: 'Venüs △ Jüpiter', score: 88, color: '#ff9ad1', desc: 'şanslı, neşeli ilişki' },
    { label: 'Mars □ Satürn', score: 42, color: '#c4a4ff', desc: 'sürtüşme, sabır gerek' },
    { label: 'Ay △ Venüs', score: 95, color: '#b0dcff', desc: 'şiirsel uyum' },
  ];
  const [aspectsVisible, setAspectsVisible] = React.useState(false);
  React.useEffect(() => { const t = setTimeout(() => setAspectsVisible(true), 800); return () => clearTimeout(t); }, []);

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff', fontFamily: "'Inter',sans-serif" }}>
      <NebulaBgFull seed={23}/>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 54, paddingBottom: 78 }}>

        {/* header */}
        <div style={{ padding: '12px 22px 0', animation: 'kz-fade-up .4s ease both' }}>
          <div style={{ fontSize: 10, color: '#c4a4ff', letterSpacing: 2, fontFamily: 'JetBrains Mono,monospace', marginBottom: 4 }}>
            SİNASTRİ
          </div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontStyle: 'italic', fontWeight: 300 }}>
            kozmik <span style={{ color: '#ff9ad1' }}>uyum haritası</span>
          </div>
        </div>

        {/* two person cards + score */}
        <div style={{ padding: '20px 20px 0', position: 'relative', animation: 'kz-fade-up .5s ease both .1s' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
            {/* person 1 */}
            <div style={{ flex: 1, padding: '14px 12px', borderRadius: '16px 0 0 16px',
              background: 'linear-gradient(135deg,rgba(196,170,255,.15),rgba(196,170,255,.05))',
              border: '1px solid rgba(196,170,255,.25)', borderRight: 'none', textAlign: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', margin: '0 auto 8px',
                background: 'linear-gradient(135deg,#c4a4ff,#8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontFamily: "'Fraunces',serif", fontStyle: 'italic', color: '#1a0e3d',
                fontWeight: 600 }}>E</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Ela</div>
              <div style={{ fontSize: 10, color: '#c4a4ff', fontFamily: 'JetBrains Mono,monospace',
                marginTop: 3, letterSpacing: 1 }}>☉ ASLAN</div>
            </div>

            {/* score badge — overlaps both */}
            <div style={{ zIndex: 5, position: 'relative', textAlign: 'center', width: 72, flexShrink: 0 }}>
              <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto' }}>
                <svg width="72" height="72" viewBox="0 0 72 72">
                  <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="4"/>
                  <circle cx="36" cy="36" r="30" fill="none"
                    stroke="url(#compat-grad)" strokeWidth="4"
                    strokeDasharray={`${(score / 100) * 188.5} 188.5`}
                    strokeLinecap="round"
                    transform="rotate(-90 36 36)"
                    style={{ transition: 'stroke-dasharray .5s ease' }}/>
                  <defs>
                    <linearGradient id="compat-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#c4a4ff"/>
                      <stop offset="100%" stopColor="#ff9ad1"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', flexDirection: 'column' }}>
                  <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 16, fontWeight: 700,
                    background: 'linear-gradient(135deg,#c4a4ff,#ff9ad1)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{score}%</div>
                </div>
              </div>
              <div style={{ fontSize: 10, color: 'rgba(240,235,255,.5)', fontFamily: 'JetBrains Mono,monospace',
                marginTop: 4, letterSpacing: 1 }}>UYUM</div>
            </div>

            {/* person 2 */}
            <div style={{ flex: 1, padding: '14px 12px', borderRadius: '0 16px 16px 0',
              background: 'linear-gradient(135deg,rgba(255,154,209,.08),rgba(255,154,209,.04))',
              border: '1px solid rgba(255,154,209,.2)', borderLeft: 'none', textAlign: 'center' }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', margin: '0 auto 8px',
                background: 'linear-gradient(135deg,#ff9ad1,#c65d7a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, fontFamily: "'Fraunces',serif", fontStyle: 'italic', color: '#fff',
                fontWeight: 600 }}>K</div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Kaan</div>
              <div style={{ fontSize: 10, color: '#ff9ad1', fontFamily: 'JetBrains Mono,monospace',
                marginTop: 3, letterSpacing: 1 }}>☉ BOĞA</div>
            </div>
          </div>
        </div>

        {/* summary */}
        <div style={{ padding: '16px 20px 12px', animation: 'kz-fade-up .5s ease both .18s' }}>
          <GlassCard style={{ padding: '14px 16px' }}>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 15, fontStyle: 'italic', lineHeight: 1.55, color: '#f0ebff' }}>
              "Güneş-Ay birleşimi derin bir ruhsal bağa işaret ediyor. Farklı Mars enerjileri ise büyümeye alan açıyor."
            </div>
          </GlassCard>
        </div>

        {/* aspect list */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px' }}>
          <div style={{ fontSize: 10, color: 'rgba(196,170,255,.6)', letterSpacing: 2,
            fontFamily: 'JetBrains Mono,monospace', marginBottom: 10, paddingLeft: 2 }}>
            ANA ASPEKTLER
          </div>
          {aspects.map((a, i) => (
            <div key={i} style={{
              marginBottom: 9, padding: '12px 14px', borderRadius: 14,
              background: 'rgba(255,255,255,.04)', border: `1px solid ${a.color}33`,
              display: 'flex', alignItems: 'center', gap: 12,
              opacity: aspectsVisible ? 1 : 0,
              transform: aspectsVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: `all .5s ease ${i * 0.1}s`,
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{a.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(240,235,255,.5)', fontStyle: 'italic',
                  fontFamily: "'Fraunces',serif" }}>{a.desc}</div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: a.color,
                  fontFamily: 'JetBrains Mono,monospace' }}>{a.score}</div>
                <div style={{ width: 50, height: 4, borderRadius: 2, marginTop: 5,
                  background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
                  <div style={{ width: aspectsVisible ? (a.score + '%') : '0%', height: '100%', borderRadius: 2,
                    background: a.color, transition: `width .8s ease ${i * 0.1 + 0.2}s` }}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="compat" onChange={onTab}/>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 10 — SETTINGS / PROFILE
// ═══════════════════════════════════════════
function ScreenSettings({ onTab }) {
  const sections = [
    {
      title: 'Hesap',
      rows: [
        { icon: '✉', label: 'E-posta', val: 'ela@kozmos.app' },
        { icon: '🔑', label: 'Şifre', val: 'Değiştir' },
        { icon: '✦', label: 'Kozmos Pro', val: 'Aktif ✓', accent: true },
      ],
    },
    {
      title: 'Tercihler',
      rows: [
        { icon: '☾', label: 'Günlük bildirim', val: '09:00' },
        { icon: '◎', label: 'Ev sistemi', val: 'Placidus' },
        { icon: '🌐', label: 'Dil', val: 'Türkçe' },
        { icon: '◑', label: 'Tema', val: 'Nebula' },
      ],
    },
    {
      title: 'Doğum Bilgileri',
      rows: [
        { icon: '📍', label: 'Yer', val: 'Ankara, TR' },
        { icon: '⌚', label: 'Saat', val: '03:22' },
        { icon: '📅', label: 'Tarih', val: '14 Ocak 1996' },
      ],
    },
  ];

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff', fontFamily: "'Inter',sans-serif" }}>
      <NebulaBgFull seed={29}/>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 54, paddingBottom: 78 }}>

        {/* profile header */}
        <div style={{ padding: '14px 22px 20px', animation: 'kz-fade-up .4s ease both' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ position: 'relative' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg,#ff9ad1,#c4a4ff,#8b5cf6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Fraunces',serif", fontSize: 26, fontStyle: 'italic', color: '#1a0e3d', fontWeight: 600,
                boxShadow: '0 0 30px rgba(196,170,255,.5)',
              }}>E</div>
              {/* rotating ring */}
              <div style={{ position: 'absolute', inset: -8, animation: 'kz-rotate 30s linear infinite' }}>
                <svg width="80" height="80" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="38" fill="none" stroke="rgba(196,170,255,.3)" strokeWidth="0.8" strokeDasharray="2 6"/>
                  <circle cx="78" cy="40" r="3" fill="#c4a4ff"/>
                </svg>
              </div>
            </div>
            <div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontStyle: 'italic', fontWeight: 400 }}>Ela Demir</div>
              <div style={{ fontSize: 11, color: 'rgba(240,235,255,.5)', fontFamily: 'JetBrains Mono,monospace',
                letterSpacing: 1, marginTop: 3 }}>☉ ASLAN · ☽ BALIK · ↑ AKREP</div>
            </div>
          </div>

          {/* mini big-3 badges — overlap onto settings below */}
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            {[
              { sym: '☉', sign: 'Aslan', color: '#ffd77a' },
              { sym: '☽', sign: 'Balık', color: '#b0dcff' },
              { sym: '↑', sign: 'Akrep', color: '#c4a4ff' },
            ].map((b, i) => (
              <div key={i} style={{
                flex: 1, padding: '8px 10px', borderRadius: 12,
                background: `${b.color}14`, border: `1px solid ${b.color}44`,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 14, color: b.color, marginBottom: 2 }}>{b.sym}</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 13, fontStyle: 'italic' }}>{b.sign}</div>
              </div>
            ))}
          </div>
        </div>

        {/* settings */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 18px' }}>
          {sections.map((sec, si) => (
            <div key={si} style={{ marginBottom: 18, animation: `kz-fade-up .5s ease both ${si * 0.1}s` }}>
              <div style={{ fontSize: 10, color: 'rgba(196,170,255,.6)', letterSpacing: 2,
                fontFamily: 'JetBrains Mono,monospace', marginBottom: 8, paddingLeft: 4 }}>
                {sec.title.toUpperCase()}
              </div>
              <div style={{ borderRadius: 18, overflow: 'hidden',
                background: 'rgba(255,255,255,.04)', border: '1px solid rgba(196,170,255,.12)' }}>
                {sec.rows.map((row, ri) => (
                  <div key={ri} style={{
                    display: 'flex', alignItems: 'center', padding: '14px 16px', gap: 12,
                    borderTop: ri ? '1px solid rgba(255,255,255,.05)' : 'none',
                  }}>
                    <div style={{ width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                      background: 'linear-gradient(135deg,rgba(196,170,255,.2),rgba(255,154,209,.1))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14 }}>{row.icon}</div>
                    <div style={{ flex: 1, fontSize: 15 }}>{row.label}</div>
                    <div style={{
                      fontSize: 12, fontFamily: 'JetBrains Mono,monospace',
                      color: row.accent ? '#c4a4ff' : 'rgba(240,235,255,.45)',
                      letterSpacing: row.accent ? 0.5 : 0,
                    }}>{row.val}</div>
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                      <path d="M1 1l4 4-4 4" stroke="rgba(240,235,255,.25)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* sign out */}
          <div style={{ marginBottom: 12, borderRadius: 14, overflow: 'hidden',
            background: 'rgba(255,100,100,.06)', border: '1px solid rgba(255,100,100,.15)',
            animation: 'kz-fade-up .5s ease both .3s' }}>
            <div style={{ padding: '14px 16px', fontSize: 14, color: 'rgba(255,120,120,.8)',
              textAlign: 'center', cursor: 'pointer' }}>Çıkış Yap</div>
          </div>
        </div>
      </div>
      <TabBar active="settings" onChange={onTab}/>
    </div>
  );
}

Object.assign(window, { ScreenToday, ScreenNatal, ScreenCompat, ScreenSettings, TabBar });
