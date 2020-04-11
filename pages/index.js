import React from 'react'

const Index = () => {   // Componente: retorna estrutura em JSX que descreve parte da interface
    return (
        <div>
            <h1>Home</h1>
            <a href='/api/login' className='py-3 rounded-lg bg-pink-800 font-semibold shadow-xl hover:shadow text-white w-1/6 block mx-auto text-center text-xl'>Start here</a>
        </div>
    )
}

export default Index