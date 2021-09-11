import React, { Component } from 'react'

export default class Mensagem extends Component {
    render() {
        return (
            <div className={`${styles.texto} ${this.props.className}`}>
                {this.props.texto}            
            </div>
        )
    }
}

const styles = {
    texto: 'flex justify-content-center align-items-center border-round bg-red-100 shadow-2 h-4rem'
}