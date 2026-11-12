export const products = [
    {
        id: "prod-001",
        title: "Camisa Social Branca",
        description: "Camisa social de algodão puro, modelagem slim.",
        category: "Camisas",
        price: 89.90,
        images: ["assets/images/products/prod-001-branca-front.webp", "assets/images/products/prod-001-branca-back.webp"],
        imagesByColor: {
            "Branca": ["assets/images/products/prod-001-branca-front.webp", "assets/images/products/prod-001-branca-back.webp"]
        },
        sizes: ["P", "M", "G"],
        colors: ["Branca"]
    },
    {
        id: "prod-002",
        title: "Calça Jeans Skinny",
        description: "Calça jeans com elastano e lavagem escura.",
        category: "Calças",
        price: 129.90,
        images: ["assets/images/products/prod-002-azul-escuro-front.webp", "assets/images/products/prod-002-azul-escuro-back.webp"],
        imagesByColor: {
            "Azul Escuro": ["assets/images/products/prod-002-azul-escuro-front.webp", "assets/images/products/prod-002-azul-escuro-back.webp"],
            "Preta": ["assets/images/products/prod-002-preta-front.webp", "assets/images/products/prod-002-preta-back.webp"]
        },
        sizes: ["38", "40", "42", "44"],
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
