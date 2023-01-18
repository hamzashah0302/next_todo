// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { method } = req;

  switch (method) {

    case "GET":
      res.status(200).json({todos: "aasdas"} );
      break;


    case "POST":
      const result : any  = await createuser(req ,res)
      
      res.status(200).json(result);
      break;


    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}




const createuser =async (req: any, res: any)=>{

    const { user_name, password, email } = req.body;
    const result: any = await prisma.user.create({
        data: {
            name: user_name,
            email,
            password: password,
        },
    });
    return result

}


