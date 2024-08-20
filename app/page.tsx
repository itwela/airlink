import Image from "next/image";

export default function Home() {
  return (
        <>
          <main className="bg-neutral-900 text-white flex w-screen h-screen flex-col place-items-center p-10">
            <section className="w-full h-full flex flex-col place-items-center place-content-center">
              <div className="w-full flex flex-col gap-5 place-items-center place-content-center h-max">
                <p className="text-3xl">Airlink</p>
                <p className="">Travel made easy.</p> 
                <a href="/chat">
                  <button className="p-2 px-4 hover:scale-105 outline outline-1 outline-white rounded-lg">
                    Demo
                  </button>
                </a>
                <p className="text-muted-foreground">Airlink is currently under development by Itwela Ibomu.</p> 

              </div>
            </section>
        </main>
      </>
  );
}
