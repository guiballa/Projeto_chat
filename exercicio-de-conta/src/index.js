import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

import React, { Component } from 'react'
//import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom'
import Jogo from './Jogo'



export default class App extends Component {
    render() {
        return (
            <Jogo/>
        )
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)