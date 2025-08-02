"use client"

import { Box, ThemeProvider, createTheme } from "@mui/material"
import ValidatorSidebar from "../../components/Validator/Sidebar"
import ValidatorTopBar from "../../components/Validator/TopBar"
import { Routes, Route, useNavigate } from "react-router-dom"
import React, { useEffect } from "react"
import Dashboard from "./Dashboard"
import RequestList from "./RequestList"
import RequestDetail from "./RequestDetail"
import Staking from "./Staking"
import Report from "./Report"
import SlashingAndRewards from "./SlashingAndRewards"
import PerformanceAnalytics from "./PerformanceAnalytics"
import Profile from "./Profile"
import NotificationPage, { NotificationContext } from "./NotificationPage"
import Sidebar from "../../components/Validator/Sidebar"



const ValidatorRoutes = () => {
  const navigate = useNavigate()
  const [unread, setUnread] = React.useState(2)
  const [darkMode, setDarkMode] = React.useState(false)
  const [noti, setNoti] = React.useState(true)
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  useEffect(() => {
    const path = window.location.pathname
    const sidebarItems = document.querySelectorAll(".MuiListItem-root")
    sidebarItems.forEach((item) => {
      const text = item.querySelector(".MuiListItemText-root")?.textContent
      const routeMap = {
        Dashboard: "/validator/dashboard",
        Requests: "/validator/requests",
        Staking: "/validator/staking",
        Analytics: "/validator/analytics",
        Profile: "/validator/profile",
        Notifications: "/validator/notifications",
        Settings: "/validator/settings",
        Report: "/validator/report",
      }
      if (text && routeMap[text] === path) {
        item.style.backgroundColor = "rgba(67, 133, 244, 0.1)"
        item.style.border = "1px solid rgba(67, 133, 244, 0.2)"
      } else {
        item.style.backgroundColor = "transparent"
        item.style.border = "1px solid transparent"
      }
    })
  }, [navigate])

 
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
  }

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    
           <>
           <Sidebar/>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="requests" element={<RequestList />} />
                  <Route path="requests/:id" element={<RequestDetail />} />
                  <Route path="staking" element={<Staking />} />
                  <Route path="slashing" element={<SlashingAndRewards />} />
                  <Route path="analytics" element={<PerformanceAnalytics />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="notifications" element={<NotificationPage />} />
                  <Route path="report" element={<Report />} />
                  <Route path="/" element={<Dashboard />} />
                </Routes>
           </>
  ) }
export default ValidatorRoutes
