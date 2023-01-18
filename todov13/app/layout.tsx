import Header from "./Header"
import '../styles/globals.css'
import ProviderContext from './ProviderContext'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html>
      <head />
      <body className="bg-zinc-300 h-screen">
        <div className="h-screen">
          <ProviderContext>
            <Header />
            {children}
          </ProviderContext>
        </div>
      </body>

    </html>

  )
}
