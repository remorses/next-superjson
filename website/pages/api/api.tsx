import { getContext } from 'next-rpc/context'
export const config = { rpc: true }

export async function apiCall({}) {
    const { req } = getContext()

    return {
        hello: 'world',
    }
}
