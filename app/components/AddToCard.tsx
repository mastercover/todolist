'use client'
import Link from 'next/link'
import React from 'react'

const AddToCard = () => {
    return (
        <div>
            <button onClick={() => console.log('Added to cart')}>
                Add to Cart 
            </button>
        </div>
    )
}

export default AddToCard
