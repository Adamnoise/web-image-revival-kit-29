
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },
        // New neon colors
        neon: {
          cyan: '#00F5FF',
          blue: '#3b82f6',  // Added from Brandbook
          purple: '#B026FF',
          yellow: '#FAFF00',
          red: '#ef4444',   // Added from Brandbook
          green: '#10b981', // Added from Brandbook
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(155, 135, 245, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(155, 135, 245, 0.8)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        },
        scale: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' }
        },
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        'neon-pulse': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.7', filter: 'brightness(0.8)' }
        },
        'noise': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '20%': { backgroundPosition: '20% 20%' },
          '40%': { backgroundPosition: '60% 60%' },
          '60%': { backgroundPosition: '40% 40%' },
          '80%': { backgroundPosition: '80% 80%' },
        },
        'digital-scan': {
          '0%': { transform: 'translateY(-100%)', opacity: '0.2' },
          '100%': { transform: 'translateY(100%)', opacity: '0' }
        },
        'glitch': {
          '0%, 12%, 18.999%, 23%, 31.999%, 37%, 44.999%, 46%, 49.999%, 51%, 58.999%, 61%, 68.999%, 71%, 85.999%, 96%, 100%': {
            transform: 'translate(0px, 0px) skew(0deg)'
          },
          '7%, 13%': {
            transform: 'translate(-2px, 0) skew(-5deg)'
          },
          '19%, 24%': {
            transform: 'translate(2px, 0) skew(5deg)'
          },
          '32%, 38%': {
            transform: 'translate(-2px, 0) skew(-5deg)'
          },
          '45%, 47%': {
            transform: 'translate(2px, 0) skew(5deg)'
          },
          '50%, 52%': {
            transform: 'translate(-2px, 0) skew(-5deg)'
          },
          '59%, 62%': {
            transform: 'translate(2px, 0) skew(5deg)'
          },
          '69%, 72%': {
            transform: 'translate(-2px, 0) skew(-5deg)'
          },
          '86%, 97%': {
            transform: 'translate(2px, 0) skew(5deg)'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'scale': 'scale 0.2s ease-in-out',
        'rotate': 'rotate 2s linear infinite',
        'neon-pulse': 'neon-pulse 2s infinite',
        'noise': 'noise 8s infinite',
        'digital-scan': 'digital-scan 2s linear infinite',
        'glitch': 'glitch 3s infinite'
      },
      boxShadow: {
        'glow-sm': '0 0 5px rgba(155, 135, 245, 0.5)',
        'glow-md': '0 0 10px rgba(155, 135, 245, 0.7)',
        'glow-lg': '0 0 20px rgba(155, 135, 245, 0.9)',
        'glow-blue-sm': '0 0 5px rgba(0, 245, 255, 0.5)',
        'glow-blue-md': '0 0 10px rgba(0, 245, 255, 0.7)',
        'glow-blue-lg': '0 0 20px rgba(0, 245, 255, 0.9)',
        'glow-purple-sm': '0 0 5px rgba(176, 38, 255, 0.5)',
        'glow-purple-md': '0 0 10px rgba(176, 38, 255, 0.7)',
        'glow-purple-lg': '0 0 20px rgba(176, 38, 255, 0.9)',
        'glow-yellow-sm': '0 0 5px rgba(250, 255, 0, 0.5)',
        'glow-yellow-md': '0 0 10px rgba(250, 255, 0, 0.7)',
        'glow-yellow-lg': '0 0 20px rgba(250, 255, 0, 0.9)',
        'brutal-sm': '4px 4px 0 0 rgba(0, 0, 0, 1)',
        'brutal-md': '6px 6px 0 0 rgba(0, 0, 0, 1)',
        'brutal-lg': '8px 8px 0 0 rgba(0, 0, 0, 1)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(45deg, #3a36e0 25%, transparent 25%), linear-gradient(-45deg, #3a36e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #3a36e0 75%), linear-gradient(-45deg, transparent 75%, #3a36e0 75%)',
        'cyber-grid': 'linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)',
        'noise': 'url("/noise.png")'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
