# TodoList Frontend

Sistema de gerenciamento de tarefas desenvolvido em Angular com interface moderna e responsiva.

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou pnpm
- Angular CLI

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd todolist-frontend
```

2. Instale as dependências:
```bash
# Usando npm
npm install

# Ou usando pnpm (recomendado)
pnpm install
```

3. Execute o projeto:
```bash
# Usando npm
npm start

# Ou usando pnpm
pnpm start

# Ou usando Angular CLI
ng serve
```

4. Acesse a aplicação:
```
http://localhost:4200
```

### Configuração do Backend
Certifique-se de que o backend está rodando na porta 8080:
```
http://localhost:8080
```

## 🛠️ Tecnologias utilizadas

### Frontend
- **Angular 20.3.1** - Framework principal
- **TypeScript** - Linguagem de programação
- **PrimeNG** - Biblioteca de componentes UI
- **PrimeIcons** - Ícones
- **Angular Router** - Roteamento
- **Reactive Forms** - Formulários reativos
- **RxJS** - Programação reativa

### Principais bibliotecas
- `@angular/core` - Core do Angular
- `@angular/common` - Funcionalidades comuns
- `@angular/forms` - Formulários
- `@angular/router` - Roteamento
- `primeng` - Componentes UI
- `primeicons` - Ícones
- `rxjs` - Programação reativa

### Estrutura do projeto
```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Dashboard principal
│   │   └── task-form/          # Formulário de tarefas
│   ├── models/                 # Modelos de dados
│   ├── services/               # Serviços (API, Auth, etc.)
│   ├── app.config.ts          # Configuração da aplicação
│   ├── app.routes.ts          # Rotas
│   └── app.html               # Template principal
├── styles.css                 # Estilos globais
└── index.html                 # HTML principal
```

## 🧪 Como executar os testes

### Testes unitários
```bash
# Usando npm
npm test

# Ou usando pnpm
pnpm test

# Ou usando Angular CLI
ng test
```

### Testes end-to-end
```bash
# Usando npm
npm run e2e

# Ou usando pnpm
pnpm e2e

# Ou usando Angular CLI
ng e2e
```

### Executar testes em modo watch
```bash
ng test --watch
```

### Executar testes com cobertura
```bash
ng test --code-coverage
```

## 📦 Scripts disponíveis

```bash
# Desenvolvimento
npm start          # Inicia o servidor de desenvolvimento
npm run build      # Compila para produção
npm run build:dev  # Compila para desenvolvimento

# Testes
npm test           # Executa testes unitários
npm run e2e        # Executa testes e2e

# Linting
npm run lint       # Executa o linter
npm run lint:fix   # Corrige problemas de lint automaticamente
```

## 🔧 Configuração

### Variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto:
```env
API_BASE_URL=http://localhost:8080
```

### Configuração da API
O serviço de API está configurado para se conectar ao backend em:
```
http://localhost:8080
```

## 📱 Funcionalidades

- ✅ **Autenticação** - Login e logout
- ✅ **Dashboard** - Visão geral das tarefas
- ✅ **CRUD de Tarefas** - Criar, ler, atualizar e deletar
- ✅ **Paginação** - Paginação server-side
- ✅ **Filtros** - Filtrar por nome, prioridade e situação
- ✅ **Ordenação** - Ordenar por diferentes campos
- ✅ **Estatísticas** - Contadores de tarefas por status
- ✅ **Interface Responsiva** - Adaptável a diferentes telas

## 🎨 Interface

- **Design moderno** com PrimeNG
- **Tema responsivo** para mobile e desktop
- **Componentes reutilizáveis**
- **Feedback visual** com toasts e confirmações
- **Loading states** para melhor UX

## 🔐 Autenticação

O sistema utiliza autenticação básica:
- **Login**: Usuário e senha
- **Sessão**: Mantida durante a navegação
- **Proteção de rotas**: AuthGuard implementado

## 📊 Paginação

- **Server-side pagination** para melhor performance
- **Tamanhos de página**: 5, 10, 20 itens
- **Navegação**: Primeiro, anterior, próximo, último
- **Informações**: Mostra registros atuais e total

## 🚀 Deploy

### Build para produção
```bash
ng build --configuration production
```

### Arquivos gerados
Os arquivos compilados ficam na pasta `dist/` e podem ser servidos por qualquer servidor web.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request



