import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useAuth } from '../contexts/auth'

export default function Home() {
  const { user, isLoading, signInWithGithub, signOut } = useAuth()

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Fast Feedback!</h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        {!user ? (
          <button onClick={signInWithGithub}>Sign In</button>
        ) : (
          <button onClick={signOut}>Sign Out</button>
        )}

        <p>{isLoading ? '...' : user ? user.email : null}</p>
      </main>
    </div>
  )
}
