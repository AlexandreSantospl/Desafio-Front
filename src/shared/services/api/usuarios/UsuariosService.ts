import { Api } from "../ApiConfig";
import { ApiException } from "../ApiException";

export interface IUsuario {
    id: number;
    name: string;
    email: string;
    password: string;
    level: number;
}

function gerarIdAleatorio(): string {
    return Math.floor(Math.random() * 1000000).toString();
}

const login = async (email: string, password: string): Promise<IUsuario | ApiException> => {
    try {
        const { data } = await Api().get('/usuarios', {
            params: {
                email
            }
        });

        const user = data[0];
        if (user && user.password === password) {
            return user;
        } else {
            return new ApiException("Credenciais inválidas.");
        }
    } catch (error: any) {
        return new ApiException(error.msg || "Erro ao autenticar usuário.");
    }
};


const getAll = async (): Promise<IUsuario[] | ApiException> => {
    try {
        const { data } = await Api().get('/usuarios');
        return data;
    } catch (error: any) {
        return new ApiException(error.msg || "Erro ao buscar os registros.")
    }

};

const getById = async (id: number): Promise<IUsuario | ApiException> => {
    try {
        const { data } = await Api().get(`/usuarios/${id}`);
        return data;
    } catch (error: any) {
        return new ApiException(error.msg || "Erro ao consultar a API por id.")
    }
}

const create = async (dataToCreate: Omit<IUsuario, 'id'>): Promise<IUsuario | ApiException> => {
    try {
        const id = gerarIdAleatorio();
        const dataComId = { ...dataToCreate, id };
        const { data } = await Api().post<any>('/usuarios', dataComId);
        return data;
    } catch (error: any) {
        return new ApiException(error.msg || "Erro ao criar o registro.")
    }
}

const updateById = async (id: number, dataToUpdate: IUsuario): Promise<IUsuario | ApiException> => {
    try {
        const { data } = await Api().put(`/usuarios/${id}`, dataToUpdate);
        return data;
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || 'Erro ao atualizar o registro');
    }
}

const deleteById = async (id: number): Promise<undefined | ApiException> => {
    try {
        await Api().delete(`/usuarios/${id}`);
        return undefined;
    } catch (error: any) {
        return new ApiException(error.msg || "Erro ao apagar o registro.")
    }
}


export const usuariosService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
    login
};