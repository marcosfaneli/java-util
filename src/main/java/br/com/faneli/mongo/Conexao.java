/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.com.faneli.mongo;

import com.mongodb.MongoClient;
import com.mongodb.ServerAddress;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import org.bson.Document;
import org.bson.types.ObjectId;

/**
 *
 * @author marcos.faneli
 */
public class Conexao {

    MongoClient client;
    MongoDatabase database;

    public void conectar() {
        client = new MongoClient(new ServerAddress("localhost", 27017));
        database = client.getDatabase("alertas");
    }

    public MongoCollection<Document> getCollection(String collection) {
        return database.getCollection(collection);
    }

    public void fechar() {
        client.close();
    }

    public String inserir(MongoCollection<Document> collection, Document doc) {
        collection.insertOne(doc);

        System.out.println(doc.get("_id"));

        return doc.get("_id").toString();
    }

    public void listar(MongoCollection<Document> collection) {

        FindIterable<Document> notificacoes = collection.find();

        for (Document doc : notificacoes) {
            System.out.println(doc.toJson());
        }
    }

    public void marcarComoLido(MongoCollection<Document> collection, String id) {

        Document encontrado = collection.find(Filters.eq("_id", new ObjectId(id))).first();

        if (!encontrado.isEmpty()) {
            encontrado.append("lido", true);

            collection.updateOne(Filters.eq("_id", new ObjectId(id)), new Document("$set", new Document("lido", true)));
        }
    }

    public void remover(MongoCollection<Document> collection, String id) {

        Document encontrado = collection.find(Filters.eq("_id", new ObjectId(id))).first();

        if (!encontrado.isEmpty()) {
            encontrado.append("lido", true);

            collection.deleteOne(Filters.eq("_id", new ObjectId(id)));
        }
    }

}
