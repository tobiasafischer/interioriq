import Nav from '../components/navigation/nav'
import styles from '../pages/index.module.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className={styles.main}>
			<Nav />
			{children}
		</main>
	)
}
