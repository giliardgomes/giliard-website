import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SpeedInsights />
    </>
  )
}