import { Button } from 'primereact/button'
import React, { Component } from 'react'
import _ from 'underscore'

export default class Jogo extends Component {
    constructor(props){
        super(props)
        this.state = {
            alternativas: Array(5).fill(undefined),
            intervaloDeAtualizacao: 5000,
            tempoRestante: 5
        }

    }

    valorInicial = 1
    valorFinal = 20

    timerGeral = null
    timerSegundoASegundo = null

    operacoes = [
        {
            simbolo: '+', operacao: (a,b) => a + b
        },
        {
            simbolo: '-', operacao: (a,b) => a - b
        },
        {
            simbolo: '*', operacao: (a,b) => a * b
        }

    ]

    gerarConta = () => {
        let n1 = Math.floor(Math.random() * this.valorFinal) + this.valorInicial
        let n2 = Math.floor(Math.random() * this.valorFinal) + this.valorInicial
        let oQueFazer = Math.floor(Math.random() * this.operacoes.length)
        let simbolo = this.operacoes[oQueFazer]['simbolo']
        let resultado = this.operacoes[oQueFazer]['operacao'](n1,n2)
        return {n1, n2, simbolo, resultado}
    }

    gerarAlternativas = (resultado) => {
        let aux = [resultado]
        while (aux.length < 5 ){
            let n = Math.floor(Math.random() * this.valorFinal + this.valorInicial)
            if (!aux.includes(n))
                aux.push(n)
        }
        return _.shuffle(aux)
    } 

    gerarJogo = () => {
        let {n1, n2, simbolo, resultado} = this.gerarConta()
        let alternativas = this.gerarAlternativas(resultado)
        this.setState({
            n1, n2, resultado, simbolo, alternativas, tempoRestante: 5
        })
    }

    encerrarJogo = () => {
        clearInterval(this.timerGeral)
        clearInterval(this.timerSegundoASegundo)
    }

    componentDidMount(){
        this.iniciarRodada()
    }

    componentWillUnmount(){
        this.encerrarJogo()
    }

    iniciarRodada = () => {
        clearInterval(this.timerGeral)
        clearInterval(this.timerSegundoASegundo)
        let fire = (f, t) => {
            f()
            this.timerSegundoASegundo = setInterval(() => {
                this.setState({tempoRestante: this.state.tempoRestante - 1 })
            }, 1000);
            return setInterval(f,t)
        }
        this.timerGeral = fire(this.gerarJogo, this.state.intervaloDeAtualizacao)
    }
    
    render() {
        const conta = (
            <div className={styles.conta}>
                {
                    [this.state.n1,this.state.simbolo,this.state.n2,'=','...'].map( (e, i) => (
                        <div
                            key={i.toString()} 
                            className={styles.valor}>
                            {e}
                        </div>
                    ))
                }
            </div>
        )
        

        const alternativas = (
            <div className={styles.alternativas}>
                {
                    this.state.alternativas.map ( (alternativa, indice) => (
                        <Button
                            key={indice.toString()}
                            label={alternativa?.toString()}
                            className={`${styles.valor} ${styles.alternativa}`}
                            />
                    ))
                }
            </div>
        )
        
        const tempoRestante = (
            <div className={styles.tempoRestante}>
                {this.state.tempoRestante}
            </div>
        )

        return (
            <div>
                {conta}
                {alternativas}
                {tempoRestante}
                
            </div>
        )
    
    }
}

const styles = {
    conta: 'flex justify-content-center align-items-center border-round bg-orange-200 shadow-2 h-4rem',
    valor: 'flex justify-content-center align-items-center border-round border-1 border-400 h-3rem w-3rem',
    alternativas: 'flex justify-content-evenly align-items-center border-round shadow-2 h-4rem mt-2',
    alternativa: 'p-button-outlined',
    tempoRestante: 'flex justify-content-center align-items-center h-4rem text-3x1'
}


// const styles = {
//     conta: 'flex justify-content-center align-items-center border-round bg-orange-200 shadow-2 h-4rem',
//     valor: 'flex justify-content-center align-items-center border-round border-1 border-400 h-3rem w-3rem',
//     inner: 'border-round bg-orange-50 w-8 p-2 m-auto',
//     botoes: 'flex justify-content-evenly mt-5',
//     card: {
//         backgroundColor: 'var(--blue-100)'
//     }
// }

// Jogo.defaultProps = {
//     titulo:'Jogo de continhas'
// }
// render() {
//     const conta = (
//         <div className={styles.conta}>
//             <div className={styles.valor}>7</div>
//             <div className={styles.valor}>x</div>
//             <div className={styles.valor}>8</div>
//         </div>
//     )
//     const botoes = (
//         <div className={styles.botoes}>
//             <Button label='Iniciar Jogo'
//                     className='p-button-raised'
//                     icon='pi pi-check'>

//             </Button>
//             <Button label='Encerrar Jogo'
//                     className='p-button-raised p-button-danger'
//                     icon='pi pi-times'>

//             </Button>
//         </div>
//     )
//     return (
//         <Card title={this.props.titulo} style={styles.card}>
//             <div className={styles.inner}>
//                 {conta}
//                 {botoes}
//             </div>
//         </Card>
//     )
// }