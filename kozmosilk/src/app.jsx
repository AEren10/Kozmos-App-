// app.jsx — assembles the 3 directions in a design canvas

const { useState, useEffect } = React;

const SCREENS = ['auth', 'prompt', 'loading', 'profile'];
const SCREEN_LABELS = { auth: 'Giriş', prompt: 'Ana / Prompt', loading: 'Oluşturma', profile: 'Profil' };

const DIRECTIONS = [
  {
    id: 'nebula',
    name: 'Nebula',
    subtitle: 'organik mor/lacivert · yumuşak ışık · serif başlık',
    theme: window.nebulaTheme,
    components: {
      auth: window.NebulaAuth, prompt: window.NebulaPrompt,
      loading: window.NebulaLoading, profile: window.NebulaProfile,
    },
  },
  {
    id: 'orbital',
    name: 'Orbital',
    subtitle: 'siyah · mint/mono · teknik, hassas çizgi',
    theme: window.orbitalTheme,
    components: {
      auth: window.OrbitalAuth, prompt: window.OrbitalPrompt,
      loading: window.OrbitalLoading, profile: window.OrbitalProfile,
    },
  },
  {
    id: 'astral',
    name: 'Astral',
    subtitle: 'sıcak koyu · altın/kızıl · mistik, el yazması',
    theme: window.astralTheme,
    components: {
      auth: window.AstralAuth, prompt: window.AstralPrompt,
      loading: window.AstralLoading, profile: window.AstralProfile,
    },
  },
];

// Phone wrapper: click to cycle to next screen; keeps per-phone state
function PhoneFlow({ direction, screenIndex, onClick, tweaks }) {
  const C = direction.components[SCREENS[screenIndex]];
  return (
    <div
      data-screen-label={`${direction.name} / ${SCREEN_LABELS[SCREENS[screenIndex]]}`}
      onClick={onClick}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      <IOSDevice dark={true} width={320} height={680}>
        <div style={{ height: '100%', position: 'relative', key: direction.id + screenIndex }}
          key={direction.id + '-' + screenIndex}>
          <C density={tweaks.density}/>
        </div>
      </IOSDevice>
      {/* screen indicator dots */}
      <div style={{
        position: 'absolute', top: -28, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: 6, alignItems: 'center',
      }}>
        {SCREENS.map((s, i) => (
          <div key={s} style={{
            width: i === screenIndex ? 18 : 6, height: 6, borderRadius: 4,
            background: i === screenIndex ? direction.theme.colors.accent : 'rgba(255,255,255,.25)',
            transition: 'all .25s',
          }}/>
        ))}
        <div style={{ marginLeft: 10, fontSize: 11, fontFamily: 'JetBrains Mono, monospace',
          color: 'rgba(255,255,255,.55)', letterSpacing: 1 }}>
          {SCREEN_LABELS[SCREENS[screenIndex]]}
        </div>
      </div>
    </div>
  );
}

function AllScreensRow({ direction, tweaks }) {
  return (
    <div style={{ display: 'flex', gap: 28, padding: '40px 24px', alignItems: 'flex-start' }}>
      {SCREENS.map((s, i) => {
        const C = direction.components[s];
        return (
          <div key={s} data-screen-label={`${direction.name} / ${SCREEN_LABELS[s]}`}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: 1.5,
              color: 'rgba(0,0,0,.55)', marginBottom: 10, paddingLeft: 2,
            }}>
              {String(i + 1).padStart(2, '0')} · {SCREEN_LABELS[s].toUpperCase()}
            </div>
            <IOSDevice dark={true} width={300} height={640}>
              <div style={{ height: '100%', position: 'relative' }}>
                <C density={tweaks.density}/>
              </div>
            </IOSDevice>
          </div>
        );
      })}
    </div>
  );
}

function App() {
  const { tweaks, setTweaks, editMode } = useTweaks();
  // per-direction active screen for "interactive" single-phone view
  const [screens, setScreens] = useState({ nebula: 0, orbital: 0, astral: 0 });
  const cycle = (id) => setScreens(s => ({ ...s, [id]: (s[id] + 1) % SCREENS.length }));

  // override global animation via css var based on tweak
  useEffect(() => {
    const rate = tweaks.animations === 'azaltılmış' ? 3 : tweaks.animations === 'fazla' ? 0.5 : 1;
    document.documentElement.style.setProperty('--kz-anim-scale', rate);
    // disable via body class
    document.body.style.animationDuration = '';
  }, [tweaks.animations]);

  return (
    <>
      <DesignCanvas>
        <DCSection id="intro" title="Kozmos · AI Astroloji" subtitle="3 yön · iOS · etkileşimli — her telefona tıklayarak sonraki ekrana geç">
          {DIRECTIONS.map(d => (
            <DCArtboard key={d.id} id={d.id + '-flow'}
              label={`${d.name} · ${d.subtitle}`}
              width={380} height={760}>
              <div style={{
                width: '100%', height: '100%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                background: d.theme.colors.bg, padding: '30px 0',
              }}>
                <PhoneFlow direction={d} screenIndex={screens[d.id]}
                  onClick={() => cycle(d.id)} tweaks={tweaks}/>
              </div>
            </DCArtboard>
          ))}
        </DCSection>

        {tweaks.showAllScreens && DIRECTIONS.map(d => (
          <DCSection key={d.id + '-all'} id={d.id + '-all'}
            title={`${d.name} · tüm ekranlar`} subtitle={d.subtitle}>
            <DCArtboard id={d.id + '-grid'} label="giriş · ana · oluşturma · profil"
              width={1400} height={720}>
              <div style={{
                width: '100%', height: '100%',
                background: d.theme.colors.bg, overflow: 'hidden',
              }}>
                <AllScreensRow direction={d} tweaks={tweaks}/>
              </div>
            </DCArtboard>
          </DCSection>
        ))}
      </DesignCanvas>

      {editMode && <TweaksPanel tweaks={tweaks} setTweaks={setTweaks} onClose={() => {
        try { window.parent.postMessage({ type: '__deactivate_edit_mode_request' }, '*'); } catch(_){}
      }}/>}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
