/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.mongo;

import com.google.gson.Gson;
import com.mongodb.client.MongoCollection;
import org.bson.Document;

/**
 *
 * @author marcos.faneli
 */

/*
 http://maxidica.com/wp/implementacao-crud-java-mongodb/
 https://stackoverflow.com/questions/38710137/java-driver-mongodb-updateone
 http://mongodb.github.io/mongo-java-driver/3.4/driver/getting-started/quick-start/
 https://stackoverflow.com/questions/29434207/mongodb-update-using-java-3-driver
 */
public class MongoNBS {

    private void testar() {
        Conexao db = new Conexao();
        db.conectar();

        MongoCollection<Document> collection = db.getCollection("notificacoes");

        Notificacao obj = new Notificacao();
        obj.setMensagem("teste");

        String json = new Gson().toJson(obj);
        Document doc = Document.parse(json);

        String id = db.inserir(collection, doc);
        db.listar(collection);
        db.marcarComoLido(collection, id);
        db.listar(collection);
        db.remover(collection, id);
        db.listar(collection);

        db.fechar();
    }
}
