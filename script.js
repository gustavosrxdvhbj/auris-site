//------------------------------------------------------------------------------o
//                                     SPECTREE                                 |
//------------------------------------------------------------------------------o 

// Botões fixos do site (não dependem do DOMContentLoaded)
let seeprod = document.querySelector('#see'); 
let aacd = document.querySelector('#siteacd'); 
let amazonia = document.querySelector('#amazon'); 

if (seeprod) {
    seeprod.onclick = () => { window.location = 'produtos.html'; };
}
if (aacd) {
    aacd.onclick = () => { window.location = 'https://aacd.org.br/'; };
}
if (amazonia) {
    amazonia.onclick = () => { window.location = 'https://www.fundoamazonia.gov.br/pt/home/'; };
}

document.addEventListener("DOMContentLoaded", function () {
    // Inicializa o EmailJS (se a lib estiver carregada)
    if (typeof emailjs !== "undefined") {
        emailjs.init("vMBOBTs3yiE98J3bh");
    }

    // -------------------------------------------------------------------------
    // Slideshow automático
    const slides = document.querySelectorAll('.slideshow img');
    let current = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 3000);
    }

    // -------------------------------------------------------------------------
    // Página produtos.html: redireciona para pay.html
    const productLinks = document.querySelectorAll('a[id]');
    if (productLinks.length > 0) {
        productLinks.forEach(el => {
            el.addEventListener('click', (e) => {
                if (el.id.match(/^\d+$/)) {
                    e.preventDefault();
                    window.location.href = `pay.html?id=${el.id}`;
                }
            });
        });
    }

    // -------------------------------------------------------------------------
    // Página pay.html: mostra produto comprado + QR Code
    const produtoImg = document.getElementById('produto-img');
    const texto = document.querySelector('#paragra');

    if (produtoImg && texto) {
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        texto.innerHTML = "";
        let mensagem = "";
        let linkQRCode = "";

        switch (id) {
            case '1':
                produtoImg.src = 'minha_imagem.jpeg';
                mensagem = "Você acaba de comprar o conjunto de diamantes<br>Valor: 3,000,00R$<br>Valor destinado à doação: 1,000,00R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://photos.app.goo.gl/ZJocUxpUMEiJzRjv5";
                break;
            case '2':
                produtoImg.src = 'joiasvermelhas.jpeg';
                mensagem = "Você acaba de comprar o conjunto de rubis<br>Valor: 10,000,00R$<br>Valor destinado à doação: 4,000,00R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://photos.app.goo.gl/ZJocUxpUMEiJzRjv5";
                break;
            case '3':
                produtoImg.src = 'joiasverdes.jpeg';
                mensagem = "Você acaba de comprar o conjunto de esmeraldas<br>Valor: 9,000,00R$<br>Valor destinado à doação: 2,000,00R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://photos.app.goo.gl/ZJocUxpUMEiJzRjv5";
                break;
            case '4':
                produtoImg.src = 'perolas.jpeg';
                mensagem = "Você acaba de comprar o conjunto de pérolas e ouro<br>Valor: 8,000,00R$<br>Valor destinado à doação: 3,000,00R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://photos.app.goo.gl/ZJocUxpUMEiJzRjv5";
                break;
            case '5':
                produtoImg.src = 'joiasroxas.jpeg';
                mensagem = "Você acaba de comprar o conjunto de diamantes roxo<br>Valor: 100,000,00R$<br>Valor destinado à doação: 20,000,00R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://photos.app.goo.gl/ZJocUxpUMEiJzRjv5";
                break;
            default:
                produtoImg.src = 'variavel.jpeg';
        }

        if (mensagem !== "") {
            texto.innerHTML = mensagem + "<div id='qrcode' style='margin-top: 20px; display: flex; justify-content: center;'></div>";
            
            // Retro-compatibility check for QRCode library
            if (typeof QRCode !== "undefined") {
                new QRCode(document.getElementById("qrcode"), {
                    text: linkQRCode,
                    width: 150,
                    height: 150
                });
            } else {
                document.getElementById("qrcode").innerHTML = "Para finalizar a compra, acesse: " + linkQRCode;
            }
        }
    }

    // -------------------------------------------------------------------------
    // Formulário (cadastro) com EmailJS
    const form = document.getElementById('meu-form');
    if (form && typeof emailjs !== "undefined") {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            emailjs.sendForm('service_cufvvha', 'template_lvt28q8', this)
                .then(function () {
                    console.log('Email enviado com sucesso!');
                    window.location.href = 'aguardar.html';
                }, function (error) {
                    console.error('Erro ao enviar email:', error);
                    alert('Ocorreu um erro ao enviar. Tente novamente.');
                });
        });
    }
});


//---------------------------------------parte---login--------------------
let login = document.querySelector('#login');     // botão
let pass = document.querySelector('#pass');       // senha
let name = document.querySelector('#user');       // usuário
let email = document.querySelector('#email');     // email
let passconf = document.querySelector('#passwd'); // confirmar senha

login.onclick = () => {
    // campos vazios
    if (name.value === '' || email.value === '' || pass.value === '' || passconf.value === '') {
        window.alert('Faltam dados');
    }
    // senhas diferentes
    else if (pass.value !== passconf.value) {
        window.alert('As senhas não conferem');
    }
    // email inválido
    else if (!email.value.includes('@') || !email.value.includes('.')) {
        window.alert('Email inválido');
    }
    // nome muito curto
    else if (name.value.length < 3) {
        window.alert('O nome de usuário deve ter pelo menos 3 caracteres');
    }
    // nome muito longo
    else if (name.value.length > 20) {
        window.alert('O nome de usuário não pode ter mais de 20 caracteres');
    }
    // senha fraca
    else if (pass.value.length < 6) {
        window.alert('A senha deve ter pelo menos 6 caracteres');
    }
    // passou em todas as validações
    else {
        window.location.href = 'index.html';
    }
}
