import { Button } from 'primereact/button'
import React, { Component } from 'react'

export default class Botoes extends Component {
    render() {
        return (
            <div className={`${this.props.className} ${styles.botoes}`}>
                <div className="flex justify-content-evenly">
                    <Button 
                        label='Iniciar Jogo'
                        className='p-button-raised p-button-outlined'
                        icon='pi pi-check'
                        onClick={this.props.fIniciar}
                    />
                    <Button 
                        label='Encerrar Jogo'
                        className='p-button-raised p-button-outlined p-button-danger'
                        icon='pi pi-times'
                        onClick={this.props.fEncerrar}
                    />
                    <Button 
                        label='Zerar pontuação'
                        className='p-button-raised p-button-outlined p-button-warning'
                        icon='pi pi-times'
                        onClick={this.props.fZerar}
                    />
                </div>
            </div>
        )
    }
}

const styles = {
    botoes: ''
}