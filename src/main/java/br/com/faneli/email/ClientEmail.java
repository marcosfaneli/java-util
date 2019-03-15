/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.email;

import java.io.IOException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

/**
 *
 * @author marcos.faneli
 */
public class ClientEmail {

    Properties emailProperties;
    Session mailSession;
    MimeMessage emailMessage;
    String[] destinatarios;

    public void enviarEmail(String assunto, String mensagem) {
        try {
            if (destinatarios.length > 0) {
                setMailServerProperties();
                createEmailMessage(assunto, mensagem);
                sendEmail();
            }
        } catch (MessagingException ex) {
            Logger.getLogger(this.getClass().getName()).log(Level.SEVERE, assunto, ex);
        }
    }

    private void setMailServerProperties() {

        String emailPort = "587";

        emailProperties = System.getProperties();
        emailProperties.put("mail.smtp.port", emailPort);
        emailProperties.put("mail.smtp.auth", "true");
        emailProperties.put("mail.smtp.startssl.enable", "true");

    }

    private void createEmailMessage(String assunto, String mensagem) throws AddressException, MessagingException {

        String emailSubject = assunto;
        String emailBody = mensagem;

        mailSession = Session.getDefaultInstance(emailProperties, null);
        emailMessage = new MimeMessage(mailSession);

        adicionarDestinatarios();

        emailMessage.setSubject(emailSubject);
        emailMessage.setContent(emailBody, "text/html");

    }

    private void adicionarDestinatarios() throws MessagingException {
        for (String toEmail : destinatarios) {
            emailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
        }
    }

    private void sendEmail() throws AddressException, MessagingException {
        String emailHost = "mail.gmail.com.br";
        String fromUser = "xxxxx@gmail.com";
        String fromUserEmailPassword = "xxxxxxxx";

        try (Transport transport = mailSession.getTransport("smtp")) {
            transport.connect(emailHost, fromUser, fromUserEmailPassword);
            transport.sendMessage(emailMessage, emailMessage.getAllRecipients());
        }

        System.out.println("Notificação enviada");
    }

    public ClientEmail comListaDefaultDestinatario() {
        try {
            destinatarios = new CarregarDestinatarios().listar();
        } catch (IOException ex) {
            destinatarios = new String[0];
        }

        return this;
    }

    public ClientEmail comDestinatario(String email) {
        destinatarios = new String[1];
        destinatarios[0] = email;

        return this;
    }
}
