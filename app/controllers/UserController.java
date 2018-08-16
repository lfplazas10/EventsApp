package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import controllers.base.BaseController;
import models.User;
import play.mvc.*;

public class UserController extends BaseController {

    public Result createUser() {
        try {
            User user = bodyAs(User.class);
            boolean exists = User.find().query().where()
                    .eq("email", user.getEmail()).findOne() != null;
            if (exists){
                throw new Exception("There is already an user with that email");
            }
            user.hashAndSavePassword();
            user.save();
            return ok(user);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    public Result getUser() {
        try {
            return ok(User.find().all());
        } catch (Exception e){
            e.printStackTrace();
            return error(e.getMessage());
        }
    }

    public Result test() {
        try {
            String user = session("connected");
            return ok(user);
        } catch (Exception e){
            e.printStackTrace();
            return error(e.getMessage());
        }
    }

    public Result login() {
        try {
            JsonNode request = request().body().asJson();
            String email = request.get("email").asText();
            String password = request.get("password").asText();
            User user = User.find().query().where().eq("email", email).findOne();
            if (user == null){
                throw new Exception("The user does not exist");
            }
            if (!user.isPasswordCorrect(user, password)){
                throw new Exception("The password is incorrect");
            }
            session("connected", email);
            return ok(user);
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

    public Result logout() {
        try {
            response().discardCookie("session");
            return ok();
        } catch (Exception e){
            return error(e.getMessage());
        }
    }

}

