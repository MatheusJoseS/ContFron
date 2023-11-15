'use client'
import React from "react";


export default function SobreTokenPage() {
  const [cor, setCor] = React.useState("#717EC7")
  return (
    <div style={{ backgroundColor: '#F7F4FF' }} className="w-screen h-screen">
      <header style={{ background: '#717ec7' }} className="w-full h-20">
        <div className="flex">
          <a href="/home"><img src="/imagens/sete.png" alt="" className="w-14 h-16 ml-5 pt-3 flex-initial" /></a>
          <h1 className="text-white flex-initial text-5xl ml-3 mt-4">Sobre</h1>
        </div>
      </header>
      <div className="flex justify-between">
        <div className="m-auto text-center text-3xl mt-28 w-1/2">
          <p className=" m-auto">
            <strong>
              Sobre a Cont;nue: Promovendo o Bem-Estar Emocional
              Olá, somos a Cont;nue, uma plataforma dedicada ao seu bem-estar emocional! Fundada com paixão e comprometimento, nossa missão é auxiliar você a encontrar equilíbrio e serenidade na vida cotidiana, fornecendo ferramentas e recursos inovadores para melhorar sua saúde mental.

              Nosso Propósito:
              Na Cont;nue, acreditamos que a saúde mental é fundamental para uma vida plena e significativa. Nosso projeto de conclusão de curso, realizado na FIEC em 2023, é o resultado do nosso compromisso em criar um espaço digital acolhedor, onde você pode encontrar apoio, compreensão e orientação.

              O que Oferecemos
              Explore uma variedade de recursos cuidadosamente elaborados para atender às suas necessidades emocionais. Desde exercícios de respiração até diários, nossa plataforma oferece ferramentas práticas para ajudá-lo a gerenciar o estresse, cultivar a positividade e fortalecer sua resiliência emocional.          </strong>
          </p>
        </div>
        <div className="m-auto mt-28">
          <img className="m-auto w-full" tabIndex={7} src="/imagens/logo2.png" alt="Logo do cont;nui(a Azul)" id='logo' />
          <strong className="relative top-5 left-52 text-4xl text-blue-700" >Cont;nue</strong>
        </div>
      </div>
    </div>
  )
}