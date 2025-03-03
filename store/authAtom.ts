import {atom} from 'recoil';

type AuthType = {
    isAuthenticated: boolean;
    user: {
        _id:string;
        name: string;
        email:string;
        role: "driver" | "admin"

    }
}


export const intitialAuth : AuthType = {
    isAuthenticated: false,
    user: {
        _id:"",
        name: "",
        email: "",
        role: "driver",
    }
    }

export const authAtom = atom<AuthType>({
    key:"authAtom",
    default: intitialAuth
})
