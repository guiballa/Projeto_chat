import React, { Component } from 'react'

export default class EstacaoClimatica extends Component {

    timer = null
    state = {
        data: null
    }
    componentDidMount(){
        console.log('EstacaoClimatica: ComponenteDidMount')
        this.timer = setInterval(() => {
            this.setState({data: new Date().toLocaleTimeString()})
        }, 1000);
    }
    componentWillUnmount(){
        console.log('EstacaoClimatica: ComponentWillUnmount')
        clearInterval(this.timer)
    }
    componentDidUpdate(){
        console.log('EstacaoClimatica: ComponentDidUpdate')
    }
    render() {
        console.log('EstacaoClimatica: Render')
        return (
            <div className='card'>
                <div className='card-body'>
                    <div className='d-flex align-items-center border mb-2'>
                        <i className={`fas fa-5x ${this.props.icone}`}></i>
                        <p className='w-75 ms-3 text-center fs-1'>
                            {this.props.estacao}
                        </p>
                    </div>
                    
                    <div>
                        <p className='text-center'>
                            {
                                this.props.lat ?
                                    `Coordenadas: ${this.props.lat}, ${this.props.lng}, Data ${this.state.data}`
                                    :
                                    this.props.mensagemErro ?
                                    `${this.props.mensagemErro}`
                                    :
                                    'clique no botão para saber sua estação climatica'
                            }
                        </p>
                    </div>
                    <button onClick={this.props.obterLocalizacao} className='btn btn-outline-primary w-100 mt-2'>
                        Qual a minha estação?
                    </button>
                    {/* <button
                        className='btn btn-outline-danger w-100 mt-2' onClick={() => {
                            ReactDOM.unmountComponentAtNode(document.querySelector('#root'))
                        }}>
                        Remover da Árvore
                    </button> */}
                </div>
            </div>
        )
    }
}
