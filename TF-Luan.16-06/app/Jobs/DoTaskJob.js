import createJob from '../../Core/QueueCore/createJob.js';
import helpers from '../../bootstrap/helpers.js';

const { timerBySecond } = helpers;

export default createJob({
    name: "DoTaskJob",
    handle: async (payload) => {
        const { name } = payload;
        console.log(`Processando tarefa para: ${name}`);
        await timerBySecond(10);
        console.log(`Tarefa concluída para: ${name}`);
    }
});

/**
 * Para executar o worker que processará os jobs da fila do-task-queue com 3 jobs simultâneos:
 * 
 * node worker do-task-queue 3
 * 
 * Onde:
 * - "worker" é o script de entrada para o worker
 * - "do-task-queue" é o nome da fila
 * - "3" é o número de jobs que podem ser executados simultaneamente
 */