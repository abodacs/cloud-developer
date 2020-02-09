import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'

const XAWS = AWSXRay.captureAWS(AWS)

export class TodosAccess {

    constructor(
        private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly userIdIndex = process.env.USER_ID_INDEX
    ) {}
    
    async getAllTodos(userId: string): Promise<TodoItem[]> {
        console.log('getting all todos for user with ID: ', userId)
        const result = await this.docClient.query({
            TableName: this.todosTable,
            IndexName: this.userIdIndex,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        }).promise()
        console.log('fecthed todos: ', result);

        const items = result.Items
        console.log('todos access items ', items)
        return items as TodoItem[]
    }

    async createTodo(todoItem: TodoItem): Promise<TodoItem> {
        console.log('creating todo item: ', todoItem)

        await this.docClient.put({
          TableName: this.todosTable,
          Item: todoItem
        }).promise()
    
        console.log('item created successfully')
        return todoItem
    }

    async updateTodo(todoItem: TodoUpdate, todoId: string, userId: string): Promise<TodoUpdate>{
        console.log('updating todo item with Id: ', todoId)

        await this.docClient.update({
            TableName: this.todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression: "set #n = :name, dueDate = :dueDate, done = :done",
            ExpressionAttributeValues: {
                ":name": todoItem.name,
                ":dueDate": todoItem.dueDate,
                ":done": todoItem.done 
            },
            ExpressionAttributeNames: {
                "#n": 'name'
                // name conflicts with dynamos reserved words: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/ReservedWords.html
            }
        }).promise()

        console.log('item updated successfully')  
        return todoItem
    }

    async deleteTodo(todoId: string, userId: string): Promise<any> {
        console.log('deleting todo item with Id: ', todoId)
        await this.docClient.delete({
            TableName: this.todosTable,
            Key: {
              userId,
              todoId
            }
          }).promise()

        console.log('item deleted successfully')
      return null;
    }

}