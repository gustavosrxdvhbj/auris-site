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
        // Manipulação de string para obter o ID do produto, retro-compatível
        const id = window.location.search.split('id=')[1];

        texto.innerHTML = "";
        let mensagem = "";
        let linkQRCode = "";

        switch (id) {
            case '1':
                produtoImg.src = 'minha_imagem.jpeg';
                mensagem = "Você acaba de comprar o conjunto de diamantes<br>Valor: 3,000R$<br>Valor destinado à doação: 1,000R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://seusite.com/pagamento?id=1";
                break;
            case '2':
                produtoImg.src = 'joiasvermelhas.jpeg';
                mensagem = "Você acaba de comprar o conjunto de rubis<br>Valor: 10,000R$<br>Valor destinado à doação: 4,000R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://seusite.com/pagamento?id=2";
                break;
            case '3':
                produtoImg.src = 'joiasverdes.jpeg';
                mensagem = "Você acaba de comprar o conjunto de esmeraldas<br>Valor: 9,000R$<br>Valor destinado à doação: 2,000R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://seusite.com/pagamento?id=3";
                break;
            case '4':
                produtoImg.src = 'perolas.jpeg';
                mensagem = "Você acaba de comprar o conjunto de pérolas e ouro<br>Valor: 8,000R$<br>Valor destinado à doação: 3,000R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://seusite.com/pagamento?id=4";
                break;
            case '5':
                produtoImg.src = 'joiasroxas.jpeg';
                mensagem = "Você acaba de comprar o conjunto de diamantes roxo<br>Valor: 100,000R$<br>Valor destinado à doação: 20,000R$<br>Infelizmente só estamos com a função de PIX habilitada atualmente<br>";
                linkQRCode = "https://seusite.com/pagamento?id=5";
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
                // Fallback para navegadores sem suporte ao QRCode.js
                document.getElementById("qrcode").innerHTML = "Para finalizar a compra, acesse: <a href='" + linkQRCode + "'>" + linkQRCode + "</a>";
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
