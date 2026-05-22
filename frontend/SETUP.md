# Setup do Projeto Frontend (Expo SDK 54)

## ⚙️ Requisitos

- **Node.js**: 18.x ou superior
- **npm**: 9.x ou superior (ou yarn)
- **Expo CLI**: 14.x
- **Expo Go**: Versão correspondente ao SDK 54 instalada no celular

## 🖥️ Instalação no Windows

### 1. Clone o repositório
```bash
git clone <repo-url>
cd frontend
```

### 2. Instale as dependências
```bash
npm install
```

Ou com Yarn:
```bash
yarn install
```

### 3. Limpe o cache do Expo
```bash
npx expo start --clean
```

### 4. Conecte no celular
- Escaneie o QR code com o Expo Go (Android) ou Câmera (iOS)
- O aplicativo abrirá automaticamente no seu dispositivo

## 🐧 Instalação no WSL (Windows Subsystem for Linux)

### 1. Instale o Node.js no WSL
```bash
# Instale nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Instale Node.js 18
nvm install 18
nvm use 18
```

### 2. Clone o repositório
```bash
git clone <repo-url>
cd frontend
```

### 3. Instale as dependências
```bash
npm install
```

### 4. Configure a conexão com Windows

Para conectar ao Expo Go no seu celular via WSL, você precisa usar o IP da máquina Windows:

```bash
# Descubra o IP do seu PC Windows
ipconfig getifaddr en0  # macOS/WSL

# Ou dentro do WSL:
hostname -I
```

### 5. Inicie o servidor Expo
```bash
npm start -- --localhost
```

Se precisar conectar pelo IP do PC Windows:
```bash
npm start -- --lan
```

## 📱 Desenvolvendo

### Scripts disponíveis

```bash
# Inicia o Expo (pressione opções para escolher plataforma)
npm start

# Inicia para Android
npm run android

# Inicia para iOS
npm run ios

# Inicia para Web
npm run web

# Verificar código com ESLint
npm run lint

# Corrigir problemas de ESLint
npm run lint:fix

# Formatar código com Prettier
npm run format

# Verificar formatação
npm run format:check
```

## 🔧 Troubleshooting

### Problema: "Metro bundler not responding"
**Solução**: Limpe o cache:
```bash
npm start -- --clean
```

### Problema: "Unable to start from Windows"
**Solução no WSL**: Use `--localhost`:
```bash
npm start -- --localhost
```

### Problema: "Connection timeout"
**Solução**: Verifique o firewall:
- Windows: Permita acesso para Node.js no Firewall do Windows
- WSL: Configure o firewall do Windows para permitir conexões da WSL

### Problema: "Cannot find module"
**Solução**: Delete `node_modules` e `package-lock.json`, depois reinstale:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📋 Configuração do Expo CLI

### Versão do Expo CLI recomendada para SDK 54
```bash
npm install -g expo-cli@14
```

Ou localmente (recomendado):
```bash
npm install --save-dev expo-cli@14
npx expo --version
```

## 🌐 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
EXPO_PUBLIC_API_URL=http://localhost:3000/api
# Ou para WSL, use o IP do seu PC:
# EXPO_PUBLIC_API_URL=http://192.168.x.x:3000/api
```

## 📦 Estrutura de Pastas

```
frontend/
├── src/
│   ├── screens/         # Telas da aplicação
│   ├── components/      # Componentes reutilizáveis
│   ├── services/        # Serviços API e dados
│   ├── contexts/        # Context API
│   ├── hooks/          # Custom hooks
│   ├── types/          # TypeScript types
│   └── routes/         # Navegação
├── app.json            # Configuração Expo
├── package.json        # Dependências
├── tsconfig.json       # TypeScript config
└── index.tsx           # Entry point
```

## 🚀 Compilação para Produção

### Android
```bash
# Build para Android
eas build --platform android
```

### iOS
```bash
# Build para iOS (requer conta Apple)
eas build --platform ios
```

## 📚 Documentação Oficial

- [Expo SDK 54 Docs](https://docs.expo.dev/versions/v54.0.0/)
- [React Native 0.76 Docs](https://reactnative.dev/)
- [React Navigation 6 Docs](https://reactnavigation.org/)

## ⚠️ Notas Importantes

- SDK 54 requer Expo Go versão compatível no celular
- Windows e WSL compartilham o mesmo repositório Node, use `.gitignore` apropriado
- Para desenvolvimento contínuo, mantenha o cache limpo regularmente
- Use sempre as mesmas versões de Node em Windows e WSL

---

**Versão do projeto**: 1.0.0  
**Expo SDK**: 54  
**React Native**: 0.76.0  
**Última atualização**: 2026-05-22
