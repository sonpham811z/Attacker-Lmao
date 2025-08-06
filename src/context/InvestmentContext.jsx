import { createContext, useContext, useState } from "react"

const InvestmentContext = createContext()

export const useInvestment = () => useContext(InvestmentContext)

export const InvestmentProvider = ({ children }) => {
  const [totalInvested, setTotalInvested] = useState(0)
  const [activeLoans, setActiveLoans] = useState(0)
  const [monthlyIncome, setMonthlyIncome] = useState(0)
  const [roi, setRoi] = useState(0)

  // Khi cho vay mới
  const investLoan = (amount, interest) => {
    // amount: string "$50,000" -> number
    const amt = Number(String(amount).replace(/[^\d.]/g, ""))
    const rate = Number(String(interest).replace(/[^\d.]/g, ""))
    setTotalInvested(prev => prev + amt)
    setActiveLoans(prev => prev + 1)
    // Lãi suất theo năm, thu nhập tháng = tổng * rate / 100 / 12
    setMonthlyIncome(prev => prev + (amt * rate / 100 / 12))
    // ROI = (thu nhập tháng * 12) / tổng đầu tư * 100
    setTimeout(() => {
      setRoi((monthlyIncome + (amt * rate / 100 / 12)) * 12 / (totalInvested + amt) * 100)
    }, 0)
  }

  return (
    <InvestmentContext.Provider value={{
      totalInvested,
      activeLoans,
      monthlyIncome,
      roi,
      investLoan,
    }}>
      {children}
    </InvestmentContext.Provider>
  )
}
