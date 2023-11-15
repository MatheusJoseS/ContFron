import { BACKEND_URL } from "@/app/shaed/constants/constants";
const getAlunos = async (): Promise<any[]> => {
    const res = await fetch(`${BACKEND_URL}/alunos`);
    const data = await res.json();
    return data;
}
const getAlunosById = async (id: any) => {
    const res = await fetch(`${BACKEND_URL}/alunos/${id}`)
    const data = await res.json()
    return data
}
export default { getAlunos, getAlunosById }