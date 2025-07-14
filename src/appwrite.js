import {Client, Databases, Query,ID} from "appwrite";

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client = new Client()
    .setEndpoint("https://nyc.cloud.appwrite.io/v1")
    .setProject(PROJECT_ID)

const database = new Databases(client);

export const updateSearchCount = async (searchTerm,movie) => {
    // 1.使用 Appwrite 软件开发工具包（SDK）检查搜索词是否存在于数据库中
    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.equal('searchTerm', searchTerm),
        ])

        // 2.如果存在，更新计数
        if(result.documents.length > 0){
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID,COLLECTION_ID,doc.$id,{
                count:doc.count + 1,
            })
         // 3.如果不存在，创建一个包含该搜索词且计数为 1 的新文档
        }else {
            await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
                searchTerm,
                count:1,
                movie_id:movie.id,
                poster_url:`https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
        }
    }catch(error){
        console.log(error);
    }

}

export const getTrendingMovies = async () =>{
    try{
        const result = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
            Query.limit(5),
            Query.orderDesc("count")
        ])

        return result.documents;
    } catch (error) {
        console.error(error);
    }
}