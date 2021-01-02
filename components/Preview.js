import Link from 'next/link';
import css from './Preview.module.css';

function Preview({ title, description}) {

    return (
        <div className={css.preview}>
            <Link href={`/${encodeURIComponent(title)}`} >
                <a className={css.title}>{title}</a>
            </Link>
            <p>{description}</p>
        </div>
    )
}

export default Preview
