// tweaks.jsx — floating Tweaks panel wired via __edit_mode protocol

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "density": "havali",
  "animations": "normal",
  "showAllScreens": true
}/*EDITMODE-END*/;

function useTweaks() {
  const [tweaks, setTweaks] = React.useState(TWEAK_DEFAULTS);
  const [editMode, setEditMode] = React.useState(false);

  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setEditMode(true);
      else if (d.type === '__deactivate_edit_mode') setEditMode(false);
    };
    window.addEventListener('message', onMsg);
    // announce after listener attached
    try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (_) {}
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const set = (patch) => {
    setTweaks(t => ({ ...t, ...patch }));
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*'); } catch (_) {}
  };

  return { tweaks, setTweaks: set, editMode };
}

function TweaksPanel({ tweaks, setTweaks, onClose }) {
  const row = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: '10px 0' };
  const label = { fontSize: 12, color: 'rgba(255,255,255,.8)', letterSpacing: 0.4, fontFamily: 'JetBrains Mono, monospace' };
  const seg = (opts, cur, onPick) => (
    <div style={{ display: 'flex', borderRadius: 8, background: 'rgba(255,255,255,.06)', padding: 2, border: '1px solid rgba(255,255,255,.08)' }}>
      {opts.map(o => (
        <button key={o.v} onClick={() => onPick(o.v)} style={{
          border: 'none', padding: '5px 10px', borderRadius: 6, cursor: 'pointer',
          fontSize: 11, fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0.4,
          background: cur === o.v ? '#c4a4ff' : 'transparent',
          color: cur === o.v ? '#1a0e3d' : 'rgba(255,255,255,.75)',
        }}>{o.label}</button>
      ))}
    </div>
  );
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, width: 280, zIndex: 9999,
      background: 'rgba(20,15,30,.92)', backdropFilter: 'blur(20px)',
      border: '1px solid rgba(196,170,255,.25)', borderRadius: 14,
      boxShadow: '0 20px 60px rgba(0,0,0,.5)', color: '#eae7f0',
      fontFamily: 'Inter, system-ui', padding: 16,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ fontSize: 11, letterSpacing: 2, fontFamily: 'JetBrains Mono, monospace', color: '#c4a4ff' }}>
          ✦ TWEAKS
        </div>
        <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,.5)',
          cursor: 'pointer', fontSize: 16, padding: 0 }}>×</button>
      </div>
      <div style={{ height: 1, background: 'rgba(255,255,255,.08)', margin: '4px 0 6px' }}/>

      <div style={row}>
        <span style={label}>Yoğunluk</span>
        {seg([{v:'havali',label:'Havalı'},{v:'sıkı',label:'Sıkı'}], tweaks.density, v => setTweaks({density:v}))}
      </div>
      <div style={row}>
        <span style={label}>Animasyon</span>
        {seg([{v:'azaltılmış',label:'Az'},{v:'normal',label:'Normal'},{v:'fazla',label:'Fazla'}], tweaks.animations, v => setTweaks({animations:v}))}
      </div>
      <div style={row}>
        <span style={label}>Tüm ekranlar</span>
        <button onClick={() => setTweaks({ showAllScreens: !tweaks.showAllScreens })}
          style={{
            width: 40, height: 22, borderRadius: 11, border: 'none', cursor: 'pointer',
            background: tweaks.showAllScreens ? '#c4a4ff' : 'rgba(255,255,255,.15)', padding: 2,
            display: 'flex', justifyContent: tweaks.showAllScreens ? 'flex-end' : 'flex-start',
          }}>
          <div style={{ width: 18, height: 18, borderRadius: '50%', background: tweaks.showAllScreens ? '#1a0e3d' : '#fff' }}/>
        </button>
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,.45)', marginTop: 10, lineHeight: 1.4, fontFamily: 'JetBrains Mono, monospace' }}>
        ipucu: bir ekrana tıkla, aynı temanın sonraki ekranına git.
      </div>
    </div>
  );
}

Object.assign(window, { useTweaks, TweaksPanel, TWEAK_DEFAULTS });
