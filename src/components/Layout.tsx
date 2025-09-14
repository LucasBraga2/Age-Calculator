import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <nav className="flex justify-center p-1 bg-slate-100 rounded-full max-w-sm mx-auto mb-8">

     
        <NavLink
          to="/"
          className={({ isActive }) =>
            `w-1/2 text-center py-2 px-4 rounded-full font-medium transition-colors duration-300 ease-in-out ${
              isActive
                ? 'bg-purple-500 text-white shadow-md' 
                : 'text-gray-500 hover:bg-purple-100'  
            }`
          }
        >
          Calculadora de Idade
        </NavLink>

        <NavLink
          to="/countdown"
          className={({ isActive }) =>
            `w-1/2 text-center py-2 px-4 rounded-full font-medium transition-colors duration-300 ease-in-out ${
              isActive
                ? 'bg-purple-500 text-white shadow-md' 
                : 'text-gray-500 hover:bg-purple-100'   
            }`
          }
        >
          Contagem Regressiva
        </NavLink>
        
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  );
}