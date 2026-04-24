// screens-onboarding.jsx — screens 1-6: Login, Register, Intro, Birth, Reveal, Paywall
// All use Nebula theme

// ─── shared bg (imported from nebulaTheme) ───
function NebulaBgFull({ seed = 1 }) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden',
      background: 'radial-gradient(ellipse 130% 90% at 50% -5%, #3a1d6e 0%, #1a0e3d 40%, #0d0820 75%)' }}>
      <div style={{ position: 'absolute', top: '15%', left: '-25%', width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(196,170,255,.3), transparent 65%)', filter: 'blur(50px)' }}/>
      <div style={{ position: 'absolute', bottom: '-15%', right: '-20%', width: 340, height: 340, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,154,209,.22), transparent 65%)', filter: 'blur(60px)' }}/>
      <div style={{ position: 'absolute', top: '60%', left: '50%', width: 180, height: 180, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(100,160,255,.2), transparent 65%)', filter: 'blur(35px)' }}/>
      <Starfield seed={seed} count={80} color="#fff"/>
    </div>
  );
}

// ─── glass card ───
function GlassCard({ children, style = {}, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: 'rgba(255,255,255,.05)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(196,170,255,.2)',
      borderRadius: 24, ...style,
    }}>{children}</div>
  );
}

// ─── input field ───
function GlassInput({ placeholder, type = 'text', icon, delay = 0 }) {
  return (
    <div style={{
      height: 54, borderRadius: 16, padding: '0 16px',
      background: 'rgba(255,255,255,.06)', border: '1px solid rgba(196,170,255,.2)',
      display: 'flex', alignItems: 'center', gap: 10,
      animation: `kz-fade-up .5s ease both ${delay}s`,
    }}>
      {icon && <span style={{ color: '#c4a4ff', fontSize: 16 }}>{icon}</span>}
      <div style={{ flex: 1, fontSize: 15, color: 'rgba(240,235,255,.45)',
        fontStyle: 'italic', fontFamily: "'Fraunces', serif" }}>{placeholder}</div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 1 — LOGIN
// ═══════════════════════════════════════════
function ScreenLogin({ onNext }) {
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff', fontFamily: "'Inter', sans-serif" }}>
      <NebulaBgFull seed={1}/>

      {/* floating orb — overlaps everything */}
      <div style={{
        position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
        width: 160, height: 160, zIndex: 3, animation: 'kz-float 5s ease-in-out infinite',
      }}>
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          background: 'radial-gradient(circle at 32% 28%, #fff, #c4a4ff 45%, #5b2ea6 90%)',
          boxShadow: '0 0 80px rgba(196,170,255,.7), inset -12px -18px 30px rgba(30,0,80,.4)',
        }}/>
        {/* orbiting ring */}
        <div style={{ position: 'absolute', inset: -20, animation: 'kz-rotate 18s linear infinite' }}>
          <svg width="200" height="200" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="95" fill="none" stroke="rgba(196,170,255,.25)" strokeWidth="1" strokeDasharray="3 8"/>
            <circle cx="195" cy="100" r="4" fill="#ff9ad1"/>
          </svg>
        </div>
        <div style={{ position: 'absolute', inset: -10, animation: 'kz-rotate-rev 12s linear infinite' }}>
          <svg width="180" height="180" viewBox="0 0 180 180">
            <circle cx="90" cy="90" r="85" fill="none" stroke="rgba(255,154,209,.2)" strokeWidth="0.7" strokeDasharray="2 5"/>
            <circle cx="90" cy="5" r="3" fill="#c4a4ff"/>
          </svg>
        </div>
      </div>

      {/* logo text — sits on top of the orb */}
      <div style={{ position: 'absolute', top: 198, width: '100%', textAlign: 'center', zIndex: 4,
        animation: 'kz-fade-up .7s ease both .1s' }}>
        <div style={{ fontFamily: "'Fraunces', serif", fontSize: 42, fontStyle: 'italic',
          fontWeight: 300, letterSpacing: -1, color: '#fff',
          textShadow: '0 0 30px rgba(196,170,255,.8)' }}>kozmos</div>
        <div style={{ fontSize: 11, color: 'rgba(196,170,255,.8)', letterSpacing: 3,
          fontFamily: 'JetBrains Mono, monospace', marginTop: 4 }}>YILDIZLARIN REHBERLİĞİNDE</div>
      </div>

      {/* bottom sheet — overlaps the orb slightly */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 5,
        padding: '32px 24px 40px',
        background: 'linear-gradient(to bottom, transparent 0%, rgba(13,8,32,.95) 20%)',
        animation: 'kz-fade-up .7s ease both .2s',
      }}>
        {/* social auth */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[
            { icon: '⬡', label: 'Apple ile gir' },
            { icon: '◉', label: 'Google ile gir' },
          ].map((b, i) => (
            <button key={i} onClick={onNext} style={{
              flex: 1, height: 50, borderRadius: 14, cursor: 'pointer',
              background: i === 0 ? 'rgba(255,255,255,.96)' : 'rgba(255,255,255,.08)',
              border: '1px solid rgba(196,170,255,.25)',
              color: i === 0 ? '#1a0e3d' : '#f0ebff',
              fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 8,
              animation: `kz-fade-up .5s ease both ${0.3 + i * 0.08}s`,
            }}>
              <span style={{ fontSize: 15 }}>{b.icon}</span>{b.label}
            </button>
          ))}
        </div>

        {/* divider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
          animation: 'kz-fade-up .5s ease both .45s' }}>
          <div style={{ flex: 1, height: 0.5, background: 'rgba(196,170,255,.2)' }}/>
          <span style={{ fontSize: 11, color: 'rgba(240,235,255,.4)', fontFamily: 'JetBrains Mono,monospace', letterSpacing: 2 }}>veya</span>
          <div style={{ flex: 1, height: 0.5, background: 'rgba(196,170,255,.2)' }}/>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          <GlassInput placeholder="e-posta" icon="✉" delay={0.5}/>
          <GlassInput placeholder="şifre" type="password" icon="✦" delay={0.58}/>
        </div>

        {/* forgot */}
        <div style={{ textAlign: 'right', fontSize: 12, color: '#c4a4ff', marginBottom: 16,
          animation: 'kz-fade-up .5s ease both .65s', fontStyle: 'italic', fontFamily: "'Fraunces',serif" }}>
          şifremi unuttum →
        </div>

        <button onClick={onNext} style={{
          width: '100%', height: 54, borderRadius: 27, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #c4a4ff, #8b5cf6)',
          color: '#1a0e3d', fontSize: 16, fontWeight: 700,
          boxShadow: '0 10px 40px rgba(139,92,246,.55), inset 0 1px 0 rgba(255,255,255,.5)',
          animation: 'kz-fade-up .5s ease both .7s, kz-glow 3s ease-in-out 1.2s infinite',
        }}>Giriş Yap</button>

        <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'rgba(240,235,255,.5)',
          animation: 'kz-fade-up .5s ease both .75s' }}>
          hesabın yok mu? &nbsp;
          <span style={{ color: '#c4a4ff', fontStyle: 'italic', fontFamily: "'Fraunces',serif",
            cursor: 'pointer' }} onClick={onNext}>kaydol →</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 2 — REGISTER
// ═══════════════════════════════════════════
function ScreenRegister({ onNext }) {
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff', fontFamily: "'Inter',sans-serif" }}>
      <NebulaBgFull seed={7}/>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', padding: '80px 24px 32px' }}>
        {/* back */}
        <div style={{ fontSize: 13, color: 'rgba(196,170,255,.7)', marginBottom: 28,
          animation: 'kz-fade-up .4s ease both',
          fontStyle: 'italic', fontFamily: "'Fraunces',serif" }}>← geri</div>

        <div style={{ animation: 'kz-fade-up .5s ease both .05s', marginBottom: 28 }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontStyle: 'italic',
            fontWeight: 300, lineHeight: 1.1, marginBottom: 8 }}>
            kozmosa <span style={{ color: '#c4a4ff' }}>hoş geldin.</span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(240,235,255,.55)', lineHeight: 1.6 }}>
            haritanı çıkarmak için önce seni tanıyalım.
          </div>
        </div>

        {/* name row — two inputs side by side */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
          <GlassInput placeholder="adın" delay={0.15}/>
          <GlassInput placeholder="soyadın" delay={0.2}/>
        </div>
        <div style={{ marginBottom: 10 }}><GlassInput placeholder="e-posta adresi" icon="✉" delay={0.25}/></div>
        <div style={{ marginBottom: 10 }}><GlassInput placeholder="şifre" type="password" icon="✦" delay={0.3}/></div>

        {/* password strength bar — layered on top of next element */}
        <div style={{ position: 'relative', marginBottom: 20, animation: 'kz-fade-up .5s ease both .35s' }}>
          <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
            <div style={{ width: '65%', height: '100%', borderRadius: 2,
              background: 'linear-gradient(90deg, #c4a4ff, #ff9ad1)',
              boxShadow: '0 0 8px rgba(196,170,255,.6)' }}/>
          </div>
          <div style={{ position: 'absolute', right: 0, top: -18, fontSize: 10,
            fontFamily: 'JetBrains Mono,monospace', color: '#c4a4ff', letterSpacing: 1 }}>orta güçlü</div>
        </div>

        {/* terms */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 24,
          animation: 'kz-fade-up .5s ease both .4s' }}>
          <div style={{
            width: 20, height: 20, borderRadius: 6, flexShrink: 0,
            background: 'linear-gradient(135deg,#c4a4ff,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 11, color: '#1a0e3d', fontWeight: 700, marginTop: 1,
          }}>✓</div>
          <div style={{ fontSize: 12, color: 'rgba(240,235,255,.5)', lineHeight: 1.5 }}>
            <span style={{ color: '#c4a4ff' }}>kullanım şartlarını</span> ve <span style={{ color: '#c4a4ff' }}>gizlilik politikasını</span> kabul ediyorum
          </div>
        </div>

        <div style={{ flex: 1 }}/>

        {/* CTA */}
        <button onClick={onNext} style={{
          width: '100%', height: 54, borderRadius: 27, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg, #c4a4ff, #8b5cf6)',
          color: '#1a0e3d', fontSize: 16, fontWeight: 700,
          boxShadow: '0 10px 40px rgba(139,92,246,.5), inset 0 1px 0 rgba(255,255,255,.5)',
          animation: 'kz-fade-up .5s ease both .45s',
        }}>Haritamı Oluştur →</button>

        {/* teaser — what comes next */}
        <div style={{
          marginTop: 14, padding: '10px 14px', borderRadius: 12,
          background: 'rgba(196,170,255,.07)', border: '1px solid rgba(196,170,255,.15)',
          display: 'flex', alignItems: 'center', gap: 10,
          animation: 'kz-fade-up .5s ease both .5s',
        }}>
          <span style={{ fontSize: 18 }}>☽</span>
          <span style={{ fontSize: 12, color: 'rgba(240,235,255,.6)', fontStyle: 'italic',
            fontFamily: "'Fraunces',serif" }}>
            sonraki adım: doğum bilgilerin →
          </span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 3 — ONBOARDING INTRO (swipe)
// ═══════════════════════════════════════════
const INTRO_SLIDES = [
  {
    icon: '☉', title: 'Haritanı Keşfet', sub: 'Güneş, Ay, Yükselen — üç büyük ışık seni tanımlar. Hepsini tek bakışta gör.',
    bg: 'radial-gradient(ellipse at 30% 30%, #3a1d6e, #0d0820)',
    accentClr: '#c4a4ff',
    Illustration: () => (
      <div style={{ position: 'relative', width: 200, height: 200, margin: '0 auto' }}>
        <div style={{ animation: 'kz-rotate 30s linear infinite', position: 'absolute', inset: 0 }}>
          <OrbitRings size={200} color="rgba(196,170,255,.3)" count={3}/>
        </div>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 70, height: 70, borderRadius: '50%',
            background: 'radial-gradient(circle at 33% 28%, #fff, #c4a4ff 50%, #5b2ea6)',
            boxShadow: '0 0 50px rgba(196,170,255,.8)', animation: 'kz-float 4s ease-in-out infinite' }}/>
        </div>
        <div style={{ position: 'absolute', '--r': '88px', top: '50%', left: '50%', width: 10, height: 10,
          borderRadius: '50%', background: '#ff9ad1', boxShadow: '0 0 12px #ff9ad1', marginTop: -5, marginLeft: -5,
          animation: 'kz-orbit 10s linear infinite' }}/>
      </div>
    ),
  },
  {
    icon: '☽', title: 'Günlük Rehberlik', sub: 'Her sabah gökyüzü sana ne söylüyor? Transitler, retrogradlar, fırsatlar.',
    bg: 'radial-gradient(ellipse at 70% 20%, #1a0e3d, #0d0820)',
    accentClr: '#b0dcff',
    Illustration: () => (
      <div style={{ position: 'relative', width: 200, height: 180, margin: '0 auto' }}>
        {[0,1,2].map(i => (
          <div key={i} style={{
            position: 'absolute', left: 20 + i * 46, top: i % 2 === 0 ? 20 : 50, 
            width: 88, height: 120, borderRadius: 20,
            background: `linear-gradient(160deg, rgba(176,220,255,${0.12 - i * 0.03}), rgba(196,170,255,.06))`,
            border: `1px solid rgba(196,170,255,${0.3 - i * 0.08})`,
            backdropFilter: 'blur(8px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: 10, boxShadow: `0 ${8 + i*4}px ${20 + i*8}px rgba(0,0,0,.3)`,
          }}>
            <div style={{ width: '60%', height: 6, borderRadius: 3,
              background: 'rgba(196,170,255,.4)', marginBottom: 5 }}/>
            <div style={{ width: '80%', height: 4, borderRadius: 2,
              background: 'rgba(196,170,255,.2)' }}/>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: '♀', title: 'Kozmik Uyum', sub: 'Sevdiklerinle olan kozmik bağı gör. Sinastri haritanı karşılaştır.',
    bg: 'radial-gradient(ellipse at 50% 10%, #2b0e2e, #0d0820)',
    accentClr: '#ff9ad1',
    Illustration: () => (
      <div style={{ position: 'relative', width: 200, height: 180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* two orbs overlapping */}
        <div style={{ position: 'absolute', left: 30, top: 40, width: 90, height: 90, borderRadius: '50%',
          background: 'radial-gradient(circle at 33% 28%, #e8d5ff, #c4a4ff 50%, #5b2ea6)',
          boxShadow: '0 0 40px rgba(196,170,255,.6)', animation: 'kz-float 4s ease-in-out infinite' }}/>
        <div style={{ position: 'absolute', right: 30, top: 50, width: 80, height: 80, borderRadius: '50%',
          background: 'radial-gradient(circle at 33% 28%, #ffd5e8, #ff9ad1 50%, #a02070)',
          boxShadow: '0 0 40px rgba(255,154,209,.6)', animation: 'kz-float 4s ease-in-out .5s infinite' }}/>
        {/* link */}
        <div style={{ position: 'absolute', top: 78, left: '50%', transform: 'translateX(-50%)',
          fontSize: 20, color: '#fff', textShadow: '0 0 15px rgba(255,200,255,.8)' }}>✦</div>
      </div>
    ),
  },
];

function ScreenIntro({ onNext }) {
  const [slide, setSlide] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % 3), 3200);
    return () => clearInterval(t);
  }, []);
  const s = INTRO_SLIDES[slide];
  const Illus = s.Illustration;
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff',
      fontFamily: "'Inter',sans-serif", transition: 'background .8s ease', background: s.bg }}>
      <NebulaBgFull seed={3}/>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* skip */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '66px 24px 0' }}>
          <span style={{ fontSize: 13, color: 'rgba(240,235,255,.5)', fontStyle: 'italic',
            fontFamily: "'Fraunces',serif", cursor: 'pointer' }} onClick={onNext}>atla →</span>
        </div>

        {/* illustration — bleeds past card */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px 0' }}>
          <Illus/>
        </div>

        {/* bottom card */}
        <div style={{
          margin: '0 16px 32px', padding: '28px 24px 28px',
          background: 'rgba(255,255,255,.06)', backdropFilter: 'blur(24px)',
          border: '1px solid rgba(196,170,255,.2)', borderRadius: 28,
          boxShadow: '0 -20px 60px rgba(0,0,0,.25)',
        }}>
          {/* icon badge — overlaps top border */}
          <div style={{
            position: 'relative', marginTop: -52, marginBottom: 16,
            display: 'flex', justifyContent: 'center',
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: 'linear-gradient(135deg,#c4a4ff,#8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, boxShadow: `0 0 30px rgba(196,170,255,.7)`,
              border: '2px solid rgba(255,255,255,.2)',
            }}>{s.icon}</div>
          </div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontStyle: 'italic',
            fontWeight: 300, textAlign: 'center', marginBottom: 10, key: slide }}>{s.title}</div>
          <div style={{ fontSize: 14, color: 'rgba(240,235,255,.65)', lineHeight: 1.6,
            textAlign: 'center', marginBottom: 24 }}>{s.sub}</div>

          {/* dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
            {[0,1,2].map(i => (
              <div key={i} onClick={() => setSlide(i)} style={{
                width: i === slide ? 24 : 8, height: 8, borderRadius: 4, cursor: 'pointer',
                background: i === slide ? s.accentClr : 'rgba(255,255,255,.2)',
                transition: 'all .4s ease', boxShadow: i === slide ? `0 0 10px ${s.accentClr}` : 'none',
              }}/>
            ))}
          </div>

          <button onClick={onNext} style={{
            width: '100%', height: 54, borderRadius: 27, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#c4a4ff,#8b5cf6)',
            color: '#1a0e3d', fontSize: 16, fontWeight: 700,
            boxShadow: '0 10px 40px rgba(139,92,246,.5)',
          }}>Başla →</button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 4 — BIRTH ONBOARDING (9 adım, adım 4 görünür)
// ═══════════════════════════════════════════
const BIRTH_STEPS = [
  'İsmin', 'Cinsiyetin', 'İlgi alanların', 'Doğum tarihin',
  'Doğum saatin', 'Doğum yerin', 'Hedefin', 'Bildirim tercihin', 'Özet',
];
const INTEREST_CHIPS = ['aşk', 'kariyer', 'sağlık', 'manevi büyüme', 'para', 'aile', 'rüyalar', 'seyahat'];

function ScreenBirth({ onNext }) {
  const step = 3; // 0-indexed, showing step 4
  const [selected, setSelected] = React.useState(['aşk', 'manevi büyüme']);
  const [activeDay, setActiveDay] = React.useState(14);
  const months = ['OCA', 'ŞUB', 'MAR', 'NİS', 'MAY', 'HAZ', 'TEM', 'AĞU', 'EYL', 'EKİ', 'KAS', 'ARA'];

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff', fontFamily: "'Inter',sans-serif" }}>
      <NebulaBgFull seed={5}/>
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', paddingTop: 54 }}>

        {/* progress header */}
        <div style={{ padding: '14px 24px 0', animation: 'kz-fade-up .4s ease both' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <div style={{ fontSize: 12, color: 'rgba(240,235,255,.5)', fontFamily: 'JetBrains Mono,monospace', letterSpacing: 1 }}>
              {step + 1} / {BIRTH_STEPS.length}
            </div>
            <div style={{ fontFamily: "'Fraunces',serif", fontStyle: 'italic', fontSize: 13, color: '#c4a4ff' }}>
              {BIRTH_STEPS[step]}
            </div>
          </div>
          {/* progress bar */}
          <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,.08)', overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 2,
              width: `${((step + 1) / BIRTH_STEPS.length) * 100}%`,
              background: 'linear-gradient(90deg,#c4a4ff,#ff9ad1)',
              boxShadow: '0 0 10px rgba(196,170,255,.6)',
              transition: 'width .6s cubic-bezier(.4,0,.2,1)',
            }}/>
          </div>
          {/* step pills */}
          <div style={{ display: 'flex', gap: 4, marginTop: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {BIRTH_STEPS.map((s, i) => (
              <div key={i} style={{
                height: 4, borderRadius: 2, flexShrink: 0,
                width: i <= step ? 20 : 8,
                background: i < step ? '#c4a4ff' : i === step ? '#ff9ad1' : 'rgba(255,255,255,.12)',
                transition: 'all .4s', boxShadow: i === step ? '0 0 8px #ff9ad1' : 'none',
              }}/>
            ))}
          </div>
        </div>

        {/* question */}
        <div style={{ padding: '24px 24px 16px', animation: 'kz-fade-up .5s ease both .1s' }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 30, fontStyle: 'italic',
            fontWeight: 300, lineHeight: 1.15 }}>
            doğum <span style={{ color: '#c4a4ff' }}>tarihin</span><br/>nedir?
          </div>
        </div>

        {/* date picker card — overlapping elements */}
        <div style={{ margin: '0 18px', position: 'relative', animation: 'kz-fade-up .5s ease both .18s' }}>
          <GlassCard style={{ padding: 20 }}>
            {/* month selector */}
            <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 8, marginBottom: 14 }}>
              {months.map((m, i) => (
                <div key={m} style={{
                  padding: '7px 10px', borderRadius: 10, flexShrink: 0,
                  background: i === 0 ? 'linear-gradient(135deg,#c4a4ff,#8b5cf6)' : 'rgba(255,255,255,.06)',
                  border: i === 0 ? 'none' : '1px solid rgba(196,170,255,.15)',
                  fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: 1,
                  color: i === 0 ? '#1a0e3d' : 'rgba(240,235,255,.5)',
                  boxShadow: i === 0 ? '0 4px 12px rgba(139,92,246,.4)' : 'none',
                  cursor: 'pointer',
                }}>{m}</div>
              ))}
            </div>
            {/* day grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 5 }}>
              {Array.from({ length: 31 }, (_, i) => i + 1).map(d => (
                <div key={d} onClick={() => setActiveDay(d)} style={{
                  height: 34, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 13, cursor: 'pointer', position: 'relative',
                  background: d === activeDay
                    ? 'linear-gradient(135deg,#c4a4ff,#8b5cf6)'
                    : 'rgba(255,255,255,.04)',
                  color: d === activeDay ? '#1a0e3d' : 'rgba(240,235,255,.7)',
                  fontWeight: d === activeDay ? 700 : 400,
                  boxShadow: d === activeDay ? '0 4px 14px rgba(139,92,246,.5)' : 'none',
                  border: d === activeDay ? 'none' : '1px solid rgba(255,255,255,.06)',
                  transition: 'all .2s',
                }}>{d}</div>
              ))}
            </div>
          </GlassCard>

          {/* year badge — overlaps the card */}
          <div style={{
            position: 'absolute', top: -14, right: 14,
            background: 'linear-gradient(135deg,#ff9ad1,#c4a4ff)',
            borderRadius: 12, padding: '5px 12px',
            fontFamily: 'JetBrains Mono,monospace', fontSize: 13, fontWeight: 700, color: '#1a0e3d',
            boxShadow: '0 6px 20px rgba(255,154,209,.4)', border: '2px solid rgba(255,255,255,.3)',
          }}>1996</div>
        </div>

        <div style={{ flex: 1 }}/>

        {/* next */}
        <div style={{ padding: '0 24px 32px', animation: 'kz-fade-up .5s ease both .28s' }}>
          <button onClick={onNext} style={{
            width: '100%', height: 54, borderRadius: 27, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#c4a4ff,#8b5cf6)',
            color: '#1a0e3d', fontSize: 16, fontWeight: 700,
            boxShadow: '0 10px 35px rgba(139,92,246,.5)',
          }}>
            Devam → (5/9)
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 5 — REVEAL (Sun/Moon/Rising animation)
// ═══════════════════════════════════════════
const REVEAL_ITEMS = [
  { sym: '☉', label: 'GÜNEŞ', sign: 'Aslan', glyph: 'leo',
    color: '#ffd77a', glow: 'rgba(255,215,122,.7)',
    desc: 'yaratıcılık, sahne ve liderlik içinde' },
  { sym: '☽', label: 'AY', sign: 'Balık', glyph: 'pisces',
    color: '#b0dcff', glow: 'rgba(176,220,255,.7)',
    desc: 'rüyalar ve his dünyasında ev yapar' },
  { sym: '↑', label: 'YÜKSELENİN', sign: 'Akrep', glyph: 'scorpio',
    color: '#c4a4ff', glow: 'rgba(196,170,255,.7)',
    desc: 'yoğun, dönüştürücü bir yüzey' },
];

function ScreenReveal({ onNext }) {
  const [phase, setPhase] = React.useState(0); // 0=loading, 1=reveal, 2=done
  React.useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff', fontFamily: "'Inter',sans-serif" }}>
      <NebulaBgFull seed={9}/>
      {/* extra sparkle field on reveal */}
      {phase >= 1 && <Starfield seed={42} count={40} color="#ffd77a"/>}
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', paddingTop: 80, paddingBottom: 32, paddingLeft: 24, paddingRight: 24 }}>

        {/* rotating outer rings */}
        <div style={{ position: 'absolute', top: 80, left: '50%', transform: 'translateX(-50%)', width: 320, height: 320, zIndex: 0 }}>
          <div style={{ animation: 'kz-rotate 40s linear infinite', position: 'absolute', inset: 0 }}>
            <OrbitRings size={320} color="rgba(196,170,255,.2)" count={2}/>
          </div>
        </div>

        {/* hero text */}
        <div style={{ textAlign: 'center', marginBottom: 40, zIndex: 2 }}>
          <div style={{ fontFamily: 'JetBrains Mono,monospace', fontSize: 10, color: '#c4a4ff',
            letterSpacing: 4, marginBottom: 14, animation: 'kz-fade-up .5s ease both' }}>
            ✦ &nbsp; HARITANIZ HAZIR &nbsp; ✦
          </div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontStyle: 'italic',
            fontWeight: 300, lineHeight: 1.1, animation: 'kz-fade-up .6s ease both .1s' }}>
            işte senin<br/><span style={{ color: '#c4a4ff' }}>kozmik imzan.</span>
          </div>
        </div>

        {/* three reveal cards */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14, zIndex: 2 }}>
          {REVEAL_ITEMS.map((item, i) => (
            <div key={i} style={{
              position: 'relative', padding: '18px 18px 18px 14px', borderRadius: 22,
              background: `linear-gradient(135deg, rgba(255,255,255,.07), rgba(255,255,255,.02))`,
              border: `1px solid ${item.color}44`,
              backdropFilter: 'blur(16px)',
              display: 'flex', alignItems: 'center', gap: 16,
              opacity: phase >= 1 ? 1 : 0,
              transform: phase >= 1 ? 'translateY(0) scale(1)' : 'translateY(20px) scale(.95)',
              transition: `all .7s cubic-bezier(.2,.8,.3,1) ${0.1 + i * 0.22}s`,
              boxShadow: phase >= 1 ? `0 8px 30px ${item.glow}22, inset 0 1px 0 rgba(255,255,255,.08)` : 'none',
            }}>
              {/* glyph orb — bleeds outside card */}
              <div style={{
                width: 54, height: 54, borderRadius: '50%', flexShrink: 0,
                background: `radial-gradient(circle at 35% 30%, #fff, ${item.color} 50%, ${item.color}88)`,
                boxShadow: `0 0 30px ${item.glow}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: phase >= 1 ? `kz-float ${4 + i}s ease-in-out ${i * 0.3}s infinite` : 'none',
              }}>
                <ZodiacGlyph sign={item.glyph} size={28} color="#1a0e3d" stroke={1.8}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono,monospace',
                    color: item.color, letterSpacing: 2 }}>{item.label}</span>
                  <span style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontStyle: 'italic',
                    fontWeight: 400, color: '#fff' }}>{item.sign}</span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(240,235,255,.6)', lineHeight: 1.4, fontStyle: 'italic',
                  fontFamily: "'Fraunces',serif" }}>{item.desc}</div>
              </div>
              {/* symbol overlay */}
              <div style={{ position: 'absolute', top: 10, right: 14, fontSize: 24,
                color: item.color, opacity: .35, fontFamily: 'serif' }}>{item.sym}</div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }}/>

        <button onClick={onNext} style={{
          width: '100%', height: 56, borderRadius: 28, border: 'none', cursor: 'pointer',
          background: 'linear-gradient(135deg,#c4a4ff,#8b5cf6)',
          color: '#1a0e3d', fontSize: 16, fontWeight: 700, letterSpacing: 0.3,
          boxShadow: '0 10px 40px rgba(139,92,246,.55)',
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity .6s ease .3s',
        }}>Haritamı Görüntüle ✦</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════
// SCREEN 6 — PAYWALL
// ═══════════════════════════════════════════
const PAYWALL_FEATURES = [
  { icon: '♃', label: 'Sınırsız soru', desc: 'yıldızlara istediğin kadar sor' },
  { icon: '☿', label: 'Retrograd uyarıları', desc: 'günlük transit bildirimleri' },
  { icon: '♀', label: 'Derin sinastri', desc: 'birebir uyumluluk analizi' },
  { icon: '☽', label: 'Rüya günlüğü', desc: 'ay ile ilişkilendirilmiş notlar' },
];

function ScreenPaywall({ onNext }) {
  const [plan, setPlan] = React.useState('yearly');
  return (
    <div style={{ position: 'relative', height: '100%', overflow: 'hidden', color: '#f0ebff', fontFamily: "'Inter',sans-serif" }}>
      {/* gradient bg */}
      <div style={{ position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 140% 80% at 50% -10%, #4a1570 0%, #1a0e3d 40%, #0d0820 80%)' }}>
        <Starfield seed={11} count={60} color="#fff"/>
        {/* shimmer ring */}
        <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: 320, height: 320 }}>
          <div style={{ animation: 'kz-rotate 25s linear infinite', position: 'absolute', inset: 0 }}>
            <OrbitRings size={320} color="rgba(196,170,255,.18)" count={3}/>
          </div>
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 2, height: '100%', overflowY: 'auto', paddingTop: 54 }}>
        {/* header */}
        <div style={{ textAlign: 'center', padding: '28px 24px 0', animation: 'kz-fade-up .5s ease both' }}>
          <div style={{ display: 'inline-block', padding: '6px 16px', borderRadius: 99,
            background: 'linear-gradient(135deg,#ff9ad1,#c4a4ff)', marginBottom: 18,
            fontSize: 11, fontFamily: 'JetBrains Mono,monospace', letterSpacing: 2, color: '#1a0e3d', fontWeight: 700 }}>
            ✦ KOZMOS PRO
          </div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 32, fontStyle: 'italic',
            fontWeight: 300, lineHeight: 1.1, marginBottom: 10 }}>
            yıldızlar seninle<br/><span style={{ color: '#c4a4ff' }}>her zaman konuşsun.</span>
          </div>
          <div style={{ fontSize: 13, color: 'rgba(240,235,255,.55)', lineHeight: 1.6 }}>
            tam deneyim için kozmos pro'ya geç.
          </div>
        </div>

        {/* features */}
        <div style={{ padding: '24px 20px 16px' }}>
          {PAYWALL_FEATURES.map((f, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '11px 0',
              borderBottom: i < PAYWALL_FEATURES.length - 1 ? '1px solid rgba(196,170,255,.1)' : 'none',
              animation: `kz-fade-up .5s ease both ${i * 0.09}s`,
            }}>
              <div style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0,
                background: 'linear-gradient(135deg,rgba(196,170,255,.2),rgba(255,154,209,.1))',
                border: '1px solid rgba(196,170,255,.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, color: '#c4a4ff' }}>{f.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{f.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(240,235,255,.5)' }}>{f.desc}</div>
              </div>
              <div style={{ color: '#c4a4ff', fontSize: 14 }}>✓</div>
            </div>
          ))}
        </div>

        {/* plan toggle */}
        <div style={{ padding: '0 20px', display: 'flex', gap: 10 }}>
          {[
            { id: 'yearly', label: 'Yıllık', price: '₺29/ay', badge: '%50 indirim' },
            { id: 'monthly', label: 'Aylık', price: '₺59/ay', badge: null },
          ].map(p => (
            <div key={p.id} onClick={() => setPlan(p.id)} style={{
              flex: 1, padding: '14px 10px', borderRadius: 18, cursor: 'pointer', position: 'relative',
              background: plan === p.id
                ? 'linear-gradient(135deg,rgba(196,170,255,.18),rgba(139,92,246,.14))'
                : 'rgba(255,255,255,.04)',
              border: `1.5px solid ${plan === p.id ? '#c4a4ff' : 'rgba(196,170,255,.15)'}`,
              textAlign: 'center',
              boxShadow: plan === p.id ? '0 6px 24px rgba(139,92,246,.3)' : 'none',
              transition: 'all .25s',
            }}>
              {p.badge && (
                <div style={{
                  position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)',
                  background: 'linear-gradient(135deg,#ff9ad1,#c4a4ff)',
                  borderRadius: 99, padding: '3px 10px',
                  fontSize: 9, fontFamily: 'JetBrains Mono,monospace', color: '#1a0e3d', fontWeight: 700, letterSpacing: 1, whiteSpace: 'nowrap',
                }}>{p.badge}</div>
              )}
              <div style={{ fontSize: 12, color: 'rgba(240,235,255,.6)', marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: plan === p.id ? '#f0ebff' : 'rgba(240,235,255,.6)' }}>{p.price}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding: '16px 20px 12px', animation: 'kz-fade-up .5s ease both .35s' }}>
          <button onClick={onNext} style={{
            width: '100%', height: 56, borderRadius: 28, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#c4a4ff,#8b5cf6)',
            color: '#1a0e3d', fontSize: 16, fontWeight: 700, letterSpacing: 0.3,
            boxShadow: '0 10px 40px rgba(139,92,246,.55), inset 0 1px 0 rgba(255,255,255,.5)',
            animation: 'kz-glow 3s ease-in-out .8s infinite',
          }}>7 Gün Ücretsiz Dene ✦</button>
          <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(240,235,255,.4)',
            marginTop: 10, fontFamily: 'JetBrains Mono,monospace' }}>
            istediğin zaman iptal edebilirsin
          </div>
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <span style={{ fontSize: 13, color: 'rgba(240,235,255,.4)', cursor: 'pointer' }} onClick={onNext}>
              şimdilik devam et →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  ScreenLogin, ScreenRegister, ScreenIntro, ScreenBirth, ScreenReveal, ScreenPaywall,
  NebulaBgFull, GlassCard, GlassInput,
});
