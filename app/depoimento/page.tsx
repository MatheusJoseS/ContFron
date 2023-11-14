'use client'
import React, { useEffect, useState } from "react";
import api from "../shaed/utils/my-axios";
interface Imagen {
  id: string;
  description: string;
}
interface Depoimento {
  status: boolean;
  description: string;
  id: string;
}
export default function SOSconfPage() {
  const [imagen, setImagen] = useState(false)
  const [pag, setPag] = useState(false)
  const [adm, setAdm] = useState(false)
  const [analise, setAnalise] = useState(['#41a5ab', ''])
  const [fotos, setFotos] = useState<Imagen[]>([]);
  const [descri, setDescri] = useState<Depoimento[]>([]);
  const [avaliador, setAvaliador] = useState<{ state: string, description: string }>({ state: '', description: '' })
  const [from, setFrom] = React.useState<{ description: string; id: string }>({ description: '', id: '' })
  const data = {
    description: from.description
  }
  const tudo = () => {
    mudarAnalize();
    admVeriv();
  }
  const mudarAnalize = () => {
console.log(analise[0]);
    if (analise[0] === '#41a5ab') {
      const mudar = [
        '', '#75ced3'
      ]
      setAnalise(mudar)
    } else {
      const mudar = [
        '#41a5ab', ''
      ]
      setAnalise(mudar)
    }
  }
  const Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await api.post('/brief/createBrief', data)
    location.href = '/depoimento'

  }
  const getData = (e: any) => {
    const { name, value } = e.target
    setFrom({ ...from, [name]: value })
  }
  const login = () => {
    const novoestado = false;
    setImagen(novoestado)
  }
  const cadastro = () => {
    const novoestado = true;
    setImagen(novoestado)
  }
  const admVeriv = () => {
    setPag(!pag)
  }
  const Aprovado = async (id: string, status: boolean) => {
    status = true
    try {
      const response = await api.put(`/brief/updateBriefByAdm/${id}`, { status: status });
      location.href = '/depoimento'
    } catch (error) {
      console.error(error);
    }
  }
  const Negado = async (id: string) => {
    const response = await api.delete(`/brief/deleteBriefByAdm/${id}`)
    location.href = '/depoimento'
  }
  useEffect(() => {
    info();
  }, [])

  const info = async () => {
    const response = await api.get('/brief/listTrueBrief')
    const admres = await api.get('/users/pegaPorId')
   
    console.log(admres);
    const admdata = admres.data.saveUser.isAdmin
    if (admdata === true) {
      const admAnalize = await api.get('/brief/listFalseBrief')
      setAdm(true)
      const admava = admAnalize.data
      setDescri(admava)
      console.log('ok');
    }else {
      console.log('nada');
    }
    const data = response.data

    setFotos(data)
  }
  return (
    <main style={{ background: '#75ced3' }} className="w-screen h-screen flex">
      <div style={{ background: '#c5e6e8' }} className="w-1/4 h-full border-r-2 border-solid border-white">
        <a href="/home" ><img src="/imagens/sete.png" alt="" className="w-20 ml-5 pt-5" /></a>
        {imagen ? <button style={{ color: '#41a5ab' }} onClick={login} className="w-full h-20 mt-10 text-white text-3xl" tabIndex={5}><strong>Todas os comentarios</strong> </button> : <button className="w-full h-20 mt-10 text-white text-3xl" style={{ background: '#75ced3' }} tabIndex={5}><strong>Todas os comentarios</strong></button>}
        {imagen ? <button className="w-full h-20 mt-10 text-white text-3xl" style={{ background: '#75ced3' }} tabIndex={6}><strong>Adicionar</strong></button> : <button style={{ color: '#41a5ab' }} onClick={cadastro} className="w-full h-20 mt-10 text-white text-3xl" tabIndex={6}><strong>Adicionar</strong></button>}
        {adm && <button style={{ color: analise[0], background: analise[1] }} onClick={tudo} className="w-full h-20 mt-10 text-white text-3xl" tabIndex={5}> <strong>Analise</strong></button>}
      </div>
      <div>
        {pag ?
          <div style={{ width: '1230px' }}>
<div style={{ overflow: "auto", height: '50em', width: '1383px' }}  className='mt-10 pr-10'>

            {descri.map(descri => {
              return (
                <div className="ml-10 ">
                  <div className="flex justify-between items-center mt-5">
                      <img src="/imagens/prerfil.png" alt="" className="w-20"/>
                    <div className="w-11/12  shadow-xl h-auto bg-white p-5 rounded-lg ml-5">
                      <p className="text-3xl">"<strong className="text-2xl">{descri.description}</strong>"</p>
                    </div>
                    <button className="pl-5" onClick={() => Negado(descri?.id)}><img src="/imagens/negado.png" alt="" /></button><button  className="pl-3" onClick={() => Aprovado(descri?.id, descri?.status)}> <img src="/imagens/aprovado.png" alt="" /> </button>
                  </div>
                </div>
              )
            })}
</div>
          </div> :
          <div className="p-10">
            {imagen ?
              <div style={{ width: '1230px' }} className='m-0'>
                <h1 className="text-white text-5xl mt-5 text-center">Cont;nue</h1>
                <div className="mt-5 relative left-24 ml-1">
                  <div className="w-5/6 bg-white p-3 rounded-lg">
                    <p className="w-3/4 text-center m-auto">Compartilhe uma experiência pessoal em que você superou uma crise. Descreva os desafios que enfrentou, as ações que tomou e como superou a situação. Sua história pode ser inspiradora e proporcionar percepções valiosas para quem possa estar enfrentando situações semelhantes. Portanto, não hesite em compartilhar sua experiência. Isso pode ser de grande ajuda para outras pessoas.</p>
                  </div>
                </div>
                <div className="flex w-full mt-5 m-auto">
                  <img src="/imagens/prerfil.png" alt="" className="w-20 h-20 mr-5" />
                  <textarea name="description" id="description" placeholder="Seu Depoimento..." onChange={getData} cols={30} rows={15} className='w-5/6 placeholder:text-2xl rounded-md p-10'></textarea>
                </div>
                <button style={{ background: '#41a5ab' }} onClick={Submit} className='flex justify-center items-center w-20 h-10 rounded-lg float-right mt-3 text-white'>Enviar <img src="/imagens/seta.png.png" alt="" className="w-5 ml-2" /></button>
              </div>
              :
              <div style={{ width: '1230px' }} className="text-center">
                <div style={{ overflow: "auto", height: '50em', width: '1383px' }} className="w-full p-10">
                  {fotos.map(fotos => {
                    return (
                      <div>
                        <div className="flex mt-5 justify-center items-center">
                          <img src="/imagens/prerfil.png" alt="" className="w-20 h-20" />
                          <div className="bg-white p-3 rounded-lg ml-5 w-full h-28 flex justify-center shadow-2xl items-center">
                            <p className="text-3xl">"<strong className="text-2xl">{fotos.description}</strong>"</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            }
          </div>}
      </div>

    </main >
  )
}