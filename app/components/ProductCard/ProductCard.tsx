import Link from 'next/link'
import React from 'react'
import styles from './ProductCard.module.css'
import AddToCard from '../AddToCard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();


const ProductCard = () => {
  return (
    <div className='p-5 my-5  text-xl '>
      <AddToCard />
      <Link href='posts/new'>View User</Link>
      <Link href='posts/update'>New Posts</Link>
    </div>
  )
}

export default ProductCard
