import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import React, { Component } from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom'
//import Jogo from './Jogo'
import Cartao from './Cartao'
//import Mensagem from './Mensagem'
import Botoes from './Botoes'
import Jogo from './Jogo'
import Mensagem from './Mensagem'



export default class App extends Component {

    state = {
        status: 'off',
        acertos: 0,
        erros: 0,
        contador: 0
    }

    alterarStatus = (status) => {
        this.setState({status})
    }

    atualizarPontuacao = acertou => {
        this.setState(
            acertou 
            ? 
            {acertos: this.state.acertos + 1 } 
            : 
            {erros: this.state.erros + 1 }
        )
        this.setState({
            contador:this.state.contador + 1
        })

    }

    zerarPontuacao = () => {
        this.setState({
            acertos: 0,
            erros: 0,
            contador: 0
        })
    }

    render() {
        return (
            // <Jogo/>
            <div className="grid justify-content-center">
                <div className="col-12 lg:col-6 ">
                    <Cartao className='h-18rem'>
                        <div className="h-12rem">
                            {
                                this.state.status === 'on' 
                                ?
                                <Jogo
                                    status={this.state.status}
                                    fAtualizarPontuacao={this.atualizarPontuacao}
                                    />
                                :
                                <div className='flex justify-content-center align-items-center h-full'>
                                    <Mensagem 
                                        texto='Clique para iniciar'
                                        className='md:w-8 w-10'
                                    />
                                </div>
                            }
                            {/* <div className='flex justify-content-center align-items-center h-full'>
                                <Mensagem 
                                    texto='Clique para iniciar'
                                    className='md:w-8 w-10'
                                />
                            </div> */}
                            {/* <Jogo/> */}
                        </div>
                        <Botoes 
                            fIniciar={() => this.alterarStatus('on')}
                            fEncerrar={() => this.alterarStatus('off')}
                            fZerar={() => this.zerarPontuacao()}
                            className='mt-5'
                            />
                    </Cartao>
                </div>
                <div className="col-12 lg:col-6">
                    <Cartao 
                        titulo='Sua pontuação'
                        className='h-18rem'>

                    </Cartao>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)