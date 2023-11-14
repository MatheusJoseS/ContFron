import React, { useEffect, useState } from "react";
import api from "../utils/my-axios";
import { log } from "console";



interface Usuario {
  id: '';
  name: '';
}
export default function Navbar() {
  const [cor, setCor] = useState("#717EC7");
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState<Usuario | any>();
  const [menu, setMenu] = useState(false)
  const genericHamburgerLine = `h-2 w-12 my-1 rounded-full bg-white transition ease transform duration-300`;
  const [perfil, setPerfil] = useState(false)
  const [from, setFrom] = React.useState<{ senhaAT: string, senhaAL: string, senhaCO: string }>({ senhaAT: '', senhaAL: '', senhaCO: '' })

  const alterarPerfils = () => {
    setPerfil(!perfil)
  }
  const InteragirMenu = () => {
    setMenu(!menu);
  }
  const deslogar = () => {
    localStorage.removeItem("token")
    location.href = '/'
  }
  useEffect(() => {
    info();
  }, []);

  const info = async () => {
    try {
      const response = await api.get('/users/pegaPorId');
      const data = response.data.saveUser;
      console.log(data);

      if (data) {
        setShow(data);
      } else {
        console.error("A resposta da API está vazia ou em um formato inesperado.");
      }
    } catch (error) {
      console.error("Ocorreu um erro ao buscar os dados: " + error);
    }
  }
  const getData = (e: any) => {
    const { name, value } = e.target
    setFrom({ ...from, [name]: value })

  }
  const sobreToken = () => {
    location.href ='/sobreToken'
  }
  const alterarPerfil = async () => {
    const data = {
      id: show.id,
      nome: show.name,
      senha_user: from.senhaAL
    }
    if (from.senhaAL === from.senhaCO) {
      const response = await api.put('/users/updateUser', data)
      alert('A sua senha mudou')
      setPerfil(false)
    } else {
      alert('Comfirmar senha esta errado')
    }


  }
const alterarPerfilsN = ()=>{
  setPerfil(false)
}
  return (
    <nav style={{ background: cor }} className="w-full h-24 flex justify-between">
      <div className="flex justify-between">
        <img tabIndex={1} className="w-20 h-20 mt-2 ml-2" src="/imagens/logo2.png" alt="Logo do contínua (a Azul)" />
        <h1 tabIndex={2} className="text-white text-5xl mt-6 ml-4">
          Olá, {show ? show.name : 'Carregando...'}
        </h1>
      </div>
      <div>
        <button
          className="flex flex-col h-16 w-16 border-4 border-white rounded justify-center items-center group mt-3 mr-3"
          onClick={() => {
            setIsOpen(!isOpen);
            InteragirMenu();
            alterarPerfilsN();
          }}
        >
          <div
            className={`${genericHamburgerLine} ${isOpen
              ? "rotate-45 translate-y-4 group-hover:opacity-100"
              : "group-hover:opacity-100"
              }`}
          />
          <div
            className={`${genericHamburgerLine} ${isOpen ? "opacity-0" : "group-hover:opacity-100"}`}
          />
          <div
            className={`${genericHamburgerLine} ${isOpen
              ? "-rotate-45 -translate-y-4 group-hover:opacity-100"
              : "group-hover:opacity-100"
              }`}
          />
        </button>
        {menu ?
          <div style={{ background: '#6773b5', borderRadius: '0 0 0 50px' }} className="p-3 absolute right-0 top-20 w-96 h-1/2 flex justify-center flex-col border-white border-2">
            <button onClick={alterarPerfils} className="mx-2 mt-10 text-white text-3xl flex items-center"> <img src="/imagens/alterna.png" alt="" className="w-14 mr-4" />Alterar Conta</button>
            <button onClick={sobreToken} className="mx-2 mt-10 text-white text-3xl flex items-center"> <img src="/imagens/sobre.png" alt="" className="w-14 mr-4" />Sobre</button>
            <button className="mx-2 mt-10 text-white text-left text-3xl flex items-center"> <img src="/imagens/termos.png" alt="" className="w-14 mr-4" />Termos de Política e Privacidade</button>
            <button className="mx-5 mt-10 text-white text-3xl flex items-center" onClick={deslogar}> <img src="/imagens/log-in.png" alt="" className="w-14 mr-4" />Sair</button>
          </div> : null}
        {perfil ?
          <div style={{ background: '#717EC7' }} className="w-7/12 h-2/3 absolute top-40 right-96 mr-24 rounded-3xl text-3xl text-white">
            <button onClick={alterarPerfilsN} className="float-right"><img src="/imagens/X1.png" alt="" className="w-20 mt-5 mr5" /></button>
            <form action="" className="flex flex-col pt-14 pl-40 pr-32">
              <label htmlFor="">Senha atual:</label>
              <input type="text" className="rounded-lg mt-1 mb-24 text-black" id="senhaAT" name="senhaAT" onChange={getData} />
              <label htmlFor="">Senha alterada:</label>
              <input type="text" className="rounded-lg mt-1 mb-24 text-black" id="senhaAL" name="senhaAL" onChange={getData} />
              <label htmlFor="">Confirma senha:</label>
              <input type="text" className="rounded-lg mt-1 mb-10 text-black" id="senhaCO" name="senhaCO" onChange={getData} />
            </form>
            <div className="flex items-center">
              <button onClick={alterarPerfil} style={{ color: '#717EC7' }} className="bg-white w-60 h-10 text-3xl rounded-3xl m-auto">Confirmar</button>
            </div>
          </div>
          : null}
      </div>
    </nav>
  );
}
