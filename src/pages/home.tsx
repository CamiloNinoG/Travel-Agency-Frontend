import { Sidebar } from "../components/sidebar";

export default function Home() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold">Bienvenido a la Home bebe</h1>
        <p className="mt-4 text-gray-700">
          Aquí puedes empezar a poner tu contenido principal.
        </p>
      </main>
    </div>
  )
}
