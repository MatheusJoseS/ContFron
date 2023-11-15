'use client'
import React, { useEffect, useState } from "react";
import api from "../shaed/utils/my-axios";
import { useRouter } from "@/node_modules/next/navigation";

interface Diarios {
  title: string;
  updated_at: string;
  id: string;
}
export default function SOSconfPage() {
  const [diarios, setDiarios] = useState<Diarios[]>([]);
  const router = useRouter();
  const [diario, setDiario] = useState(false)
  const [from, setFrom] = React.useState<{ id_user: string; title: string; description: string; question1: string; question2: string; question3: string; question4: string; }>({ id_user: '', title: '', description: '', question1: '', question2: '', question3: '', question4: '' })
  const getData = (e: any) => {
    const { name, value } = e.target
    setFrom({ ...from, [name]: value })
  }
  const todos = () => {
    const novoestado = false;
    setDiario(novoestado)
  }
  const adicionar = () => {
    const novoestado = true;
    setDiario(novoestado)
  }
  const dataFrom = {
    title: from.title,
    description: from.description,
    question1: from.question1,
    question2: from.question2,
    question3: from.question3,
  }
  const salvar = async (e: any) => {
    e.preventDefault()
    const response = await api.post('/diary/createDiary', dataFrom);
    location.href = 'http://localhost:3000/diario'
  }
  const deletar = async (id:string) => {
    const response = await api.delete('/diary/deleteDiary/' + id);
    location.href = 'http://localhost:3000/diario'
  }
  useEffect(() => {
    info();
  }, []);

  const info = async () => {
    try {
      const response = await api.get('/diary/listDiaryByUserId');
      const data = response.data.res
      setDiarios(data)
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os dados: " + error);
    }
  }
  
  return (
    <main style={{ background: '#cbb3d8' }} className="w-screen h-screen flex">
      <div style={{ background: '#d8cadb' }} className="w-1/4 h-full border-r-2 border-solid border-white">
        <a href="/home"><img src="/imagens/sete.png" alt="" className="w-20 ml-5 pt-5" /></a>
        {diario ? <button onClick={todos} style={{ color: '#a273c6' }} className="w-full h-20 mt-10 text-white text-3xl" tabIndex={5}><strong>Todos os Diario</strong> </button> : <button className="w-full h-20 mt-10 text-white text-3xl" onClick={todos} style={{ background: '#a273c6' }} tabIndex={5}><strong>Todos os Diario</strong></button>}
        {diario ? <button onClick={adicionar} className="w-full h-20 mt-10 text-white text-3xl" style={{ background: '#a273c6' }} tabIndex={6}><strong>Criar</strong></button> : <button onClick={adicionar} style={{ color: '#a273c6' }} className="w-full h-20 mt-10 text-white text-3xl" tabIndex={6}><strong>Criar</strong></button>}
      </div>
      {diario ?
        <div className="w-full h-full">
          <div className="flex justify-between items-center ml-40">
            <h1 className="text-white text-5xl mt-5 flex m-auto">Cont;nue</h1>
            <button onClick={salvar} style={{ background: '#a273c6' }} className=" text-white float-right mr-20 flex justify-between items-center p-2 rounded-xl mt-6 w-32 text-2xl h-12 ">Salvar <img src="/imagens/salvar.png" alt="" /></button>
          </div>
          <form className="mx-40 p-5 mt-3">
            <input className="text-4xl border-b-2 w-full h-20 rounded-lg pl-4 text-gray-500 mb-3 placeholder:text-4xl placeholder:text" placeholder="Titulo" type="text" name="title" id="title" onChange={getData} maxLength={55} /> <br />
            <textarea className="text-4xl border-b-2 w-full rounded-lg p-5 text-gray-500 mb-3 placeholder:text-4xl placeholder:text" placeholder="Seu pensamento..." name="description" id="description" onChange={getData} rows={8} ></textarea>
            <input className="text-2xl border-b-2 w-full h-20 rounded-lg pl-4 text-gray-500 mb-3 placeholder:text-2xl placeholder:text" name="question1" id="question1" onChange={getData} placeholder="Quais sentimentos emergiram enquanto você anotava no diário?" />
            <input className="text-2xl border-b-2 w-full h-20 rounded-lg pl-4 text-gray-500 mb-3 placeholder:text-2xl  placeholder:text" name="question2" id="question2" onChange={getData} placeholder="Quais de minhas crenças e valores emergiram durante a anotação do diário?" />
            <input className="text-2xl border-b-2 w-full h-20 rounded-lg pl-4 text-gray-500 mb-3 placeholder:text-2xl  placeholder:text" name="question3" id="question3" onChange={getData} placeholder="Como esta pagina do diário vai direcionar as minhas ações?" />
          </form>
        </div>
        :
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-white text-5xl mt-5">Cont;nue</h1>
            <input style={{ background: '#a273c6' }} className="w-1/2 pl-5 h-11 mt-6 text-white placeholder:text-white placeholder:pl-5 rounded-3xl" type="text" placeholder="pesquisar por título ..." />
          </div>
          <div style={{ overflow: "auto", height: '44em' }} className="w-11/12 m-auto mt-5">
            {diarios.map(diarios => {
              return (
                <div>
                  <div style={{ color: '#cbb3d8',border: "1px solid #ccc" }} className="mx-5 my-5 h-24 rounded-xl bg-white flex justify-between p-5 shadow-lg">
                    <div className="flex flex-col">
                      <div className="text-4xl">{diarios.title}</div>
                      <div><label>Ultima Atualização:</label>{diarios.updated_at.split('T')[0].replaceAll('-', '/')}</div>
                    </div>
                    <div className="flex">
                      <button className="px-5" onClick={() => router.push("/diario/" + diarios.id)}><img src="/imagens/lapis.png" alt="" className="w-10"/></button>
                      <button className="px-5" onClick={() => { deletar(diarios?.id) }}><img src="/imagens/lixod.png" alt="" className="w-10"/></button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>}

    </main >
  )
}