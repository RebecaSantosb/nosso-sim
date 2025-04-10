// Dados mockados da lista de presentes
const LISTA_PRESENTES = [
    { id: 1, nome: "Jogo de Panelas Antiaderente", loja: "Loja Casa Nova", valor: "R$ 350,00",imagem:"images/Conjunto de panelas e frigideiras, conjunto de panelas antiaderentes beges.jpeg", selecionado: false },
    { id: 2, nome: "Conjunto de Toalhas de Banho", loja: "Lar Decor", valor: "R$ 220,00", imagem:"images/Jogo de Banho Imperial Romance Atlântica 100% Algodão Toalha Fio Penteado 4 Peças com Caixa Presente.jpeg", selecionado: false },
    { id: 3, nome: "Jogo de Copos de Cristal", loja: "Cristais Finos", valor: "R$ 280,00", imagem:"images/Jogo De Taças 340ml Vidro Para Suco Água 6 Unidades.jpeg", selecionado: false },
    { id: 4, nome: "Vale-Experiência Jantar Romântico", loja: "Restaurante Sabor & Arte", valor: "R$ 500,00", imagem:"images/Cena romántica con flores y velas plateadas y rosa roja en la mesa IA generativa _ Imagen Premium generada con IA.jpeg", selecionado: false },
    { id: 5, nome: "Smart TV 55 Polegadas", loja: "EletroMega", valor: "R$ 2.800,00", imagem:"images/Smart TV 55” UHD 4K LED Samsung Lançamento 2023 - 55CU7700 Wi-Fi Bluetooth Alexa 3 HDMI.jpeg", selecionado: false },
    { id: 6, nome: "Cafeteira Premium", loja: "EletroCasa", valor: "R$ 450,00", imagem:"images/Detalles de la Cafetera Digital ⚡️☁️.jpeg", selecionado: false },
    { id: 7, nome: "Carro do noivo", loja: "Audi", valor: "R$ 344.760,00", imagem: "images/El Audi A4 vuelve a México con rostro renovado y sólo como mild-hybrid_ estos son sus precios.jpeg", selecionado: false},
    { id: 8, nome: "Viagem de lua de mel", loja: "Agência estrelinha", valor: "R$ 344.760,00", imagem: "images/El Audi A4 vuelve a México con rostro renovado y sólo como mild-hybrid_ estos son sus precios.jpeg", selecionado: false}
];

// Convidado falso para testes
const CONVIDADO_FALSO = {
    nome: "João Roberto",
    email: "Joao@gmail.com",
    senha: "casamento123",
    relacao: "Amigo da noiva",
    presencaConfirmada: false,
    presentesSelecionados: []
};

//insere o convidado falso
if (!sessionStorage.getItem('convidadoLogado')) {
    sessionStorage.setItem('convidadoLogado', JSON.stringify(CONVIDADO_FALSO));
}

// Carrega a lista de presentes
function carregarListaPresentes() {
    const convidadoLogado = JSON.parse(sessionStorage.getItem('convidadoLogado'));
    const presentesGrid = document.getElementById('presentes-grid');
    
    if (!presentesGrid) return;
    
    presentesGrid.innerHTML = '';
    
    LISTA_PRESENTES.forEach(presente => {
        // Verifica se o presente já foi selecionado pelo convidado
        const selecionado = convidadoLogado.presentesSelecionados && 
                            convidadoLogado.presentesSelecionados.includes(presente.id);
        
        const item = document.createElement('div');
        item.className = 'presente-item';
        item.innerHTML = `
    <img src="${presente.imagem}" alt="${presente.nome}" class="presente-imagem">
    <h3>${presente.nome}</h3>
    <p class="loja">${presente.loja}</p>
    <p class="valor">${presente.valor}</p>
    <button class="btn-select ${selecionado ? 'selected' : ''}" 
            data-id="${presente.id}"
            ${selecionado ? 'disabled' : ''}>
        ${selecionado ? 'Selecionado ✔' : 'Selecionar'}
    </button>
`;
        presentesGrid.appendChild(item);
    });
    
    // Adiciona eventos aos botões de seleção
    document.querySelectorAll('.btn-select').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            const convidadoLogado = JSON.parse(sessionStorage.getItem('convidadoLogado'));
            
            if (!convidadoLogado.presentesSelecionados) {
                convidadoLogado.presentesSelecionados = [];
            }
            
            // Adiciona o presente à lista do convidado
            if (!convidadoLogado.presentesSelecionados.includes(id)) {
                convidadoLogado.presentesSelecionados.push(id);
                sessionStorage.setItem('convidadoLogado', JSON.stringify(convidadoLogado));
                
                this.classList.add('selected');
                this.textContent = 'Selecionado ✔';
                this.disabled = true;
                
                alert('Presente selecionado com sucesso!');
            }
        });
    });
}

// Confirmação de presença
const confirmacaoForm = document.getElementById('confirmacaoForm');
if (confirmacaoForm) {
    confirmacaoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const convidadoLogado = JSON.parse(sessionStorage.getItem('convidadoLogado'));
const presenca = document.querySelector('input[name="presenca"]:checked').value;
const acompanhantes = document.getElementById('acompanhantes').value;
const restricoes = document.getElementById('restricoes').value;

// Atualiza os dados do convidado
convidadoLogado.presencaConfirmada = presenca === 'sim';
convidadoLogado.acompanhantes = acompanhantes;
convidadoLogado.restricoes = restricoes;

// Salva no sessionStorage
sessionStorage.setItem('convidadoLogado', JSON.stringify(convidadoLogado));

if (presenca === 'sim') {
    alert(`Sua presença foi confirmada com sucesso! 🎉\n\nEstamos muito felizes em tê-lo(a) conosco neste dia especial.\n\n`);
} else {
    alert(`Entendemos que você não poderá comparecer. 😢\n\nvocê pode atualizar sua resposta até o dia 10/11/2025.`);
}
        
    });
}

// Confirmação de leitura das regras
const confirmarRegras = document.getElementById('confirmarRegras');
const btnConfirmarRegras = document.getElementById('btnConfirmarRegras');

if (confirmarRegras && btnConfirmarRegras) {
    confirmarRegras.addEventListener('change', function() {
        btnConfirmarRegras.disabled = !this.checked;
    });
    
    btnConfirmarRegras.addEventListener('click', function() {
        const convidadoLogado = JSON.parse(sessionStorage.getItem('convidadoLogado'));
        convidadoLogado.regrasConfirmadas = true;
        sessionStorage.setItem('convidadoLogado', JSON.stringify(convidadoLogado));
        
        alert('Obrigado por confirmar a leitura das regras!');
        this.disabled = true;
        confirmarRegras.disabled = true;
    });
}

// Caronas solidárias
document.getElementById('btnOferecerCarona')?.addEventListener('click', function() {
    alert('Obrigado por oferecer carona! Em breve entraremos em contato para combinar os detalhes.');
});

document.getElementById('btnPrecisarCarona')?.addEventListener('click', function() {
    alert('Entraremos em contato para ajudar a organizar sua carona até o evento.');
});


document.addEventListener('DOMContentLoaded', function() {
    carregarListaPresentes();
    
    // Verifica se já confirmou as regras
    const convidadoLogado = JSON.parse(sessionStorage.getItem('convidadoLogado'));
    if (convidadoLogado?.regrasConfirmadas) {
        confirmarRegras.checked = true;
        btnConfirmarRegras.disabled = false;
        btnConfirmarRegras.textContent = 'Confirmado ✔';
        btnConfirmarRegras.disabled = true;
        confirmarRegras.disabled = true;
    }
});