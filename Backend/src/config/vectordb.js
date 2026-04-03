import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
    apiKey: process.env.PINECONE_KEY
});
const index = pc.index('archivist-ai');

if (index) {
    console.log("Vector database connected successfully")
}
else {
    console.log("Vector database connection failed")
}
export default index;