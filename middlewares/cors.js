import cors from 'cors'
const ACCEPTED_ORIGINS =[
    'http://localhost:5500',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://movies.com'
]
export const corsMiddleware = ({acceptedOrigins = ACCEPTED_ORIGINS}={})=>cors({
    origin: (origin, callback) => {
        if(ACCEPTED_ORIGINS.includes(origin)){
            return callback(null, true)
        }

        if(!origin){
            return callback(null, true)
        }
    }
})