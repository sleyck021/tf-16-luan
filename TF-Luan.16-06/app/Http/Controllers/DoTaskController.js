import DoTaskJob from '../../Jobs/DoTaskJob.js';
import CONSTANTS from '../../../bootstrap/constants.js';

export default async (request, response) => {
    const name = request.body.name;
    
    // Envia o job para a fila em vez de executar a tarefa diretamente
    await DoTaskJob.dispatch({ name }, 'do-task-queue');
    
    return response.status(CONSTANTS.HTTP.SUCCESS).json({ 
        success: "Tarefa enviada para processamento em segundo plano" 
    });
}