#!/bin/bash
# Script para iniciar o Expo no WSL com configurações apropriadas

set -e

echo "🚀 Iniciando Expo no WSL..."
echo ""

# Detecta se está rodando no WSL
if grep -qi microsoft /proc/version &> /dev/null; then
    echo "✓ WSL detectado"
    
    # Opciona: Perguntar qual modo usar
    echo ""
    echo "Escolha o modo de conexão:"
    echo "1) Localhost (somente conexão local via USB)"
    echo "2) LAN (conexão via rede/IP)"
    echo ""
    read -p "Selecione (1 ou 2): " choice
    
    if [ "$choice" = "2" ]; then
        echo ""
        echo "📝 Para conectar via IP no WSL:"
        echo "   - Escaneie o QR code"
        echo "   - Ou use o IP local da máquina Windows"
        echo ""
        npx expo start --lan
    else
        echo ""
        echo "📝 Conexão em modo localhost"
        echo "   - Conecte o celular via USB"
        echo "   - Escaneie o QR code no Expo Go"
        echo ""
        npx expo start --localhost
    fi
else
    echo "✓ Windows detectado"
    echo ""
    npx expo start
fi
