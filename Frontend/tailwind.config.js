/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      jersy: ['"Jersey 10 Charted"'],
      pacifico: ['"Pacifico"'],
      ptsans: ['"PT Sans"'],
      roboto: ['"Roboto'],
      bebas: ['"Bebas Neue"'],
      ubuntu: ['"Ubuntu Sans Mono"'],
    },
    extend: {
      transitionDelay: {
        2000: "2000ms",
      },

      lineClamp: {
        10: "10",
      },

      transitionTimingFunction: {
        "custom-ease": "cubic-bezier(0.25, 0.8, 0.25, 1)",
        "custom-bounce": "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
        // Add more custom timing functions as needed
      },

      backgroundImage: {
        "shimmer-gradient":
          "linear-gradient(to right, rgba(255, 255, 255, 0.13) 25%, rgba(255, 255, 255, 0.13) 77%, rgba(255, 255, 255, 0.5) 92%, rgba(255, 255, 255, 0) 100%)",
      },
      colors: {
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
      },

      keyframes: {
        fadin: {
          "0%": { transform: "rotate(0.0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10.0deg)" },
          "60%": { transform: "rotate(0.0deg)" },
          "100%": { transform: "rotate(0.0deg)" },
        },

        shimmer: {
          "0%": {
            left: "-100%",
          },
          "100%": {
            left: "100%",
          },
        },
      },

      animation: {
        "waving-hand": "wave 2s linear infinite",
        shimmer: "shimmer 0.8s  infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme, e }) {
      const utilities = Object.entries(theme("lineClamp")).map(
        ([key, value]) => {
          return {
            [`.${e(`line-clamp-${key}`)}`]: {
              overflow: "hidden",
              display: "-webkit-box",
              "-webkit-box-orient": "vertical",
              "-webkit-line-clamp": value,
            },
          };
        }
      );

      addUtilities(utilities, ["responsive"]);
    },
  ],
});

// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     fontFamily: {
//       jersy: ['"Jersey 10 Charted"'],
//       pacifico: ['"Pacifico"'],
//       ptsans: ['"PT Sans"'],
//       roboto: ['"Roboto'],
//       bebas: ['"Bebas Neue"'],
//       ubuntu: ['"Ubuntu Sans Mono"'],
//     },
//     extend: {
//       colors: {
//         sky: {
//           50: "#f0f9ff",
//           100: "#e0f2fe",
//           200: "#bae6fd",
//           300: "#7dd3fc",
//           400: "#38bdf8",
//           500: "#0ea5e9",
//           600: "#0284c7",
//           700: "#0369a1",
//           800: "#075985",
//           900: "#0c4a6e",
//         },
//         slate: {
//           50: "#f8fafc",
//           100: "#f1f5f9",
//           200: "#e2e8f0",
//           300: "#cbd5e1",
//           400: "#94a3b8",
//           500: "#64748b",
//           600: "#475569",
//           700: "#334155",
//           800: "#1e293b",
//           900: "#0f172a",
//           950: "#020617",
//         },
//       },
//       keyframes: {
//         fadin: {
//           "0%": { transform: "rotate(0.0deg)" },
//           "10%": { transform: "rotate(14deg)" },
//           "20%": { transform: "rotate(-8deg)" },
//           "30%": { transform: "rotate(14deg)" },
//           "40%": { transform: "rotate(-4deg)" },
//           "50%": { transform: "rotate(10.0deg)" },
//           "60%": { transform: "rotate(0.0deg)" },
//           "100%": { transform: "rotate(0.0deg)" },
//         },
//       },
//       animation: {
//         "waving-hand": "wave 2s linear infinite",
//       },
//     },
//   },
//   plugins: [],
// };
