"use client";

import Homepage from '@/components/Home/Homepage'

function App() {

  return (
    <>

              <section id="home" className=''>
                <Homepage />
              </section>
              <section id="intro" className="h-screen flex flex-col z-5">
                <div className="flex items-center h-full bg-gray-100">
                  <div className="bg-[var(--primary)] h-full flex items-center p-4 w-1/4 md:w-1/2 justify-center">
                    <p className=" text-5xl md:text-4xl lg:text-6xl font-black text-white rotate-90 md:rotate-0 overflow:hidden" 
                    >#DeshalbDieLinke</p>

                  </div>
                  <div className="h-full flex flex-col items-center p-4 w-3/4 md:w-1/2 justify-center">
                    <div className='p-4'>
                    <h1>Eine ehrenamtliche Kampagne zur Bundestagswahl 2025. </h1>
                    <h1>Hier könnt ihr:</h1>
                      <ul className="list-disc">
                        <li>Eine Galerie an offiziellen und inoffiziellen Sharepics herunterladen</li>
                        <li>Unsere Ziele und Forderungen entdecken</li>
                        <li>Selbst Inhalte Hochladen. <a href="/register">Wie?</a></li>
                        <li>Unsere Kampagne unterstützen                        </li>
                      </ul>
                    </div>
                  </div>

                </div>
              </section>
    </>
  )
}

export default App
