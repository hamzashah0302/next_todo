// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type Data = {
  name: string
}


export const todos: any = [
  {
    id: 1,
    todo: "Do something nice for someone I care about",
    completed: true,
    userId: 26,
  },
  {
    id: 2,
    todo: "Memorize the fifty states and their capitals",
    completed: false,
    userId: 48,
  },
  // other todos
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { method } = req;

  switch (method) {

    // case "GET":
    //   const list = await getTodos(req,res)
    //   res.status(200).json(todos);
    //   break;


    case "POST":
      const result : any  = await addTodo(req ,res)
      res.status(200).json(result);
      break;


    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}



const addTodo =async (req: any, res: any)=>{

    const { name, day, email } = req.body;
    const result = await prisma.todos.create({
        data: {
            name,
            day,
            author: { connect: { email: email } },
        },
    });
    return result

}


