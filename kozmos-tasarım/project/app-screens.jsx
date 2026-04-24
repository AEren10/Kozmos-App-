
// ── DESIGN TOKENS ──
const T = {
  // Base
  bg: '#0B1520',
  bgCard: '#111F2E',
  bgCardHover: '#152636',
  bgElevated: '#0E1A28',
  surface: 'rgba(255,255,255,0.04)',
  surfaceHover: 'rgba(255,255,255,0.07)',

  // Accent
  lime: '#B4FF4F',
  limeDim: 'rgba(180,255,79,0.15)',
  limeGlow: 'rgba(180,255,79,0.25)',

  // Semantic
  coral: '#FF6B6B',
  coralDim: 'rgba(255,107,107,0.15)',
  amber: '#FFB84D',
  amberDim: 'rgba(255,184,77,0.15)',
  sky: '#4DC9FF',
  skyDim: 'rgba(77,201,255,0.15)',

  // Text
  text: '#F1F5F9',
  textSec: '#8899AB',
  textMuted: '#4A5C6E',

  // Misc
  border: 'rgba(255,255,255,0.06)',
  radius: 20,
  font: "'Space Grotesk', sans-serif",
  fontDisplay: "'Instrument Serif', serif",
};

const appStyles = {};

// ── SVG BLOBS (background decoration) ──
function BlobBg() {
  return (
    <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
      {/* Large blob top-right */}
      <svg viewBox="0 0 400 400" style={{ position:'absolute', top:-120, right:-100, width:340, height:340, opacity:0.08 }}>
        <path d="M200,20 C280,20 380,80 370,180 C360,280 300,360 200,370 C100,380 20,300 30,200 C40,100 120,20 200,20Z" fill={T.lime}/>
      </svg>
      {/* Small blob mid-left */}
      <svg viewBox="0 0 200 200" style={{ position:'absolute', top:380, left:-60, width:180, height:180, opacity:0.05 }}>
        <path d="M100,10 C150,10 190,50 185,100 C180,150 140,190 90,185 C40,180 10,140 15,90 C20,40 50,10 100,10Z" fill={T.coral}/>
      </svg>
      {/* Wave bottom */}
      <svg viewBox="0 0 400 80" preserveAspectRatio="none" style={{ position:'absolute', bottom:70, left:0, width:'100%', height:60, opacity:0.04 }}>
        <path d="M0,40 Q100,0 200,40 Q300,80 400,40 L400,80 L0,80Z" fill={T.lime}/>
      </svg>
    </div>
  );
}

// ── MASCOT V2 ──
function KozmosMascot({ size = 44, mood = 'happy', style = {} }) {
  return (
    <div style={{ width:size, height:size, ...style }}>
      <svg viewBox="0 0 44 44" width={size} height={size}>
        <defs>
          <linearGradient id="mascotGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={T.lime}/>
            <stop offset="100%" stopColor="#7EE840"/>
          </linearGradient>
        </defs>
        {/* body */}
        <rect x="6" y="8" width="32" height="28" rx="12" fill="url(#mascotGrad)"/>
        {/* face */}
        {mood === 'happy' ? (
          <>
            <circle cx="16" cy="21" r="2.5" fill="#0B1520"/>
            <circle cx="28" cy="21" r="2.5" fill="#0B1520"/>
            <circle cx="17" cy="20" r="0.8" fill="white" opacity="0.9"/>
            <circle cx="29" cy="20" r="0.8" fill="white" opacity="0.9"/>
            <path d="M18 27 Q22 31 26 27" stroke="#0B1520" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
          </>
        ) : (
          <>
            <path d="M13 21 Q16 19 19 21" stroke="#0B1520" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M25 21 Q28 19 31 21" stroke="#0B1520" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M19 27 Q22 30 25 27" stroke="#0B1520" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </>
        )}
        {/* antenna */}
        <line x1="22" y1="8" x2="22" y2="3" stroke={T.lime} strokeWidth="2" strokeLinecap="round"/>
        <circle cx="22" cy="2" r="2" fill={T.lime}/>
        {/* cheeks */}
        <circle cx="11" cy="25" r="2" fill="#FFB84D" opacity="0.4"/>
        <circle cx="33" cy="25" r="2" fill="#FFB84D" opacity="0.4"/>
      </svg>
    </div>
  );
}

// ── BOTTOM TAB BAR ──
function BottomNav({ active, onNav }) {
  const tabs = [
    { id:'home', label:'Keşfet', icon:(c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1v-9.5z" stroke={c} strokeWidth="2" strokeLinejoin="round"/></svg> },
    { id:'lists', label:'Listeler', icon:(c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="2" stroke={c} strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="2" stroke={c} strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="2" stroke={c} strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="2" stroke={c} strokeWidth="2"/></svg> },
    { id:'favs', label:'Favoriler', icon:(c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 21C12 21 3 13.5 3 8.5 3 5.42 5.42 3 8.5 3c1.74 0 3.41.81 4.5 2.09A6.04 6.04 0 0115.5 3C18.58 3 21 5.42 21 8.5 21 13.5 12 21 12 21z" stroke={c} strokeWidth="2"/></svg> },
    { id:'profile', label:'Profil', icon:(c) => <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke={c} strokeWidth="2"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6" stroke={c} strokeWidth="2" strokeLinecap="round"/></svg> },
  ];

  return (
    <div style={{
      position:'absolute', bottom:0, left:0, right:0, zIndex:30,
      background:'rgba(11,21,32,0.85)', backdropFilter:'blur(20px) saturate(180%)',
      WebkitBackdropFilter:'blur(20px) saturate(180%)',
      borderTop:`1px solid ${T.border}`,
      display:'flex', padding:'8px 0 26px',
    }}>
      {tabs.map(tab => {
        const isActive = tab.id === active;
        return (
          <div key={tab.id} onClick={() => onNav(tab.id)} style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3,
            cursor:'pointer', transition:'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            transform: isActive ? 'scale(1)' : 'scale(0.92)',
          }}>
            <div style={{
              position:'relative',
              transition:'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
              transform: isActive ? 'scale(1.15)' : 'scale(1)',
            }}>
              {isActive && <div style={{
                position:'absolute', inset:-6, borderRadius:12,
                background:T.limeDim, filter:'blur(4px)',
              }}/>}
              <div style={{ position:'relative' }}>
                {tab.icon(isActive ? T.lime : T.textMuted)}
              </div>
            </div>
            <span style={{
              fontSize:10, fontWeight:isActive ? 700 : 500,
              color: isActive ? T.lime : T.textMuted,
              fontFamily:T.font, letterSpacing:0.3,
            }}>{tab.label}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── HOME SCREEN ──
function HomeScreen({ onNav }) {
  const streak = 7;
  const dailyDone = 6;
  const dailyTotal = 10;
  const progress = dailyDone / dailyTotal;

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  const wordLists = [
    { id:'daily', name:'Günlük İngilizce', emoji:'☀️', count:50, progress:0.7 },
    { id:'colors', name:'Renkler', emoji:'🎨', count:12, progress:0.4 },
    { id:'travel', name:'Seyahat', emoji:'✈️', count:35, progress:0.2 },
    { id:'business', name:'İş İngilizcesi', emoji:'💼', count:40, progress:0 },
  ];

  return (
    <div style={{ background:T.bg, minHeight:'100%', position:'relative', paddingBottom:92, fontFamily:T.font }}>
      <BlobBg/>

      {/* ── HEADER ── */}
      <div style={{
        position:'relative', zIndex:2,
        padding:'58px 22px 0', display:'flex', alignItems:'flex-start', justifyContent:'space-between',
      }}>
        <div>
          <div style={{
            fontSize:13, color:T.textSec, fontWeight:500, marginBottom:2,
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(8px)',
            transition:'all 0.5s ease 0.1s',
          }}>Günaydın 👋</div>
          <div style={{
            fontSize:30, fontWeight:400, color:T.text,
            fontFamily:T.fontDisplay, fontStyle:'italic', lineHeight:1.15,
            opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            transition:'all 0.5s ease 0.2s',
          }}>Bugün ne<br/>öğrenelim?</div>
        </div>
        <div style={{
          opacity: mounted ? 1 : 0, transform: mounted ? 'scale(1)' : 'scale(0.5)',
          transition:'all 0.5s cubic-bezier(0.34,1.56,0.64,1) 0.3s',
        }}>
          <div style={{
            width:48, height:48, borderRadius:16, border:`2px solid ${T.lime}`,
            display:'flex', alignItems:'center', justifyContent:'center',
            background:T.limeDim,
          }}>
            <KozmosMascot size={38} mood="happy"/>
          </div>
        </div>
      </div>

      {/* ── STREAK + DAILY GOAL ── */}
      <div style={{
        position:'relative', zIndex:2,
        padding:'18px 22px 0', display:'flex', gap:12,
      }}>
        {/* Streak */}
        <div style={{
          flex:1, background:T.bgCard, borderRadius:T.radius, padding:'16px',
          border:`1px solid ${T.border}`, position:'relative', overflow:'hidden',
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition:'all 0.5s ease 0.35s',
        }}>
          <div style={{ position:'absolute', top:-10, right:-10, width:50, height:50, borderRadius:'50%', background:T.amberDim, filter:'blur(12px)' }}/>
          <div style={{ fontSize:10, fontWeight:700, color:T.textMuted, letterSpacing:1.5, marginBottom:6 }}>SERİ</div>
          <div style={{ display:'flex', alignItems:'baseline', gap:4 }}>
            <span style={{
              fontSize:36, fontWeight:700, color:T.amber,
              animation: mounted ? 'bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.6s both' : 'none',
              display:'inline-block',
            }}>{streak}</span>
            <span style={{ fontSize:20 }}>🔥</span>
          </div>
          <div style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>gün üst üste</div>
        </div>

        {/* Daily Goal */}
        <div style={{
          flex:1.5, background:T.bgCard, borderRadius:T.radius, padding:'16px',
          border:`1px solid ${T.border}`,
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)',
          transition:'all 0.5s ease 0.45s',
        }}>
          <div style={{ fontSize:10, fontWeight:700, color:T.textMuted, letterSpacing:1.5, marginBottom:8 }}>GÜNLÜK HEDEF</div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ flex:1, height:10, background:'rgba(255,255,255,0.06)', borderRadius:99, overflow:'hidden', position:'relative' }}>
              <div style={{
                width: mounted ? `${progress*100}%` : '0%',
                height:'100%', borderRadius:99,
                background:`linear-gradient(90deg, ${T.lime}, #7EE840)`,
                transition:'width 1s cubic-bezier(0.4, 0, 0.2, 1) 0.8s',
                boxShadow:`0 0 12px ${T.limeGlow}`,
              }}/>
            </div>
            <span style={{ fontSize:14, fontWeight:700, color:T.lime, fontVariantNumeric:'tabular-nums' }}>{dailyDone}/{dailyTotal}</span>
          </div>
          <div style={{ fontSize:11, color:T.textSec, marginTop:6 }}>4 kelime kaldı — 2 dk yeter!</div>
        </div>
      </div>

      {/* ── DAILY CHALLENGE CARD ── */}
      <div style={{
        position:'relative', zIndex:2, padding:'16px 22px 0',
        opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(24px)',
        transition:'all 0.6s ease 0.55s',
      }}>
        <div onClick={() => onNav && onNav('study')} style={{
          background:`linear-gradient(135deg, #142136 0%, #0E1A28 100%)`,
          borderRadius:24, padding:'22px 22px 20px', position:'relative', overflow:'hidden',
          border:`1px solid rgba(180,255,79,0.12)`, cursor:'pointer',
          transition:'transform 0.2s, box-shadow 0.2s',
          boxShadow:`0 4px 24px rgba(0,0,0,0.3), 0 0 40px ${T.limeDim}`,
        }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 8px 32px rgba(0,0,0,0.4), 0 0 60px ${T.limeGlow}`; }}
          onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=`0 4px 24px rgba(0,0,0,0.3), 0 0 40px ${T.limeDim}`; }}
        >
          {/* Decorative blobs inside */}
          <div style={{ position:'absolute', top:-30, right:-20, width:120, height:120, borderRadius:'50%', background:T.limeDim, filter:'blur(40px)' }}/>
          <div style={{ position:'absolute', bottom:-20, left:30, width:80, height:80, borderRadius:'50%', background:'rgba(77,201,255,0.06)', filter:'blur(30px)' }}/>

          {/* Badge */}
          <div style={{
            display:'inline-flex', alignItems:'center', gap:5,
            background:T.limeDim, borderRadius:99, padding:'5px 12px 5px 8px',
            marginBottom:14,
          }}>
            <span style={{ fontSize:13 }}>⚡</span>
            <span style={{ fontSize:11, fontWeight:700, color:T.lime, letterSpacing:0.5 }}>GÜNÜN MEYDAN OKUMASI</span>
          </div>

          <div style={{ position:'relative', zIndex:1 }}>
            <div style={{
              fontSize:24, fontWeight:400, color:T.text, lineHeight:1.25,
              fontFamily:T.fontDisplay, fontStyle:'italic', marginBottom:4,
            }}>5 Yeni Kelime Öğren</div>
            <div style={{ fontSize:13, color:T.textSec, marginBottom:18, lineHeight:1.4 }}>
              Bugünkü kelimelerin hazır — 2 dakikanda tamamla!
            </div>

            {/* CTA Button */}
            <div style={{
              display:'inline-flex', alignItems:'center', gap:8,
              background:T.lime, borderRadius:14, padding:'12px 24px',
              color:T.bg, fontSize:15, fontWeight:700, fontFamily:T.font,
              transition:'transform 0.15s, box-shadow 0.15s', cursor:'pointer',
              boxShadow:`0 2px 12px ${T.limeGlow}`,
            }}
              onMouseDown={e => e.currentTarget.style.transform='scale(0.96)'}
              onMouseUp={e => e.currentTarget.style.transform='scale(1)'}
            >
              Başla
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke={T.bg} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
          </div>

          {/* Mascot floating */}
          <div style={{
            position:'absolute', bottom:12, right:16, zIndex:2,
            animation:'float 3s ease-in-out infinite',
          }}>
            <KozmosMascot size={56} mood="happy"/>
          </div>
        </div>
      </div>

      {/* ── WORD LISTS ── */}
      <div style={{ position:'relative', zIndex:2, padding:'20px 22px 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <span style={{ fontSize:18, fontWeight:700, color:T.text }}>Kelime Listeleri</span>
          <span style={{ fontSize:12, fontWeight:600, color:T.lime, cursor:'pointer', letterSpacing:0.3 }}>Tümü →</span>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {wordLists.map((list, i) => (
            <div key={list.id} onClick={() => onNav && onNav('study')} style={{
              background:T.bgCard, borderRadius:16, padding:'14px 16px',
              display:'flex', alignItems:'center', gap:14, cursor:'pointer',
              border:`1px solid ${T.border}`,
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(16px)',
              transition:`all 0.4s ease ${0.7 + i * 0.08}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.background=T.bgCardHover; e.currentTarget.style.borderColor='rgba(180,255,79,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.background=T.bgCard; e.currentTarget.style.borderColor=T.border; }}
            >
              {/* Emoji icon */}
              <div style={{
                width:46, height:46, borderRadius:14,
                background:T.surface, display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:22, flexShrink:0,
              }}>{list.emoji}</div>

              {/* Info */}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:15, fontWeight:600, color:T.text, marginBottom:3 }}>{list.name}</div>
                <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                  <div style={{ flex:1, maxWidth:100, height:4, background:'rgba(255,255,255,0.06)', borderRadius:99, overflow:'hidden' }}>
                    <div style={{
                      width: mounted ? `${list.progress*100}%` : '0%',
                      height:'100%', borderRadius:99,
                      background: list.progress > 0 ? T.lime : 'transparent',
                      transition:`width 0.8s ease ${0.9 + i * 0.1}s`,
                    }}/>
                  </div>
                  <span style={{ fontSize:11, color:T.textMuted, fontVariantNumeric:'tabular-nums' }}>{list.count} kelime</span>
                </div>
              </div>

              {/* Arrow */}
              <svg width="8" height="14" viewBox="0 0 8 14" style={{ flexShrink:0 }}>
                <path d="M1 1l6 6-6 6" stroke={T.textMuted} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ))}
        </div>
      </div>

      {/* ── ANIMATION ANNOTATIONS ── */}
      <div style={{
        position:'relative', zIndex:2, margin:'20px 22px 0',
        background:'rgba(180,255,79,0.04)', border:`1px dashed rgba(180,255,79,0.15)`,
        borderRadius:16, padding:'16px 18px',
      }}>
        <div style={{ fontSize:11, fontWeight:700, color:T.lime, letterSpacing:1, marginBottom:10 }}>🎬 ANİMASYON NOTLARI</div>
        {[
          ['Streak sayısı', 'bounce-in · 0.6s · spring easing'],
          ['Progress bar', 'width dolma · 1s · ease-in-out · 0.8s delay'],
          ['Challenge card', 'subtle float · 3s infinite · translateY(±4px)'],
          ['Liste itemları', 'staggered slide-up · 0.4s · 80ms aralık'],
          ['Tab aktif item', 'spring scale · 1.15x · cubic-bezier(0.34,1.56,0.64,1)'],
          ['Buton press', 'scale(0.96) · 150ms · haptic feedback'],
          ['Kart hover', 'translateY(-2px) + glow shadow · 200ms'],
        ].map(([label, desc], i) => (
          <div key={i} style={{ display:'flex', gap:10, marginBottom:6, fontSize:12, lineHeight:1.4 }}>
            <span style={{ color:T.lime, fontWeight:600, whiteSpace:'nowrap', minWidth:100 }}>{label}</span>
            <span style={{ color:T.textSec }}>{desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── STUDY SCREEN ──
function StudyScreen({ onNav }) {
  const words = [
    {en:'Serendipity',tr:'Tesadüfi güzel keşif',pron:'/ˌserənˈdɪpɪti/'},
    {en:'Ephemeral',tr:'Geçici, kısa ömürlü',pron:'/ɪˈfemərəl/'},
    {en:'Resilience',tr:'Dayanıklılık',pron:'/rɪˈzɪliəns/'},
  ];
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const [exitDir, setExitDir] = React.useState(null);
  const [rated, setRated] = React.useState(false);
  const word = words[idx % words.length];

  const handleFlip = () => { if(!rated) setFlipped(!flipped); };
  const handleRate = (level) => {
    setRated(true);
    setExitDir(level >= 2 ? 'right' : 'left');
    setTimeout(() => {
      setIdx(i => i+1);
      setFlipped(false);
      setRated(false);
      setExitDir(null);
    }, 400);
  };

  const ratings = [
    { label:'Tekrar', icon:'🔄', color:T.coral, bg:T.coralDim, level:0 },
    { label:'Zor', icon:'😓', color:T.amber, bg:T.amberDim, level:1 },
    { label:'İyi', icon:'👍', color:T.sky, bg:T.skyDim, level:2 },
    { label:'Kolay', icon:'⚡', color:T.lime, bg:T.limeDim, level:3 },
  ];

  return (
    <div style={{ background:T.bg, minHeight:'100%', position:'relative', fontFamily:T.font, display:'flex', flexDirection:'column', paddingBottom:92 }}>
      <BlobBg/>
      {/* Header */}
      <div style={{ position:'relative', zIndex:2, padding:'58px 22px 0', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div onClick={() => onNav('home')} style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>
          <svg width="10" height="16" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke={T.text} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontSize:16, fontWeight:600, color:T.text }}>Günlük İngilizce</span>
        </div>
        <div style={{ background:T.limeDim, borderRadius:99, padding:'4px 12px', fontSize:12, fontWeight:700, color:T.lime }}>{idx+1}/{words.length}</div>
      </div>

      {/* Progress */}
      <div style={{ position:'relative', zIndex:2, padding:'14px 22px 0' }}>
        <div style={{ height:5, background:'rgba(255,255,255,0.06)', borderRadius:99, overflow:'hidden' }}>
          <div style={{ width:`${(idx/words.length)*100}%`, height:'100%', background:`linear-gradient(90deg, ${T.lime}, #7EE840)`, borderRadius:99, transition:'width 0.5s ease', boxShadow:`0 0 8px ${T.limeGlow}` }}/>
        </div>
      </div>

      {/* Card area */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'0 28px', position:'relative', zIndex:2 }}>
        <div onClick={handleFlip} style={{
          width:'100%', maxWidth:340, height:260, perspective:1200, cursor:'pointer',
          transform: exitDir === 'right' ? 'translateX(130%) rotate(10deg)' : exitDir === 'left' ? 'translateX(-130%) rotate(-10deg)' : 'none',
          opacity: exitDir ? 0 : 1, transition: exitDir ? 'transform 0.4s ease, opacity 0.4s ease' : 'none',
        }}>
          <div style={{
            width:'100%', height:'100%', position:'relative',
            transformStyle:'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition:'transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            {/* Front */}
            <div style={{
              position:'absolute', inset:0, backfaceVisibility:'hidden',
              background:`linear-gradient(150deg, #142136 0%, #0D1B2A 100%)`,
              borderRadius:28, padding:28, display:'flex', flexDirection:'column',
              alignItems:'center', justifyContent:'center',
              border:`1px solid rgba(180,255,79,0.12)`,
              boxShadow:`0 8px 40px rgba(0,0,0,0.4), 0 0 30px ${T.limeDim}`,
            }}>
              <div style={{ position:'absolute', top:16, right:18, fontSize:10, color:T.textMuted, background:T.surface, borderRadius:99, padding:'4px 10px', fontWeight:600 }}>
                Dokun → çevir
              </div>
              <div style={{ fontSize:34, fontWeight:400, color:T.text, fontFamily:T.fontDisplay, fontStyle:'italic', marginBottom:8, textAlign:'center' }}>{word.en}</div>
              <div style={{ fontSize:14, color:T.textMuted }}>{word.pron}</div>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:20, color:T.lime, opacity:0.6 }}>
                <span style={{ fontSize:13 }}>🔊</span>
                <span style={{ fontSize:12, fontWeight:600 }}>Telaffuz</span>
              </div>
            </div>
            {/* Back */}
            <div style={{
              position:'absolute', inset:0, backfaceVisibility:'hidden',
              transform:'rotateY(180deg)',
              background:T.bgCard, borderRadius:28, padding:28,
              display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
              border:`2px solid ${T.lime}`, boxShadow:`0 8px 40px rgba(0,0,0,0.4), 0 0 30px ${T.limeGlow}`,
            }}>
              <div style={{ fontSize:12, color:T.textMuted, fontWeight:600, letterSpacing:1, marginBottom:6 }}>TÜRKÇE</div>
              <div style={{ fontSize:28, fontWeight:400, color:T.text, fontFamily:T.fontDisplay, fontStyle:'italic', textAlign:'center' }}>{word.tr}</div>
              <div style={{ marginTop:16, fontSize:13, color:T.textSec }}>
                <span style={{ fontWeight:700, color:T.lime }}>{word.en}</span> — {word.pron}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mascot hint */}
      <div style={{ display:'flex', justifyContent:'center', marginBottom:8, position:'relative', zIndex:2 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:T.bgCard, borderRadius:99, padding:'6px 14px 6px 8px', border:`1px solid ${T.border}` }}>
          <KozmosMascot size={22} mood={flipped ? 'happy' : 'thinking'}/>
          <span style={{ fontSize:11, color:T.textSec }}>{flipped ? 'Nasıldı? Değerlendir 👇' : 'Kartı çevir'}</span>
        </div>
      </div>

      {/* Ratings */}
      {flipped && !rated && (
        <div style={{ padding:'0 22px 16px', display:'flex', gap:8, position:'relative', zIndex:2 }}>
          {ratings.map((r,i) => (
            <div key={r.level} onClick={() => handleRate(r.level)} style={{
              flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:5,
              padding:'12px 4px', borderRadius:16, background:r.bg, cursor:'pointer',
              border:'1.5px solid transparent', transition:'transform 0.12s, border-color 0.15s',
              animation:`slideUp 0.3s ease ${i*0.05}s both`,
            }}
              onMouseDown={e => e.currentTarget.style.transform='scale(0.93)'}
              onMouseUp={e => e.currentTarget.style.transform='scale(1)'}
              onMouseEnter={e => e.currentTarget.style.borderColor=r.color}
              onMouseLeave={e => e.currentTarget.style.borderColor='transparent'}
            >
              <span style={{ fontSize:22 }}>{r.icon}</span>
              <span style={{ fontSize:11, fontWeight:700, color:r.color }}>{r.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── CREATE LIST SCREEN ──
function CreateListScreen({ onNav }) {
  const [name, setName] = React.useState('');
  const [words, setWords] = React.useState([{en:'',tr:''},{en:'',tr:''},{en:'',tr:''}]);
  const [isPublic, setIsPublic] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { requestAnimationFrame(() => setMounted(true)); }, []);

  return (
    <div style={{ background:T.bg, minHeight:'100%', position:'relative', fontFamily:T.font, paddingBottom:92 }}>
      <BlobBg/>

      {/* Header */}
      <div style={{ position:'relative', zIndex:2, padding:'58px 22px 14px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div onClick={() => onNav('home')} style={{ cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
          <svg width="10" height="16" viewBox="0 0 8 14"><path d="M7 1L1 7l6 6" stroke={T.text} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontSize:15, fontWeight:600, color:T.text }}>İptal</span>
        </div>
        <span style={{ fontSize:18, fontWeight:700, color:T.text }}>Yeni Liste</span>
        <div style={{
          background: name ? T.lime : T.surface,
          borderRadius:12, padding:'8px 18px', fontSize:14, fontWeight:700,
          color: name ? T.bg : T.textMuted, cursor: name ? 'pointer' : 'default',
          transition:'all 0.25s',
          boxShadow: name ? `0 2px 12px ${T.limeGlow}` : 'none',
        }}>Kaydet</div>
      </div>

      <div style={{ position:'relative', zIndex:2, padding:'0 22px' }}>
        {/* Name */}
        <div style={{
          background:T.bgCard, borderRadius:T.radius, padding:'18px', marginBottom:14,
          border:`1px solid ${T.border}`,
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition:'all 0.4s ease 0.1s',
        }}>
          <div style={{ fontSize:10, fontWeight:700, color:T.textMuted, letterSpacing:1.5, marginBottom:10 }}>LİSTE ADI</div>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Örn: Seyahat kelimeleri"
            style={{
              width:'100%', border:'none', outline:'none', fontSize:18, fontWeight:600,
              color:T.text, background:'transparent', fontFamily:T.font,
              borderBottom:`2px solid ${name ? T.lime : T.border}`, paddingBottom:8,
              transition:'border-color 0.25s', caretColor:T.lime,
            }}
          />
        </div>

        {/* Tip */}
        <div style={{
          display:'flex', alignItems:'center', gap:10, background:T.limeDim,
          borderRadius:14, padding:'12px 14px', marginBottom:16,
          border:`1px solid rgba(180,255,79,0.08)`,
          opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(16px)',
          transition:'all 0.4s ease 0.2s',
        }}>
          <KozmosMascot size={30} mood="happy"/>
          <div style={{ fontSize:12, color:T.text, lineHeight:1.4 }}>
            <strong style={{ color:T.lime }}>İpucu:</strong> En az 5 kelime ekle, SRS daha verimli çalışsın!
          </div>
        </div>

        {/* Words */}
        <div style={{ fontSize:10, fontWeight:700, color:T.textMuted, letterSpacing:1.5, marginBottom:10 }}>KELİMELER ({words.length})</div>
        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          {words.map((w,i) => (
            <div key={i} style={{
              background:T.bgCard, borderRadius:14, padding:'12px 14px',
              display:'flex', gap:12, alignItems:'center',
              border:`1px solid ${T.border}`,
              opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(14px)',
              transition:`all 0.4s ease ${0.3 + i*0.06}s`,
            }}>
              <div style={{
                width:30, height:30, borderRadius:10, background:T.limeDim,
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:13, fontWeight:800, color:T.lime,
              }}>{i+1}</div>
              <div style={{ flex:1, display:'flex', flexDirection:'column', gap:6 }}>
                <input placeholder="İngilizce" style={{
                  border:'none', outline:'none', fontSize:15, fontWeight:600,
                  color:T.text, background:'transparent', fontFamily:T.font, caretColor:T.lime,
                }}/>
                <input placeholder="Türkçe" style={{
                  border:'none', outline:'none', fontSize:13, color:T.textSec,
                  background:'transparent', fontFamily:T.font, caretColor:T.lime,
                }}/>
              </div>
            </div>
          ))}
        </div>

        {/* Add */}
        <div onClick={() => setWords(w => [...w, {en:'',tr:''}])} style={{
          marginTop:12, display:'flex', alignItems:'center', justifyContent:'center', gap:8,
          padding:'14px', borderRadius:14, border:`2px dashed rgba(180,255,79,0.2)`,
          cursor:'pointer', color:T.lime, fontSize:14, fontWeight:700,
          background:T.limeDim, transition:'all 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.borderColor='rgba(180,255,79,0.4)'}
          onMouseLeave={e => e.currentTarget.style.borderColor='rgba(180,255,79,0.2)'}
        >
          + Kelime Ekle
        </div>

        {/* Public toggle */}
        <div style={{
          marginTop:16, background:T.bgCard, borderRadius:14, padding:'14px 16px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          border:`1px solid ${T.border}`,
          opacity: mounted ? 1 : 0, transition:'all 0.4s ease 0.6s',
        }}>
          <div>
            <div style={{ fontSize:15, fontWeight:600, color:T.text }}>Herkese Açık</div>
            <div style={{ fontSize:11, color:T.textMuted }}>Başkaları listeyi görebilir</div>
          </div>
          <div onClick={() => setIsPublic(!isPublic)} style={{
            width:50, height:28, borderRadius:99, cursor:'pointer',
            background: isPublic ? T.lime : 'rgba(255,255,255,0.1)',
            transition:'background 0.3s', position:'relative',
          }}>
            <div style={{
              width:24, height:24, borderRadius:'50%', background: isPublic ? T.bg : T.textMuted,
              position:'absolute', top:2, left: isPublic ? 24 : 2,
              transition:'left 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.3s',
              boxShadow:'0 1px 4px rgba(0,0,0,0.3)',
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, StudyScreen, CreateListScreen, BottomNav, BlobBg, KozmosMascot, T });
