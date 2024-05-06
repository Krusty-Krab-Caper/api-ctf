import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { directoryData, DirectoryEntry } from './directoryData'
import { ErrorResponse } from './util'

type DirectoryEmployeeQuery = {
    id: string
}

type DirectoryEmployeeRequest = FastifyRequest<{
    Querystring: DirectoryEmployeeQuery
}>

export const registerDirectory = (server: FastifyInstance) => {

    server.get('/directory',  async (request: DirectoryEmployeeRequest, response: FastifyReply) => {
        const { id } = request.query
    
        if (id === undefined){
    
            let employeeNames: string[] = []
    
            directoryData.forEach(entry => {
                employeeNames.push(entry.name)
            });
    
            response.send( {
                employees: employeeNames
            })
        }
    
        else {
    
            let directoryEntry: DirectoryEntry | undefined = directoryData.get(id) 
        
            if (directoryEntry === undefined) {
                response.code(404).send(ErrorResponse(404, "Not Found (Hint: what is the relationship between what's typed in the browser and what's sent in the query?)"))
            }
            else {
        
                response.send(directoryEntry)
        
            }
        }
    
    })
}
