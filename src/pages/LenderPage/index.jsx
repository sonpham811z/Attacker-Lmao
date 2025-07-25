"use client"
import LenderSidebar from "../../components/Lender/LenderSidebar"
import { Routes, Route, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import LenderDashboard from "./LenderDashboard"
import LoanRequests from "./LoanRequests"
import FindOpportunities from "./FindOpportunities"
import Portfolio from "./Portfolio"
import Analytics from "./Analytics"
import CompanyProfile from "./CompanyProfile"
import ContactSupport from "./ContactSupport"

const LenderRoutes = () => {
  const navigate = useNavigate()

  // Update sidebar active state based on current route
  useEffect(() => {
    const path = window.location.pathname
    const sidebarItems = document.querySelectorAll(".MuiListItem-root")
    sidebarItems.forEach((item) => {
      const text = item.querySelector(".MuiListItemText-root")?.textContent
      const routeMap = {
        Dashboard: "/lender/dashboard",
        "Loan Requests": "/lender/requests",
        "Find Opportunities": "/lender/search",
        "My Portfolio": "/lender/portfolio",
        Analytics: "/lender/analytics",
        "Company Profile": "/lender/company",
        "Contact Support": "/lender/support",
      }
      if (text && routeMap[text] === path) {
        item.style.backgroundColor = "rgba(32, 191, 107, 0.1)"
        item.style.border = "1px solid rgba(32, 191, 107, 0.2)"
      } else {
        item.style.backgroundColor = "transparent"
        item.style.border = "1px solid transparent"
      }
    })
  }, [navigate])

  return (
    <>
      <LenderSidebar />
      <Routes>
        <Route path="dashboard" element={<LenderDashboard />} />
        <Route path="requests" element={<LoanRequests />} />
        <Route path="search" element={<FindOpportunities />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="company" element={<CompanyProfile />} />
        <Route path="support" element={<ContactSupport />} />
        <Route path="/" element={<LenderDashboard />} />
      </Routes>
    </>
  )
}

export default LenderRoutes
