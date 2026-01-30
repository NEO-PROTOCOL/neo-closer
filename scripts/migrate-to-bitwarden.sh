#!/bin/bash
# Migra secrets do .env para Bitwarden
set -e

echo "🔐 Migrando secrets .env → Bitwarden"
echo "====================================="
echo ""

# Check session
if [ -z "$BW_SESSION" ]; then
    echo "❌ BW_SESSION não definida"
    echo ""
    echo "Execute primeiro:"
    echo "export BW_SESSION=\"sua-session-key-aqui\""
    echo ""
    exit 1
fi

if ! bw status --session "$BW_SESSION" | grep -q "unlocked"; then
    echo "❌ Vault não está desbloqueado"
    exit 1
fi

echo "✅ Vault desbloqueado e pronto"
echo ""

# Check .env exists
if [ ! -f .env ]; then
    echo "❌ .env não encontrado"
    exit 1
fi

echo "📄 Lendo .env..."
echo ""

MIGRATED=0
SKIPPED=0

# Read .env and create items
while IFS='=' read -r key value || [ -n "$key" ]; do
    # Skip comments and empty lines
    [[ $key =~ ^#.*$ ]] && continue
    [[ -z $key ]] && continue
    
    # Remove quotes from value
    value=$(echo "$value" | tr -d '"' | tr -d "'" | xargs)
    
    # Skip if value is empty
    if [ -z "$value" ]; then
        echo "  ⚠️  Skipping $key (empty value)"
        SKIPPED=$((SKIPPED + 1))
        continue
    fi
    
    echo "  📝 Migrando: $key"
    
    # Create as secure note
    if bw get item "$key" --session "$BW_SESSION" &>/dev/null; then
        echo "     ⚠️  Já existe, pulando..."
        SKIPPED=$((SKIPPED + 1))
    else
        # Create secure note with the secret (needs base64 encoding)
        JSON=$(cat <<EOF
{
  "type": 2,
  "name": "$key",
  "notes": "$value",
  "secureNote": {
    "type": 0
  }
}
EOF
)
        ENCODED=$(echo "$JSON" | base64)
        bw create item "$ENCODED" --session "$BW_SESSION" &>/dev/null
        if [ $? -eq 0 ]; then
            echo "     ✅ Criado!"
            MIGRATED=$((MIGRATED + 1))
        else
            echo "     ❌ Erro ao criar"
        fi
    fi
    
done < .env

echo ""
echo "═══════════════════════════════════════"
echo "✅ Migração completa!"
echo ""
echo "Estatísticas:"
echo "  • Migrados: $MIGRATED"
echo "  • Pulados: $SKIPPED"
echo ""

# Sync
echo "📡 Sincronizando com servidor..."
bw sync --session "$BW_SESSION" &>/dev/null
echo "✅ Sincronizado!"
echo ""

echo "═══════════════════════════════════════"
echo "Próximos passos:"
echo ""
echo "1. Testar recuperação:"
echo "   source scripts/load-secrets-bitwarden.sh"
echo ""
echo "2. Verificar variáveis:"
echo "   env | grep -E 'ANTHROPIC|TELEGRAM|NEO_'"
echo ""
echo "3. Testar gateway:"
echo "   pnpm moltbot gateway"
echo ""
echo "4. Se tudo OK, backup e delete .env:"
echo "   mv .env .env.backup"
echo "   # Teste tudo novamente"
echo "   rm .env.backup"
echo ""
