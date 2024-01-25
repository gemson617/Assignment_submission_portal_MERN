/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  // content: ["./src/auth/Login.js","./src/student/StudRegister.js","./src/admin/AddAssignment.js","./src/student/StudHome.js","./src/student/Header.js","./src/student/ViewAssignments.js","./src/admin/viewAssignments.js"],

  // "./src/MyCar.t.js",

  theme: {
    extend: {},
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}

