import { draggable } from "../draggable.js";

const ContactRender = () => {
  const contactWrapper = document.querySelector('.contact-wrapper');
  const contactIframe = contactWrapper.querySelector('iframe');

  contactIframe.srcdoc = `
    <!DOCTYPE html>
    <html lang="fr" id="dashboard">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Dashboard</title>
        <link href="./src/style/contact/contact.css" rel="stylesheet">
        <link crossorigin="anonymous" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ==" referrerpolicy="no-referrer" rel="stylesheet"/>
      </head>
      <body>
        <div class="contact">
          <div class="contact-sidebar">
            <div class="contact-sidebar-container">
              <h2 class="contact-sidebar-title">Exchange</h2>
              <div class="contact-sidebar-content">Contatos</div>
            </div>
          </div>
          <div class="contact-body">
            <div class="contact-body-header">
              <img src="https://avatars.githubusercontent.com/u/50687213?v=4">
              <span>HenriKenn</span>
            </div>

            <div class="contact-body-buttons">
              <div class="contact-body-button">
                <a href="tel:0783730271">
                  <i class="fas fa-comment"></i>
                  <span>Menssage</span>
                <a>
              </div>
              <div class="contact-body-button">
                <a href="tel:0783730271">
                  <i class="fas fa-phone-alt"></i>
                  <span>Telefone</span>
                <a>
              </div>
              <div class="contact-body-button">
                <a href="mailto:elsk8@outlook.fr">
                  <i class="fas fa-envelope"></i>
                  <span>E-mail</span>
                <a>
              </div>
            </div>

            <div class="contact-body-content">
              <div class="contact-body-content-item">
                <span class="contact-body-title">Tel</span> <span class="contact-body-subtitle">+55 000 0000 0000</span>
              </div>
              <hr>
              <div class="contact-body-content-item">
                <span class="contact-body-title">FaceTime</span> <span class="contact-body-subtitle"><i class="fas fa-video"></i> <i class="fas fa-phone-alt"></i></span>
              </div>
              <hr>
              <div class="contact-body-content-item">
                <span class="contact-body-title">Email</span> <span class="contact-body-subtitle">henrikenn@gmail.com</span>
                <p class="contact-body-form">
                  <form id="contactForm">
                    <div class="form-control">
                      <input type="text" id="name" placeholder="Nome completo" required>
                    </div>
                    <div class="form-control">
                      <input type="email" id="email" placeholder="Endereço de email" required>
                    </div>
                    <div class="form-control">
                      <textarea rows="4" id="message" placeholder="Menssage" required></textarea>
                    </div>
                    <div class="form-control">
                      <button type="submit" id="submitBtn">
                        Enviar <i id="submitLoader" class="fa fa-spinner fa-spin"></i><i id="submitValid" class="fas fa-check"></i>
                      </button>
                    </div>
                  </form>
                  <br>
                  <span id="alertMessage"></span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

        <script src="src/js/contact/contactForm.js" type="module"></script>
      </body>
    </html>
  `;

  // draggable
  if (window.innerWidth > 1024) {
    draggable(contactWrapper, ".contact-header");
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      draggable(contactWrapper, ".contact-header");
    }
  });
}

export default ContactRender;
