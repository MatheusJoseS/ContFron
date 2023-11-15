'use client'
import React, { useEffect, useState } from "react";
import api from "../../shaed/utils/my-axios";
import { log } from "console";

export default function DiarioIdPage({ params }: { params: { diarioId: string } }) {
  const [diario, setDiario] = React.useState<{ title: string; description: string; question1: string; question2: string; question3: string; updated_at: string }>({ title: '', description: '', question1: '', question2: '', question3: '', updated_at: '' })
  const token = localStorage.getItem('token');
  useEffect(() => {
    info();
  }, []);
  const info = async () => {
    const response = await api.get('/diary/findDiary/' + params.diarioId)
    setDiario(response.data)

  }
  const getData = (e: any) => {
    const { name, value } = e.target
    setDiario({ ...diario, [name]: value })
  }
  const dataFrom = {
    title: diario.title,
    description: diario.description,
    question1: diario.question1,
    question2: diario.question2,
    question3: diario.question3,
  }
  const atualizar = async (e: any) => {
    e.preventDefault()
    await api.put('/diary/updateDiary/' + params.diarioId, dataFrom);
    location.href = 'http://localhost:3000/diario'
  }
  const diariopag = () => {
    location.href = '/diario'
  }
  console.log(diario);
  return (
    <main style={{ background: '#cbb3d8' }} className="w-screen h-screen flex">
      <div style={{ background: '#d8cadb' }} className="w-1/4 h-full border-r-2 border-solid border-white">
        <a href="/home"><img src="/imagens/sete.png" alt="" className="w-20 ml-5 pt-5" /></a>
        <button onClick={diariopag} style={{ color: '#a273c6' }} className="w-full h-20 mt-10 text-white text-3xl" tabIndex={5}><strong>Todos os Diario</strong> </button>
        <button className="w-full h-20 mt-10 text-white text-3xl" style={{ background: '#a273c6' }} tabIndex={6}><strong>Editar</strong></button>
      </div>
      <div className="w-full h-full">
          <div className="flex justify-between items-center ml-40">
            <h1 className="text-white text-5xl mt-5 flex m-auto">Cont;nue</h1>
            <button onClick={atualizar} style={{ background: '#a273c6' }} className=" text-white float-right mr-20 flex justify-between items-center p-2 rounded-xl mt-6 w-40 text-2xl h-12 "> atualizar <img src="/imagens/salvar.png" alt="" /></button>
          </div>
          <form className="mx-40 p-5 mt-3">
            <input className="text-4xl border-b-2 w-full h-20 rounded-lg pl-4 text-gray-500 mb-3 placeholder:text-4xl placeholder:text" value={diario?.title} placeholder="Titulo" type="text" name="title" id="title" onChange={getData} maxLength={55} /> <br />
            <textarea className="text-4xl border-b-2 w-full rounded-lg p-5 text-gray-500 mb-3 placeholder:text-4xl placeholder:text" value={diario?.description} placeholder="Seu pensamento..." name="description" id="description" onChange={getData} rows={8} ></textarea>
            <input className="text-2xl border-b-2 w-full h-20 rounded-lg pl-4 text-gray-500 mb-3 placeholder:text-2xl placeholder:text" value={diario?.question1} name="question1" id="question1" onChange={getData} placeholder="Quais sentimentos emergiram enquanto você anotava no diário?" />
            <input className="text-2xl border-b-2 w-full h-20 rounded-lg pl-4 text-gray-500 mb-3 placeholder:text-2xl  placeholder:text" value={diario?.question2} name="question2" id="question2" onChange={getData} placeholder="Quais de minhas crenças e valores emergiram durante a anotação do diário?" />
            <input className="text-2xl border-b-2 w-full h-20 rounded-lg pl-4 text-gray-500 mb-3 placeholder:text-2xl  placeholder:text" value={diario?.question3} name="question3" id="question3" onChange={getData} placeholder="Como esta pagina do diário vai direcionar as minhas ações?" />
          </form>
        </div>
    </main >
  )
}