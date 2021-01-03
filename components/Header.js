import css from './Header.module.css';
import Link from 'next/link';

export default function Header({ title }) {
  return <header className={css.header}>
    <Link href="/">
      <a><h1 className={css.title}>{title}</h1></a>
    </Link>
    <div className={css.search}><img src="/search-icon.png" /></div>
  </header>;
}
