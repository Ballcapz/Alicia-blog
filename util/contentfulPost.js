const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require('contentful').createClient({
    space,
    accessToken
});

export async function fetchEntry(id) {
    const entry = await client.getEntry(id)
    if (entry) return entry;
}

export default { fetchEntry }
