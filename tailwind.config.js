/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        node: {
          border: '#EDEDED',
          hover: '#C5C5C5',
          selected: '#F57DBD',
        },
        handle: {
          border: '#AAAAAA',
        },
        drag: {
          bg: '#14b8a6',
          hover: '#0d9488',
        }
      },
      boxShadow: {
        node: '0px 3.54px 4.55px 0px #00000005, 0px 3.54px 4.55px 0px #0000000D, 0px 0.51px 1.01px 0px #0000001A',
      },
      spacing: {
        node: '1rem',
        input: '0.75rem',
      },
      borderRadius: {
        node: '0.5rem',
      },
      fontSize: {
        node: '0.9rem',
      },
      width: {
        drag: '1rem',
      },
      height: {
        drag: '1rem',
      }
    },
  },
  plugins: [
    function ({ addComponents, addVariant }) {
      addVariant('selected', ['&.selected', '.selected &']);

      addComponents({
        '.flow-node-base': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          fontSize: '0.9rem',
          backgroundColor: 'white',
          border: '1px solid #EDEDED',
          borderRadius: '0.5rem',
          boxShadow: '0px 3.54px 4.55px 0px #00000005, 0px 3.54px 4.55px 0px #0000000D, 0px 0.51px 1.01px 0px #0000001A',
          '&:hover': {
            borderColor: '#C5C5C5',
          },
          '&.selected': {
            borderColor: '#F57DBD',
          }
        },
        '.flow-handle': {
          backgroundColor: 'white',
          borderColor: '#AAAAAA',
          '&:hover': {
            borderColor: 'black',
            backgroundColor: 'white',
          }
        },
        '.flow-text-box': {
          padding: '0.75rem 1rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.25rem',
          border: '1px solid #e5e7eb',
        },
        '.custom-drag-handle': {
          width: '1rem',
          height: '1rem',
          backgroundColor: '#14b8a6',
          borderRadius: '9999px',
          cursor: 'grab',
          transition: 'all 0.2s ease',
          marginLeft: '1rem',
          '&:hover': {
            backgroundColor: '#0d9488',
            transform: 'scale(1.1)',
          },
          '&:active': {
            cursor: 'grabbing',
            transform: 'scale(0.95)',
          }
        }
      })
    }
  ],
}

