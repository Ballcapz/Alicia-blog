import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';

import css from './search.module.css';


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
}


export default function Search({setShowSearch}) {
    const searchRef = useRef(null);
    const [query, setQuery] = useState('');
    const [active, setActive] = useState(false);
    const [results, setResults] = useState([]);

    const searchEndpoint = query => `/api/search?q=${query}`;

    const debouncedSearch = debounce(function(query) {
        if (query.length) {
            fetch(searchEndpoint(query))
                .then(res => res.json())
                .then(res => {
                    setResults(res.results)
                })
        } else {
            setResults([]);
        }
    }, 300);

    const onChange = useCallback((e) => {
        const query = e.target.value;
        setQuery(query);
        debouncedSearch(query); 
    }, []);

    const onFocus = useCallback(() => {
        setActive(true);
        window.addEventListener('click', onClick)
    }, []);

    const onClick = useCallback((e) => {
        if (searchRef.current && !searchRef.current.contains(e.target)) {
            setActive(false);
            window.removeEventListener('click', onClick);
        }
    }, []);


    return (
        <div className={css.container} ref={searchRef}>
            <input
                className={css.search}
                onChange={onChange}
                onFocus={onFocus}
                placeholder="Search..."
                type="text"
                value={query}
            />
            { active && results.length > 0 && (
                <ul className={css.results}>
                    {results.map(({ title }) => (
                        <li className={css.result} key={title}>
                            <Link as={`/${title.split(' ').join('-')}`} href="/[slug]">
                                <a onClick={() => setShowSearch(false)}>{title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )

}