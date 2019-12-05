/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.nbsi.portal.site.api.service.comunicado;

import com.nbsi.portal.base.excessao.TipoDeArquivoNaoPermitido;
import com.nbsi.portal.base.model.entidades.Arquivo;
import com.nbsi.portal.base.model.enums.TipoArquivo;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import javax.ws.rs.core.MultivaluedMap;
import org.apache.commons.io.IOUtils;
import org.jboss.resteasy.plugins.providers.multipart.InputPart;

/**
 *
 * @author marcos.faneli
 */
public class ServiceArquivo {

    private final String UPLOADED_FILE_PATH = "c:\\temp\\";
    private TipoArquivo tipo;
    private String nomeDoArquivo;
    private final InputPart inputPart;
    private final Arquivo arquivo;
    private String caminhoCompletoArquivo;
    private String hashArquivo;

    public ServiceArquivo(InputPart inputPart) {
        this.inputPart = inputPart;
        arquivo = new Arquivo();
    }

    public static ServiceArquivo getInstance(InputPart inputPart) {
        return new ServiceArquivo(inputPart);
    }

    public Arquivo salvarArquivo() throws IOException, TipoDeArquivoNaoPermitido {

        lerFileName();
        lerTipoArquivo();
        lerCaminhoCompleto();

        gravarEmDisco();

        arquivo.setTipo(tipo);
        arquivo.setNome(nomeDoArquivo);
        arquivo.setCaminho(caminhoCompletoArquivo);
        arquivo.setHashArquivo(hashArquivo);
        arquivo.setDataUpload(Calendar.getInstance().getTime());

        return arquivo;
    }

    private void gravarEmDisco() throws IOException {
        System.out.println(String.format("Gravando aquivo %s", nomeDoArquivo));

        InputStream inputStream = inputPart.getBody(InputStream.class, null);

        byte[] bytes = IOUtils.toByteArray(inputStream);

        writeFile(bytes, caminhoCompletoArquivo);
    }

    private void lerCaminhoCompleto() {
        hashArquivo = java.util.UUID.randomUUID().toString();
        caminhoCompletoArquivo = UPLOADED_FILE_PATH + hashArquivo + "." + tipo.getValue();
    }

    private void lerFileName() {

        nomeDoArquivo = "unknown";

        MultivaluedMap<String, String> header = inputPart.getHeaders();

        String[] contentDisposition = header.getFirst("Content-Disposition").split(";");

        for (String filename : contentDisposition) {
            if ((filename.trim().startsWith("filename"))) {

                String[] name = filename.split("=");

                String finalFileName = name[1].trim().replaceAll("\"", "");
                nomeDoArquivo = finalFileName;
            }
        }
    }

    private void writeFile(byte[] content, String filename) throws IOException {

        File file = new File(filename);

        if (!file.exists()) {
            file.createNewFile();
        }

        try (FileOutputStream fop = new FileOutputStream(file)) {
            fop.write(content);
            fop.flush();
        }

    }

    private void lerTipoArquivo() throws TipoDeArquivoNaoPermitido {
        try {
            String dados[] = nomeDoArquivo.split("[.]");
            tipo = TipoArquivo.valueOf(dados[1].toLowerCase());
        } catch (Exception ex) {
            throw new TipoDeArquivoNaoPermitido("Tipo de arquivo inválido");
        }

    }

}
