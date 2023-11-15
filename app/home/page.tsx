'use client'
import Navbar from "../shaed/constants/navbar";
import React, {useEffect, useState} from 'react';
import api from "../shaed/utils/my-axios";
interface imag {
  user_url: string;
  id: string;
  user: string;
  description: string;
  title: string;
}
export default function HomePage() {
  const [dica, setDica] = useState(false)
  const [SOS, setSOS] = useState(false)
  const [foto, setFoto] = React.useState<imag[]>([]);
  const [item, setItem] = React.useState(0);
  const [items, setItems] = React.useState(0);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [photos, setPhotos] = useState<imag[]>([]);
  useEffect(() => {
    info();
  }, [])
  const info = async () => {
    const response = await api.get('/sos/findFile')
    const data = response.data.res
    setPhotos(data);
  }
  const ndica = () => {
    const novoestado = false;
    setDica(novoestado)
  }
  const sdica = () => {
    const novoestado = true;
    setDica(novoestado)
  }
  const SOSs = () => {
    const novoestado = true;
    setSOS(novoestado)
  }
  const SOSn = () => {
    const novoestado = false;
    setSOS(novoestado)
  }
  const imag = [
    "/imagens/teste1.png",
    "/imagens/teste2.png",
    "/imagens/teste3.png",
    "/imagens/teste4.png",
  ]
  const image = [
    "/imagens/source.gif",
    "/imagens/spiral-unscreen.gif",
    "/imagens/",
    "/imagens/",
    "/imagens/",
  ]
  const texte = [
    "1. Respiração Profunda: Pratique respiração lenta e profunda para acalmar os nervos e reduzir a ansiedade",
    "2. Atenção Plena: Adote a atenção plena, focando na bolinha fazendo aspiral para interromper padrões de pensamentos negativos.",
    "3. Afirmações Positivas: Repita afirmações positivas para afastar pensamentos negativos e cultivar resiliência mental.",
    "nada",
    "nada",
  ]
 
  const SOSBack = () => {
    if (photos.length > 0) {
      const newIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
      setCurrentPhotoIndex(newIndex);
    }
  };

  const SOSNext = () => {
    if (photos.length > 0) {
      const newIndex = (currentPhotoIndex + 1) % photos.length;
      setCurrentPhotoIndex(newIndex);
    }
  };
  const mudarcaroBack = () => {
    const num = (item - 1 + 4) % 4;
    setItem(num);
  };

  const mudarcaroNext = () => {
    const num = (item + 1) % 4;
    setItem(num);
  };
  const madardicNext = () => {
    const nume = (items + 1) % 5;
    setItems(nume)
  }
  const madardicBack = () => {
    const nume = (items - 1) % 5;
    setItems(nume)
  }
  console.log(currentPhotoIndex);
  console.log(photos);
  
  return (
    <div className="">
      <Navbar />
      {dica ?
        <div className="w-full h-full absolute bottom-40 px-72 py-72 z-20">
          <div style={{ background: '#fdbd5e', borderRadius: '2rem' }} className="p-4">
            <header>
              <div className="flex justify-between">
                <div className="flex justify-between m-auto pl-24">
                  <img src="/imagens/lanpada.png" alt="imagen de dica" className="w-40" />
                  <strong className="text-4xl mt-8 ml-3 text-white">Dicas Rápidas</strong>
                </div>
                <button onClick={ndica}><img src="/imagens/X1.png" alt="X" className="w-40" /></button>
              </div>
            </header>
            <div className="flex justify-between">
            <button onClick={madardicBack}><img src="/imagens/sete.png" alt="" className="w-20" /></button>
              <img style={{height:'800px',width:'800px'}} src={image[items]} alt="atividade/incentivos para ajuda" className="m-auto ml-40 -mt-36 -mb-28" />
              <button onClick={madardicNext}><img src="/imagens/Seta esquerda.png" alt="" className="w-20" /></button>
            </div>
            <p className="text-2xl text-white text-center px-10 h-full">{texte[items]}</p>
          </div>
        </div>
        : null}
        {SOS ? 
      <div className="w-full h-full absolute bottom-40 px-72 py-72 z-20">
        {photos && photos[currentPhotoIndex] && (
      <div style={{ background: '#EC6161', borderRadius: '2rem' }} className="p-4 w-full">
        <div className="text-right">
            <button onClick={SOSn}><img src="/imagens/X1.png" alt="X" className="w-40"/></button>
        </div>
        <div className="flex justify-between">
        <button onClick={SOSBack}><img src="/imagens/sete.png" alt="" className="w-20" /></button>
        <div>
          <img style={{height:'500px'}} src={`http://localhost:38000/images/${photos[currentPhotoIndex].user_url}`} alt="atividade/incentivos para ajuda" className="m-auto " />
          <p className="text-center text-white text-2xl">{photos[currentPhotoIndex].description}</p>
        </div>
          <button onClick={SOSNext}><img src="/imagens/Seta esquerda.png" alt="" className="w-20" /></button>
        </div>
      </div>
        )}
    </div>
        :null}
      <main className="flex justify-between">
        <div className="w-1/2 ">
          <button onClick={sdica} style={{ background: '#fdbd5e', borderRadius: '2rem', marginLeft: '10rem' }} className=" h-24 w-2/3 ml-36 mt-16 p-9 flex justify-between" tabIndex={7}><img src="/imagens/lanpada.png" alt="Imagen do Dicas" className="w-40 h-20 -ml-7 -mt-7" /> <strong className="mr-80 pr-1 text-white text-3xl">Dicas</strong></button>
          <a href="/diario" style={{ background: '#D8CADB', borderRadius: '2rem', marginLeft: '10rem' }} className=" h-24 w-2/3 ml-36 mt-16 p-9 flex justify-between" tabIndex={7}><img src="/imagens/livro.png" alt="Imagen do Diario" className="w-24 h-20 -mt-7" /> <strong className="mr-64 pr-1 text-white text-3xl">Meu Diario</strong></a>
          <a href="/depoimento" style={{ background: '#ACF0F4', borderRadius: '2rem', marginLeft: '10rem' }} className=" h-24 w-2/3 ml-36 mt-16 p-9 flex justify-between" tabIndex={7}><img src="/imagens/depoimento.png" alt="Imagen do Depoimento" className="w-20 h-20 ml-3 -mt-7" /> <strong className="mr-60 pr-1 text-white text-3xl">Depoimento</strong></a>
          <a href="/SOSconf" style={{ background: '#EC6161', borderRadius: '2rem', marginLeft: '10rem' }} className=" h-24 w-2/3 ml-36 mt-16 p-9 flex justify-between" tabIndex={7}><img src="/imagens/engrenagem.png" alt="Imagen do SOS" className="w-20 h-20 -mt-7" /> <strong className="mr-24 pr-1 text-white text-3xl">SOS do Configuração</strong></a>
        </div>
        <div className="m-auto w-1/2 flex justify-between px-36">
          <button onClick={mudarcaroNext} className="mt-80 w-20 h-20 text-white text-xl " ><img src="/imagens/seta-esquerda.1.png" alt="" className="w-10 m-auto" /></button>
          <div className="w-3/4">
            <img src={imag[item]} alt="Carosel" className="m-auto h-96 mt-52" />
          </div>
          <button onClick={mudarcaroBack} className="mt-80 w-20 h-20 text-white text-xl" ><img src="/imagens/seta-direita.png" alt="" className="w-10 m-auto" /></button>
        </div>
      </main>
        <button onClick={SOSs} style={{ background: '#EC6161'}} className="float-right text-white w-20 h-20 rounded-full mr-5 mt-10">SOS</button>
    </div>
  )
}