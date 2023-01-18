import type { NextApiRequest, NextApiResponse } from 'next'
import { Prisma, PrismaClient } from "@prisma/client";
import { use } from 'react';
const prisma = new PrismaClient();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { slug = [] } = req.query
    switch (slug[0]) {

        case "signUpUser":
            const result: any = await createuser(req, res)
            break;


        case "login":
            const loggedIn: any = await Login(req, res)
            break;


        default:
            res.status(405).end(`Route ${slug[0]} Not Found`);
            break;
    }
    console.log(`Post: slug===>>>.`, slug);

}


// create user
const createuser =async (req: any, res: any)=>{

    const { user_name, password, email } = req.body;
    const result: any = await prisma.user.create({
        data: {
            name: user_name,
            email,
            password: password,
        },
    });
    return res.status(200).json(result);

}

// handle Login 
const Login =async (req: any, res: any)=>{
    let { email , password} = req.body
    const user: any = await prisma.user.findFirst({
        where: {
            email, password
        },
    });
    if(!user)
        return res.status(200).send({ error: 'invalid cradentials' })
    delete user.password
    return res.status(200).json(user)
}