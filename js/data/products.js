export const products = [
    {
        id: "prod-001",
        title: "Camisa Social Branca",
        description: "Camisa social de algodão puro, modelagem slim.",
        category: "Camisas",
        price: 89.90,
        pricesBySize: { P: 89.90, M: 94.90, G: 99.90, GG: 109.90 },
        images: ["assets/images/products/prod-001-branca-front.webp", "assets/images/products/prod-001-branca-back.webp"],
        imagesByColor: {
            "Branca": ["assets/images/products/prod-001-branca-front.webp", "assets/images/products/prod-001-branca-back.webp"]
        },
        sizes: ["P", "M", "G", "GG"],
        colors: ["Branca"]
    },
    {
        id: "prod-002",
        title: "Calça Jeans Skinny",
        description: "Calça jeans com elastano e lavagem escura.",
        category: "Calças",
        price: 129.90,
        pricesBySize: {
            "38": 129.90, "40": 134.90, "42": 139.90, "44": 144.90,
            "46": 149.90, "48": 154.90,
            G1: 164.90, G2: 174.90, G3: 184.90, G4: 194.90
        },
        images: ["assets/images/products/prod-002-azul-escuro-front.webp", "assets/images/products/prod-002-azul-escuro-back.webp"],
        imagesByColor: {
            "Azul Escuro": ["assets/images/products/prod-002-azul-escuro-front.webp", "assets/images/products/prod-002-azul-escuro-back.webp"],
            "Preta": ["assets/images/products/prod-002-preta-front.webp", "assets/images/products/prod-002-preta-back.webp"]
        },
        sizes: ["38", "40", "42", "44", "46", "48", "G1", "G2", "G3", "G4"],
        colors: ["Azul Escuro", "Preta"],
        unavailableVariants: [
            { size: "38", color: "Azul Escuro" },
            { size: "40", color: "Azul Escuro" }
        ],
        allowUnavailablePurchase: true // Bug intencional: avisa, mas permite comprar.
    },
    {
        id: "prod-003",
        title: "Bermuda Cargo",
        description: "Bermuda cargo com bolsos laterais, tecido resistente.",
        category: "Shorts e Bermudas",
        price: 79.90,
        pricesBySize: { P: 79.90, M: 84.90, G: 89.90, GG: 94.90 },
        images: ["assets/images/products/prod-003-caqui-front.webp", "assets/images/products/prod-003-caqui-back.webp"],
        imagesByColor: {
            "Caqui": ["assets/images/products/prod-003-caqui-front.webp", "assets/images/products/prod-003-caqui-back.webp"],
            "Verde Oliva": ["assets/images/products/prod-003-verde-oliva-front.webp", "assets/images/products/prod-003-verde-oliva-back.webp"]
        },
        sizes: ["P", "M", "G", "GG"],
        colors: ["Caqui", "Verde Oliva"],
        unavailableVariants: [
            { size: "P", color: "Caqui" },
            { size: "GG", color: "Verde Oliva" }
        ]
    },
    {
        id: "prod-004",
        title: "Tênis Casual",
        description: "Tênis confortável para uso diário.",
        category: "Calçados",
        price: 99.90,
        pricesBySize: { "39": 99.90, "40": 104.90, "41": 109.90, "42": 114.90 },
        images: ["assets/images/products/prod-004-branco-front.webp", "assets/images/products/prod-004-branco-back.webp"],
        imagesByColor: {
            "Branco": ["assets/images/products/prod-004-branco-front.webp", "assets/images/products/prod-004-branco-back.webp"],
            "Preto": ["assets/images/products/prod-004-preto-front.webp", "assets/images/products/prod-004-preto-back.webp"]
        },
        sizes: ["39", "40", "41", "42"],
        colors: ["Branco", "Preto"]
    },
    {
        id: "prod-005",
        title: "Cinto de Couro",
        description: "Cinto 100% couro autêntico.",
        category: "Acessórios",
        price: 49.90,
        images: ["assets/images/products/prod-005-marrom-front.webp", "assets/images/products/prod-005-marrom-back.webp"],
        imagesByColor: {
            "Marrom": ["assets/images/products/prod-005-marrom-front.webp", "assets/images/products/prod-005-marrom-back.webp"],
            "Preto": ["assets/images/products/prod-005-preto-front.webp", "assets/images/products/prod-005-preto-back.webp"]
        },
        sizes: ["Único"],
        colors: ["Marrom", "Preto"]
    },
    {
        id: "prod-006",
        title: "Camiseta Básica Preta",
        description: "Camiseta 100% algodão, gola redonda.",
        category: "Camisas",
        price: 45.00,
        pricesBySize: { P: 45.00, M: 49.90, G: 54.90, GG: 59.90 },
        images: ["assets/images/products/prod-006-preta-front.webp", "assets/images/products/prod-006-preta-back.webp"],
        imagesByColor: {
            "Preta": ["assets/images/products/prod-006-preta-front.webp", "assets/images/products/prod-006-preta-back.webp"],
            "Branca": ["assets/images/products/prod-006-branca-front.webp", "assets/images/products/prod-006-branca-back.webp"],
            "Cinza": ["assets/images/products/prod-006-cinza-front.webp", "assets/images/products/prod-006-cinza-back.webp"]
        },
        sizes: ["P", "M", "G", "GG"],
        colors: ["Preta", "Branca", "Cinza"]
    }
];
