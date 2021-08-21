import React from 'react'
import Faker from 'faker'

const Pedido = (props) => {
    return (
        <div className='d-flex'>
            <div className='d-flex align-items-center'>
                <img src={Faker.internet.avatar()} alt='faker'></img>
            </div>
            <div className='flex-grow-1 ms-2 border rounded'>
                <h4 className='text-left'>
                    {Faker.name.findName()}
                </h4>
                <p className='text-center'>
                    {Faker.lorem.paragraph()}
                </p>
                <p>
                    6:52:40 PM
                </p>
            </div>
        </div>
    )
}

export default Pedido
