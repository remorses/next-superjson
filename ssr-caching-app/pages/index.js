export default function Index({ time }) {
    return (
        <main>
            <h1>SSR Caching with Next.js</h1>
            <time dateTime={time}>{time}</time>
        </main>
    )
}

export async function getServerSideProps({ req, res }) {
    res.setHeader(
        'Cache-Control',
        'public, s-maxage=10, stale-while-revalidate=59',
    )
    await sleep(1000)

    return {
        props: {
            time: new Date().toISOString(),
        },
    }
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
