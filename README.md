
-Usar a biblioteca React Router 
npm install react-router-dom

-Na main.tsx enevolver o app com Router, pra habilitar o sistemas de rots

-Criar novo componente Layout.tsx
Este componente terá os links para as duas páginas. 
Usamos o componente <NavLink> do React Router
O componente <Outlet /> é um marcador de posição 

-Criar novo componente DateForm.tsx que ira ter todo logica que anterirmente esta no App.tsx

-interface DateFormProps {
  mode: 'age' | 'countdown';
}
Criei esses dois tipos de modo para identicar como o formulario vai se comportar

-Criar uma nova pasta pages
Criando um arquivo para cada págia
1-AgeCalculatorPage.tsx
2-CountdownPage.tsx

-Passo final
Na App.tsx que ta vazia agora pra configurar as Rotas