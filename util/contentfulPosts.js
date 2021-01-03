const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require('contentful').createClient({
    space,
    accessToken
});

const fs = require('fs');

export async function fetchEntries() {
    const entries = await client.getEntries();
    if (entries.items) {
        let tmp = entries.items.map(i => {
            return {
                title: i.fields.title,
                description: i.fields.description
            }
        });
        const fileContents = `export const posts = ${JSON.stringify(tmp)}`;
        console.log(fileContents);

        try {
            fs.readdirSync('cache');
        } catch(e) {
            fs.mkdirSync('cache')
        }

        fs.writeFile('cache/data.js', fileContents, function (err) {
            if (err) return console.log(err);
            console.log('posts cached');
        })

        return entries.items;
    }
}

export default { fetchEntries }