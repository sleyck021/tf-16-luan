import minimist from "minimist";

/** Obter a fila e a concorrencia que o worker irá se conectar 
 * 1. Irá priorizar o parametro de terminal posicional
 * 2. Irá buscar a variável de ambiente RABBITMQ_QUEUE
 * 3. Irá conectar na fila default
 */
export default () => {

    /**
     * Utiliza o minimist para transformar em objeto os parametro --[nome]=[valor]
     */
    const [, , ...rawArgs] = process.argv;
    const args = minimist(rawArgs);
    
    // Argumentos posicionais
    const posArgs = args["_"] || [];
    
    // Primeiro argumento posicional é a fila
    const queue = posArgs[0] || process.env.RABBITMQ_QUEUE || "default";
    
    // Segundo argumento posicional é a concorrência
    const concurrency = posArgs[1] || process.env.RABBITMQ_CONCURRENCY || 1;

    return {
        queue: queue,
        concurrency: parseInt(concurrency)
    }
}