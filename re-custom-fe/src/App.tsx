import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import UserDashboard from "./components/UserDashboard.tsx"

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

