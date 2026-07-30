# Troubleshooting

## `npm run lint` falha com erro em `Footer.jsx` / `react-hooks/immutability`

Já corrigido (ver [CHANGELOG.md](../CHANGELOG.md), v0.3.0) — se voltares a ver
isto após um merge, confirma que `Footer.jsx` usa
`window.location.assign(...)` e não `window.location.href = ...` diretamente
num handler.

## As chaves de `content/pt.json` e `content/en.json` estão diferentes

Corre este script rápido para comparar as duas árvores de chaves:

```bash
python3 -c "
import json

def keys(d, prefix=''):
    s = set()
    if isinstance(d, dict):
        for k, v in d.items():
            path = f'{prefix}.{k}' if prefix else k
            s.add(path)
            s |= keys(v, path)
    elif isinstance(d, list):
        for i, v in enumerate(d):
            s |= keys(v, f'{prefix}[]')
    return s

pt = json.load(open('content/pt.json'))
en = json.load(open('content/en.json'))
kpt, ken = keys(pt), keys(en)
print('only in pt:', sorted(kpt - ken))
print('only in en:', sorted(ken - kpt))
"
```

## Erro `ENOTEMPTY` ou `ETIMEDOUT` ao correr `npm install`

Normalmente um problema de rede transitório ou um `node_modules` corrompido
por uma instalação anterior interrompida. Resolve com:

```bash
rm -rf node_modules
npm install
```

## As animações de scroll (`useRevealOnScroll`) não aparecem

Confirma que o browser não tem `prefers-reduced-motion: reduce` ativo — o
projeto respeita essa preferência de acessibilidade e desativa as animações
propositadamente nesse caso.

## Screenshot/teste automatizado de uma âncora da homepage (`/#faq`, `/#projects`) sai em branco

Comportamento conhecido do headless Chrome com este site: a combinação de
`scroll-snap-type: y proximity` + `scroll-behavior: smooth` (em
`src/app/globals.css`) interfere com o salto instantâneo para uma âncora em
modo headless. Não é um bug do site — para verificar uma secção específica,
usa `curl` sobre o HTML gerado no servidor ou tira o screenshot da página sem
fragmento (`/`) e faz scroll manualmente num browser normal.

## `docker compose build` falha a fazer `npm ci`

Confirma que `package-lock.json` está commitado e sincronizado com
`package.json` — o Dockerfile usa `npm ci`, que exige que o lockfile exista e
corresponda exatamente às dependências declaradas.
