import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { directoryDataByName, directoryDataByEmplid, DirectoryEntry } from './directoryData'
import { ErrorResponse } from './util'

type DirectoryEmployeeQuery = {
    name?: string
    emplid?: string
}

type DirectoryEmployeeRequest = FastifyRequest<{
    Querystring: DirectoryEmployeeQuery
}>

export const registerDirectory = (server: FastifyInstance) => {

    server.get('/directory',  async (request: DirectoryEmployeeRequest, response: FastifyReply) => {
        const { name, emplid } = request.query
    
        if (name === undefined && emplid === undefined){
    
            let employeeNames: string[] = []
    
            directoryDataByName.forEach(entry => {
                employeeNames.push(entry.name)
            });
    
            response.send( {
                employees: employeeNames
            })
        }
    
        else if (name !== undefined) {
    
            let directoryEntry: DirectoryEntry | undefined = directoryDataByName.get(name) 
        
            if (directoryEntry === undefined) {
                response.code(404).send(ErrorResponse(404, `Employee with name: ${name} not found`))
            }
            else {
                response.send(directoryEntry)
            }
        }
        else if (emplid !== undefined) {
            let directoryEntry: DirectoryEntry | undefined = directoryDataByEmplid.get(emplid) 
        
            if (directoryEntry === undefined) {
                response.code(404).send(ErrorResponse(404, `Employee with id: ${emplid} not found`))
            }
            else {
                response.send(directoryEntry)
            }
        }
    
    })
}
