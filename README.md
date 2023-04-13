<div class="markdown prose w-full break-words dark:prose-invert light">
    <h1>Documentação da API</h1>
    <p>Esta API foi desenvolvida para gerenciar dados de usuários armazenados em um banco de dados MySQL. A seguir estão
        as informações para usar a API.</p>
    <h2>Endpoints</h2>
    <h3>Listar usuários</h3>
    <p><code>GET /usuarios</code></p>
    <p>Este endpoint lista todos os usuários cadastrados no banco de dados. É possível filtrar a listagem usando os
        parâmetros <code>matricula</code>, <code>nome</code>, <code>media</code> e <code>aprovado</code>. Se não houver
        filtro, todos os usuários serão retornados.</p>
    <h4>Parâmetros</h4>
    <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Descrição</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>matricula</code></td>
                <td>string</td>
                <td>Número da matrícula do usuário a buscar.</td>
            </tr>
            <tr>
                <td><code>nome</code></td>
                <td>string</td>
                <td>Parte do nome do usuário a buscar.</td>
            </tr>
            <tr>
                <td><code>media</code></td>
                <td>number</td>
                <td>Média das notas do usuário a buscar.</td>
            </tr>
            <tr>
                <td><code>aprovado</code></td>
                <td>boolean</td>
                <td>Aprovação do usuário a buscar.</td>
            </tr>
        </tbody>
    </table>
    <h4>Respostas</h4>
    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Descrição</th>
                <th>Corpo</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>200</td>
                <td>Usuários encontrados com sucesso.</td>
                <td>Objeto JSON com a lista de usuários.</td>
            </tr>
            <tr>
                <td>400</td>
                <td>Requisição inválida.</td>
                <td>Objeto JSON com uma mensagem de erro.</td>
            </tr>
            <tr>
                <td>500</td>
                <td>Erro interno do servidor.</td>
                <td>Objeto JSON com uma mensagem de erro.</td>
            </tr>
        </tbody>
    </table>
    <h4>Exemplo</h4>
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md">
        <span>bash</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-bash">http
GET /usuarios?nome=joa

json
[
  {
    <span class="hljs-string">"id"</span>: 1,
    <span class="hljs-string">"Matricula"</span>: 123,
    <span class="hljs-string">"NomeCompleto"</span>: <span class="hljs-string">"Joao da Silva"</span>,
    <span class="hljs-string">"Nota1"</span>: 8,
    <span class="hljs-string">"Nota2"</span>: 7,
    <span class="hljs-string">"Media"</span>: 7.5,
    <span class="hljs-string">"Aprovado"</span>: 1
  },
  {
    <span class="hljs-string">"id"</span>: 2,
    <span class="hljs-string">"Matricula"</span>: 456,
    <span class="hljs-string">"NomeCompleto"</span>: <span class="hljs-string">"Maria Joana"</span>,
    <span class="hljs-string">"Nota1"</span>: 7,
    <span class="hljs-string">"Nota2"</span>: 9,
    <span class="hljs-string">"Media"</span>: 8,
    <span class="hljs-string">"Aprovado"</span>: 1
  }
]
</code></div></div></pre>
</div>
<div class="markdown prose w-full break-words dark:prose-invert light"></div>
<h2>Cadastrar usuário</h2>
<p><code>POST /usuarios</code></p>
<p>Este endpoint cria um novo usuário no banco de dados.</p>
<h4>Parâmetros</h4>
<table>
    <thead>
        <tr>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Descrição</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>matricula</td>
            <td>string</td>
            <td>Número da matrícula do usuário.</td>
        </tr>
        <tr>
            <td>nome</td>
            <td>string</td>
            <td>Nome completo do usuário.</td>
        </tr>
        <tr>
            <td>nota1</td>
            <td>number</td>
            <td>Primeira nota do usuário.</td>
        </tr>
        <tr>
            <td>nota2</td>
            <td>number</td>
            <td>Segunda nota do usuário.</td>
        </tr>
    </tbody>
</table>
<h4>Respostas</h4>
<table>
    <thead>
        <tr>
            <th>Código</th>
            <th>Descrição</th>
            <th>Corpo</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>201</td>
            <td>Usuário criado com sucesso.</td>
            <td>Objeto JSON com uma mensagem de sucesso.</td>
        </tr>
        <tr>
            <td>400</td>
            <td>Requisição inválida.</td>
            <td>Objeto JSON com uma mensagem de erro.</td>
        </tr>
        <tr>
            <td>500</td>
            <td>Erro interno do servidor.</td>
            <td>Objeto JSON com uma mensagem de erro.</td>
        </tr>
    </tbody>
</table>
<h4>Exemplo</h4>
<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>http</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-http">POST /usuarios
</code></div></div></pre>
<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>json</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">"matricula"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">"20012023"</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"nome"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"Pedro Paulo"</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"nota1"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">6</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"nota2"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span>
<span class="hljs-punctuation">}</span>
</code></div></div></pre>
</div>
<div class="markdown prose w-full break-words dark:prose-invert light">
    <h2>Atualizar usuário</h2>
    <p><code>PUT /usuarios</code></p>
    <p>Este endpoint atualiza os dados de um usuário já cadastrado no banco de dados.</p>
    <h3>Parâmetros</h3>
    <table>
        <thead>
            <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Descrição</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>id</td>
                <td>number</td>
                <td><strong>Obrigatório.</strong> Identificador único do usuário a ser atualizado.</td>
            </tr>
            <tr>
                <td>matricula</td>
                <td>string</td>
                <td>Número da matrícula do usuário.</td>
            </tr>
            <tr>
                <td>nome</td>
                <td>string</td>
                <td>Nome completo do usuário.</td>
            </tr>
            <tr>
                <td>nota1</td>
                <td>number</td>
                <td>Primeira nota do usuário.</td>
            </tr>
            <tr>
                <td>nota2</td>
                <td>number</td>
                <td>Segunda nota do usuário.</td>
            </tr>
        </tbody>
    </table>
    <h3>Respostas</h3>
    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Descrição</th>
                <th>Corpo</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>200</td>
                <td>Usuário atualizado com sucesso.</td>
                <td>Objeto JSON com os dados do usuário atualizado.</td>
            </tr>
            <tr>
                <td>404</td>
                <td>Requisição inválida.</td>
                <td>Objeto JSON com uma mensagem de erro.</td>
            </tr>
            <tr>
                <td>500</td>
                <td>Erro interno do servidor.</td>
                <td>Objeto JSON com uma mensagem de erro.</td>
            </tr>
        </tbody>
    </table>
    <h3>Exemplo</h3>
    <h4>Requisição</h4>
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>http</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-http">PUT /usuarios HTTP/1.1
Content-Type: application/json

{
  "id": 1,
  "matricula": 123,
  "nome": "João da Silva",
  "nota1": 8,
  "nota2": 7,
}
</code></div></div></pre>
    <h4>Resposta</h4>
    <pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>json</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">"id"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"matricula"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">123</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"nome"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"João da Silva"</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"nota1"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">8</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"nota2"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"media"</span><span class="hljs-punctuation">:</span> <span class="hljs-number">7.5</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">"aprovado"</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
<span class="hljs-punctuation">}</span>
</code></div></div></pre>
</div>
<div class="markdown prose w-full break-words dark:prose-invert light">
<h2>Deletar usuários</h2>
<p><code>DELETE /usuarios</code></p>
<p>Este endpoint deleta um usuário existente.</p>
<h4>Parâmetros da URL</h4>
<ul>
    <li><code>id</code> (number, obrigatório): O ID do usuário a ser deletado.</li>
</ul>
<h4>Exemplo de requisição</h4>
<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>http</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-http">DELETE /usuarios</code>
{
    "id": "10"
}
</div></div></pre>
<h4>Exemplo de resposta</h4>
<pre><div class="bg-black rounded-md mb-4"><div class="flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans justify-between rounded-t-md"><span>json</span><button class="flex ml-auto gap-2"><svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>Copy code</button></div><div class="p-4 overflow-y-auto"><code class="!whitespace-pre hljs language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">"message"</span><span class="hljs-punctuation">:</span> <span class="hljs-string">"usuário deletado!"</span>
<span class="hljs-punctuation">}</span>
</code></div></div></pre>
<h2>Erros</h2>
<p>Os seguintes erros podem ocorrer na API:</p>
<ul>
    <li><code>400 Bad Request</code>: O corpo da requisição está malformado ou algum campo obrigatório não foi
        informado.</li>
    <li><code>404 Not Found</code>: O</li>
</ul>
</div></div>
