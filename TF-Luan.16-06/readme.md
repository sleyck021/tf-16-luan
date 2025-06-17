# Projeto de Processamento Assíncrono com Filas

Este projeto implementa um sistema de processamento assíncrono utilizando filas com RabbitMQ.

## Funcionalidades

- Rota protegida `/api/task` que requer autenticação JWT
- Processamento assíncrono de tarefas demoradas (10 segundos)
- Sistema de filas com RabbitMQ
- Worker com capacidade de processar múltiplas tarefas simultaneamente

## Componentes Principais

- **DoTaskController.js**: Controlador que recebe as requisições e envia para a fila
- **DoTaskJob.js**: Job que processa a tarefa demorada em segundo plano
- **Worker**: Serviço que processa os jobs da fila

## Como Executar

1. Inicie os containers Docker:
   ```
   docker-compose up -d
   ```

2. Execute as migrações e seeds:
   ```
   docker exec tf-luan16-06-nodeweb-container-1 node ./command migrate
   docker exec tf-luan16-06-nodeweb-container-1 node ./command seed
   ```

3. Obtenha um token JWT fazendo login:
   ```
   curl -X POST -H "Content-Type: application/json" -d '{"email":"user1@example.com","senha":"123456"}' http://localhost:8080/login
   ```

4. Use o token para acessar a rota protegida:
   ```
   curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer SEU_TOKEN" -d '{"name":"Teste"}' http://localhost:8080/api/task
   ```

## Configuração do Worker

O worker está configurado para processar a fila `do-task-queue` com concorrência 3, o que significa que pode processar até 3 tarefas simultaneamente.

Para iniciar o worker manualmente:
```
node worker do-task-queue 3
```

Onde:
- `worker` é o script de entrada para o worker
- `do-task-queue` é o nome da fila
- `3` é o número de jobs que podem ser executados simultaneamente