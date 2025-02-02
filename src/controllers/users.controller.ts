import {NextFunction, Request, Response} from "express";
import {getFirestore} from "firebase-admin/firestore";
import { ValidationError } from "../errors/validation.error";
import { NotFoundError } from "../errors/not-found.error";

type User = {
    id: number;
    nome: string;
    email: string;
};

export class UsersController {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        const snapshot = await getFirestore().collection("users").get();
        const users = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        };
        });
        res.send(users);
    }

    static async getById(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        const doc = await getFirestore().collection("users").doc(userId).get();
        if (doc.exists) {
            res.send({
                id: doc.id,
                ...doc.data()
            });
        } else {
            throw new NotFoundError("Usuário não encontrado")
        }
    }

    static async save(req: Request, res: Response, next: NextFunction) {
        let user = req.body;
        if (!user.email || user.email.length === 0) {
            throw new ValidationError("E-mail obrigatório");
        }
        const userSave = await getFirestore().collection("users").add(user);
        res.send({
            message: `Usuário ${userSave.id} criado com sucesso!`
        });
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        let user = req.body as User;
        let docRef = getFirestore().collection("users").doc(userId);

        if ((await docRef.get()).exists) {
            await docRef.set({
                nome: user.nome,
                email: user.email
            });
            res.send({
                message: "Usuário atualizado com sucesso!"
            });
        } else {
            throw new NotFoundError("Usuário não encontrado");
        }  
    }
    
    static async delete(req: Request, res: Response, next: NextFunction) {
        let userId = req.params.id;
        await getFirestore().collection("users").doc(userId).delete();
        res.status(204).end();
    }
}

