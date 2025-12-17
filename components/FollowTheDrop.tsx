'use client';

export function FollowTheDrop() {
  const socialLinks = [
    {
      platform: 'TikTok',
      handle: '@suchgrime',
      url: 'https://www.tiktok.com/@suchgrime',
      icon: '🎵',
      color: '#ea580c',
      gradient: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)'
    },
    {
      platform: 'Instagram',
      handle: '@joetabora',
      url: 'https://www.instagram.com/joetabora',
      icon: '📸',
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)'
    },
    {
      platform: 'YouTube',
      handle: '@suchgrime414',
      url: 'https://www.youtube.com/@suchgrime414',
      icon: '📺',
      color: '#ea580c',
      gradient: 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)'
    }
  ];

  return (
    <section style={{
      background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      padding: '8rem 2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Glow Effects */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(234, 88, 12, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%)',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }}></div>

      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1400px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        {/* Section Header */}
        <div style={{ marginBottom: '5rem' }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 900,
            background: 'linear-gradient(135deg, #ffffff 0%, #9ca3af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            fontFamily: 'var(--font-clash)',
            letterSpacing: '-1px',
            marginBottom: '1rem'
          }}>
            Follow the Daily Drop
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#6b7280',
            fontWeight: 500
          }}>
            New Harleys drop every day. Don't miss out — follow now
          </p>
        </div>

        {/* Social Platform Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
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
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '3.5rem 2.5rem',
                borderRadius: '24px',
                textDecoration: 'none',
                transition: 'all 0.4s ease',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.5rem'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.borderColor = social.color + '80';
                e.currentTarget.style.boxShadow = `0 25px 60px ${social.color}30`;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                
                const icon = e.currentTarget.querySelector('.social-icon-circle') as HTMLElement;
                if (icon) {
                  icon.style.background = social.gradient;
                  icon.style.transform = 'scale(1.1) rotate(5deg)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                
                const icon = e.currentTarget.querySelector('.social-icon-circle') as HTMLElement;
                if (icon) {
                  icon.style.background = 'rgba(255, 255, 255, 0.05)';
                  icon.style.transform = 'scale(1) rotate(0deg)';
                }
              }}
            >
              {/* Icon Circle */}
              <div 
                className="social-icon-circle"
                style={{
                  width: '100px',
                  height: '100px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  transition: 'all 0.4s ease',
                  border: `2px solid ${social.color}40`
                }}
              >
                {social.icon}
              </div>

              {/* Platform Name */}
              <h3 style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                color: '#ffffff',
                fontFamily: 'var(--font-clash)',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                margin: 0
              }}>
                {social.platform}
              </h3>

              {/* Handle */}
              <p style={{
                fontSize: '1.1rem',
                color: '#9ca3af',
                fontWeight: 600,
                letterSpacing: '0.5px',
                margin: 0
              }}>
                {social.handle}
              </p>

              {/* CTA */}
              <div style={{
                marginTop: '1rem',
                padding: '0.75rem 2rem',
                background: social.gradient,
                color: '#ffffff',
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                borderRadius: '50px',
                fontFamily: 'var(--font-clash)'
              }}>
                FOLLOW NOW →
              </div>
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{
          marginTop: '5rem',
          padding: '2.5rem',
          background: 'rgba(255, 255, 255, 0.02)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(234, 88, 12, 0.2)',
          borderRadius: '20px'
        }}>
          <p style={{
            fontSize: '1.3rem',
            color: '#e5e7eb',
            fontWeight: 600,
            marginBottom: '1.5rem',
            lineHeight: '1.6'
          }}>
            New bikes drop <span style={{ color: '#ea580c', fontWeight: 800 }}>every single day</span>.
            <br />
            Follow to see them first and get first dibs.
          </p>
          <a
            href="sms:4144396211?body=I want alerts for new drops!"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #ea580c 0%, #f59e0b 100%)',
              color: '#ffffff',
              padding: '1.25rem 3rem',
              fontSize: '1rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textDecoration: 'none',
              fontFamily: 'var(--font-clash)',
              borderRadius: '50px',
              boxShadow: '0 10px 40px rgba(234, 88, 12, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(234, 88, 12, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(234, 88, 12, 0.4)';
            }}
          >
            <span style={{ fontSize: '1.3rem' }}>💬</span>
            TEXT FOR ALERTS
          </a>
        </div>
      </div>
    </section>
  );
}
