// app.jsx — Kozmos 10-screen interactive prototype

const { useState, useEffect } = React;

// Screen manifest
const SCREENS = [
  { id: 'login',    label: '01 Giriş',         Component: () => window.ScreenLogin },
  { id: 'register', label: '02 Kayıt',          Component: () => window.ScreenRegister },
  { id: 'intro',    label: '03 Tanıtım',        Component: () => window.ScreenIntro },
  { id: 'birth',    label: '04 Doğum Bilgisi',  Component: () => window.ScreenBirth },
  { id: 'reveal',   label: '05 Keşif',          Component: () => window.ScreenReveal },
  { id: 'paywall',  label: '06 Paywall',        Component: () => window.ScreenPaywall },
  { id: 'today',    label: '07 Bugün',          Component: () => window.ScreenToday },
  { id: 'natal',    label: '08 Natal',          Component: () => window.ScreenNatal },
  { id: 'compat',   label: '09 Uyum',           Component: () => window.ScreenCompat },
  { id: 'settings', label: '10 Profil',         Component: () => window.ScreenSettings },
];

const TAB_SCREEN_MAP = {
  today: 6, natal: 7, compat: 8, settings: 9,
};

// Smooth slide transition wrapper
function TransitionScreen({ screenIdx, direction, children }) {
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    setVisible(false);
    const t = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(t);
  }, [screenIdx]);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : (direction === 'back' ? 'translateY(-10px)' : 'translateY(10px)'),
      transition: 'opacity .35s ease, transform .35s cubic-bezier(.25,.8,.25,1)',
    }}>
      {children}
    </div>
  );
}

// ─── interactive prototype phone ───
function InteractivePhone({ tweaks }) {
  const [cur, setCur] = React.useState(() => {
    const saved = localStorage.getItem('kozmos-screen');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [dir, setDir] = React.useState('forward');
  const [prevCur, setPrevCur] = React.useState(null);

  useEffect(() => { localStorage.setItem('kozmos-screen', cur); }, [cur]);

  const goTo = (idx, direction = 'forward') => {
    setDir(direction);
    setPrevCur(cur);
    setCur(idx);
  };
  const next = () => goTo(Math.min(cur + 1, SCREENS.length - 1));
  const back = () => goTo(Math.max(cur - 1, 0), 'back');

  const s = SCREENS[cur];
  const Comp = s.Component();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      {/* phone */}
      <div style={{ position: 'relative' }}>
        <IOSDevice dark={true} width={340} height={720}>
          <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
            <TransitionScreen screenIdx={cur} direction={dir}>
              <Comp
                onNext={next}
                onBack={back}
                onTab={(tabId) => {
                  const idx = TAB_SCREEN_MAP[tabId];
                  if (idx !== undefined) goTo(idx);
                }}
              />
            </TransitionScreen>
          </div>
        </IOSDevice>

        {/* navigation arrows — outside the phone */}
        <button onClick={back} disabled={cur === 0} style={{
          position: 'absolute', left: -50, top: '50%', transform: 'translateY(-50%)',
          width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: cur > 0 ? 'pointer' : 'default',
          background: cur > 0 ? 'rgba(196,170,255,.15)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${cur > 0 ? 'rgba(196,170,255,.35)' : 'rgba(255,255,255,.08)'}`,
          color: cur > 0 ? '#c4a4ff' : 'rgba(255,255,255,.2)',
          fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .2s',
        }}>‹</button>
        <button onClick={next} disabled={cur === SCREENS.length - 1} style={{
          position: 'absolute', right: -50, top: '50%', transform: 'translateY(-50%)',
          width: 38, height: 38, borderRadius: '50%', border: 'none',
          cursor: cur < SCREENS.length - 1 ? 'pointer' : 'default',
          background: cur < SCREENS.length - 1 ? 'rgba(196,170,255,.15)' : 'rgba(255,255,255,.04)',
          border: `1px solid ${cur < SCREENS.length - 1 ? 'rgba(196,170,255,.35)' : 'rgba(255,255,255,.08)'}`,
          color: cur < SCREENS.length - 1 ? '#c4a4ff' : 'rgba(255,255,255,.2)',
          fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .2s',
        }}>›</button>
      </div>

      {/* screen dots / label */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
          {SCREENS.map((s, i) => (
            <div key={i} onClick={() => goTo(i)} style={{
              width: i === cur ? 28 : 7, height: 7, borderRadius: 4, cursor: 'pointer',
              background: i === cur
                ? 'linear-gradient(90deg,#c4a4ff,#ff9ad1)'
                : i < cur ? 'rgba(196,170,255,.5)' : 'rgba(255,255,255,.18)',
              transition: 'all .3s cubic-bezier(.4,0,.2,1)',
              boxShadow: i === cur ? '0 0 10px rgba(196,170,255,.6)' : 'none',
            }}/>
          ))}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(196,170,255,.8)',
          letterSpacing: 2, textAlign: 'center',
        }}>{s.label.toUpperCase()}</div>
      </div>
    </div>
  );
}

// ─── overview artboard (10 phones) ───
function OverviewGrid({ tweaks }) {
  return (
    <div style={{
      display: 'flex', gap: 28, padding: '48px 32px',
      alignItems: 'flex-start', flexWrap: 'nowrap',
    }}>
      {SCREENS.map((s, i) => {
        const Comp = s.Component();
        return (
          <div key={s.id} style={{ flexShrink: 0 }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: 1.5,
              color: 'rgba(0,0,0,.55)', marginBottom: 10, paddingLeft: 2,
            }}>{s.label.toUpperCase()}</div>
            <IOSDevice dark={true} width={280} height={600}>
              <div style={{ height: '100%', position: 'relative' }}>
                <Comp onNext={() => {}} onBack={() => {}} onTab={() => {}}/>
              </div>
            </IOSDevice>
          </div>
        );
      })}
    </div>
  );
}

// ─── root App ───
function App() {
  const { tweaks, setTweaks, editMode } = useTweaks();

  return (
    <>
      <DesignCanvas>
        <DCSection id="prototype" title="Kozmos · Etkileşimli Prototype"
          subtitle="ok tuşları veya yanlarındaki ‹ › butonlarıyla ekranlar arasında gezin · ekrandaki butonlar da çalışır">
          <DCArtboard id="phone" label="Prototype · 10 ekran" width={500} height={860}>
            <div style={{
              width: '100%', height: '100%',
              background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #2a1555 0%, #0d0820 60%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <InteractivePhone tweaks={tweaks}/>
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection id="overview" title="Tüm Ekranlar · Genel Bakış"
          subtitle="10 ekranın yan yana görünümü">
          <DCArtboard id="grid" label="Overview" width={3300} height={700}>
            <div style={{ width: '100%', height: '100%',
              background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #1a0e3d 0%, #0d0820 70%)' }}>
              <OverviewGrid tweaks={tweaks}/>
            </div>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      {editMode && (
        <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} onClose={() => {
          try { window.parent.postMessage({ type: '__deactivate_edit_mode_request' }, '*'); } catch(_){}
        }}/>
      )}
    </>
  );
}

// keyboard nav
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') document.querySelector('[data-next]')?.click();
  if (e.key === 'ArrowLeft') document.querySelector('[data-back]')?.click();
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
