'use client'
import React, { useEffect, useState } from "react";
import api from "../shaed/utils/my-axios";
interface imag {
  user_url: string;
  id: string;
  user: string;
  description: string;
  title: string;
}
interface Imagen {
  imag: File | undefined;
  description: string;
  title: string;
}
export default function SOSconfPage() {
  const [foto, setFoto] = React.useState<imag[]>([]);
  const [imagen, setImagen] = useState(false)
  const [fotos, setFotos] = useState<Imagen>({ imag: undefined, description: '', title: '' });
  const TitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFotos((prevFoto) => ({ ...prevFoto, title: e.target.value }));
  }
  const FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFotos((prevFoto) => ({ ...prevFoto, imag: file }));
  }
  const DescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFotos((prevFoto) => ({ ...prevFoto, description: e.target.value }));
  }
  const Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fotos.imag) {
      const formData = new FormData();
      formData.append("file", fotos.imag);
      formData.append("description", fotos.description);
      formData.append("title", fotos.title);
      try {
        const response = await api.post('/sos/uploadFile', formData);
        location.href = 'http://localhost:3000/SOSconf';
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      console.log('erro');

    }
  }
  const login = () => {
    const novoestado = false;
    setImagen(novoestado)
  }
  const cadastro = () => {
    const novoestado = true;
    setImagen(novoestado)
  }
  useEffect(() => {
    info();
  }, [])
  const info = async () => {
    const response = await api.get('/sos/findFile')
    const data = response.data.res
    setFoto(data)
  }
  const deletar = async (id: string) => {
    const response = await api.delete("/sos/deleteFile/" + id)
    location.href = '/SOSconf'
  }
  return (
    <main style={{ background: 'rgb(232, 163, 163)' }} className="w-screen h-screen flex">
      <div style={{ background: '#ea8282' }} className="w-1/4 h-full border-r-2 border-solid border-white">
        <a href="/home"><img src="/imagens/sete.png" alt="" className="w-20 ml-5 pt-5" /></a>
        {imagen ? <button style={{ color: '#e53838' }} onClick={login} className="w-full h-20 mt-10 text-white text-3xl" tabIndex={5}><strong>Todas as imagens</strong> </button> : <button className="w-full h-20 mt-10 text-white text-3xl" style={{ background: '#ec6161' }} tabIndex={5}><strong>Todas as imagens</strong></button>}
        {imagen ? <button className="w-full h-20 mt-10 text-white text-3xl" style={{ background: '#ec6161' }} tabIndex={6}><strong>Adicionar</strong></button> : <button style={{ color: '#e53838' }} onClick={cadastro} className="w-full h-20 mt-10 text-white text-3xl" tabIndex={6}><strong>Adicionar</strong></button>}
      </div>
      {imagen ?
        <div className="w-full h-full">
          <h1 className="text-white text-5xl mt-5 text-center">Cont;nue</h1>
          <form onSubmit={Submit} className="p-5">
            <div className="flex items-center justify-center">
              <input type="text" name="title" id="title" placeholder="Titulo:" style={{ background: 'rgb(232, 163, 163)' }} onChange={TitleChange} className='placeholder:text-white text-3xl w-1/2 flex items-center justify-center text-white' maxLength={45} />
            </div>
            <div className="flex items-center justify-center w-full">
              <label form="dropzone-file" className="flex flex-col items-center justify-center w-1/2 h-80 mt-3 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click aqui para escolher uma foto</span> ou arraste um arquivo PNG</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" name="file" onChange={FileChange} type="file" className="hidden" />
              </label>
            </div>
            <div className='ml-80 pl-8 mt-5 mb-3'>
              <label htmlFor="description" className="text-right text-white text-3xl">Decrição</label>
            </div>
            <div className="flex items-center justify-center">
              <textarea name="description" id="description" onChange={DescriptionChange} maxLength={400} rows={10} className='w-1/2' />
            </div>
            <button className="text-white float-right mr-20 flex justify-between items-center p-2 rounded-xl mt-16 w-32 text-2xl h-12" type="submit" style={{ background: '#ec6161' }}>Enviar <img src="/imagens/salvar.png" alt="" /></button>
          </form>
        </div>
        :
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-white text-5xl mt-5">Cont;nue</h1>
            <input style={{ background: '#ec6161' }} className="w-1/2 pl-5 h-11 mt-6 text-white placeholder:text-white placeholder:pl-5 rounded-3xl" type="text" placeholder="pesquisar por título ..." />
          </div><div style={{ overflow: "auto", height: '44em' }} className="w-11/12 m-auto mt-5">
            {foto.map(foto => {
              return (
                <div className="m-5 p-5">
                  <h1 className="text-white text-3xl pb-5 ml-72"> <strong>{foto.title}</strong></h1>
                  <img src={'http://localhost:38000/images/' + foto.user_url} alt="imagen do usuario" className="m-auto rounded-3xl  shadow-2xl border-solid border-red-700 border-2" style={{ width: '50em' }} />
                  <p className="text-white text-center break-words overflow-hidden	mt-3">{foto.description}</p>
                  <button onClick={() => { deletar(foto?.id) }} className='float-right' ><img src="/imagens/lixo.png" className="w-6" alt="" /></button>
                </div>
              )
            })}
          </div>
        </div>}

    </main >
  )
}