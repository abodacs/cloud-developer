import * as uuid from 'uuid'
import { TodoItem } from '../models/TodoItem'
import { TodoUpdate } from '../models/TodoUpdate'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { TodosAccess } from '../dataLayer/todosAccess'

const todoBucket = process.env.ATTACHMENT_S3_BUCKET

const todosAccess = new TodosAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
    console.log('BUSINESS LOGIC - get all todos')
   const items = await todosAccess.getAllTodos(userId)
   console.log('BUSINESS LOGIC - items retrived ', items)
   return items
 }


export async function createTodo(createTodoRequest: CreateTodoRequest, userId: string): Promise<TodoItem> {
    console.log('BUSINESS LOGIC - create todo')
  
    const itemId = uuid.v4()
  
    return await todosAccess.createTodo({
      userId: userId,
      todoId: itemId,
      createdAt: new Date().toISOString(),
      name: createTodoRequest.name,
      dueDate: createTodoRequest.dueDate,
      done: false,
      attachmentUrl: `https://${todoBucket}.s3.amazonaws.com/${itemId}`
    })
  }

  export async function updateTodo(updateTodoRequest: UpdateTodoRequest, todoId: string, userId: string): Promise<TodoUpdate> {
    console.log('BUSINESS LOGIC - update todo')
    return await todosAccess.updateTodo(updateTodoRequest, todoId, userId)
  }

  export async function deleteTodo(todoId: string, userId: string): Promise<any> {
    console.log('BUSINESS LOGIC - delete todo')
    return await todosAccess.deleteTodo(todoId, userId)
  }