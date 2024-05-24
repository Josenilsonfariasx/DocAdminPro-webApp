<p align="center">
  <a href="https://nextjs.org">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://aula-youtube1.s3.sa-east-1.amazonaws.com/b8227fc2721e4d7ca2e2561139be7ca2.png">
      <img src="https://aula-youtube1.s3.sa-east-1.amazonaws.com/b8227fc2721e4d7ca2e2561139be7ca2.png">
    </picture>
    <h1 align="center">Doc Admin Pro Web App</h1>
  </a>
</p>

<div align="center">
  <a aria-label="NPM >= 9.6.7" href="https://www.npmjs.com/">
    <img alt="NPM version" src="https://img.shields.io/badge/NPM-%3E%3D%209.6.7-black?style=for-the-badge&labelColor=white">
  </a>
  <a aria-label="React" href="https://reactjs.org/">
    <img alt="React version" src="https://img.shields.io/badge/React-%3E%3D%2018.2.0-black?style=for-the-badge&labelColor=white">
  </a>
</div>


</p>

## Getting Started

## :rocket: Rodando o projeto
Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para instalar as dependencias:

#### Sem docker
  
```
npm i
```
### Com Docker

```
docker build -t nome-da-imagem .
```

Depois de instalar todas as dependencias execute o comando:

### Sem Docker

```
npm run dev
```
### Com Docker:

```
docker run -p 3000:80 nome-da-imagem
```

# Documentação do Projeto

O Doc Admin Pro é um sistema completo de gerenciamento de documentos projetado para oferecer uma experiência eficiente e intuitiva aos usuários. Com uma interface amigável e funcionalidades robustas, o Doc Admin Pro simplifica o processo de organização, armazenamento e acesso a documentos para empresas de todos os portes.

## Visão Geral

é uma solução abrangente e eficaz para o gerenciamento de documentos, proporcionando aos usuários uma plataforma centralizada para armazenar, organizar e acessar seus arquivos de forma segura e eficiente. Com recursos avançados e uma interface intuitiva, o sistema promove a colaboração e a produtividade dentro das empresas, ajudando a simplificar os processos de trabalho e aumentar a eficiência operacional.

# Para Usuários Finais:

## Autenticação Segura:

O sistema oferece um processo de autenticação seguro, garantindo que apenas usuários autorizados tenham acesso ao ambiente do Doc Admin Pro.
Recursos de login e recuperação de senha estão disponíveis para facilitar o acesso e a recuperação de contas em caso de esquecimento da senha.

## Dashboard Informativo:

O Dashboard fornece uma visão geral abrangente das informações essenciais relacionadas aos documentos e usuários da empresa.
Os usuários podem visualizar:
Quantidade numérica de arquivos armazenados.
Espaço total utilizado em relação ao limite de 2GB por usuário.
Quantidade de usuários ativos na empresa.
Um gráfico interativo exibe o número de uploads de arquivos por dia do mês, fornecendo insights valiosos sobre os padrões de uso ao longo do tempo.

## Gerenciamento de Documentos Simplificado:

A funcionalidade "Meus Documentos" permite que os usuários realizem as seguintes ações:
Cadastrem, editem, excluam e busquem documentos de forma intuitiva e eficiente.
O sistema incorpora validações para garantir que nenhum usuário ultrapasse o limite de 2GB de espaço de armazenamento designado, garantindo uma utilização otimizada dos recursos.
## Busca Avançada:

Com a capacidade de buscar documentos por nome do arquivo ou por palavras-chave dentro dos PDFs, o Doc Admin Pro simplifica o processo de encontrar informações específicas dentro de uma vasta biblioteca de documentos.
Essa funcionalidade é essencial para agilizar fluxos de trabalho e aumentar a produtividade dos usuários.
## Perfil Personalizado:

Os usuários podem personalizar seu perfil no Doc Admin Pro, atualizando informações pessoais e alterando suas senhas conforme necessário.
Essa funcionalidade oferece flexibilidade e controle aos usuários sobre suas informações de conta e segurança.

# Tecnologias Utilizadas

O projeto é construído utilizando uma série de tecnologias e bibliotecas modernas para fornecer funcionalidades robustas e uma experiência de usuário aprimorada. Algumas das principais tecnologias incluem:

- ![Badge React](https://img.shields.io/badge/React-%E2%9C%94-blue?style=for-the-badge)  Base para criar interfaces de usuário dinâmicas e responsivas,Recursos avançados:componentes, contextos e estados.
- ![Badge Axios](https://img.shields.io/badge/Axios-%E2%9C%94-blue?style=for-the-badge)  Utilizado para facilitar a comunicação com uma API externa, possibilitando a busca e exibição de dados de produtos.
- ![Badge React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%E2%9C%94-blue?style=for-the-badge) ![Badge Zod](https://img.shields.io/badge/Zod-%E2%9C%94-blue?style=for-the-badge)  Empregados para validar formulários, garantindo a entrada de dados precisa e segura.
- ![Badge React Router DOM](https://img.shields.io/badge/React%20Router%20DOM-%E2%9C%94-blue?style=for-the-badge)  Gerencia as rotas da aplicação, protegendo áreas específicas e fornecendo navegação eficiente.
- ![Badge React Toastify](https://img.shields.io/badge/React%20Toastify-%E2%9C%94-blue?style=for-the-badge)  Utilizado para exibir notificações de forma amigável, mantendo os usuários informados sobre eventos importantes.
- ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) Utilizado para gerenciar todos os estilos de forma simples e rapida


# Melhores Práticas
---
Este é um documento de documentação inicial e pode ser expandido conforme necessário.


## Vale a pena usar React?
  
O React é uma escolha valiosa para projetos web, pois permite criar interfaces de usuário reutilizáveis e eficientes, beneficiando-se de sua comunidade ativa e vasto ecossistema de ferramentas.

## 🔜 Melhorias futuras

1. **Dark Mode**:
Implementar um modo escuro para oferecer aos usuários uma alternativa visualmente atraente e reduzir a fadiga ocular durante o uso prolongado do sistema.

2. **Melhorias no Layout**:
Realizar uma reformulação do layout para melhorar a usabilidade e a estética geral do Doc Admin Pro.
Priorizar a organização intuitiva dos elementos da interface para uma experiência de usuário mais fluida e agradável.

3. **Otimização do Uso de Cache**:
Aprimorar o uso de cache para agilizar as requisições e otimizar o desempenho do sistema.
Implementar estratégias de cache eficientes para reduzir o tempo de carregamento de páginas e melhorar a resposta do servidor.

#Backend
### Backend feito por [Josenilson Farias](https://www.linkedin.com/in/josenilsonfarias)
1. **link** [Backend]()

## Autor
  <table>
    <tr>
      <td align="center">
        <a href="http://github.com/Josenilsonfariasx">
          <img src="https://i.imgur.com/SgdMMR7.png" width="100px;" alt="Foto de Tati Alves no GitHub"/><br>
          <sub>
            <b>Josenilson Farias</b>
          </sub>
        </a>
      </td>
    </tr>
  </table>
  
## :dart: Doc Admin Pro Web App
