import { Box } from "@mui/material";
import Sidebar from "../../components/Borrrower/Sidebar";
import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import Dashboard from './Dashboard'
import TransactionMonitor from "./TransactionMonitor";
import Loans from "./Loans";

const BorrowerRoutes = () => {
  const navigate = useNavigate();

  // Update sidebar active state based on current route
  useEffect(() => {
    const path = window.location.pathname;
    const sidebarItems = document.querySelectorAll(".MuiListItem-root");
    sidebarItems.forEach((item) => {
      const text = item.querySelector(".MuiListItemText-root")?.textContent;
      const routeMap = {
        "Dashboard": "/borrower/dashboard",
        "Loans": "/borrower/loans",
        "Submit Another Deal": "/borrower/submit-deal",
        "Transaction History": "/borrower/transaction-history",
        "Contact Support": "/borrower/contact-support",
        "Deals Room": "/borrower/deals-room",
      };
      if (text && routeMap[text] === path) {
        item.style.backgroundColor = "rgba(67, 133, 244, 0.1)";
        item.style.border = "1px solid rgba(67, 133, 244, 0.2)";
      } else {
        item.style.backgroundColor = "transparent";
        item.style.border = "1px solid transparent";
      }
    });
  }, [navigate]);

  return (
    <>
      <Sidebar />
     
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="loans" element={<Loans/>} />
          <Route path="transaction-history" element={<TransactionMonitor/>} />
          <Route path="submit-deal"  />
          <Route path="contact-support" element={<h1>Hello</h1>}  />
          <Route path="deals-room" element={<h1>Hello</h1>}  />
          <Route path="/" element={<h1>Hello</h1>}  />
        </Routes>
     
    </>
  );
};

export default BorrowerRoutes;