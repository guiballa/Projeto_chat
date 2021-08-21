import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Pedido from './Pedido'
import Cartao from './Cartao'
import Feedback from './Feedback'


export const App = () => {
    const funcaoOK = () => alert('Obrigado pelo feedbaock')
    const funcaoNOK = () => alert('Vamos verificar')
    const textoOK = 'Recebi' 
    const textoNOK = 'Ainda não recebi'

    const feedbackJSX = <Feedback 
                            textoOK = {textoOK}
                            textoNOK = {textoNOK}
                            funcaoOK = {funcaoOK}
                            funcaoNOK = {funcaoNOK}/>

    return (
        <div className='container border rounded mt-2'>
            <div className='row border-bottom m-2'>
                <h1 className='display-5 text-center'>
                    Seus pedidos
                </h1>
            </div>
            <div className='row'>
                <div className='col-sm-8 col-md-6 m-2'>
                    <Cartao cabecalho='22/04/2021' >
                        <Pedido 
                            icon='fas fa-hdd fa-2x' 
                            titulo='SSD' 
                            desc='SSD Kingston A400 - SATA'/>
                        {feedbackJSX}
                    </Cartao>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-8 col-md-6 m-2'>
                    <Cartao cabecalho='20/04/2021' >
                        <Pedido 
                            icon='fas fa-book fa-2x' 
                            titulo='Livro' 
                            desc='Concrete Mathematics - Donald Knuth'/>
                        {feedbackJSX}
                    </Cartao>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-8 col-md-6 m-2'>
                    <Cartao cabecalho='21/01/2021' >
                        <Pedido 
                            icon='fas fa-laptop fa-2x' 
                            titulo='Notebook' 
                            desc='Notebook Dell - 8GB - I5'/>
                        {feedbackJSX}
                    </Cartao>
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.querySelector('#root')
)
