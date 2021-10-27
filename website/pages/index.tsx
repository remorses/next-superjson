import { useEffect } from 'react'
import { apiCall } from './api/api'

export default function Home({ date }) {
    useEffect(() => {
        apiCall({})
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
