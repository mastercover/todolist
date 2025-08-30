import React from 'react'
import Link from 'next/link'

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
}

const UsersPage = async () => {
    const res = await fetch(
        'http://127.0.0.1:8080/api/user',
        {next : { revalidate: 10 }});
    const product: Product[] = await res.json();
    return (
        <div>
            <h1>Product Page</h1>
            <p>{new Date().toLocaleTimeString()}</p>
            <ul>
                {product.map(prod => (
                    <li key={prod.id}>
                        <Link href={`/product/${prod.id}`}>{prod.name} - ${prod.price}</Link>
                    </li>
                ))}
            </ul>
            <Link href="/product/new">Add New Product</Link>
            <Link href="/new">Back to Users</Link>
        
        </div>
    )
}

export default productIndex
