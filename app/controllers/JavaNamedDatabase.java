//package controllers;
//
//import akka.actor.ActorSystem;
//import models.User;
//import play.db.Database;
//import play.db.NamedDatabase;
//import play.libs.concurrent.CustomExecutionContext;
//import javax.inject.Inject;
//import java.util.List;
//import java.util.concurrent.CompletableFuture;
//import java.util.concurrent.CompletionStage;
//
//@javax.inject.Singleton
//public class JavaNamedDatabase {
//    private Database db;
//    private DatabaseExecutionContext executionContext;
//
//    @Inject
//    public JavaNamedDatabase(@NamedDatabase("orders") Database db, DatabaseExecutionContext executionContext) {
//        this.db = db;
//        this.executionContext = executionContext;
//    }
//
//    public CompletionStage<List<User>> updateSomething() {
//        return CompletableFuture.supplyAsync(() -> {
//            return db.withConnection(connection -> {
//                return User.find().all();
//                // do whatever you need with the db connection
//            });
//        }, executionContext);
//    }
//    // do whatever you need with the db using supplyAsync(() -> { ... }, executionContext);
//}
//
//class DatabaseExecutionContext extends CustomExecutionContext {
//
//    @javax.inject.Inject
//    public DatabaseExecutionContext(ActorSystem actorSystem) {
//        // uses a custom thread pool defined in application.conf
//        super(actorSystem, "database.dispatcher");
//    }
//}