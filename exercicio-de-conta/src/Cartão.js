import React, { Component } from 'react'
import { Card } from 'primereact/card'
import { styles } from 'ansi-colors'

export default class Cartão extends Component {
    render() {
        return (
            <Card title={this.props.titulo} style={styles.card}>
                <div className={`${styles.inner} ${this.props.className}`}>

                </div>
            </Card>
        )
    }
}

const styles = {
    card: {backgroundColor: 'var(--blue-100)'},
    inner: 'border-round bg-orange-50 w-8 p-2 m-auto',
    className: ''
}

Cartao.defaultProps = {
    titulo: 'Resolva a conta se puder!'
}