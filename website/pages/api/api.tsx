export const config = { rpc: true }

export default async function handler(req, res) {
    try {
        // Handle your API logic here
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
