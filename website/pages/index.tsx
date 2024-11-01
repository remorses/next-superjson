import { useEffect } from 'react'

export default function Home({ date }) {
    useEffect(() => {
        fetch('/api/api')
            .then(res => res.json())
            .catch(err => console.error(err))
    }, [])

    return (
        <div>
            <p>Hello World</p>
            <p>{date.toISOString()}</p>
        </div>
    )
}

export function getStaticProps() {
    return {
        props: {
            date: new Date(),
        },
    }
}
