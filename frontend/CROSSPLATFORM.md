# 🔧 Guia de Configuração Cross-Platform (Windows/WSL)

## Resumo Rápido

| Plataforma | Comando | Descrição |
|-----------|---------|-----------|
| **Windows** | `npm start` | Inicia o Expo normalmente |
| **Windows** | `npm run start:windows` | Executa script batch com validações |
| **WSL** | `npm start` | Inicia o Expo com localhost padrão |
| **WSL** | `npm run start:wsl` | Script inteligente que detecta WSL |
| **WSL** | `npm run start:localhost` | Força localhost (conexão USB) |
| **WSL** | `npm run start:lan` | Força LAN (conexão por rede) |

---

## 🔌 Modos de Conexão

### Modo 1: Localhost (Recomendado para USB)
Use quando o celular está conectado via **USB** na mesma máquina.

```bash
npm run start:localhost
```

**Pros:**
- Mais rápido
- Conexão direta USB
- Funciona offline

**Contras:**
- Requer USB conectado
- Apenas um dispositivo por vez

### Modo 2: LAN (Recomendado para Rede)
Use quando quer conectar pelo **IP da rede**.

```bash
npm run start:lan
```

**Pros:**
- Wireless/sem fio
- Vários dispositivos simultâneos
- Flexível

**Contras:**
- Requer mesma rede WiFi
- Pode ser mais lento
- Firewall pode bloquear

### Modo 3: WAN (Internet pública)
Para compartilhar com desenvolvedores remotos.

```bash
npm start -- --tunnel
```

**Pros:**
- Qualquer lugar do mundo
- Colaboração remota

**Contras:**
- Mais lento
- Requer conta Expo
- Não ideal para desenvolvimento

---

## 🪟 Específico para Windows

### 1. Instalação Inicial
```bash
# Instale Node.js de: https://nodejs.org/ (18+)
# Ou com Chocolatey:
choco install nodejs

# Clone o repositório
git clone <url>
cd frontend

# Instale dependências
npm install

# Limpe cache Expo
npm run start:clean
```

### 2. Firewall do Windows
Se tiver problemas de conexão:

1. Abra **Windows Defender Firewall** → **Permitir um app**
2. Procure por **Node.js**
3. Marque tanto **Privada** quanto **Pública**

### 3. Troubleshooting Windows

**Problema: Metro bundler não inicia**
```bash
npm run start:clean
```

**Problema: QR code não funciona**
- Certifique-se que o celular está na mesma rede WiFi
- Use `npm run start:lan` e escaneie novamente

**Problema: Porta 8081 já em uso**
```bash
# Libere a porta
netstat -ano | findstr :8081
taskkill /PID <pid> /F
```

---

## 🐧 Específico para WSL

### 1. Instalação Inicial
```bash
# Dentro do WSL
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18

cd frontend
npm install
```

### 2. Conectando via IP

O WSL pode não acessar diretamente o Windows. Obtenha o IP:

```bash
# No WSL, descubra o IP do host Windows:
cat /etc/resolv.conf | grep nameserver
# Ou:
hostname -I
```

Você verá algo como: `172.x.x.x` - este é seu IP Windows.

No arquivo `.env.local`:
```env
EXPO_PUBLIC_API_URL=http://172.x.x.x:3000/api
```

### 3. Firewall do Windows (para WSL)

1. Abra **Firewall e Proteção de Rede**
2. **Permitir um app pelo firewall**
3. Encontre a entrada WSL e marque **Privada**

### 4. Script Automático WSL
```bash
npm run start:wsl
```

O script irá:
- ✓ Detectar que você está no WSL
- ✓ Perguntar qual modo usar (localhost ou LAN)
- ✓ Iniciar com as flags apropriadas

### 5. Troubleshooting WSL

**Problema: "Could not connect to Expo"**
```bash
# Force localhost primeiro:
npm run start:localhost

# Se não funcionar, tente LAN:
npm run start:lan
```

**Problema: Lentidão no WSL**
- Evite salvar arquivos entre Windows e WSL (muito lento)
- Mantenha o projeto dentro do WSL (`/home/user/project`)
- NÃO use `/mnt/c/` para desenvolvimento

**Problema: node_modules corrompido**
```bash
# No WSL:
rm -rf node_modules package-lock.json
npm install
```

---

## 🔄 Sincronizando entre Windows e WSL

### Opção 1: Git (Recomendado)
```bash
# Windows: commit e push
git add .
git commit -m "changes"
git push

# WSL: pull e continue
git pull
npm install
```

### Opção 2: Copiar via Windows
```bash
# Do Windows para WSL:
cp -r /mnt/c/caminho/projeto /home/usuario/projeto

# Do WSL para Windows:
cp -r /home/usuario/projeto /mnt/c/caminho/projeto
```

### Opção 3: Usar Compartilhamento de Rede

1. No Windows: Compartilhe a pasta `frontend`
2. No WSL: Monte a pasta compartilhada
3. Trabalhe normalmente

---

## 📱 Conectando o Celular

### Android
1. Instale **Expo Go** do Play Store
2. No seu celular, escaneie o QR code
3. Aguarde a abertura do app

### iOS
1. Instale **Expo Go** do App Store
2. Abra a câmera nativa
3. Aponte para o QR code
4. Toque na notificação para abrir

---

## 🎯 Boas Práticas

✅ **Use `npm run start:clean`** quando:
- Adicionar novas dependências
- Mudar de plataforma
- Ter erros estranhos

✅ **Use `npm run start:localhost`** para:
- Desenvolvimento individual
- Testes rápidos com USB

✅ **Use `npm run start:lan`** para:
- Trabalho em equipe
- Testes wireless
- Múltiplos dispositivos

❌ **NÃO altere** `app.json` e `package.json` entre Windows e WSL sem sincronizar via Git

❌ **NÃO compartilhe** `node_modules` entre Windows e WSL

---

## 📊 Compatibilidade

| Versão | Windows | WSL | macOS |
|--------|---------|-----|-------|
| **Expo SDK 54** | ✅ | ✅ | ✅ |
| **React Native 0.76** | ✅ | ✅ | ✅ |
| **Node 18+** | ✅ | ✅ | ✅ |
| **Expo CLI 14** | ✅ | ✅ | ✅ |

---

## 🆘 Suporte

Se encontrar problemas:

1. Verifique `.env.local` está correto
2. Limpe cache: `npm run start:clean`
3. Reinstale dependências: `rm -rf node_modules && npm install`
4. Verifique versões: `node --version` e `npm --version`
5. Consulte [Expo Docs](https://docs.expo.dev/versions/v54.0.0/)

---

**Última atualização**: 2026-05-22  
**Expo SDK**: 54  
**React Native**: 0.76.0
