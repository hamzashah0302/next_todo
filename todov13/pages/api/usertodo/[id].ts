// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const config = {
    api: {
        bodyParser: true,
    },
};

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

        case "GET":
            const list = await getTodos(req, res)
            res.status(200).json(list);
            break;

        case "DELETE":
            const deleted = await handleDelete(req, res)
            res.status(200).json({ deleted });
            break;

        case "PUT":
            const updateResult = await handleUpdate(req, res)
            res.status(200).json({ updateResult });
            break;

        default:
            res.setHeader('Cache-Control', 'no-store')
            res.setHeader("Allow", ["GET", "POST", "DELETE", "PUT"]);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}

const getTodos = async (req: any, res: any) => {
    let { id } = req.query;

    const result = await prisma.user.findUnique({
        where: { id: Number(id) },
        include: {
            posts: true
        }
    })
    return result
    // console.log("check params ", result)
}


// Delete 
const handleDelete = async (req: any, res: any) => {
    const { id } = req.query;
    const result = await prisma.todos.delete({
        where: { id: Number(id) }
    })
    return result
}

// Update 
const handleUpdate = async (req: any, res: any) => {
    const { id } = req.query;
    const { day, name } = req.body;
    const result = await prisma.todos.update({
        where: { id: Number(id) },
        data : { day, name } 
    })
    return result
}




