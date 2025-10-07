import app from "../app.js";
import { connectDB } from "../db/connection.js";

async function bootstrap() {
    try {
        const port = process.env.PORT || 3000

        await connectDB()

        app.listen(port ,  () => {console.log(`✅ server running on port ${port} 🚀`);})
        
    } catch (error) {
        console.error({message : "❌ error on bootstrap" , stack : error.stack});
        
    }
}

export default bootstrap