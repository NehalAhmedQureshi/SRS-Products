import React from 'react'
import Link from 'next/link'
import styles from '../page.module.css'
import { ArrowBack } from '@mui/icons-material'

export default function BackButton({text='Back' , href='/'}) {
  return (
    <Link href={href}  className={styles?.link}><ArrowBack /> {text}</Link>
  )
}
