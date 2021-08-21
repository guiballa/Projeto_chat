import React from 'react'

const Feedback = (props) => {
    return (
        <div className='d-flex justify-content-center m-2'>

            <button 
                type='button' 
                className='btn btn-primary m-2'
                onClick={props.funcaoOK}>
                    {props.textoOK}
            </button>

            <button 
                type='button' 
                className='btn btn-danger m-2'
                onClick={props.funcaoNOK}>
                    {props.textoNOK}
            </button>
        </div>
    )
}

export default Feedback
