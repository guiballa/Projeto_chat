import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Pedido from './Pedido'
import Cartao from './Cartao'
import Feedback from './Feedback'


export const App = () => {
    const funcaoOK = () => alert('Obrigado pelo feedbaock')
    const funcaoNOK = () => alert('Vamos verificar')
    const textoOK = 'Aprovar' 
    const textoNOK = 'Não Aprovar'

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
            <div className='row justify-content-center'>
                <div className='col-sm-8 col-md-6 col-lg-12 m-2'>
                    <Cartao>
                        <Pedido/>
                        {feedbackJSX}
                    </Cartao>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-sm-8 col-md-6 col-lg-12 m-2'>
                    <Cartao>
                        <Pedido/>
                        {feedbackJSX}
                    </Cartao>
                </div>
            </div>
            <div className='row justify-content-center'>
                <div className='col-sm-8 col-md-6 col-lg-12 m-2'>
                    <Cartao>
                        <Pedido/>
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
