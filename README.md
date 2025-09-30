# TodoList Frontend

Sistema de gerenciamento de tarefas desenvolvido em Angular com interface moderna, responsiva e componentes customizados.

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (versão 18 ou superior)
- pnpm (recomendado) ou npm
- Angular CLI

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd todolist-frontend
```

2. Instale as dependências:
```bash
# Usando pnpm (recomendado)
pnpm install

# Ou usando npm
npm install
```

3. Execute o projeto:
```bash
# Usando pnpm
pnpm start

# Ou usando npm
npm start

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
- **PrimeNG** - Biblioteca de componentes UI (parcialmente substituída)
- **PrimeIcons** - Ícones
- **Angular Router** - Roteamento
- **Reactive Forms** - Formulários reativos
- **RxJS** - Programação reativa

### Componentes Customizados
- **CustomDropdown** - Dropdown personalizado com fundo branco
- **CustomDatepicker** - Seletor de data customizado
- **CustomPagination** - Paginação server-side personalizada
- **CustomPassword** - Campo de senha com toggle de visibilidade
- **CustomToast** - Sistema de notificações personalizado
- **ConfirmationDialog** - Modal de confirmação customizado

### Principais bibliotecas
- `@angular/core` - Core do Angular
- `@angular/common` - Funcionalidades comuns
- `@angular/forms` - Formulários
- `@angular/router` - Roteamento
- `primeng` - Componentes UI (parcialmente utilizado)
- `primeicons` - Ícones
- `rxjs` - Programação reativa

### Estrutura do projeto
```
src/
├── app/
│   ├── components/
│   │   ├── dashboard/              # Dashboard principal
│   │   ├── task-form/              # Formulário de tarefas
│   │   ├── login/                  # Tela de login/registro
│   │   ├── custom-dropdown/        # Dropdown customizado
│   │   ├── custom-datepicker/      # Datepicker customizado
│   │   ├── custom-pagination/      # Paginação customizada
│   │   ├── custom-password/        # Campo senha customizado
│   │   ├── custom-toast/           # Toast customizado
│   │   └── confirmation-dialog/    # Dialog de confirmação
│   ├── models/                     # Modelos de dados
│   ├── services/                   # Serviços (API, Auth, Toast, etc.)
│   ├── app.config.ts              # Configuração da aplicação
│   ├── app.routes.ts              # Rotas
│   └── app.html                   # Template principal
├── styles.css                     # Estilos globais
└── index.html                     # HTML principal
```

## 🧪 Como executar os testes

### Testes unitários
```bash
# Usando pnpm
pnpm test

# Ou usando npm
npm test

# Ou usando Angular CLI
ng test
```

### Testes end-to-end
```bash
# Usando pnpm
pnpm e2e

# Ou usando npm
npm run e2e

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
pnpm start          # Inicia o servidor de desenvolvimento
pnpm build          # Compila para produção
pnpm build:dev      # Compila para desenvolvimento

# Testes
pnpm test           # Executa testes unitários
pnpm e2e            # Executa testes e2e

# Linting
pnpm lint           # Executa o linter
pnpm lint:fix       # Corrige problemas de lint automaticamente
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

### Autenticação
- ✅ **Login/Logout** - Autenticação com validação de usuário
- ✅ **Registro** - Criação de novas contas
- ✅ **Validação de autorização** - Verificação de usuário no backend
- ✅ **Proteção de rotas** - AuthGuard implementado

### Dashboard
- ✅ **Visão geral** - Estatísticas de tarefas por status
- ✅ **Tabela responsiva** - Lista de tarefas com paginação
- ✅ **Filtros dinâmicos** - Por nome, prioridade e situação
- ✅ **Ordenação** - Por diferentes campos
- ✅ **Ações em massa** - Marcar como concluída/pendente

### CRUD de Tarefas
- ✅ **Criar** - Formulário com validação
- ✅ **Ler** - Listagem com paginação server-side
- ✅ **Atualizar** - Edição inline com modal
- ✅ **Deletar** - Confirmação antes da exclusão
- ✅ **Status** - Marcar como concluída/pendente

### Interface
- ✅ **Design moderno** - Componentes customizados
- ✅ **Responsivo** - Adaptável a mobile e desktop
- ✅ **Feedback visual** - Toasts e confirmações
- ✅ **Loading states** - Estados de carregamento
- ✅ **Animações** - Transições suaves

## 🎨 Componentes Customizados

### CustomDropdown
- Fundo branco garantido
- Integração com Angular Forms
- Animações de abertura/fechamento
- Suporte a placeholder e validação

### CustomDatepicker
- Calendário personalizado
- Navegação por mês/ano
- Validação de datas
- Integração com formulários

### CustomPagination
- Paginação server-side
- Controle de itens por página
- Navegação completa
- Informações de registros

### CustomPassword
- Toggle de visibilidade
- Ícone de olho posicionado corretamente
- Validação de senha
- Integração com formulários

### CustomToast
- Sistema de notificações
- Tipos: success, error, warning, info
- Auto-close configurável
- Animações de entrada/saída

### ConfirmationDialog
- Modal de confirmação
- Tipos: danger, warning, info
- Botões customizados
- Overlay com blur

## 🔐 Autenticação

O sistema utiliza autenticação básica com validação:
- **Login**: Usuário e senha com validação no backend
- **Registro**: Criação de conta com validação
- **Sessão**: Mantida durante a navegação
- **Validação**: Verificação de usuário existente no banco
- **Proteção**: AuthGuard para rotas protegidas

## 📊 Paginação

- **Server-side pagination** para melhor performance
- **Tamanhos de página**: 5, 10, 20 itens
- **Navegação**: Primeiro, anterior, próximo, último
- **Informações**: Mostra registros atuais e total
- **Filtros**: Mantém filtros durante a paginação
- **Ordenação**: Preserva ordenação entre páginas

## 🚀 Deploy

### Build para produção
```bash
ng build --configuration production
```

### Arquivos gerados
Os arquivos compilados ficam na pasta `dist/` e podem ser servidos por qualquer servidor web.

## 🔄 Fluxo de Desenvolvimento

### 1. Autenticação
1. Usuário acessa a aplicação
2. Redirecionado para login se não autenticado
3. Pode criar conta ou fazer login
4. Validação de credenciais no backend
5. Redirecionamento para dashboard

### 2. Dashboard
1. Carregamento de tarefas com paginação
2. Exibição de estatísticas
3. Filtros e ordenação
4. Ações de CRUD

### 3. Gerenciamento de Tarefas
1. Criação via modal
2. Edição inline
3. Exclusão com confirmação
4. Mudança de status
5. Atualização automática da lista

## 🎯 Melhorias Implementadas

### Performance
- Paginação server-side
- Componentes otimizados
- Lazy loading
- Debounce em filtros

### UX/UI
- Componentes customizados
- Animações suaves
- Feedback visual
- Design responsivo
- Loading states

### Código
- TypeScript strict
- Componentes reutilizáveis
- Serviços bem estruturados
- Código limpo e documentado

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
