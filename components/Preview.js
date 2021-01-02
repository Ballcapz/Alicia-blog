import Link from 'next/link';
import css from './Preview.module.css';

function Preview({ slug, title, description}) {

    return (
        <div className={css.preview}>
            <Link as={`/${slug}`} href="/[slug]" >
                <a className={css.title}>
                    {title}
                    <p>{description}</p>
                </a>
            </Link>
        </div>
    )
}

export default Preview
