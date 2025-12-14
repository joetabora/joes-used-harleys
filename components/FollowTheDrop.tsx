'use client';

export function FollowTheDrop() {
  const socialLinks = [
    {
      platform: 'TikTok',
      handle: '@suchgrime',
      url: 'https://www.tiktok.com/@suchgrime',
      icon: '🎵',
      color: '#000000',
      hoverColor: '#FF6600'
    },
    {
      platform: 'Instagram',
      handle: '@joetabora',
      url: 'https://www.instagram.com/joetabora',
      icon: '📸',
      color: '#000000',
      hoverColor: '#FF6600'
    },
    {
      platform: 'Facebook',
      handle: 'Joe\'s Used Harleys',
      url: 'https://www.facebook.com/joesusedharleys',
      icon: '👥',
      color: '#000000',
      hoverColor: '#FF6600'
    },
    {
      platform: 'Discord',
      handle: 'Join the Club',
      url: '#', // Update with actual Discord link
      icon: '💬',
      color: '#000000',
      hoverColor: '#FF6600'
    }
  ];

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0A0A0A 0%, #000000 100%)',
      padding: '6rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23FF6600\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.5
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          fontFamily: 'var(--font-clash)',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          textShadow: '0 4px 20px rgba(255, 102, 0, 0.5)'
        }}>
          FOLLOW THE DROP
        </h2>
        <p style={{
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          color: '#CCCCCC',
          marginBottom: '4rem',
          fontWeight: 600,
          letterSpacing: '2px'
        }}>
          See every bike as it drops. Follow for daily updates.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginTop: '3rem'
        }}>
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: '#000000',
                border: '3px solid #FF6600',
                padding: '3rem 2rem',
                borderRadius: '16px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 0 30px rgba(255, 102, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FF6600';
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 12px 50px rgba(255, 102, 0, 0.6)';
                const icon = e.currentTarget.querySelector('.social-icon') as HTMLElement;
                const title = e.currentTarget.querySelector('.social-title') as HTMLElement;
                const handle = e.currentTarget.querySelector('.social-handle') as HTMLElement;
                if (icon) icon.style.transform = 'scale(1.2) rotate(5deg)';
                if (title) title.style.color = '#000000';
                if (handle) handle.style.color = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#000000';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(255, 102, 0, 0.2)';
                const icon = e.currentTarget.querySelector('.social-icon') as HTMLElement;
                const title = e.currentTarget.querySelector('.social-title') as HTMLElement;
                const handle = e.currentTarget.querySelector('.social-handle') as HTMLElement;
                if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                if (title) title.style.color = '#FF6600';
                if (handle) handle.style.color = '#CCCCCC';
              }}
            >
              <div style={{
                fontSize: '4rem',
                marginBottom: '1.5rem',
                transition: 'all 0.3s ease'
              }} className="social-icon">
                {social.icon}
              </div>
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                color: '#FF6600',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '0.5rem',
                transition: 'all 0.3s ease'
              }} className="social-title">
                {social.platform}
              </h3>
              <p style={{
                fontSize: '1rem',
                color: '#CCCCCC',
                fontWeight: 600,
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }} className="social-handle">
                {social.handle}
              </p>
              <div style={{
                marginTop: '1.5rem',
                fontSize: '0.9rem',
                color: '#FF6600',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                opacity: 0.8
              }}>
                FOLLOW NOW →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
