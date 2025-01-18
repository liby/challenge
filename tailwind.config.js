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
          focus: '#E8E8E8',
          'focus-border': '#d9d9d9',
        },
        handle: {
          border: '#AAAAAA',
          hover: 'black',
        },
        input: {
          bg: '#f9fafb',
          border: '#e5e7eb',
        },
        text: {
          muted: '#6b7280',
        },
        drag: {
          bg: '#14b8a6',
          hover: '#0d9488',
        }
      },
      boxShadow: {
        node: '0px 3.54px 4.55px 0px #00000005, 0px 3.54px 4.55px 0px #0000000D, 0px 0.51px 1.01px 0px #0000001A',
        focus: '0px 0px 0px 4px var(--theme-focus)',
      },
      spacing: {
        node: '1rem',
        input: '0.75rem',
      },
      borderRadius: {
        node: '0.5rem',
        input: '0.25rem',
      },
      fontSize: {
        node: '0.9rem',
        note: '0.3rem',
      },
      maxWidth: {
        note: '12rem',
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
    function ({ addComponents, addVariant, theme }) {
      addVariant('selected', ['&.selected', '.selected &']);

      addComponents({
        '.flow-node-base': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme('spacing.node'),
          fontSize: theme('fontSize.node'),
          backgroundColor: 'white',
          border: `1px solid ${theme('colors.node.border')}`,
          borderRadius: theme('borderRadius.node'),
          boxShadow: theme('boxShadow.node'),
          '&:hover': {
            borderColor: theme('colors.node.hover'),
          },
          '&:focus': {
            boxShadow: theme('boxShadow.focus'),
            borderColor: theme('colors.node.focus-border'),
          },
          '&:focus:active': {
            boxShadow: theme('boxShadow.node'),
          },
          '&.selected': {
            borderColor: theme('colors.node.selected'),
          }
        },
        '.flow-handle': {
          backgroundColor: 'white',
          borderColor: theme('colors.handle.border'),
          '&:hover': {
            borderColor: theme('colors.handle.hover'),
            backgroundColor: 'white',
          },
          '&:focus': {
            borderColor: theme('colors.handle.hover'),
          }
        },
        '.flow-text-box': {
          padding: `${theme('spacing.input')} ${theme('spacing.node')}`,
          backgroundColor: theme('colors.input.bg'),
          borderRadius: theme('borderRadius.input'),
          border: `1px solid ${theme('colors.input.border')}`,
        },
        '.flow-note': {
          fontSize: theme('fontSize.note'),
          color: theme('colors.text.muted'),
          maxWidth: theme('maxWidth.note'),
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          textAlign: 'left',
          marginBottom: theme('spacing.input'),
        },
        '.custom-drag-handle': {
          width: theme('width.drag'),
          height: theme('height.drag'),
          backgroundColor: theme('colors.drag.bg'),
          borderRadius: '9999px',
          cursor: 'grab',
          transition: 'all 0.2s ease',
          marginLeft: theme('spacing.node'),
          '&:hover': {
            backgroundColor: theme('colors.drag.hover'),
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

