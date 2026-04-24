/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-orbitron)', 'monospace'],
        body:    ['var(--font-nunito)', 'Nunito', 'sans-serif'],
        arabic:  ['var(--font-noto-kufi-arabic)', 'sans-serif'],
        ruqaa:   ['var(--font-aref-ruqaa)', 'serif'],
      },
      colors: {
        pastel: {
          lavender: '#C8B8FF',
          purple:   '#B8A0FF',
          cyan:     '#80EEFF',
          mint:     '#A0FFE0',
          pink:     '#FFB8D8',
          peach:    '#FFD0B8',
          gray:     '#E8E0F8',
        },
        glass: {
          white:  'rgba(255,255,255,0.40)',
          border: 'rgba(255,255,255,0.70)',
        },
        text: {
          primary:   '#5A4A8A',
          secondary: '#8A78B8',
          light:     '#B0A0D8',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        // Mesh background
        'mesh-pastel': `
          radial-gradient(ellipse at 0% 0%,    #D8C8FF 0%, transparent 55%),
          radial-gradient(ellipse at 100% 0%,   #A8F0FF 0%, transparent 55%),
          radial-gradient(ellipse at 50% 50%,   #E8D8FF 0%, transparent 60%),
          radial-gradient(ellipse at 0% 100%,   #FFB8E8 0%, transparent 55%),
          radial-gradient(ellipse at 100% 100%, #B8FFE8 0%, transparent 55%)
        `,
        // Button gradients
        'grad-button':      'linear-gradient(135deg, #9860FF 0%, #60C8FF 100%)',
        'grad-title':       'linear-gradient(135deg, #60D0FF 0%, #80B8FF 40%, #A060FF 100%)',
        'grad-purple-cyan': 'linear-gradient(135deg, #C8B0FF 0%, #80EEFF 100%)',
        'grad-pink-purple': 'linear-gradient(135deg, #FFB8D8 0%, #C8A0FF 100%)',
        'grad-mint-cyan':   'linear-gradient(135deg, #A0FFE8 0%, #60D8FF 100%)',
        // Tool icon backgrounds
        'tool-purple': 'linear-gradient(135deg, #D0B0FF, #A080FF)',
        'tool-cyan':   'linear-gradient(135deg, #A0EEFF, #60D0FF)',
        'tool-pink':   'linear-gradient(135deg, #FFB8D8, #FF90C0)',
        'tool-mint':   'linear-gradient(135deg, #A0FFD8, #60E8B8)',
        'tool-peach':  'linear-gradient(135deg, #FFD8B0, #FFB880)',
      },
      boxShadow: {
        'glass':    '0 8px 32px rgba(160,120,255,0.18), inset 0 1px 0 rgba(255,255,255,0.80)',
        'glass-lg': '0 16px 48px rgba(140,100,240,0.18), inset 0 2px 0 rgba(255,255,255,0.90)',
        'orb':      '0 8px 24px rgba(140,60,255,0.40), inset -4px -4px 12px rgba(0,0,0,0.15)',
        'btn':      '0 4px 20px rgba(120,80,255,0.40), inset 0 1px 0 rgba(255,255,255,0.30)',
        'btn-lg':   '0 8px 30px rgba(120,80,255,0.55)',
        'card':     '0 12px 40px rgba(140,100,240,0.12), inset 0 2px 0 rgba(255,255,255,0.90)',
        'card-hover':'0 24px 60px rgba(140,100,240,0.22), inset 0 2px 0 rgba(255,255,255,0.90)',
      },
      backdropBlur: {
        'xs': '4px',
        '2xl': '40px',
        '3xl': '60px',
      },
      animation: {
        'float':       'floatGentle 4s ease-in-out infinite',
        'float-slow':  'floatGentle 6s ease-in-out infinite',
        'orb':         'orbFloat 5s ease-in-out infinite',
        'sparkle':     'sparklePulse 3s ease-in-out infinite',
        'fade-in-up':  'fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up':    'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'dot-pulse':   'dotPulse 2s ease-in-out infinite',
        'shimmer':     'shimmer 2s linear infinite',
      },
      keyframes: {
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        orbFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':      { transform: 'translateY(-12px) rotate(5deg)' },
          '66%':      { transform: 'translateY(-6px) rotate(-3deg)' },
        },
        sparklePulse: {
          '0%, 100%': { opacity: '0', transform: 'scale(0.5) rotate(0deg)' },
          '50%':      { opacity: '1', transform: 'scale(1) rotate(45deg)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        dotPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(160,96,255,0.5)' },
          '50%':      { boxShadow: '0 0 0 5px rgba(160,96,255,0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
    },
  },
  plugins: [],
}