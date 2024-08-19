'use client'

import Header from "../airlink-comp/header";

export default function BIdCLient() {
  return (
        <>
        <div className="absolute">
          <Header />
        </div>

          <main className="bg-neutral-900 text-white flex w-screen h-screen flex-col place-items-center p-10">
            <section className="w-full h-full flex flex-col place-items-center place-content-center">
              <div className="w-full flex flex-col gap-2 place-items-center place-content-center h-[10vh]">
                <p>Bid</p>
              </div>
            </section>
        </main>
      </>
  );
}
